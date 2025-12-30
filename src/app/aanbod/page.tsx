import { Metadata } from 'next';
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aanbod | Inzicht & Ordening',
  description: 'Wat ik wel en niet doe. Grenzen en mogelijkheden van mijn begeleiding.',
};

export default function AanbodPage() {
  return (
    <div className="py-32 max-md:py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
      <h2 className="text-4xl max-md:text-3xl font-serif mb-6 text-[#333D3B]">Wat ik wel & niet doe</h2>
      <p className="text-lg opacity-70 mb-12 font-light">Heldere grenzen zijn de basis voor een veilige begeleiding. Ik werk bewust buiten de kaders van de GGZ en Jeugdwet.</p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="flex items-center gap-2 text-[#6B705C] font-bold uppercase text-[10px] tracking-widest mb-6">
            <CheckCircle2 size={16} /> Begeleidingsgebied (Wel)
          </h3>
          <ul className="space-y-4 text-sm opacity-80 leading-relaxed">
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-[#6B705C] shrink-0" />
              <span>Kortdurende psychologische coaching (max. 7 sessies)</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-[#6B705C] shrink-0" />
              <span>Narratieve psychosociale begeleiding</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-[#6B705C] shrink-0" />
              <span>Verheldering van complexe levenssituaties</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-[#6B705C] shrink-0" />
              <span>Ondersteuning bij ouderschap en identiteit</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-[#6B705C] shrink-0" />
              <span>Psycho-educatie en praktische handvatten</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-red-900/40 font-bold uppercase text-[10px] tracking-widest mb-6">
            <AlertCircle size={16} /> Buiten bereik (Niet)
          </h3>
          <ul className="space-y-4 text-sm opacity-60 leading-relaxed italic">
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-red-900/40 shrink-0" />
              <span>Geen diagnostiek (vaststellen van stoornissen)</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-red-900/40 shrink-0" />
              <span>Geen behandeling van zware psychiatrie</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-red-900/40 shrink-0" />
              <span>Geen crisisopvang of 24-uurs bereikbaarheid</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-red-900/40 shrink-0" />
              <span>Geen verplichte trajecten (Jeugdwet/Gecertificeerde Instellingen)</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-red-900/40 shrink-0" />
              <span>Geen doorverwijzing voor vergoede zorg (dat gaat via de huisarts)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 p-8 max-md:p-6 border border-[#A5A58D]/30 bg-[#F9F7F2] flex gap-6 items-start">
        <ShieldCheck className="text-[#6B705C] shrink-0" size={24} />
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Juridische Afbakening</h4>
          <p className="text-xs opacity-70 leading-relaxed">
            Omdat ik onafhankelijk werk, heb ik geen contracten met gemeenten of verzekeraars. Dit waarborgt uw privacy en mijn autonomie. Ik voer geen SKJ-registratie omdat mijn werkzaamheden vallen binnen het vrije domein van coaching en psychosociale ondersteuning, niet binnen de gereguleerde jeugdhulpverlening.
          </p>
        </div>
      </div>
    </div>
  );
}
