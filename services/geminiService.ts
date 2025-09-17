import { GoogleGenAI, Modality, Part } from "@google/genai";
import { UPSCALE_PROMPT } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface ReferenceImage {
  base64: string;
  mimeType: string;
}

export async function editIdPhoto(base64Image: string, mimeType: string, prompt: string, referenceImage?: ReferenceImage): Promise<string> {
  const maxRetries = 2; // 1 initial attempt + 2 retries = 3 total attempts
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // On retry attempts, add a specific instruction to the prompt to improve success rate.
      const modifiedPrompt = attempt > 0
        ? `${prompt}\n\n**Retry Instruction:** The previous attempt failed to generate a valid image. Please re-process the request, strictly following all instructions. The final output MUST be an image.`
        : prompt;
      
      const parts: Part[] = [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
      ];

      if (referenceImage) {
        parts.push({
          inlineData: {
            data: referenceImage.base64,
            mimeType: referenceImage.mimeType,
          },
        });
      }

      parts.push({ text: modifiedPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts },
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });

      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            // Success! Return the image data.
            return part.inlineData.data;
          }
        }
      }
      
      // If we are here, the response was valid but contained no image. This counts as a failed attempt.
      lastError = new Error("AI did not return an edited image in this attempt.");
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt + 1} failed: No image data in response. Retrying...`);
      }

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Error on attempt ${attempt + 1}:`, lastError.message);
      
      // If this is the last attempt, we'll fall through and throw.
      // Otherwise, the loop will continue to the next attempt after a short delay.
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      }
    }
  }

  // If all attempts have failed, throw a comprehensive error.
  console.error("All retry attempts failed.", lastError);
  if (lastError?.message.includes('429')) {
    throw new Error("API rate limit exceeded. Please try again later.");
  }
  throw new Error("Failed to generate image after multiple attempts. The AI model may be temporarily unavailable or the input image is causing issues. Please try again with a different photo.");
}

export async function upscaleImage(base64Image: string, mimeType: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    { inlineData: { data: base64Image, mimeType: mimeType } },
                    { text: UPSCALE_PROMPT }
                ]
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
        throw new Error("AI did not return an upscaled image.");

    } catch (error) {
        console.error("Error during image upscaling:", error);
        throw new Error("Failed to upscale the image. The AI model may be temporarily unavailable.");
    }
}