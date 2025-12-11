import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SearchResult } from "../types";

// Helper to get AI instance safely
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Search the web for Tech Trends (Gemini 2.5 Flash + Grounding)
 */
export const searchTechTrends = async (query: string): Promise<SearchResult> => {
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a concise summary of the latest trends or answer regarding: "${query}". Focus on mobile development perspective if applicable.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I couldn't find specific information on that right now.";
    
    // Extract grounding chunks for sources
    const sources: { uri: string; title: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title,
          });
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Search error:", error);
    return { 
      text: "Sorry, I encountered an error searching for that topic. Please try again.", 
      sources: [] 
    };
  }
};
