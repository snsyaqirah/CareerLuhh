// Gemini 2.0 Flash client — free tier (15 RPM, 1,500 req/day).
// Requires GEMINI_API_KEY from https://aistudio.google.com
// Stage 2: npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const gemini = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json", // forces JSON output
  },
});
