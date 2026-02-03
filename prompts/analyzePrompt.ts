import { techPrompt } from "./domains/tech";
import { hrPrompt } from "./domains/hr";
import { riskPrompt } from "./domains/risk";
import { financePrompt } from "./domains/finance";
import { DomainPromptData } from "./domains/types";

import { AnalysisDomain } from "@/types/analysis";
import { getAnalysisSchema } from "./schema/analyzeSchema";

export const domainPrompts: Record<string, DomainPromptData> = {
  [AnalysisDomain.TECHNOLOGY]: techPrompt,
  [AnalysisDomain.HR]: hrPrompt,
  [AnalysisDomain.RISK_AND_COMPLIANCE]: riskPrompt,
  [AnalysisDomain.FINANCE_AND_ACCOUNTING]: financePrompt,
};

export const getAnalyzePrompt = (
  jdText: string,
  resumeText: string,
  domain: AnalysisDomain = AnalysisDomain.TECHNOLOGY,
): string => {
  const selectedData = domainPrompts[domain] || techPrompt;
  const jsonSchema = getAnalysisSchema(
    domain,
    selectedData.competencies,
    selectedData.scoreCategories,
  );

  return `You are the ${selectedData.title}. Your mission is to critically evaluate this candidate's potential for a high-impact role within your organization. 
Go beyond basic keywords; look for strategic thinking, leadership maturity, and long-term value alignment in the context of the ${domain} domain.

Analyze the following resume against the provided Job Description (JD).

Job Description (JD):
${jdText}

Candidate Resume:
${resumeText}

Please provide your high-level executive analysis in the following JSON format (respond ONLY with valid JSON, no additional text):
${jsonSchema}`;
};
