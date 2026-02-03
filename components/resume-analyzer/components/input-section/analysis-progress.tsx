import { AnalysisStep } from "@/types/analysis";

interface AnalysisProgressProps {
  analysisStep: AnalysisStep;
  extractionProgress: number;
}

const AnalysisProgress = ({
  analysisStep,
  extractionProgress,
}: AnalysisProgressProps) => {
  const progress =
    analysisStep === AnalysisStep.EXTRACTING
      ? Math.max(5, Math.min(95, extractionProgress))
      : 85;

  return (
    <div className="mb-6 max-w-md mx-auto">
      <div className="flex justify-between items-end mb-2 px-1">
        <span className="text-sm font-semibold text-slate-600">
          {analysisStep === AnalysisStep.EXTRACTING
            ? "Step 1: Extracting Text"
            : "Step 2: AI Analysis"}
        </span>
        <span className="text-xs font-bold text-[#5cbe4c]">
          {analysisStep === AnalysisStep.EXTRACTING
            ? `${extractionProgress}%`
            : "85%"}
        </span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div
          className="h-full bg-[#5cbe4c] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(92,190,76,0.3)]"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <p className="text-center text-xs text-slate-400 mt-2 italic animate-pulse">
        {analysisStep === AnalysisStep.EXTRACTING
          ? "Reading PDF content locally..."
          : "Groq AI is evaluating experience..."}
      </p>
    </div>
  );
};

export default AnalysisProgress;
