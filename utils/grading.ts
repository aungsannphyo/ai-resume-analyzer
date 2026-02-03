export const getScoreRating = (score: number): string => {
  if (score >= 80) return "Excellent Candidate";
  if (score >= 60) return "Strong Candidate";
  if (score >= 40) return "Moderate Fit";
  return "Needs Development";
};
