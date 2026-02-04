"use client";

import Navigation from "@/components/shared/nav/navigation";
import InputSection from "@/components/job-description-generator/components/input-section";
import ResultsSection from "@/components/job-description-generator/components/results-section";
import Footer from "@/components/job-description-generator/components/footer";
import LoadingSkeleton from "@/components/job-description-generator/components/loading-skeleton";
import { useJobDescriptionStore } from "@/store/useJobDescriptionStore";
import { useGenerateJobDescription } from "@/hooks/useGenerateJobDescription";
import { useJobDescriptionPdfExport } from "@/hooks/useJobDescriptionPdfExport";
import { useJobDescriptionValidation } from "@/hooks/useJobDescriptionValidation";
import { memo, useCallback } from "react";

const JobDescGeneratorClient = memo(() => {
  const {
    input,
    generatedDescription,
    showResults,
    error,
    updateInput,
    updateListField,
    updateTechStack,
    setError,
    reset,
  } = useJobDescriptionStore();

  const { mutate: generate, isPending: isGenerating } =
    useGenerateJobDescription();

  const { exportToPdf, isExporting } = useJobDescriptionPdfExport();
  const { validateInput } = useJobDescriptionValidation();

  const handleGenerate = useCallback(() => {
    const validation = validateInput(input);

    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    setError(null);
    generate(input);
  }, [generate, input, setError, validateInput]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleCopy = useCallback(async () => {
    if (!generatedDescription) return;
    try {
      await navigator.clipboard.writeText(generatedDescription);
      setError(null);
    } catch (copyError) {
      setError("Failed to copy. Please try again.");
    }
  }, [generatedDescription, setError]);

  const handleExport = useCallback(async () => {
    if (!generatedDescription) return;
    try {
      setError(null);
      await exportToPdf(generatedDescription);
    } catch (exportError) {
      setError("Failed to generate PDF. Please try again.");
    }
  }, [generatedDescription, setError, exportToPdf]);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Navigation />

      <main className="min-h-[60vh]">
        {!showResults && (
          <InputSection
            input={input}
            error={error}
            onUpdate={updateInput}
            onUpdateList={updateListField}
            onUpdateTechStack={updateTechStack}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        )}

        {showResults && generatedDescription && (
          <ResultsSection
            jobDescription={generatedDescription}
            onCopy={handleCopy}
            onReset={handleReset}
            onExport={handleExport}
            isExporting={isExporting}
          />
        )}
      </main>

      <Footer />
    </div>
  );
});

JobDescGeneratorClient.displayName = "JobDescGeneratorClient";

export default JobDescGeneratorClient;
