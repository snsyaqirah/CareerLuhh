// Agent base pattern — Stage 1 returns mockResponse, Stage 2 calls Gemini.
// This file moves into frontend/lib/agents/ when the API routes are wired up.

import { gemini } from "./gemini";

export async function runAgent(
  systemPrompt: string,
  userInput: object,
  mockResponse: object, // Stage 1: return this instead
  useMock = true // Stage 1: true. Stage 2: false
) {
  if (useMock) return mockResponse;

  const prompt = `${systemPrompt}\n\nInput:\n${JSON.stringify(userInput, null, 2)}`;
  const result = await gemini.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text);
}
