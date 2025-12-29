'use server';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; 
const modelText = "gemini-2.5-flash-preview-09-2025";
const modelTTS = "gemini-2.5-flash-preview-tts";

export const callGemini = async (prompt: string, systemInstruction: string, useSearch = false) => {
  const maxRetries = 3;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const payload: any = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
      };
      if (useSearch) payload.tools = [{ "google_search": {} }];

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelText}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      return {
        text: data.candidates?.[0]?.content?.parts?.[0]?.text,
        sources: data.candidates?.[0]?.groundingMetadata?.groundingAttributions?.map((a: any) => ({ uri: a.web?.uri, title: a.web?.title }))
      };
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
  return null;
};

export const generateSpeech = async (text: string) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelTTS}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }],
        generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } }
      })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error", error);
    return null;
  }
};
