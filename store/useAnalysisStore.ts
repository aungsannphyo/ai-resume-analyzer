import { create } from "zustand";
import {
  AnalysisDomain,
  AnalysisStep,
  type AnalysisResult,
} from "@/types/analysis";

interface AnalysisState {
  jdText: string;
  resumeFile: File | null;
  showResults: boolean;
  analysisResult: AnalysisResult | null;
  error: string | null;
  exportError: string | null;
  domain: AnalysisDomain;
  analysisStep: AnalysisStep;
  extractionProgress: number;
  setJdText: (jdText: string) => void;
  setResumeFile: (file: File | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setShowResults: (show: boolean) => void;
  setError: (error: string | null) => void;
  setExportError: (error: string | null) => void;
  setDomain: (domain: AnalysisDomain) => void;
  setAnalysisStep: (step: AnalysisStep) => void;
  setExtractionProgress: (progress: number) => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  jdText: "",
  resumeFile: null,
  showResults: false,
  analysisResult: null,
  error: null,
  exportError: null,
  domain: AnalysisDomain.TECHNOLOGY,
  analysisStep: AnalysisStep.IDLE,
  extractionProgress: 0,
  setJdText: (jdText) => set({ jdText }),
  setResumeFile: (resumeFile) => set({ resumeFile }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  setShowResults: (showResults) => set({ showResults }),
  setError: (error) => set({ error }),
  setExportError: (exportError) => set({ exportError }),
  setDomain: (domain) => set({ domain }),
  setAnalysisStep: (analysisStep) => set({ analysisStep }),
  setExtractionProgress: (extractionProgress) => set({ extractionProgress }),
  resetAnalysis: () =>
    set({
      showResults: false,
      analysisResult: null,
      jdText: "",
      resumeFile: null,
      error: null,
      exportError: null,
      analysisStep: AnalysisStep.IDLE,
      extractionProgress: 0,
    }),
}));
