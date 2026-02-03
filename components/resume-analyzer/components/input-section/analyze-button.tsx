import { Loader2, Sparkles } from "lucide-react";
import { AnalysisStep } from "@/types/analysis";

interface AnalyzeButtonProps {
  isAnalyzing: boolean;
  analysisStep: AnalysisStep;
  onClick: () => void;
}

const AnalyzeButton = ({
  isAnalyzing,
  analysisStep,
  onClick,
}: AnalyzeButtonProps) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        type="button"
        className="group cursor-pointer relative inline-flex items-center gap-3 px-8 py-4 bg-[#5cbe4c] text-white rounded-2xl text-lg font-semibold shadow-lg shadow-[#5cbe4c]/20 hover:shadow-[#5cbe4c]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
        onClick={onClick}
        disabled={isAnalyzing}
      >
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
        {isAnalyzing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5" />
        )}
        {isAnalyzing
          ? analysisStep === AnalysisStep.EXTRACTING
            ? "Extracting Text..."
            : "Analyzing with AI..."
          : "Analyze Resume"}
        <span className="group-hover:translate-x-1 transition-transform">
          -&gt;
        </span>
      </button>
    </div>
  );
};

export default AnalyzeButton;
