
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editIdPhoto(base64Image: string, mimeType: string, prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    if (response?.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error("AI did not return an edited image. Please try again with a different photo.");
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
       // Check for specific error messages if needed
       if (error.message.includes('429')) {
         throw new Error("API rate limit exceeded. Please try again later.");
       }
    }
    throw new Error("Failed to edit image with AI. Please check your photo and try again.");
  }
}
