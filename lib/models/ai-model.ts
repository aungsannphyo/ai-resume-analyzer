import { groq } from "@/utils/groq_config";

export interface AIModel {
  generateResponse(
    prompt: string,
    options?: {
      max_tokens?: number;
      temperature?: number;
    },
  ): Promise<string>;
}

export class GroqModel implements AIModel {
  constructor(private model: string) {}

  async generateResponse(
    prompt: string,
    options: { max_tokens?: number; temperature?: number } = {},
  ): Promise<string> {
    const response = await groq.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: options.max_tokens || 2000,
      temperature: options.temperature || 0.3,
    });

    return response.choices[0].message.content || "";
  }
}

export function getAIModel(modelType?: string): AIModel {
  const { LLM_CONFIG } = require("@/constants/llm"); // Avoid circular import
  const type =
    modelType || (LLM_CONFIG.MODEL_TYPE as keyof typeof LLM_CONFIG.MODELS);
  const modelName = LLM_CONFIG.MODELS[type];
  return new GroqModel(modelName);
}
