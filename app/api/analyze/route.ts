import { NextRequest, NextResponse } from "next/server";
import { AnalysisDomain, type AnalysisResult } from "@/types/analysis";
import { getAnalyzePrompt } from "@/prompts/analyzePrompt";
import { groq } from "@/utils/groq_config";
import { normalizeDomain } from "@/lib/domain-registry";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString);

const isDecisionStatus = (
  value: unknown,
): value is AnalysisResult["decision"]["status"] =>
  value === "Proceed" || value === "Consider" || value === "Reject";

const isAnalysisResult = (value: unknown): value is AnalysisResult => {
  if (!value || typeof value !== "object") return false;
  const v = value as AnalysisResult;

  const hasValidScores =
    typeof v.overallScore === "number" &&
    Number.isFinite(v.overallScore) &&
    v.overallScore >= 0 &&
    v.overallScore <= 100 &&
    Array.isArray(v.detailedScores) &&
    v.detailedScores.every(
      (score) =>
        score &&
        typeof score.category === "string" &&
        typeof score.score === "number" &&
        Number.isFinite(score.score),
    );

  const hasValidCompetencies =
    Array.isArray(v.competencies) &&
    v.competencies.every(
      (comp) =>
        comp &&
        isNonEmptyString(comp.name) &&
        isNonEmptyString(comp.rating) &&
        isNonEmptyString(comp.evidence),
    );

  const hasValidDecision =
    v.decision &&
    isDecisionStatus(v.decision.status) &&
    isNonEmptyString(v.decision.reasoning);

  const hasValidInterviewFocus =
    v.interviewFocus &&
    isStringArray(v.interviewFocus.technical) &&
    isStringArray(v.interviewFocus.behavioral) &&
    isStringArray(v.interviewFocus.tasks);

  return (
    isNonEmptyString(v.candidateName) &&
    isNonEmptyString(v.designation) &&
    isNonEmptyString(v.assessment) &&
    hasValidScores &&
    hasValidCompetencies &&
    isStringArray(v.strengths) &&
    isStringArray(v.gaps) &&
    isStringArray(v.redFlags) &&
    hasValidDecision &&
    hasValidInterviewFocus
  );
};

export async function POST(request: NextRequest) {
  try {
    const { jdText, resumeText, domain } = await request.json();
    const safeDomain = normalizeDomain(domain, AnalysisDomain.TECHNOLOGY);

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
    const prompt = getAnalyzePrompt(jdText, resumeText, safeDomain);

    // Call Groq API
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    // Parse the AI response
    let analysisResult: AnalysisResult;

    try {
      const generatedText = response.choices[0].message.content;
      const jsonStart = generatedText?.indexOf("{") ?? -1;
      const jsonEnd = generatedText?.lastIndexOf("}") ?? -1;
      if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        throw new Error("No JSON found in AI response");
      }

      const jsonString = generatedText!.slice(jsonStart, jsonEnd + 1);
      analysisResult = JSON.parse(jsonString);

      if (!isAnalysisResult(analysisResult)) {
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
