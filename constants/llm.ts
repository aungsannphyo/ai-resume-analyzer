export const LLM_CONFIG = {
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.3,
  MODEL_TYPE: process.env.MODEL_TYPE || "versatile",
  MODELS: {
    instant: process.env.GROQ_MODEL_INSTANT || "openai/gpt-oss-20b",
    versatile: process.env.GROQ_MODEL_VERSATILE || "openai/gpt-oss-120b",
  },
  TIMEOUT: 30000, // 30 seconds
} as const;
