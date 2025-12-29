'use client';
import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

export default function ContactPage() {
  return (
    <div className="py-32 px-6 max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24">
        <Reveal>
          <div>
            <h2 className="text-4xl font-serif mb-8 text-[#333D3B]">Contact</h2>
            <p className="opacity-70 mb-12 leading-relaxed text-lg">Stuur een bericht voor een kosteloze kennismaking. Ik reageer doorgaans binnen 48 uur.</p>
            <div className="space-y-6 text-sm">
              <div className="flex gap-4 items-center"><Mail size={18} /> mirjam@deleeuw.nl</div>
              <div className="flex gap-4 items-center"><MapPin size={18} /> Regio Leiden / Online</div>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.2} direction="left">
          <div className="bg-white p-10 border border-[#A5A58D]/30 shadow-xl transition-shadow duration-500 hover:shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="w-full border-b border-[#A5A58D]/40 py-2 focus:outline-none focus:border-[#6B705C] text-sm transition-colors" placeholder="Naam" />
              <input type="email" className="w-full border-b border-[#A5A58D]/40 py-2 focus:outline-none focus:border-[#6B705C] text-sm transition-colors" placeholder="E-mail" />
              <textarea rows={4} className="w-full border border-[#A5A58D]/20 p-4 focus:outline-none focus:border-[#6B705C] bg-[#F9F7F2]/50 text-sm transition-colors" placeholder="Wat houdt je momenteel bezig?"></textarea>
              <button className="w-full py-4 bg-[#6B705C] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#585E4A] transition-colors">Bericht verzenden</button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
