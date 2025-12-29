
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const modelText = "gemini-2.0-flash";
const modelTTS = "gemini-2.5-flash-preview-tts";

export interface GeminiResponse {
  text?: string;
  sources?: { uri: string; title: string }[];
}

export class GeminiClient {
  private static async fetchWithRetry(url: string, payload: any, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                
                if (response.status === 429) {
                    throw new Error("Het is momenteel erg druk bij de AI-service. Probeer het over een minuutje nog eens. (Limiet bereikt)");
                }

                throw new Error(`API request failed: ${response.status} ${errorText}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error(`Attempt ${i + 1} failed:`, error);
            
            // Don't retry if we hit the rate limit or if it's the last attempt
            if (i === retries - 1 || error.message.includes("(Limiet bereikt)")) {
                throw error;
            }
            
            await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
        }
    }
  }

  static async generateContent(prompt: string, systemInstruction: string, useSearch = false): Promise<GeminiResponse | null> {
    const payload: any = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };
    if (useSearch) payload.tools = [{ "google_search": {} }];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelText}:generateContent?key=${apiKey}`;
    
    try {
        const data = await this.fetchWithRetry(url, payload);
        return {
            text: data.candidates?.[0]?.content?.parts?.[0]?.text,
            sources: data.candidates?.[0]?.groundingMetadata?.groundingAttributions?.map((a: any) => ({ uri: a.web?.uri, title: a.web?.title }))
        };
    } catch (error: any) {
        console.error("Gemini Content Generation Error:", error);
        if (error.message?.includes("(Limiet bereikt)")) {
            throw error;
        }
        return null;
    }
  }

  static async generateSpeech(text: string): Promise<string | null> {
    const payload = {
        contents: [{ parts: [{ text: text }] }],
        generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelTTS}:generateContent?key=${apiKey}`;

    try {
        const data = await this.fetchWithRetry(url, payload);
        return data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (error) {
        console.error("Gemini TTS Error:", error);
        return null;
    }
  }
}
