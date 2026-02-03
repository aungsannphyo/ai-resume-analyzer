import { useMutation } from "@tanstack/react-query";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { AnalysisStep, AnalysisDomain } from "@/types/analysis";
import { AnalysisService } from "@/services/analysis.service";

interface AnalyzeParams {
  jdText: string;
  resumeFile: File;
  domain: AnalysisDomain;
}

export const useAnalyzeResume = () => {
  const {
    setAnalysisResult,
    setShowResults,
    setError,
    setExportError,
    setAnalysisStep,
    setExtractionProgress,
  } = useAnalysisStore();

  return useMutation({
    mutationFn: async ({ jdText, resumeFile, domain }: AnalyzeParams) => {
      const { extractTextFromPDF } = await import("@/utils/pdf");

      // 1. Extract text on the client side
      setAnalysisStep(AnalysisStep.EXTRACTING);
      setExtractionProgress(0);
      const resumeText = await extractTextFromPDF(
        resumeFile,
        (progress) => {
          setExtractionProgress(progress);
        },
      );

      if (!resumeText.trim()) {
        throw new Error(
          "Could not extract any text from the PDF. Please ensure it's not an image-only PDF.",
        );
      }

      // 2. Send the extracted text to the API
      setAnalysisStep(AnalysisStep.ANALYZING);
      setExtractionProgress(100);

      return await AnalysisService.analyzeResume({
        jdText,
        resumeText,
        domain,
      });
    },
    onMutate: () => {
      setError(null);
      setExportError(null);
      setExtractionProgress(0);
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setShowResults(true);
      setAnalysisStep(AnalysisStep.COMPLETED);
      setError(null);
      setExportError(null);
      setExtractionProgress(100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error: Error) => {
      setError(error.message);
      setExportError(null);
      setAnalysisStep(AnalysisStep.IDLE);
      setExtractionProgress(0);
    },
  });
};
