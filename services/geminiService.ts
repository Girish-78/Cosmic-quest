import { GoogleGenAI, Type } from "@google/genai";
import { BirthChartSummary } from '../types';

// Initialize Gemini
// NOTE: We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBirthChartSummary = async (
  date: string,
  time: string,
  place: string
): Promise<BirthChartSummary> => {
  const modelId = "gemini-2.5-flash"; // Fast and sufficient for this text task

  const prompt = `
    You are a friendly, magical Indian Astrology expert for kids.
    Create a "Cosmic Identity Card" for a child born on ${date} at ${time} in ${place}.
    
    Calculate (approximate is fine for this game) their:
    1. Sun Sign (Surya Rashi)
    2. Moon Sign (Chandra Rashi) - Very important in Indian astrology
    3. Ascendant (Lagna)
    
    Provide a fun, encouraging, simple summary.
    
    Return the response strictly as a JSON object with this schema:
    {
      "sunSign": "Sign Name (e.g. Leo)",
      "moonSign": "Sign Name (e.g. Cancer)",
      "ascendant": "Sign Name (e.g. Libra)",
      "luckyElement": "Fire/Water/Air/Earth",
      "powerPlanet": "Planet Name (e.g. Sun)",
      "kidSummary": "A short, 2-sentence encouraging description of their personality for a 10-year-old."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                sunSign: { type: Type.STRING },
                moonSign: { type: Type.STRING },
                ascendant: { type: Type.STRING },
                luckyElement: { type: Type.STRING },
                powerPlanet: { type: Type.STRING },
                kidSummary: { type: Type.STRING },
            },
            required: ["sunSign", "moonSign", "ascendant", "luckyElement", "powerPlanet", "kidSummary"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BirthChartSummary;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data if API fails or key is missing
    return {
      sunSign: "Unknown Star",
      moonSign: "Mystery Moon",
      ascendant: "Rising Hero",
      luckyElement: "Stardust",
      powerPlanet: "Unknown",
      kidSummary: "You are a unique and special mystery! Check your internet connection to reveal your true stars.",
    };
  }
};

export const getDailySkyFact = async (): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  try {
      const response = await ai.models.generateContent({
          model: modelId,
          contents: "Tell me one fun, short, simple astronomy or astrology fact for a 7-year-old. Maximum 20 words.",
      });
      return response.text || "The Sun is actually a star!";
  } catch (e) {
      return "Stars twinkle because of Earth's atmosphere!";
  }
}
