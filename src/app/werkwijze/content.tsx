'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { callGemini } from '@/app/actions';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';

export default function WerkwijzePage() {
  const [reflectInput, setReflectInput] = useState("");
  const [reflectResult, setReflectResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReflect = async () => {
    setLoading(true);
    try {
      const res = await callGemini(reflectInput, "Narratief coach die belemmerende gedachten herschrijft.");
      setReflectResult(res?.text || "Er ging iets mis. Probeer het later opnieuw.");
    } catch (error) {
       setReflectResult("Kan geen verbinding maken met de AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 px-6 max-w-4xl mx-auto">
      <Reveal>
        <h2 className="text-4xl font-serif mb-6 text-[#333D3B]">Werkwijze</h2>
        <p className="text-lg opacity-80 mb-12 font-light">Kortdurend, nuchter en gericht op autonomie. Geen langdurige trajecten, maar beweging creëren waar het vastloopt.</p>
      </Reveal>
      
      <StaggerContainer className="grid md:grid-cols-2 gap-12 mb-20">
        <StaggerItem className="p-8 border border-[#A5A58D]/20 bg-white hover:border-[#A5A58D]/40 transition-colors duration-300">
          <h4 className="font-serif text-lg mb-4 italic">Narratief Werken</h4>
          <p className="text-sm opacity-70 leading-relaxed">Het verhaal dat je vertelt bepaalt je ruimte. We herschrijven belemmerende overtuigingen naar een helpend perspectief.</p>
        </StaggerItem>
        <StaggerItem className="p-8 border border-[#A5A58D]/20 bg-white hover:border-[#A5A58D]/40 transition-colors duration-300">
          <h4 className="font-serif text-lg mb-4 italic">Psychosociale Begeleiding</h4>
          <p className="text-sm opacity-70 leading-relaxed">Lichte interventies in het hier-en-nu, gericht op inzicht en praktische handvatten voor de dagelijkse praktijk.</p>
        </StaggerItem>
      </StaggerContainer>

      <Reveal delay={0.2} width="100%">
        <section className="bg-[#333D3B] text-white p-10 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-700" />
            
          <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2 relative z-10"><Sparkles size={18} />Narratieve Reflectie-assistent</h3>
          <p className="text-sm opacity-70 mb-6 relative z-10">Type een gedachte die je momenteel 'gevangen' houdt. Gemini helpt deze te herschrijven.</p>
          <input 
            type="text"
            value={reflectInput}
            onChange={(e) => setReflectInput(e.target.value)}
            className="w-full p-4 text-sm bg-white/10 border border-white/20 focus:outline-none focus:border-white mb-4 rounded-sm text-white transition-all relative z-10"
            placeholder="Bijv: 'Ik moet alles perfect doen anders faal ik...'"
          />
          <button 
            onClick={handleReflect}
            disabled={loading || !reflectInput}
            className="flex items-center gap-2 px-6 py-3 bg-[#6B705C] text-xs uppercase tracking-widest font-bold hover:bg-[#585E4A] transition-all disabled:opacity-50 relative z-10"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : "Gedachte herschrijven"}
          </button>
          
          <SmoothHeight>
             {reflectResult && <div className="mt-8 p-6 bg-white/5 border-l-2 border-[#6B705C] text-sm italic opacity-90">{reflectResult}</div>}
          </SmoothHeight>
        </section>
      </Reveal>
    </div>
  );
}
