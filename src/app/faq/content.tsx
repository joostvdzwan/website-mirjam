
'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchPsychoEducationAction } from '@/app/actions';
import { Reveal } from '@/components/motion/Reveal';
import { SmoothHeight } from '@/components/motion/SmoothHeight';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PsychoEducationView } from '@/components/features/PsychoEducationView';

export default function FAQPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchPsychoEducationAction(searchInput);
      setSearchResult(res);
    } catch {
      setSearchResult({ text: "Er is een fout opgetreden.", sources: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 px-6 max-w-3xl mx-auto">
      <Reveal>
        <h2 className="text-4xl font-serif mb-12 text-[#333D3B]">Kennis & Vragen</h2>

        <div className="mb-20 bg-white border border-[#A5A58D]/30 p-8 max-md:p-6 shadow-sm">
          <h3 className="text-lg font-serif italic mb-4 flex items-center gap-2"><Search size={18} /> ✨ Psycho-educatie Zoeker</h3>
          <p className="text-sm opacity-70 mb-6">Zoek betrouwbare informatie over een thema (bijv. "perinataal verlies"). Gemini zoekt bronnen en vat ze rustig samen.</p>
          <div className="flex max-md:flex-col gap-2">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Onderwerp..."
              variant="light"
            />
            {!searchResult && (
              <Button
                onClick={handleSearch}
                isLoading={loading}
                disabled={!searchInput}
              >
                Zoek
              </Button>
            )}
          </div>

          <SmoothHeight>
            {searchResult && (
              <div className="mt-8">
                <PsychoEducationView data={searchResult} />
              </div>
            )}
          </SmoothHeight>
        </div>
      </Reveal>
    </div>
  );
}
