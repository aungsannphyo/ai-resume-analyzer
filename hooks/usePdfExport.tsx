import { useState } from "react";
import type { AnalysisResult } from "@/types/analysis";

export const usePdfExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (data: AnalysisResult) => {
    setIsExporting(true);
    try {
      // Dynamically import to ensure client-side execution and reduced bundle size
      const { pdf } = await import("@react-pdf/renderer");
      const { AnalysisReportPDF } = await import(
        "@/components/pdf/analysis-report"
      );

      // Generate the PDF as a blob
      const blob = await pdf(<AnalysisReportPDF data={data} />).toBlob();

      // Create a temporary link to trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `PM_Resume_Analysis_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
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
