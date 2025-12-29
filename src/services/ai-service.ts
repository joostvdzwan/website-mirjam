
import { OpenAIClient } from '@/lib/openai/client';
import { PROMPTS } from '@/lib/gemini/prompts';

export class AiService {
  static async rewriteThought(thought: string): Promise<string> {
    const response = await OpenAIClient.generateContent(
      thought,
      PROMPTS.REFLECTION.SYSTEM_INSTRUCTION
    );
    return response?.text || "Het lukte niet om een antwoord te genereren. Probeer het later opnieuw.";
  }

  static async searchPsychoEducation(query: string): Promise<any> {
    const response = await OpenAIClient.generateContent(
      query,
      PROMPTS.PSYCHO_EDUCATION.SYSTEM_INSTRUCTION,
      true // use google search (Ignored by OpenAI)
    );
    
    const text = response?.text || "";
    const sources = response?.sources || [];

    try {
      const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
      const data = JSON.parse(jsonString);
      return { ...data, sources };
    } catch (e) {
      console.error("Failed to parse Psycho-Education JSON", text);
      return { 
          title: "Informatie", 
          summary: text, 
          sources 
      };
    }
  }

  static async verifyHelpRequest(rawInput: string): Promise<string> {
      const response = await OpenAIClient.generateContent(
          rawInput,
          PROMPTS.HELP_REQUEST.SYSTEM_INSTRUCTION
      );
      return response?.text || "";
  }
  
  static async generateTrajectoryPlan(complaint: string): Promise<any> {
      const response = await OpenAIClient.generateContent(
          complaint,
          PROMPTS.TRAJECTORY.SYSTEM_INSTRUCTION
      );
      
      const text = response?.text || "";
      try {
        // Clean markdown code blocks if present
        const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
        return JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse AI response as JSON", text);
        return null;
      }
  }

  static async getVisionAudio(): Promise<string | null> {
    return await OpenAIClient.generateSpeech(PROMPTS.VISION_AUDIO.TEXT);
  }

  static async checkTargetAudience(input: string): Promise<any> {
    const response = await OpenAIClient.generateContent(
      input,
      PROMPTS.TARGET_AUDIENCE_CHECK.SYSTEM_INSTRUCTION
    );
    
    const text = response?.text || "";
    try {
      const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse AI response as JSON", text);
      return null;
    }
  }
}
