
'use client';

import React, { useState } from 'react';
import { Sparkles, Route, ArrowRight } from 'lucide-react';
import { rewriteThoughtAction, generateTrajectoryPlanAction } from '@/app/actions';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { TrajectoryPlanView } from '@/components/features/TrajectoryPlanView';

export default function WerkwijzePage() {
  const [reflectInput, setReflectInput] = useState("");
  const [reflectResult, setReflectResult] = useState<string | null>(null);
  const [reflectLoading, setReflectLoading] = useState(false);

  const [trajectInput, setTrajectInput] = useState("");
  const [trajectResult, setTrajectResult] = useState<any>(null);
  const [trajectLoading, setTrajectLoading] = useState(false);

  const handleReflect = async () => {
    setReflectLoading(true);
    try {
      const res = await rewriteThoughtAction(reflectInput);
      setReflectResult(res);
    } catch (error) {
      setReflectResult("Kan geen verbinding maken met de AI.");
    } finally {
      setReflectLoading(false);
    }
  };

  const handleTraject = async () => {
    setTrajectLoading(true);
    try {
      const res = await generateTrajectoryPlanAction(trajectInput);
      setTrajectResult(res);
    } catch (e) {
      setTrajectResult("Kan geen traject genereren.");
    } finally {
      setTrajectLoading(false);
    }
  };

  return (
    <div className="py-32 max-md:py-24 px-6 max-w-4xl mx-auto">
      <Reveal>
        <h2 className="text-4xl max-md:text-3xl font-serif mb-6 text-[#333D3B]">Werkwijze</h2>
        <p className="text-lg opacity-80 mb-12 font-light">Kortdurend, nuchter en gericht op autonomie. Geen langdurige trajecten, maar beweging creëren waar het vastloopt.</p>
      </Reveal>

      <StaggerContainer className="grid md:grid-cols-2 gap-12 max-md:gap-6 mb-20">
        <StaggerItem className="p-8 max-md:p-4 border border-[#A5A58D]/20 bg-white hover:border-[#A5A58D]/40 transition-colors duration-300">
          <h4 className="font-serif text-lg mb-4 italic">Narratief Werken</h4>
          <p className="text-sm opacity-70 leading-relaxed">Het verhaal dat je vertelt bepaalt je ruimte. We herschrijven belemmerende overtuigingen naar een helpend perspectief.</p>
        </StaggerItem>
        <StaggerItem className="p-8 max-md:p-4 border border-[#A5A58D]/20 bg-white hover:border-[#A5A58D]/40 transition-colors duration-300">
          <h4 className="font-serif text-lg mb-4 italic">Psychosociale Begeleiding</h4>
          <p className="text-sm opacity-70 leading-relaxed">Lichte interventies in het hier-en-nu, gericht op inzicht en praktische handvatten voor de dagelijkse praktijk.</p>
        </StaggerItem>
      </StaggerContainer>

      <div className="space-y-12">
        <Reveal delay={0.2} width="100%">
          <section className="bg-[#333D3B] text-white p-10 max-md:p-6 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-700" />

            <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2 relative z-10"><Sparkles size={18} />Narratieve Reflectie-assistent</h3>
            <p className="text-sm opacity-70 mb-6 relative z-10">Type een gedachte die je momenteel 'gevangen' houdt. Gemini helpt deze te herschrijven.</p>

            <div className="relative z-10 space-y-4">
              <Input
                variant="glass"
                value={reflectInput}
                onChange={(e) => setReflectInput(e.target.value)}
                placeholder="Bijv: 'Ik moet alles perfect doen anders faal ik...'"
              />
              {!reflectResult && (
                <Button
                  onClick={handleReflect}
                  isLoading={reflectLoading}
                  variant="primary"
                  className="bg-[#6B705C] hover:bg-[#7D8268]"
                >
                  Gedachte herschrijven
                </Button>
              )}
            </div>

            <SmoothHeight>
              {reflectResult && <div className="mt-8 p-6 bg-white/5 border-l-2 border-[#6B705C] text-sm italic opacity-90">{reflectResult}</div>}
            </SmoothHeight>
          </section>
        </Reveal>

        <Reveal delay={0.3} width="100%">
          <section className="border border-[#A5A58D]/30 p-10 max-md:p-6 bg-[#F9F7F2] relative">
            <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2 text-[#333D3B]"><Route size={18} />Traject Inzicht Simulator</h3>
            <p className="text-sm opacity-70 mb-6">Benieuwd hoe een traject eruit kan zien? Vul je thema in en krijg een globaal plan van 5-7 sessies.</p>

            <div className="flex gap-4 items-start max-sm:flex-col">
              <Input
                variant="light"
                value={trajectInput}
                onChange={(e) => setTrajectInput(e.target.value)}
                placeholder="Bijv: 'Vastlopen in werk en perfectionisme'"
              />
              {!trajectResult && (
                <Button
                  onClick={handleTraject}
                  isLoading={trajectLoading}
                  disabled={!trajectInput}
                  className="whitespace-nowrap"
                >
                  Plan genereren
                </Button>
              )}
            </div>

            <SmoothHeight>
              {trajectResult && typeof trajectResult === 'object' ? (
                <div className="mt-8">
                  <TrajectoryPlanView data={trajectResult} />
                  <div className="mt-6 flex justify-end">
                    <a href="/contact" className="text-xs uppercase tracking-widest font-bold text-[#6B705C] flex items-center gap-2 hover:gap-4 transition-all">
                      Start dit traject <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ) : trajectResult && (
                // Fallback for error string
                <div className="mt-8 p-6 bg-red-50 text-red-800 text-sm border-l-4 border-red-800">
                  {trajectResult}
                </div>
              )}
            </SmoothHeight>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
