
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function recognizeFood(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          },
          {
            text: "Identify the food in this image. Be precise. Return a JSON object with: name (string), calories (number), protein (number in grams), carbs (number in grams), fat (number in grams), and breakdown (array of objects with 'item' and 'calories'). Focus on common Chinese dishes or healthy foods if applicable."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fat: { type: Type.NUMBER },
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  calories: { type: Type.NUMBER }
                },
                required: ["item", "calories"]
              }
            }
          },
          required: ["name", "calories", "protein", "carbs", "fat", "breakdown"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Food recognition failed:", error);
    throw error;
  }
}
