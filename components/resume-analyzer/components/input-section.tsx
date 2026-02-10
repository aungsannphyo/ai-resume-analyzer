import ErrorBanner from "../../shared/error-banner";
import JDInput from "./input-section/jd-input";
import ResumeUpload from "./input-section/resume-upload";
import AnalysisProgress from "./input-section/analysis-progress";
import AnalyzeButton from "./input-section/analyze-button";
import DomainSelector from "./input-section/domain-selector";
import { AnalysisDomain, AnalysisStep } from "@/types/analysis";
import { memo } from "react";

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

const InputSection = memo(
  ({
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
      <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-white/20 mb-8">
        <div className="mb-10">
          <h2 className="text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
            Job Description & Resume
          </h2>
          <p className="text-slate-600 font-medium text-lg">
            Enter the job description and upload the candidate&apos;s resume
            <span className="text-slate-400 text-sm ml-2">(PDF only)</span>
          </p>
        </div>

        {error && <ErrorBanner message={error} className="mb-6" />}

        <DomainSelector selectedDomain={domain} onSelect={setDomain} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
  },
);

InputSection.displayName = "InputSection";

export default InputSection;
