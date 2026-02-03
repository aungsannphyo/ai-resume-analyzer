"use client";

import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useAnalyzeResume } from "@/hooks/useAnalyzeResume";
import Header from "@/components/header";
import InputSection from "@/components/input-section";
import ResultsSection from "@/components/results-section";
import Footer from "@/components/footer";
import { usePdfExport } from "@/hooks/usePdfExport";

export default function ResumeAnalyzer() {
  const {
    jdText,
    setJdText,
    resumeFile,
    setResumeFile,
    showResults,
    analysisResult,
    error,
    analysisStep,
    domain,
    setDomain,
    resetAnalysis,
  } = useAnalysisStore();

  const { mutate: analyze, isPending: isAnalyzing } = useAnalyzeResume();
  const { exportToPdf, isExporting } = usePdfExport();

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      alert("Please enter a job description.");
      return;
    }
    if (!resumeFile) {
      alert("Please upload a resume PDF.");
      return;
    }
    analyze({ jdText, resumeFile, domain });
  };

  const handleExport = async () => {
    if (!analysisResult) return;
    try {
      await exportToPdf(analysisResult);
    } catch (error) {
      alert("Failed to generate PDF report. Please try again.");
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Header />

      <main className="min-h-[60vh]">
        {!showResults && (
          <InputSection
            jdText={jdText}
            setJdText={setJdText}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            domain={domain}
            setDomain={setDomain}
            isAnalyzing={isAnalyzing}
            analysisStep={analysisStep}
            error={error}
            onAnalyze={handleAnalyze}
          />
        )}

        {showResults && analysisResult && (
          <ResultsSection
            analysisResult={analysisResult}
            onExport={handleExport}
            onNewAnalysis={resetAnalysis}
            isExporting={isExporting}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
