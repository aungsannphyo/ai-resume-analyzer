import ErrorBanner from "../../error-banner";
import JDInput from "./input-section/jd-input";
import ResumeUpload from "./input-section/resume-upload";
import AnalysisProgress from "./input-section/analysis-progress";
import AnalyzeButton from "./input-section/analyze-button";
import DomainSelector from "./input-section/domain-selector";
import { AnalysisDomain, AnalysisStep } from "@/types/analysis";

interface InputSectionProps {
  jdText: string;
  setJdText: (value: string) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  domain: AnalysisDomain;
  setDomain: (domain: AnalysisDomain) => void;
  isAnalyzing: boolean;
  analysisStep: AnalysisStep;
  extractionProgress: number;
  error: string | null;
  onAnalyze: () => void;
}

const InputSection = ({
  jdText,
  setJdText,
  resumeFile,
  setResumeFile,
  domain,
  setDomain,
  isAnalyzing,
  analysisStep,
  extractionProgress,
  error,
  onAnalyze,
}: InputSectionProps) => {
  return (
    <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 mb-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Job Description & Resume
        </h2>
        <p className="text-slate-500 font-medium">
          Enter the job description and upload the candidate&apos;s resume (PDF
          only)
        </p>
      </div>

      {error && <ErrorBanner message={error} className="mb-6" />}

      <DomainSelector selectedDomain={domain} onSelect={setDomain} />

      <div className="grid grid-cols-1 gap-6 mb-8">
        <JDInput jdText={jdText} setJdText={setJdText} />
        <ResumeUpload resumeFile={resumeFile} setResumeFile={setResumeFile} />
      </div>

      {isAnalyzing && (
        <AnalysisProgress
          analysisStep={analysisStep}
          extractionProgress={extractionProgress}
        />
      )}

      <AnalyzeButton
        isAnalyzing={isAnalyzing}
        analysisStep={analysisStep}
        onClick={onAnalyze}
      />
    </section>
  );
};

export default InputSection;
