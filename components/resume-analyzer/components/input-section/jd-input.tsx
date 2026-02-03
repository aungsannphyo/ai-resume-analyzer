import { FileText } from "lucide-react";

interface JDInputProps {
  jdText: string;
  setJdText: (value: string) => void;
}

const JDInput = ({ jdText, setJdText }: JDInputProps) => {
  return (
    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/50 hover:border-[#5cbe4c]/30 transition-all duration-300">
      <label
        htmlFor="jdText"
        className="flex items-center gap-2 font-semibold text-slate-900 mb-4"
      >
        <FileText className="w-5 h-5 text-[#5cbe4c]" />
        Job Description (JD)
      </label>
      <textarea
        id="jdText"
        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 leading-relaxed focus:outline-none focus:border-[#5cbe4c] focus:ring-4 focus:ring-[#5cbe4c]/10 transition-all resize-y min-h-[150px]"
        placeholder="Paste the job description here...&#10;&#10;Include required skills, responsibilities, and qualifications."
        rows={8}
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-slate-500">
          {jdText.length.toLocaleString()} characters
        </span>
        <button
          type="button"
          className="px-4 cursor-pointer py-2 bg-transparent border border-slate-200 rounded-lg text-slate-500 text-sm hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-600 transition-all font-medium"
          onClick={() => setJdText("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default JDInput;
