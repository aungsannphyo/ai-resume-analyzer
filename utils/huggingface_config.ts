import { InferenceClient } from "@huggingface/inference";

if (!process.env.HUGGINGFACE_API_TOKEN) {
  throw new Error(
    "HUGGINGFACE_API_TOKEN is not defined in environment variables",
  );
}

if (!process.env.HUGGINGFACE_MODEL) {
  throw new Error("HUGGINGFACE_MODEL is not defined in environment variables");
}

export const hf = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN);

export const HF_CONFIG = {
  model: process.env.HUGGINGFACE_MODEL,
  max_tokens: 2000,
  temperature: 0.7,
};
