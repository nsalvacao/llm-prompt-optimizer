import type { ReactNode } from 'react';

export enum LLM {
  GEMINI = 'gemini',
  ANTHROPIC = 'anthropic',
  CHATGPT = 'chatgpt',
  LLAMA = 'llama',
}

export type LLMOption = {
  id: LLM;
  name: string;
  logo: ReactNode;
};

export type HistoryItem = {
  id: number; // Using timestamp for a unique ID
  originalPrompt: string;
  optimizedPrompt: string;
  targetLlm: LLM;
  isFavorite: boolean;
};

// --- LLM Settings ---
export type BaseSettings = {
  temperature: number;
};

export type GeminiSettings = BaseSettings & {
  provider: 'gemini';
  apiKey?: string; // User-provided API key for Gemini
};

export type OpenAISettings = BaseSettings & {
  provider: 'openai';
  apiKey: string;
  baseUrl: string;
  model: string;
};

export type AppSettings = GeminiSettings | OpenAISettings;