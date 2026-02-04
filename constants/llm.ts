export const LLM_CONFIG = {
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.3,
  MODEL: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
  TIMEOUT: 30000, // 30 seconds
} as const;
