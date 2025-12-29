
'use client';
import React, { useState } from 'react';
import { Mail, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { verifyHelpRequestAction } from '@/app/actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [isHelping, setIsHelping] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  const handleHelp = async () => {
    if (!message) return;
    setIsHelping(true);
    try {
        const enrichedMessage = await verifyHelpRequestAction(message);
        setMessage(enrichedMessage);
        setAiUsed(true);
    } catch (e) {
        console.error(e);
    } finally {
        setIsHelping(false);
    }
  };

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
          <div className="bg-white p-10 border border-[#A5A58D]/30 shadow-xl transition-shadow duration-500 hover:shadow-2xl relative">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                 <Input placeholder="Naam" variant="light" className="border-b border-[#A5A58D]/40 border-t-0 border-x-0 rounded-none px-0 h-10" />
                 <Input placeholder="E-mail" variant="light" className="border-b border-[#A5A58D]/40 border-t-0 border-x-0 rounded-none px-0 h-10" />
              </div>
              
              <div className="relative mt-6">
                <textarea 
                    rows={6} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-[#A5A58D]/20 p-4 focus:outline-none focus:border-[#6B705C] bg-[#F9F7F2]/50 text-sm transition-colors pr-10" 
                    placeholder="Wat houdt je momenteel bezig? (Typ kort je gedachten, klik dan op het sterretje om te verhelderen)"
                ></textarea>
                {!aiUsed && (
                    <button 
                        type="button"
                        onClick={handleHelp}
                        disabled={isHelping || message.length < 5}
                        className="absolute top-2 right-2 p-2 text-[#6B705C] hover:text-[#333D3B] disabled:opacity-30 transition-colors"
                        title="Help mij focussen (AI)"
                    >
                        {isHelping ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    </button>
                )}
              </div>

              <Button fullWidth className="mt-6">Bericht verzenden</Button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
