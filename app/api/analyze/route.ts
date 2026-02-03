import { NextRequest, NextResponse } from "next/server";
import type { AnalysisResult } from "@/types/analysis";
import { getAnalyzePrompt } from "@/prompts/analyzePrompt";
import { hf, HF_CONFIG } from "@/utils/huggingface_config";

export async function POST(request: NextRequest) {
  try {
    const { jdText, resumeText, domain } = await request.json();

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Resume text is required" },
        { status: 400 },
      );
    }

    if (!jdText || jdText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Job Description is required" },
        { status: 400 },
      );
    }

    // Construct the analysis prompt using JD as context
    const prompt = getAnalyzePrompt(jdText, resumeText, domain);

    // Call Hugging Face API
    const response = await hf.chatCompletion({
      model: HF_CONFIG.model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: HF_CONFIG.max_tokens,
      temperature: HF_CONFIG.temperature,
    });

    // Parse the AI response
    let analysisResult: AnalysisResult;

    try {
      const generatedText = response.choices[0].message.content;
      const jsonMatch = generatedText?.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in AI response");
      }

      analysisResult = JSON.parse(jsonMatch[0]);

      if (!analysisResult.overallScore || !analysisResult.competencies) {
        throw new Error("Invalid analysis structure");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error(
        "Failed to generate a valid analysis report. Please try again.",
      );
    }

    return NextResponse.json({
      success: true,
      data: analysisResult,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 },
    );
  }
}
