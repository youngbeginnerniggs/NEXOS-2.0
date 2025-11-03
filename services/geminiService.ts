import { GoogleGenAI } from "@google/genai";

export const refineIdeaWithAI = async (rawIdea: string, aiSystemInstruction: string): Promise<string> => {
  // Directly initialize GoogleGenAI as API_KEY is guaranteed to be available.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // The main user prompt remains concise. The heavy lifting is done by the system instruction.
  const prompt = `Here is the user's idea: "${rawIdea}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // The system instruction now defines the AI's persona and expertise.
        systemInstruction: aiSystemInstruction,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while refining your idea. Please check the console for details and try again.";
  }
};