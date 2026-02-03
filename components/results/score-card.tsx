interface ScoreCardProps {
  score: number;
  rating: string;
}

const ScoreCard = ({ score, rating }: ScoreCardProps) => {
  const circumference = 471; // 2 * PI * 75
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#5cbe4c]/5 border-2 border-[#5cbe4c]/20 rounded-3xl p-8 mb-8 text-center shadow-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="text-xl font-semibold text-slate-500 uppercase tracking-widest">
          Overall PM Score
        </div>
        <div className="relative w-44 h-44">
          <svg className="transform -rotate-90 w-44 h-44">
            <circle
              className="stroke-slate-100"
              cx="88"
              cy="88"
              r="75"
              strokeWidth="12"
              fill="none"
            />
            <circle
              className="stroke-[#5cbe4c] transition-all duration-2000 ease-in-out"
              cx="88"
              cy="88"
              r="75"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-extrabold text-[#5cbe4c]">
              {score}
            </span>
          </div>
        </div>
        <div className="text-2xl font-semibold text-slate-900">{rating}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
