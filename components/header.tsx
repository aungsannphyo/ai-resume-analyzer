import { FileSearch } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 mb-8 shadow-sm border border-slate-200/50">
      <div className="flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="animate-float p-2 bg-[#5cbe4c]/10 rounded-xl">
            <FileSearch className="w-8 h-8 text-[#5cbe4c]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#5cbe4c]">
              AI Resume Analyzer
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Powered by GLM-4.6
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
