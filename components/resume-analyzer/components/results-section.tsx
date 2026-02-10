import type { AnalysisResult } from "@/types/analysis";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { memo } from "react";
import ErrorBanner from "../../shared/error-banner";

// Sub-components
import ActionBar from "./results-section/action-bar";
import CandidateHeader from "./results-section/candidate-header";
import DecisionCard from "./results-section/decision-card";
import ScoringOverview from "./results-section/scoring-overview";
import AssessmentCard from "./results-section/assessment-card";
import CompetencyList from "./results-section/competency-list";
import ListItems from "./results-section/list-items";
import InterviewGuide from "./results-section/interview-guide";

interface ResultsSectionProps {
  analysisResult: AnalysisResult;
  onExport: () => void;
  onNewAnalysis: () => void;
  isExporting: boolean;
  exportError?: string | null;
}

const ResultsSection = memo(
  ({
    analysisResult,
    onExport,
    onNewAnalysis,
    isExporting,
    exportError,
  }: ResultsSectionProps) => {
    return (
      <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-white/20 mb-8">
        {exportError && <ErrorBanner message={exportError} className="mb-6" />}

        {/* Top Actions */}
        <ActionBar
          onExport={onExport}
          onNewAnalysis={onNewAnalysis}
          isExporting={isExporting}
        />

        {/* Profile & Decision Info */}
        <CandidateHeader
          name={analysisResult.candidateName}
          designation={analysisResult.designation}
        />

        <DecisionCard
          status={analysisResult.decision.status}
          reasoning={analysisResult.decision.reasoning}
        />

        {/* Scores & Visualization */}
        <ScoringOverview
          overallScore={analysisResult.overallScore}
          detailedScores={analysisResult.detailedScores}
        />

        {/* Qualitative Analysis */}
        <div className="space-y-6">
          <AssessmentCard assessment={analysisResult.assessment} />

          <CompetencyList competencies={analysisResult.competencies} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListItems
              title="Key Strengths"
              icon={CheckCircle2}
              items={analysisResult.strengths}
              variant="strength"
            />

            {analysisResult.redFlags && analysisResult.redFlags.length > 0 && (
              <ListItems
                title="Red Flags"
                icon={ShieldAlert}
                items={analysisResult.redFlags}
                variant="red-flag"
              />
            )}
          </div>

          {/* Gaps/Questions can still use ListItems if needed, currently gaps is empty or used for strengths/flags */}
          {analysisResult.gaps && analysisResult.gaps.length > 0 && (
            <ListItems
              title="Potential Gaps"
              icon={ShieldAlert}
              items={analysisResult.gaps}
              variant="gap"
            />
          )}

          {/* Interview Strategic Focus */}
          <InterviewGuide {...analysisResult.interviewFocus} />
        </div>
      </section>
    );
  },
);

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;
