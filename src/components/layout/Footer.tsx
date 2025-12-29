import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#333D3B] text-[#F9F7F2] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-sm opacity-60">
        <div><h4 className="font-serif text-lg mb-4 text-white opacity-100">Inzicht & Ordening</h4><p>Psychologische begeleiding gericht op rust en eigen regie.</p></div>
        <div><h4 className="uppercase tracking-widest text-[10px] mb-4 text-white opacity-100">Beschikbaarheid</h4><p>Maandag, Dinsdag, Donderdag<br />Regio Leiden / Online</p></div>
        <div><h4 className="uppercase tracking-widest text-[10px] mb-4 text-white opacity-100">Juridisch</h4><p>Geen crisiszorg. Geen GGZ-behandeling.<br />KVK: 12345678</p></div>
      </div>
    </footer>
  );
}
