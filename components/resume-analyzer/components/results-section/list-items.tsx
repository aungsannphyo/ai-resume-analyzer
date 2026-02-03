import { LucideIcon } from "lucide-react";

interface ListItemsProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  variant: "strength" | "gap" | "red-flag";
}

const ListItems = ({ title, icon: Icon, items, variant }: ListItemsProps) => {
  const getColors = () => {
    switch (variant) {
      case "strength":
        return {
          border: "border-emerald-500",
          bg: "bg-emerald-50",
          text: "text-emerald-900",
          icon: "text-emerald-500",
        };
      case "gap":
        return {
          border: "border-amber-500",
          bg: "bg-amber-50",
          text: "text-amber-900",
          icon: "text-amber-500",
        };
      case "red-flag":
        return {
          border: "border-red-500",
          bg: "bg-red-50",
          text: "text-red-900",
          icon: "text-red-500",
        };
      default:
        return {
          border: "border-slate-500",
          bg: "bg-slate-50",
          text: "text-slate-900",
          icon: "text-slate-500",
        };
    }
  };

  const colors = getColors();

  return (
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/50 animate-slide-in">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
        <Icon className={`w-8 h-8 ${colors.icon}`} />
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`p-4 ${colors.bg} border-l-4 ${colors.border} rounded-lg ${colors.text} font-medium`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
