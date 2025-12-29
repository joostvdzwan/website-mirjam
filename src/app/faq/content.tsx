'use client';

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { callGemini } from '@/app/actions';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';

export default function FAQPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await callGemini(searchInput, "Vind psycho-educatie en vat kort samen.", true);
      setSearchResult(res);
    } catch {
      setSearchResult({ text: "Er is een fout opgetreden." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 px-6 max-w-3xl mx-auto">
      <Reveal>
        <h2 className="text-4xl font-serif mb-12 text-[#333D3B]">Kennis & Vragen</h2>
        
        <div className="mb-20 bg-white border border-[#A5A58D]/30 p-8 shadow-sm">
          <h3 className="text-lg font-serif italic mb-4 flex items-center gap-2"><Search size={18} /> ✨ Psycho-educatie Zoeker</h3>
          <p className="text-sm opacity-70 mb-6">Zoek betrouwbare informatie over een thema (bijv. "perinataal verlies"). Gemini zoekt bronnen en vat ze rustig samen.</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow p-4 text-sm bg-[#F9F7F2] border-none outline-none focus:ring-1 ring-[#333D3B]/20 transition-all" 
              placeholder="Onderwerp..."
            />
            <button onClick={handleSearch} disabled={loading || !searchInput} className="px-8 bg-[#333D3B] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#454D4B] transition-colors disabled:opacity-50">
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Zoek"}
            </button>
          </div>
          
          <SmoothHeight>
            {searchResult && (
              <div className="mt-8 p-6 bg-[#F9F7F2] border-l-2 border-[#333D3B] text-sm leading-relaxed">
                <p className="mb-4">{searchResult.text}</p>
                {searchResult.sources?.length > 0 && (
                  <div className="pt-4 border-t border-[#A5A58D]/20 text-[10px] opacity-50 uppercase tracking-widest">
                    Bronnen: {searchResult.sources.map((s: any) => s.title).join(', ')}
                  </div>
                )}
              </div>
            )}
          </SmoothHeight>
        </div>
      </Reveal>
    </div>
  );
}
