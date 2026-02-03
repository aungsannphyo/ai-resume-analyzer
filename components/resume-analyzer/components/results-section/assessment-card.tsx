import { BarChart3 } from "lucide-react";

interface AssessmentCardProps {
  assessment: string;
}

const AssessmentCard = ({ assessment }: AssessmentCardProps) => {
  return (
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/50 animate-slide-in">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-4">
        <BarChart3 className="w-8 h-8 text-[#5cbe4c]" />
        Recruiter&apos;s Strategic Assessment
      </h3>
      <p className="text-slate-700 leading-relaxed font-medium">{assessment}</p>
    </div>
  );
};

export default AssessmentCard;
