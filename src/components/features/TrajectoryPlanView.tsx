
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Session {
  sessionNumber: number;
  step: string;
  description: string;
}

interface TrajectoryData {
  title: string;
  description: string;
  sessions: Session[];
  suggestions?: string[];
}

export const TrajectoryPlanView = ({ 
    data, 
    onSuggestionClick 
}: { 
    data: TrajectoryData, 
    onSuggestionClick?: (s: string) => void 
}) => {
  if (!data) return null;

  return (
    <div className="bg-white border-t-4 border-[#6B705C] shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h4 className="font-serif text-2xl text-[#333D3B] mb-2">{data.title}</h4>
        <p className="text-[#333D3B]/70 italic">{data.description}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[#6B705C] uppercase tracking-widest border-b border-[#A5A58D]/20">
            <tr>
              <th className="px-4 py-3 font-bold">#</th>
              <th className="px-4 py-3 font-bold">Fase</th>
              <th className="px-4 py-3 font-bold">Inhoud</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A5A58D]/10">
            {data.sessions?.map((session) => (
              <tr key={session.sessionNumber} className="hover:bg-[#F9F7F2]/50 transition-colors">
                <td className="px-4 py-4 font-bold text-[#6B705C]">{session.sessionNumber}</td>
                <td className="px-4 py-4 font-medium text-[#333D3B]">{session.step}</td>
                <td className="px-4 py-4 text-[#333D3B]/70 leading-relaxed max-w-md">{session.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.suggestions && data.suggestions.length > 0 && onSuggestionClick && (
         <div className="mt-8 pt-6 border-t border-[#A5A58D]/20">
            <p className="text-xs uppercase tracking-widest font-bold text-[#333D3B]/50 mb-3 text-center">Of bedoel je misschien:</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {data.suggestions.map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => onSuggestionClick(s)}
                        className="px-4 py-2 bg-[#F9F7F2] border border-[#A5A58D]/30 text-xs text-[#333D3B] hover:bg-[#6B705C] hover:text-white hover:border-[#6B705C] transition-all rounded-full"
                    >
                        {s}
                    </button>
                ))}
            </div>
         </div>
      )}

      <div className="mt-8 pt-6 border-t border-[#A5A58D]/20 flex gap-4 text-xs text-[#333D3B]/50 justify-center">
        <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Persoonlijk Plan</span>
        <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Vrijblijvend</span>
      </div>
    </div>
  );
};
