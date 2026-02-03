import { AnalysisDomain } from "@/types/analysis";
import { domainList } from "@/lib/domain-registry";
import {
  BadgeDollarSign,
  Laptop,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface DomainUiEntry {
  id: AnalysisDomain;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  active: string;
}

type DomainUiConfig = Omit<DomainUiEntry, "id" | "label" | "description">;

const domainUi: Record<AnalysisDomain, DomainUiConfig> = {
  [AnalysisDomain.TECHNOLOGY]: {
    icon: Laptop,
    color: "text-blue-600",
    bg: "bg-blue-100/50",
    border: "hover:border-blue-500/50",
    active: "border-blue-500 bg-blue-50/50 ring-blue-500/10",
  },
  [AnalysisDomain.FINANCE_AND_ACCOUNTING]: {
    icon: BadgeDollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-100/50",
    border: "hover:border-emerald-500/50",
    active: "border-emerald-500 bg-emerald-50/50 ring-emerald-500/10",
  },
  [AnalysisDomain.HR]: {
    icon: Users,
    color: "text-pink-600",
    bg: "bg-pink-100/50",
    border: "hover:border-pink-500/50",
    active: "border-pink-500 bg-pink-50/50 ring-pink-500/10",
  },
  [AnalysisDomain.RISK_AND_COMPLIANCE]: {
    icon: ShieldAlert,
    color: "text-orange-600",
    bg: "bg-orange-100/50",
    border: "hover:border-orange-500/50",
    active: "border-orange-500 bg-orange-50/50 ring-orange-500/10",
  },
};

export const domainUiList: DomainUiEntry[] = domainList.map((domain) => ({
  ...domain,
  ...domainUi[domain.id],
}));
