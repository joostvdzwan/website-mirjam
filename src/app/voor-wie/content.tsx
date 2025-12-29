
'use client';

import React, { useState } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { checkTargetAudienceAction } from '@/app/actions';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export default function VoorWiePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await checkTargetAudienceAction(input);
      setResult(res);
    } catch {
      setResult("Kan geen verbinding maken.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
      setInput(suggestion);
      setResult(null); // Reset result to allow re-checking
  };

  return (
    <div className="py-32 max-md:py-24 px-6 max-md:px-4 max-w-4xl mx-auto">
      <Reveal>
        <h2 className="text-4xl font-serif mb-12 text-[#333D3B]">Voor wie</h2>
      </Reveal>
      
      <StaggerContainer className="grid md:grid-cols-2 gap-8 max-md:gap-4 mb-20 max-md:mb-10">
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
           
          <h3 className="text-xl font-serif italic mb-6 relative z-10 flex items-center gap-2"><MessageCircle size={18}/> Twijfel je? Check het hier.</h3>
          <p className="text-sm opacity-70 mb-6 relative z-10">Soms is het lastig om de vinger op de zere plek te leggen. Typ hier je verhaal in het kort.</p>
          
          <div className="relative z-10">
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Typ hier wat er in je hoofd omgaat..."
                className="mb-4"
              />
              {!result && (
                  <Button 
                    onClick={handleCheck} 
                    isLoading={loading} 
                    disabled={!input} 
                    fullWidth
                  >
                    Check of dit past
                  </Button>
              )}
          </div>
          
          <SmoothHeight>
            {result && typeof result === 'object' ? (
                <div className="mt-8">
                    <div className="p-6 bg-[#F9F7F2] border-l-4 border-[#6B705C] text-sm leading-relaxed whitespace-pre-wrap mb-6">
                        {result.advice}
                    </div>

                    {result.suggestions?.length > 0 && (
                        <div>
                            <p className="text-xs uppercase tracking-widest font-bold text-[#333D3B]/50 mb-3">Misschien bedoel je dit?</p>
                            <div className="flex flex-wrap gap-2">
                                {result.suggestions.map((s: string, i: number) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleSuggestionClick(s)}
                                        className="px-4 py-2 bg-white border border-[#A5A58D]/30 text-xs text-[#333D3B] hover:bg-[#6B705C] hover:text-white hover:border-[#6B705C] transition-all rounded-full"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : result && (
                <div className="mt-8 p-6 bg-red-50 text-red-800 text-sm border-l-4 border-red-800">
                    {result}
                </div>
            )}
          </SmoothHeight>
        </section>
      </Reveal>
    </div>
  );
}
