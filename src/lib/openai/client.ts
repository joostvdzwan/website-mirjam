
import OpenAI from 'openai';

const apiKey = process.env.OPEN_AI_API_KEY || "";

if (!apiKey) {
  console.warn("OpenAI API Key is missing. Make sure OPEN_AI_API_KEY is set in .env.local");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export interface AiResponse {
  text?: string;
  sources?: { uri: string; title: string }[];
}

export class OpenAIClient {
  static async generateContent(prompt: string, systemInstruction: string, useSearch = false): Promise<AiResponse | null> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
        ],
        model: "gpt-4o-mini",
      });

      return {
        text: completion.choices[0].message.content || "",
        sources: [] // OpenAI does not provide search sources in this mode
      };
    } catch (error) {
      console.error("OpenAI Content Generation Error:", error);
      return null;
    }
  }

  static async generateSpeech(text: string): Promise<string | null> {
    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova", // 'nova' is a good calm voice option
        input: text,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      return buffer.toString('base64');
    } catch (error) {
      console.error("OpenAI TTS Error:", error);
      return null;
    }
  }
}
