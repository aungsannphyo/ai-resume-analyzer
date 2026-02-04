import { useState } from "react";

export const useJobDescriptionPdfExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (jobDescription: string) => {
    setIsExporting(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const JobDescriptionReport = (
        await import("@/components/pdf/job-description-report")
      ).default;

      const blob = await pdf(
        <JobDescriptionReport data={{ jobDescription }} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Job_Description_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Export Error:", error);
      throw new Error("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPdf, isExporting };
};
