import { AnalysisDomain } from "@/types/analysis";

export interface DomainMeta {
  id: AnalysisDomain;
  label: string;
  description: string;
}

const domainRegistry: Record<AnalysisDomain, DomainMeta> = {
  [AnalysisDomain.TECHNOLOGY]: {
    id: AnalysisDomain.TECHNOLOGY,
    label: "Technology",
    description: "Software, Projects & Delivery",
  },
  [AnalysisDomain.FINANCE_AND_ACCOUNTING]: {
    id: AnalysisDomain.FINANCE_AND_ACCOUNTING,
    label: "Finance",
    description: "Accounting, FP&A & Treasury",
  },
  [AnalysisDomain.HR]: {
    id: AnalysisDomain.HR,
    label: "Human Resources",
    description: "Talent, Policies & ER",
  },
  [AnalysisDomain.RISK_AND_COMPLIANCE]: {
    id: AnalysisDomain.RISK_AND_COMPLIANCE,
    label: "Risk & Compliance",
    description: "ERM, AML & Data Privacy",
  },
};

export const domainOrder: AnalysisDomain[] = [
  AnalysisDomain.TECHNOLOGY,
  AnalysisDomain.FINANCE_AND_ACCOUNTING,
  AnalysisDomain.HR,
  AnalysisDomain.RISK_AND_COMPLIANCE,
];

export const domainList = domainOrder.map((id) => domainRegistry[id]);

export const isAnalysisDomain = (
  value: unknown,
): value is AnalysisDomain => {
  return (
    typeof value === "string" &&
    domainOrder.includes(value as AnalysisDomain)
  );
};

export const normalizeDomain = (
  value: unknown,
  fallback: AnalysisDomain = AnalysisDomain.TECHNOLOGY,
): AnalysisDomain => {
  return isAnalysisDomain(value) ? value : fallback;
};
