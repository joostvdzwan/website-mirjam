
'use server';

import { AiService } from '@/services/ai-service';
import { rateLimiter } from '@/lib/rate-limit';
import { headers } from 'next/headers';

async function checkRateLimit() {
  const ip = (await headers()).get('x-forwarded-for') || 'unknown';
  try {
    await rateLimiter.check(10, ip); // Limit: 10 requests per hour
  } catch {
    throw new Error("Je hebt het maximum aantal AI-vragen bereikt. Probeer het over een uur opnieuw.");
  }
}

export const rewriteThoughtAction = async (thought: string) => {
  try {
    await checkRateLimit();
    return await AiService.rewriteThought(thought);
  } catch (error: any) {
    return error.message;
  }
};

export const searchPsychoEducationAction = async (query: string) => {
  try {
    await checkRateLimit();
    return await AiService.searchPsychoEducation(query);
  } catch (error: any) {
    return { text: error.message };
  }
};

export const generateVisionAudioAction = async () => {
  try {
    await checkRateLimit();
    return await AiService.getVisionAudio();
  } catch (error: any) {
    return null;
  }
};

export const verifyHelpRequestAction = async (input: string) => {
  try {
    await checkRateLimit();
    return await AiService.verifyHelpRequest(input);
  } catch (error: any) {
    return error.message;
  }
};

export const generateTrajectoryPlanAction = async (complaint: string) => {
  try {
    await checkRateLimit();
    return await AiService.generateTrajectoryPlan(complaint);
  } catch (error: any) {
    return error.message;
  }
};

export const checkTargetAudienceAction = async (input: string) => {
  try {
    await checkRateLimit();
    return await AiService.checkTargetAudience(input);
  } catch (error: any) {
    return error.message;
  }
};


/** 
 * Legacy/Generic implementation - Keeping for backward compatibility if needed, 
 * but `rewriteThoughtAction`, `searchPsychoEducationAction` are preferred.
 * @deprecated Use specific actions instead.
 */
export const callGemini = async (prompt: string, systemInstruction: string, useSearch = false) => {
    try {
        await checkRateLimit();
        // Basic wrapper to maintain compatibility while migration happens
        // Ideally, we move components to use the specific actions above.
        const { GeminiClient } = await import('@/lib/gemini/client');
        const res = await GeminiClient.generateContent(prompt, systemInstruction, useSearch);
        return res;
    } catch (error: any) {
        return { text: error.message };
    }
};

export const generateSpeech = async (text: string) => {
     try {
         await checkRateLimit();
         const { GeminiClient } = await import('@/lib/gemini/client');
         return await GeminiClient.generateSpeech(text);
     } catch {
         return null;
     }
};
