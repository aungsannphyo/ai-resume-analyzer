import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface DecisionCardProps {
  status: "Proceed" | "Consider" | "Reject";
  reasoning: string;
}

const DecisionCard = ({ status, reasoning }: DecisionCardProps) => {
  const getColors = () => {
    switch (status) {
      case "Proceed":
        return "bg-emerald-50 border-emerald-200 bg-emerald-100 text-emerald-600";
      case "Consider":
        return "bg-amber-50 border-amber-200 bg-amber-100 text-amber-600";
      case "Reject":
        return "bg-red-50 border-red-200 bg-red-100 text-red-600";
      default:
        return "bg-slate-50 border-slate-200 bg-slate-100 text-slate-600";
    }
  };

  const colors = getColors().split(" ");
  const cardBg = colors[0];
  const cardBorder = colors[1];
  const iconBg = colors[2];
  const iconColor = colors[3];

  return (
    <div
      className={`mb-8 p-6 rounded-3xl border-2 flex flex-col md:flex-row items-center gap-6 animate-slide-in ${cardBg} ${cardBorder}`}
    >
      <div
        className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor}`}
      >
        {status === "Proceed" ? (
          <CheckCircle2 className="w-10 h-10" />
        ) : status === "Consider" ? (
          <AlertTriangle className="w-10 h-10" />
        ) : (
          <XCircle className="w-10 h-10" />
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          Recruiter&apos;s Decision
        </h3>
        <p className="text-slate-700 font-medium">{reasoning}</p>
      </div>
    </div>
  );
};

export default DecisionCard;
