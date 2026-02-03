import {
  Target,
  ClipboardCheck,
  MessageSquare,
  LucideIcon,
} from "lucide-react";

interface InterviewGuideProps {
  technical: string[];
  behavioral: string[];
  tasks: string[];
}

const InterviewGuide = ({
  technical,
  behavioral,
  tasks,
}: InterviewGuideProps) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl animate-slide-in relative overflow-hidden mt-6">
      <div className="absolute right-0 top-0 w-64 h-64 bg-[#5cbe4c]/10 rounded-full blur-3xl -mr-32 -mt-32" />

      <h3 className="flex items-center gap-3 text-2xl font-bold mb-8 relative">
        <Target className="w-8 h-8 text-[#5cbe4c]" />
        Interview Strategic Focus
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <FocusSection
          title="Technical Topics"
          icon={ClipboardCheck}
          items={technical}
        />
        <FocusSection
          title="Behavioral Aspects"
          icon={MessageSquare}
          items={behavioral}
        />
        <FocusSection
          title="Practical Case Tasks"
          icon={Target}
          items={tasks}
        />
      </div>
    </div>
  );
};

interface FocusSectionProps {
  title: string;
  icon: LucideIcon;
  items: string[];
}

const FocusSection = ({ title, icon: Icon, items }: FocusSectionProps) => (
  <div>
    <h4 className="flex items-center gap-2 text-[#5cbe4c] font-bold mb-4 uppercase text-xs tracking-widest">
      <Icon className="w-4 h-4" />
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-slate-300 text-sm flex gap-2">
          <span className="text-[#5cbe4c] font-bold">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default InterviewGuide;
