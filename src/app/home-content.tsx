'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Volume2, Loader2 } from 'lucide-react';
import { playVisionAudio } from '@/lib/audio';
import { Reveal } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-dvh flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-3xl flex flex-col items-center max-sm:items-start">
        <Reveal delay={0.1}>
          <span className="text-[14px] max-sm:text-[12px] uppercase tracking-[0.4em] text-[#6B705C] mb-8 block font-semibold">Onafhankelijk & Psychologisch</span>
        </Reveal>
        
        <div className="mb-10 text-4xl md:text-6xl font-serif leading-[1.1] text-[#333D3B] flex flex-col items-center max-sm:items-start">
             <TextReveal text="Ik loop een stukje mee om" delay={0.2} className="justify-center max-sm:justify-start" />
             <TextReveal text="overzicht te brengen." delay={0.6} className="italic font-light justify-center max-sm:justify-start" />
        </div>

        <Reveal delay={0.8}>
          <p className="text-lg md:text-xl text-[#333D3B]/70 leading-relaxed mb-12 max-sm:mb-6 max-w-2xl mx-auto font-light max-sm:text-left">
            Zodat je daarna zelf weer verder kunt. Kortdurende begeleiding voor wie regie zoekt in een overweldigende fase, buiten de systemen om.
          </p>
        </Reveal>

        <Reveal delay={1.0}>
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-sm:gap-4 items-center p-4 max-sm:p-0 max-sm:items-start max-sm:justify-start">
            <Link href="/werkwijze" className="px-10 py-4 bg-[#6B705C] text-white text-xs uppercase tracking-widest font-bold rounded-sm transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
              Mijn werkwijze
            </Link>
            <button 
              onClick={() => playVisionAudio(isPlaying, setIsPlaying)} 
              disabled={isPlaying} 
              className="flex items-center gap-2 px-10 py-4 border border-[#6B705C]/30 text-[#6B705C] text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-[#6B705C]/5 transition-all hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />}
              Beluister de visie
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
