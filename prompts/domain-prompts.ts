import { AnalysisDomain } from "@/types/analysis";
import { techPrompt } from "./domains/tech";
import { hrPrompt } from "./domains/hr";
import { riskPrompt } from "./domains/risk";
import { financePrompt } from "./domains/finance";
import type { DomainPromptData } from "./domains/types";

const domainPrompts: Record<AnalysisDomain, DomainPromptData> = {
  [AnalysisDomain.TECHNOLOGY]: techPrompt,
  [AnalysisDomain.HR]: hrPrompt,
  [AnalysisDomain.RISK_AND_COMPLIANCE]: riskPrompt,
  [AnalysisDomain.FINANCE_AND_ACCOUNTING]: financePrompt,
};

export const getDomainPrompt = (domain: AnalysisDomain): DomainPromptData => {
  return domainPrompts[domain] || domainPrompts[AnalysisDomain.TECHNOLOGY];
};
