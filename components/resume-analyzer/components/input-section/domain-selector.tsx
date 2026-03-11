import { LayoutGrid } from "lucide-react";
import { AnalysisDomain } from "@/types/analysis";
import { domainUiList } from "@/lib/domain-ui";
import { useMobile } from "@/hooks/useMobile";

interface DomainSelectorProps {
  selectedDomain: AnalysisDomain;
  onSelect: (domain: AnalysisDomain) => void;
}

const domains = domainUiList;

const DomainSelector = ({ selectedDomain, onSelect }: DomainSelectorProps) => {
  const isMobile = useMobile(768);

  if (isMobile) {
    return (
      <div className="mb-8">
        <label className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-900">
          <LayoutGrid className="w-5 h-5 text-[#5cbe4c]" />
          Target Domain
        </label>

        <div className="relative group">
          <select
            value={selectedDomain}
            onChange={(e) => onSelect(e.target.value as AnalysisDomain)}
            className="w-full appearance-none bg-white border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-700 font-bold focus:border-[#5cbe4c] focus:ring-4 focus:ring-[#5cbe4c]/10 transition-all outline-none cursor-pointer shadow-sm"
          >
            {domains.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-[#5cbe4c]" />
            Target Domain
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 font-medium">
            Select specialized analysis domain
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = selectedDomain === domain.id;

          return (
            <button
              key={domain.id}
              onClick={() => onSelect(domain.id)}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isActive
                  ? `${domain.active} ring-4 shadow-sm`
                  : `border-slate-100 bg-white shadow-sm ${domain.border} hover:shadow-md hover:-translate-y-0.5`
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${domain.bg} ${domain.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`block font-bold text-sm transition-colors whitespace-nowrap ${isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"}`}
              >
                {domain.label}
              </span>

              {isActive && (
                <div className="animate-in fade-in zoom-in duration-300 ml-1">
                  <div className="bg-[#5cbe4c] rounded-full p-0.5 shadow-sm">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DomainSelector;
