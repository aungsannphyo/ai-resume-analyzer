"use client";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPDF = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = "";

  onProgress?.(0);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => {
        if ("str" in item) {
          return (item as { str: string }).str;
        }
        return "";
      })
      .join(" ");
    fullText += pageText + "\n";

    const progress = Math.round((i / pdf.numPages) * 100);
    onProgress?.(progress);
  }

  return fullText;
};
