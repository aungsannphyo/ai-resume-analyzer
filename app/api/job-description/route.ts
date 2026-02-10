import { NextRequest, NextResponse } from "next/server";
import { JobDescriptionSchema } from "@/schemas/job-description";
import { getJobDescriptionPrompt } from "@/prompts/job-description-prompt";
import { getAIModel } from "@/lib/models/ai-model";
import { LLM_CONFIG } from "@/constants/llm";
import { rateLimit } from "@/lib/rate-limit";
import { generateCacheKey, getCache, setCache } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime?.toString() || "",
          },
        },
      );
    }

    // Request size check
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      // 1MB limit
      return NextResponse.json(
        { success: false, error: "Request too large" },
        { status: 413 },
      );
    }

    // Parse and validate body
    const body = await request.json();
    const validatedInput = JobDescriptionSchema.parse(body);

    // Check cache first
    const cacheKey = generateCacheKey(validatedInput);
    const cachedResult = getCache(cacheKey);

    if (cachedResult) {
      console.log(
        `Cache hit for ${validatedInput.jobTitle} at ${new Date().toISOString()}`,
      );
      return NextResponse.json(
        {
          success: true,
          data: cachedResult,
          cached: true,
        },
        {
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining":
              rateLimitResult.remaining?.toString() || "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime?.toString() || "",
          },
        },
      );
    }

    // Generate prompt
    const prompt = getJobDescriptionPrompt(validatedInput);

    // Get the AI model instance
    const modelType = request.headers.get("x-model-type") || undefined;
    const aiModel = getAIModel(modelType);

    // Create response (non-streaming for now, can be upgraded later)
    const generatedText = await aiModel.generateResponse(prompt, {
      max_tokens: LLM_CONFIG.MAX_TOKENS,
      temperature: LLM_CONFIG.TEMPERATURE,
    });

    if (!generatedText) {
      throw new Error("No job description generated.");
    }

    // Log completion for analytics
    console.log(
      `Generated JD for ${validatedInput.jobTitle} at ${new Date().toISOString()}`,
    );

    // Cache the result for 1 hour
    const resultData = { jobDescription: generatedText };
    setCache(cacheKey, resultData, 3600000); // 1 hour TTL

    return NextResponse.json(
      {
        success: true,
        data: resultData,
        cached: false,
      },
      {
        headers: {
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": rateLimitResult.remaining?.toString() || "0",
          "X-RateLimit-Reset": rateLimitResult.resetTime?.toString() || "",
        },
      },
    );
  } catch (error) {
    console.error("Job description generation error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
          details: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Job description generation failed" },
      { status: 500 },
    );
  }
}
