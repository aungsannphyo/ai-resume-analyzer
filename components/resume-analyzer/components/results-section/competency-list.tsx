import type { Competency } from "@/types/analysis";
import { Target } from "lucide-react";

interface CompetencyListProps {
  competencies: Competency[];
}

const getRatingColor = (rating: string) => {
  switch (rating.toLowerCase()) {
    case "expert":
      return "bg-emerald-100 text-emerald-700";
    case "proficient":
      return "bg-blue-100 text-blue-700";
    case "intermediate":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-red-100 text-red-700";
  }
};

const CompetencyList = ({ competencies }: CompetencyListProps) => {
  return (
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/50 animate-slide-in">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
        <Target className="w-8 h-8 text-[#5cbe4c]" />
        Competency Breakdown
      </h3>
      <div className="space-y-4">
        {competencies.map((comp, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border-l-4 border-[#5cbe4c] hover:translate-x-1 hover:shadow-md transition-all shadow-sm"
          >
            <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
              <span className="font-semibold text-slate-900 text-lg">
                {comp.name}
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${getRatingColor(
                  comp.rating,
                )}`}
              >
                {comp.rating}
              </span>
            </div>
            <div className="text-slate-600 text-sm leading-relaxed italic font-medium">
              {comp.evidence}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetencyList;
