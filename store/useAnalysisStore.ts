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
  domain: AnalysisDomain;
  analysisStep: AnalysisStep;
  setJdText: (jdText: string) => void;
  setResumeFile: (file: File | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setShowResults: (show: boolean) => void;
  setError: (error: string | null) => void;
  setDomain: (domain: AnalysisDomain) => void;
  setAnalysisStep: (step: AnalysisStep) => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  jdText: "",
  resumeFile: null,
  showResults: false,
  analysisResult: null,
  error: null,
  domain: AnalysisDomain.TECHNOLOGY,
  analysisStep: AnalysisStep.IDLE,
  setJdText: (jdText) => set({ jdText }),
  setResumeFile: (resumeFile) => set({ resumeFile }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  setShowResults: (showResults) => set({ showResults }),
  setError: (error) => set({ error }),
  setDomain: (domain) => set({ domain }),
  setAnalysisStep: (analysisStep) => set({ analysisStep }),
  resetAnalysis: () =>
    set({
      showResults: false,
      jdText: "",
      resumeFile: null,
      error: null,
      analysisStep: AnalysisStep.IDLE,
    }),
}));
