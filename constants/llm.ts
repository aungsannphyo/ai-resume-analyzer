export const LLM_CONFIG = {
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.3,
  MODEL_TYPE: process.env.MODEL_TYPE || "instant",
  MODELS: {
    instant: process.env.GROQ_MODEL_INSTANT || "llama-3.1-8b-instant",
    versatile: process.env.GROQ_MODEL_VERSATILE || "llama-3.1-70b-versatile",
  },
  TIMEOUT: 30000, // 30 seconds
} as const;
