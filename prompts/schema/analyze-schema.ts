export const getAnalysisSchema = (
  domain: string,
  competencies: string[],
  scoreCategories: string[],
) => {
  return `{
  "jdSummary": {
    "keyRequirements": ["<list top 3-5 must-have skills/qualifications>"],
    "experienceLevel": "<junior|mid|senior|executive and why>",
    "culturalFitIndicators": ["<inferred company values or work style>"]
  },
  "candidateName": "<full name of the candidate extracted from resume>",
  "designation": "<best-fit role + level and why (e.g., Senior Software Engineer - due to 8+ years experience in Node.js) based on the roles: ${domain}>",
  "overallScore": <number 0-100 indicating strategic fit quality>,
  "assessment": "<high-level executive recruitment assessment for this ${domain} role>",
  "competencies": [
    ${competencies
      .map(
        (comp) => `{
      "name": "${comp}",
      "rating": "<Novice|Intermediate|Proficient|Expert>",
      "evidence": "<specific evidence from resume matching this requirement>",
      "priority": "<high|medium|low based on JD emphasis>"
    }`,
      )
      .join(",\n    ")}
  ],
  "strengths": ["<Identify at least 3 specific strengths: 1>", "<2>", "<3>", "<...additional if relevant>"],
  "gaps": ["<Identify at least 3 strategic gaps: 1>", "<2>", "<3>", "<...additional if relevant>"],
  "redFlags": ["<Identify at least 3 potential risks or red flags: 1>", "<2>", "<3>", "<If none are obvious, list subtle points of concern; DO NOT leave empty unless absolutely no risks exist>"],
  "resumeTailoringSuggestions": ["<1-3 specific recommendations to improve resume match, e.g., highlight X project>"],
  "decision": {
    "status": "<Proceed|Consider|Reject>",
    "reasoning": "<1-2 sentence justification for the decision based on domain requirements>"
  },
  "detailedScores": [
    ${scoreCategories
      .map((cat) => `{ "category": "${cat}", "score": <1-10> }`)
      .join(",\n    ")}
  ],
  "interviewFocus": {
    "technical": ["<Topic 1: Domain question>", "<Topic 2: Specific scenario>", "<Topic 3: Technical deep-dive>", "<...provide at least 3 technical items total>"],
    "behavioral": ["<Focus 1: Cultural fit/values>", "<Focus 2: Leadership/Communication>", "<...provide at least 2 behavioral items total>"],
    "tasks": ["<practical case or task for the interview (e.g., month-end close scenario, 3-statement model for Finance, or system design for Tech)>"]
  }
}`;
};
