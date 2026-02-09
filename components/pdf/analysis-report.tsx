import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { AnalysisResult, CompetencyRating, Competency } from "@/types/analysis";

/**
 * PDF Styling System
 */
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#1e293b",
  },
  // Primitive Components
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#5cbe4c",
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#334155",
  },
  // Layout Helpers
  row: {
    flexDirection: "row",
    gap: 15,
  },
  col: {
    flex: 1,
  },
  // Specific Elements
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#5cbe4c",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  brandName: {
    fontSize: 9,
    fontWeight: 700,
    color: "#5cbe4c",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  candidateName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  designation: {
    fontSize: 13,
    color: "#64748b",
  },
  dateStamp: {
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "right",
  },
  scoreTile: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  scoreValueLarge: {
    fontSize: 28,
    fontWeight: 800,
    color: "#5cbe4c",
  },
  scoreLabelSmall: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: 600,
    marginTop: 2,
  },
  decisionTile: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  decisionStatus: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 5,
    paddingRight: 10,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: "#5cbe4c",
    borderRadius: 1.5,
    marginTop: 4,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 8.5,
    color: "#334155",
    lineHeight: 1.3,
  },
  competencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  competencyBox: {
    width: "48.5%",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7.5,
    color: "#94a3b8",
  },
});

/**
 * Utility Functions
 */
const getRatingColor = (rating: CompetencyRating) => {
  switch (rating) {
    case CompetencyRating.EXPERT:
      return "#047857";
    case CompetencyRating.PROFICIENT:
      return "#0369a1";
    case CompetencyRating.INTERMEDIATE:
      return "#b45309";
    case CompetencyRating.NOVICE:
      return "#b91c1c";
    default:
      return "#64748b";
  }
};

const getDecisionStyles = (status: string) => {
  switch (status) {
    case "Proceed":
      return { bg: "#f0fdf4", border: "#bcf0da", text: "#166534" };
    case "Consider":
      return { bg: "#fffbeb", border: "#fde68a", text: "#92400e" };
    case "Reject":
      return { bg: "#fef2f2", border: "#fecaca", text: "#991b1b" };
    default:
      return { bg: "#f8fafc", border: "#e2e8f0", text: "#475569" };
  }
};

/**
 * Reusable PDF Components
 */
interface SectionProps {
  title: string;
  children: React.ReactNode;
  style?: React.ComponentProps<typeof View>["style"];
  titleColor?: string;
}

const Section = ({ title, children, style, titleColor }: SectionProps) => (
  <View
    style={
      [styles.section, style] as React.ComponentProps<typeof View>["style"]
    }
  >
    <View
      style={[
        styles.sectionHeader,
        titleColor ? { borderLeftColor: titleColor } : {},
      ]}
    >
      <Text
        style={[styles.sectionTitle, titleColor ? { color: titleColor } : {}]}
      >
        {title}
      </Text>
    </View>
    {children}
  </View>
);

const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.ComponentProps<typeof View>["style"];
}) => (
  <View
    style={[styles.card, style] as React.ComponentProps<typeof View>["style"]}
  >
    {children}
  </View>
);

const BulletPoint = ({
  text,
  color = "#5cbe4c",
  fontSize = 8.5,
}: {
  text: string;
  color?: string;
  fontSize?: number;
}) => (
  <View style={styles.bulletPoint}>
    <View style={[styles.bullet, { backgroundColor: color }]} />
    <Text style={[styles.bulletText, { fontSize }]}>{text}</Text>
  </View>
);

/**
 * Page Fragments
 */

const ReportHeader = ({
  name,
  designation,
}: {
  name: string;
  designation: string;
}) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.brandName}>Impact Analysis</Text>
      <Text style={styles.candidateName}>{name}</Text>
      <Text style={styles.designation}>{designation}</Text>
    </View>
    <View>
      <Text style={styles.dateStamp}>Generated on</Text>
      <Text style={[styles.dateStamp, { color: "#475569", fontSize: 9 }]}>
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    </View>
  </View>
);

const IntelligenceGrid = ({
  score,
  decision,
}: {
  score: number;
  decision: { status: string };
}) => {
  const dStyles = getDecisionStyles(decision.status);
  return (
    <View style={[styles.row, { marginBottom: 20 }]}>
      <View style={styles.scoreTile}>
        <Text style={styles.scoreValueLarge}>{score}</Text>
        <Text style={styles.scoreLabelSmall}>Overall Fit Score</Text>
      </View>
      <View
        style={[
          styles.decisionTile,
          { backgroundColor: dStyles.bg, borderColor: dStyles.border },
        ]}
      >
        <Text style={[styles.decisionStatus, { color: dStyles.text }]}>
          {decision.status}
        </Text>
        <Text
          style={[
            styles.scoreLabelSmall,
            { color: dStyles.text, opacity: 0.7 },
          ]}
        >
          Final Recommendation
        </Text>
      </View>
    </View>
  );
};

