'use client';

import React, { useState } from 'react';
import { Compass, Loader2 } from 'lucide-react';
import { callGemini } from '@/app/actions';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';

export default function TarievenPage() {
  const [trajectoryInput, setTrajectoryInput] = useState("");
  const [trajectoryResult, setTrajectoryResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrajectory = async () => {
    setLoading(true);
    try {
      const res = await callGemini(trajectoryInput, "Schets een hypothetisch traject van 5 sessies op basis van de input.");
      setTrajectoryResult(res?.text || "Geen resultaat.");
    } catch {
      setTrajectoryResult("Kon niet verbinden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 px-6 max-w-4xl mx-auto">
      <Reveal className="w-full">
        <h2 className="text-4xl font-serif mb-12 text-center text-[#333D3B]">Investering</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="p-12 bg-white border border-[#A5A58D]/20 shadow-sm text-center transform transition-transform hover:-translate-y-1 duration-500">
            <h3 className="text-xl font-serif italic mb-2">Kortdurend Traject</h3>
            <p className="text-4xl font-serif text-[#333D3B] my-6">€595</p>
            <ul className="text-sm opacity-70 space-y-3 mb-8 border-t pt-6">
              <li>5 sessies van 75 minuten</li>
              <li>Tussentijdse reflecties</li>
              <li>Vrijgesteld van BTW</li>
            </ul>
            <button className="w-full py-4 bg-[#333D3B] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#454d4b] transition-colors">Traject aanvragen</button>
          </div>

          <div className="p-10 border border-[#6B705C]/30 bg-[#6B705C]/5">
            <h4 className="font-serif italic text-lg mb-4 flex items-center gap-2">Traject-inzicht</h4>
            <p className="text-xs opacity-70 mb-6">Nieuwsgierig hoe we jouw thema in 5 sessies aanpakken? Type hier kort je focus.</p>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={trajectoryInput}
                onChange={(e) => setTrajectoryInput(e.target.value)}
                className="flex-grow p-3 text-xs bg-white border border-[#A5A58D]/20 outline-none focus:border-[#6B705C] transition-colors" 
                placeholder="Bijv: Balans werk/gezin"
              />
              <button onClick={handleTrajectory} disabled={loading || !trajectoryInput} className="p-3 bg-[#6B705C] text-white hover:bg-[#585E4A] transition-colors disabled:opacity-50">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Compass size={16} />}
              </button>
            </div>
            <SmoothHeight>
              {trajectoryResult && <div className="text-[11px] opacity-80 leading-relaxed italic max-h-60 overflow-y-auto mt-4 pt-4 border-t border-[#6B705C]/10">{trajectoryResult}</div>}
            </SmoothHeight>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
