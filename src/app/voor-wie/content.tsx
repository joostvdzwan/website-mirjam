'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { callGemini } from '@/app/actions';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';

export default function VoorWiePage() {
  const [clarifyInput, setClarifyInput] = useState("");
  const [clarifyResult, setClarifyResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClarify = async () => {
    setLoading(true);
    try {
      const res = await callGemini(clarifyInput, "Psycholoog die warrige verhalen ordent naar Kernvraag, Observaties en Reflectie.");
      setClarifyResult(res?.text || "Er ging iets mis.");
    } catch {
      setClarifyResult("Kan geen verbinding maken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 px-6 max-w-4xl mx-auto">
      <Reveal>
        <h2 className="text-4xl font-serif mb-12 text-[#333D3B]">Voor wie</h2>
      </Reveal>
      
      <StaggerContainer className="grid md:grid-cols-2 gap-8 mb-20">
        {['Kinderen & Ouders', 'Jongeren (12+)', 'Zwangere Vrouwen', 'Ouders van jonge kinderen'].map((t, i) => (
          <StaggerItem key={i} className="p-8 border border-[#A5A58D]/10 bg-white flex items-center gap-4 hover:shadow-sm hover:border-[#A5A58D]/30 transition-all duration-300">
            <CheckCircle2 className="text-[#6B705C]" size={20} />
            <span className="font-medium opacity-80">{t}</span>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Reveal delay={0.2} width="100%">
        <section className="bg-white border border-[#A5A58D]/30 p-10 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B705C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#6B705C]/10 transition-colors duration-700" />
           
          <h3 className="text-xl font-serif italic mb-6 relative z-10">Verhelder je hulpvraag</h3>
          <p className="text-sm opacity-70 mb-6 relative z-10">Soms is het lastig om de vinger op de zere plek te leggen. Typ hier je warrige verhaal, Gemini brengt de eerste ordening aan.</p>
          <textarea 
            value={clarifyInput}
            onChange={(e) => setClarifyInput(e.target.value)}
            className="w-full h-32 p-4 text-sm bg-[#F9F7F2]/50 border border-[#A5A58D]/20 focus:outline-none focus:border-[#6B705C] mb-4 relative z-10 transition-colors"
            placeholder="Typ hier wat er in je hoofd omgaat..."
          />
          <button onClick={handleClarify} disabled={loading || !clarifyInput} className="w-full py-4 bg-[#6B705C] text-white text-[10px] uppercase tracking-widest font-bold relative z-10 hover:bg-[#585E4A] transition-colors">
            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Breng ordening aan"}
          </button>
          
          <SmoothHeight>
            {clarifyResult && <div className="mt-8 p-6 bg-[#F9F7F2] border-l-4 border-[#6B705C] text-sm leading-relaxed whitespace-pre-wrap">{clarifyResult}</div>}
          </SmoothHeight>
        </section>
      </Reveal>
    </div>
  );
}
