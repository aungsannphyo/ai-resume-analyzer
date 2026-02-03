import { AnalysisDomain, AnalysisResult } from "@/types/analysis";

interface AnalyzePayload {
  jdText: string;
  resumeText: string;
  domain: AnalysisDomain;
}

interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export const AnalysisService = {
  analyzeResume: async (payload: AnalyzePayload): Promise<AnalysisResult> => {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: AnalyzeResponse | null = null;
    try {
      data = (await response.json()) as AnalyzeResponse;
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        data?.error || `Analysis failed (status ${response.status})`,
      );
    }

    if (!data?.success || !data.data) {
      throw new Error(data?.error || "Analysis failed");
    }

    return data.data;
  },
};
