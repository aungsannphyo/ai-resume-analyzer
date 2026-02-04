import { Copy, RotateCcw, Download } from "lucide-react";
import { memo } from "react";
import ReactMarkdown from "react-markdown";

interface ResultsSectionProps {
  jobDescription: string;
  onCopy: () => void;
  onReset: () => void;
  onExport?: () => void;
  isExporting?: boolean;
}

const ResultsSection = memo(
  ({
    jobDescription,
    onCopy,
    onReset,
    onExport,
    isExporting,
  }: ResultsSectionProps) => {
    return (
      <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Generated Job Description
            </h2>
            <p className="text-slate-500 font-medium">
              Review the AI-generated job description below and tailor as
              needed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-[#5cbe4c]/40 hover:text-[#5cbe4c] hover:bg-[#5cbe4c]/10 transition-all"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            {onExport && (
              <button
                type="button"
                onClick={onExport}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-[#5cbe4c]/40 hover:text-[#5cbe4c] hover:bg-[#5cbe4c]/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </button>
            )}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Start New
            </button>
          </div>
        </div>

        <div className="mt-6 bg-slate-50/70 border border-slate-200/60 rounded-2xl p-6 text-slate-700 leading-relaxed prose prose-slate max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              strong: ({ children }) => (
                <strong className="block font-bold text-lg mb-2">
                  {children}
                </strong>
              ),
            }}
          >
            {jobDescription}
          </ReactMarkdown>
        </div>
      </section>
    );
  },
);

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;
