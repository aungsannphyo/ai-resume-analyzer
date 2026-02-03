import { Download, RefreshCcw, Loader2 } from "lucide-react";

interface ActionBarProps {
  onExport: () => void;
  onNewAnalysis: () => void;
  isExporting: boolean;
}

const ActionBar = ({
  onExport,
  onNewAnalysis,
  isExporting,
}: ActionBarProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
      <h2 className="text-3xl font-bold text-slate-900">AI Analysis Results</h2>
      <div className="flex gap-3">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium hover:bg-white hover:border-[#5cbe4c] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? "Exporting..." : "Export Report"}
        </button>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium hover:bg-white hover:border-[#5cbe4c] transition-all"
          onClick={onNewAnalysis}
        >
          <RefreshCcw className="w-4 h-4" />
          New Analysis
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
