export enum AnalysisDomain {
  TECHNOLOGY = "Technology",
  HR = "HR",
  RISK_AND_COMPLIANCE = "Risk and Compliance",
  FINANCE_AND_ACCOUNTING = "Accounting and Finance",
}

export enum AnalysisStep {
  IDLE = "idle",
  EXTRACTING = "extracting",
  ANALYZING = "analyzing",
  COMPLETED = "completed",
}

export enum CompetencyRating {
  NOVICE = "Novice",
  INTERMEDIATE = "Intermediate",
  PROFICIENT = "Proficient",
  EXPERT = "Expert",
}

export interface AnalysisRequest {
  resumeText: string;
  keywords?: string;
}

export interface Competency {
  name: string;
  rating: CompetencyRating;
  evidence: string;
}

export interface AnalysisResult {
  candidateName: string;
  designation: string;
  overallScore: number;
  assessment: string;
  competencies: Competency[];
  strengths: string[];
  gaps: string[];
  redFlags: string[];
  decision: {
    status: "Proceed" | "Consider" | "Reject";
    reasoning: string;
  };
  detailedScores: {
    category: string;
    score: number; // 1-10 as requested
  }[];
  interviewFocus: {
    technical: string[];
    behavioral: string[];
    tasks: string[];
  };
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
