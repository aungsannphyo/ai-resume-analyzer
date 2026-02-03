import { User, Briefcase, BadgeCheck, MapPin } from "lucide-react";

interface CandidateHeaderProps {
  name: string;
  designation: string;
}

const CandidateHeader = ({ name, designation }: CandidateHeaderProps) => {
  return (
    <div className="relative overflow-hidden mb-8 p-6 sm:p-10 bg-white/40 backdrop-blur-md rounded-4xl md:rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] animate-slide-in hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.1)] transition-all duration-500">
      {/* Premium Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-[#5cbe4c]/10 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-blue-500/5 to-transparent rounded-full blur-2xl -ml-24 -mb-24" />

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#5cbe4c 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-10">
        {/* Avatar Container with enhanced depth */}
        <div className="relative shrink-0 group">
          <div className="absolute -inset-2 bg-linear-to-tr from-[#5cbe4c]/30 to-emerald-400/30 rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

          <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl p-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="absolute inset-0 bg-linear-to-br from-[#5cbe4c]/10 via-white to-transparent" />

            <div className="relative w-full h-full bg-slate-50 flex items-center justify-center rounded-2xl border border-slate-100/50">
              <User className="w-14 h-14 sm:w-16 sm:h-16 text-[#5cbe4c]/80" />
            </div>
          </div>

          <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
            <BadgeCheck className="w-6 h-6 text-[#5cbe4c] fill-[#5cbe4c]/10" />
          </div>
        </div>

        {/* Info Container with refined typography */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5cbe4c]/10 text-[#5cbe4c] rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-4 border border-[#5cbe4c]/20 shadow-sm backdrop-blur-sm">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified AI Analysis
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight leading-tight">
            {name}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 mt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
              <span className="text-sm sm:text-base font-semibold text-slate-700">
                {designation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateHeader;
