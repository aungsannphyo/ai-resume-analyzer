"use client";

import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useAnalyzeResume } from "@/hooks/useAnalyzeResume";
import Navigation from "@/components/shared/nav/navigation";
import InputSection from "@/components/resume-analyzer/components/input-section";
import ResultsSection from "@/components/resume-analyzer/components/results-section";
import Footer from "@/components/resume-analyzer/components/footer";
import { usePdfExport } from "@/hooks/useAnalyzeResumePdfExport";
import { memo, useCallback } from "react";

const ResumeAnalyzerClient = memo(() => {
  const {
    jdText,
    setJdText,
    resumeFile,
    setResumeFile,
    showResults,
    analysisResult,
    error,
    exportError,
    analysisStep,
    extractionProgress,
    domain,
    setDomain,
    setError,
    setExportError,
    resetAnalysis,
  } = useAnalysisStore();

  const { mutate: analyze, isPending: isAnalyzing } = useAnalyzeResume();
  const { exportToPdf, isExporting } = usePdfExport();

  const handleAnalyze = useCallback(() => {
    if (!jdText.trim()) {
      setError("Please enter a job description.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload a resume PDF.");
      return;
    }
    setError(null);
    setExportError(null);
    analyze({ jdText, resumeFile, domain });
  }, [jdText, resumeFile, domain, setError, setExportError, analyze]);

  const handleExport = useCallback(async () => {
    if (!analysisResult) return;
    try {
      setExportError(null);
      await exportToPdf(analysisResult);
    } catch (error) {
      setExportError("Failed to generate PDF report. Please try again.");
    }
  }, [analysisResult, setExportError, exportToPdf]);

  const handleNewAnalysis = useCallback(() => {
    setExportError(null);
    resetAnalysis();
  }, [setExportError, resetAnalysis]);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        <Navigation />

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
              extractionProgress={extractionProgress}
              error={error}
              onAnalyze={handleAnalyze}
            />
          )}

          {showResults && analysisResult && (
            <ResultsSection
              analysisResult={analysisResult}
              onExport={handleExport}
              onNewAnalysis={handleNewAnalysis}
              isExporting={isExporting}
              exportError={exportError}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
});

ResumeAnalyzerClient.displayName = "ResumeAnalyzerClient";

export default ResumeAnalyzerClient;
