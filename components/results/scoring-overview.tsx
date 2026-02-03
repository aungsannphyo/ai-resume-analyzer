import { TrendingUp } from "lucide-react";
import ScoreCard from "./score-card";
import { getScoreRating } from "@/utils/grading";

interface ScoringOverviewProps {
  overallScore: number;
  detailedScores: {
    category: string;
    score: number;
  }[];
}

const ScoringOverview = ({
  overallScore,
  detailedScores,
}: ScoringOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Overall Score */}
      <div className="lg:col-span-1">
        <ScoreCard score={overallScore} rating={getScoreRating(overallScore)} />
      </div>

      {/* Detailed Scores Grid */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {detailedScores.map((ds, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
              {ds.category}
            </span>
            <div className="text-4xl font-black text-slate-900 mb-1">
              {ds.score}
              <span className="text-sm text-slate-400 font-normal">/10</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#5cbe4c] h-full rounded-full transition-all duration-1000"
                style={{ width: `${ds.score * 10}%` }}
              />
            </div>
          </div>
        ))}
        <div className="bg-linear-to-br from-[#5cbe4c] to-emerald-600 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-md text-white sm:col-span-3 lg:col-span-3">
          <TrendingUp className="w-6 h-6 mb-2 opacity-80" />
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
            Potential Growth
          </span>
          <p className="text-sm font-medium">
            High potential for rapid onboarding and leadership growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoringOverview;
