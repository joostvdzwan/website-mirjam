
'use client';

import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { generateTrajectoryPlanAction } from '@/app/actions';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { TrajectoryPlanView } from '@/components/features/TrajectoryPlanView';

export default function TarievenPage() {
  const [trajectoryInput, setTrajectoryInput] = useState("");
  const [trajectoryResult, setTrajectoryResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrajectory = async () => {
    setLoading(true);
    try {
      const res = await generateTrajectoryPlanAction(trajectoryInput);
      setTrajectoryResult(res);
    } catch {
      setTrajectoryResult("Kon niet verbinden.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTrajectoryInput(suggestion);
    setTrajectoryResult(null);
  };

  return (
    <div className="py-32 max-md:py-24 px-6 max-md:px-4 max-w-4xl mx-auto">
      <Reveal width="100%">
        <h2 className="text-4xl font-serif mb-12 max-md:mb-8 text-center max-md:text-left text-[#333D3B]">Investering</h2>
        <div className="flex flex-col gap-12 max-md:gap-8 items-center w-full">
          <div className="p-12 max-md:p-6 w-full bg-white border border-[#A5A58D]/20 shadow-sm text-center max-md:text-left transform transition-transform hover:-translate-y-1 duration-500">
            <h3 className="text-xl max-md:text-lg font-serif italic mb-2">Kortdurend Traject</h3>
            <p className="text-4xl font-serif text-[#333D3B] my-6 max-md:my-4">€595</p>
            <ul className="text-sm opacity-70 space-y-3 mb-8 border-t pt-6">
              <li>5 sessies van 75 minuten</li>
              <li>Tussentijdse reflecties</li>
              <li>Vrijgesteld van BTW</li>
            </ul>
            <button className="w-full py-4 bg-[#333D3B] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#454d4b] transition-colors rounded-sm cursor-pointer">Traject aanvragen</button>
          </div>

          <div className="p-10 max-md:p-6 w-full border border-[#6B705C]/30 bg-[#6B705C]/5 text-center max-md:text-left w-full">
            <h4 className="font-serif italic text-lg mb-4 max-md:mb-2 flex items-center justify-center max-md:justify-start gap-2">Traject-inzicht</h4>
            <p className="text-xs opacity-70 mb-6 leading-relaxed">Nieuwsgierig hoe we jouw thema in 5 sessies aanpakken? Type hier kort je focus.</p>

            <div className="relative">
              <Textarea
                value={trajectoryInput}
                onChange={(e) => setTrajectoryInput(e.target.value)}
                className="mb-4 bg-white min-h-[100px]"
                placeholder="Bijv: Balans werk/gezin..."
                variant="light"
              />
              {!trajectoryResult && (
                <Button
                  onClick={handleTrajectory}
                  isLoading={loading}
                  disabled={!trajectoryInput}
                  fullWidth
                  className="bg-[#6B705C] hover:bg-[#585E4A]"
                >
                  Genereer Voorbeeldplan
                </Button>
              )}
            </div>

            <SmoothHeight>
              {trajectoryResult && typeof trajectoryResult === 'object' ? (
                <div className="mt-8">
                  <TrajectoryPlanView
                    data={trajectoryResult}
                    onSuggestionClick={handleSuggestionClick}
                  />
                  <p className="text-[10px] text-center mt-4 opacity-50 italic">Dit is een AI-generatie ter inspiratie. Elk traject is maatwerk.</p>
                </div>
              ) : trajectoryResult && (
                <div className="mt-4 p-4 text-xs text-red-800 bg-red-50 border-l-2 border-red-800">
                  {trajectoryResult}
                </div>
              )}
            </SmoothHeight>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