const CompetencyItem = ({ comp }: { comp: Competency }) => (
  <View style={styles.competencyBox}>
    <Text
      style={{
        fontSize: 9,
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: 2,
      }}
    >
      {comp.name}
    </Text>
    <Text
      style={{
        fontSize: 7.5,
        fontWeight: 700,
        color: getRatingColor(comp.rating),
        marginBottom: 4,
        textTransform: "uppercase",
      }}
    >
      {comp.rating}
    </Text>
    <Text style={[styles.bulletText, { fontSize: 8 }]}>{comp.evidence}</Text>
  </View>
);

const StrategicFocusCard = ({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) => (
  <Card style={{ flex: 1, backgroundColor: "#ffffff" }}>
    <Text
      style={{ fontSize: 9.5, fontWeight: 700, color: color, marginBottom: 6 }}
    >
      {title}
    </Text>
    {items.map((item, i) => (
      <BulletPoint key={i} text={item} color={color} fontSize={7.5} />
    ))}
  </Card>
);

/**
 * Main Report Component
 */
export const AnalysisReportPDF = ({ data }: { data: AnalysisResult }) => {
  const dStyles = getDecisionStyles(data.decision.status);

  return (
    <Document title={`${data.candidateName} - Analysis Report`}>
      <Page size="A4" style={styles.page}>
        <ReportHeader
          name={data.candidateName}
          designation={data.designation}
        />

        <IntelligenceGrid score={data.overallScore} decision={data.decision} />

        <Section title="Executive Assessment">
          <Card>
            <Text style={styles.bodyText}>{data.assessment}</Text>
          </Card>
        </Section>

        <View style={[styles.row, { marginBottom: 20 }]}>
          <View style={{ flex: 1.2 }}>
            <Section title="Detailed Scoring" style={{ marginBottom: 0 }}>
              <Card>
                {data.detailedScores.map((score, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                      borderBottomWidth:
                        i === data.detailedScores.length - 1 ? 0 : 1,
                      borderBottomColor: "#f1f5f9",
                    }}
                  >
                    <Text style={{ fontSize: 9, color: "#475569" }}>
                      {score.category}
                    </Text>
                    <Text
                      style={{ fontSize: 9, fontWeight: 700, color: "#0f172a" }}
                    >
                      {score.score}/10
                    </Text>
                  </View>
                ))}
              </Card>
            </Section>
          </View>

          <View style={{ flex: 1 }}>
            <Section
              title="Key Strengths"
              titleColor="#166534"
              style={{ marginBottom: 0 }}
            >
              {data.strengths.slice(0, 5).map((s, i) => (
                <BulletPoint key={i} text={s} color="#166534" />
              ))}
            </Section>
          </View>
        </View>

        <Section title="Competency Profile">
          <View style={styles.competencyGrid}>
            {data.competencies.map((comp, i) => (
              <CompetencyItem key={i} comp={comp} />
            ))}
          </View>
        </Section>

        <Section title="Recommendation Rationale">
          <Card
            style={{ backgroundColor: dStyles.bg, borderColor: dStyles.border }}
          >
            <Text style={[styles.bodyText, { color: dStyles.text }]}>
              {data.decision.reasoning}
            </Text>
          </Card>
        </Section>

        {/* Page 2: Risks and Strategic Focus */}
        <View break>
          {(data.redFlags.length > 0 || data.gaps.length > 0) && (
            <Section title="Risk Analysis & Gaps" style={{ marginTop: 20 }}>
              <View style={styles.row}>
                {data.redFlags.length > 0 && (
                  <View style={styles.col}>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#dc2626",
                        marginBottom: 8,
                      }}
                    >
                      Critical Red Flags
                    </Text>
                    {data.redFlags.map((flag, i) => (
                      <BulletPoint key={i} text={flag} color="#dc2626" />
                    ))}
                  </View>
                )}
                {data.gaps.length > 0 && (
                  <View style={styles.col}>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#ea580c",
                        marginBottom: 8,
                      }}
                    >
                      Potential Gaps
                    </Text>
                    {data.gaps.map((gap, i) => (
                      <BulletPoint key={i} text={gap} color="#ea580c" />
                    ))}
                  </View>
                )}
              </View>
            </Section>
          )}

          <Section title="Interview Strategic Focus">
            <View style={[styles.row, { gap: 10 }]}>
              <StrategicFocusCard
                title="Technical Depth"
                items={data.interviewFocus.technical}
                color="#0369a1"
              />
              <StrategicFocusCard
                title="Behavioral Fit"
                items={data.interviewFocus.behavioral}
                color="#6d28d9"
              />
              <StrategicFocusCard
                title="Practical Tasks"
                items={data.interviewFocus.tasks}
                color="#c2410c"
              />
            </View>
          </Section>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Confidential Analysis Report - AI Powered Insights
          </Text>
          <Text style={styles.footerText}>Impact Resume Analyzer v2.0</Text>
        </View>
      </Page>
    </Document>
  );
};
