
import { generateVisionAudioAction } from '@/app/actions';

export const pcmToWav = (base64: string, rate: number) => {
  const pcm = new Uint8Array(atob(base64).split("").map(c => c.charCodeAt(0)));
  const buffer = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(buffer);
  const s = (o: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(o + i, str.charCodeAt(i)); };
  s(0, 'RIFF'); view.setUint32(4, 32 + pcm.length, true); s(8, 'WAVE'); s(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  s(36, 'data'); view.setUint32(40, pcm.length, true);
  new Uint8Array(buffer).set(pcm, 44);
  return new Blob([buffer], { type: 'audio/wav' });
};

export const playVisionAudio = async (isPlaying: boolean, setIsPlaying: (v: boolean) => void) => {
  if (isPlaying) return;
  setIsPlaying(true);
  try {
    // The text is now managed in the PROMPTS service
    const pcmData = await generateVisionAudioAction();
    if (pcmData) {
      const audio = new Audio(URL.createObjectURL(pcmToWav(pcmData, 24000)));
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } else {
        setIsPlaying(false);
    }
  } catch (e) { setIsPlaying(false); }
};
