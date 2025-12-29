import { BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

interface Section {
  title: string;
  content: string;
}

interface PsychoEducationData {
  title: string;
  summary: string;
  sections?: Section[];
  sources?: { title: string; uri: string }[];
}

export const PsychoEducationView = ({ data }: { data: PsychoEducationData }) => {
  if (!data) return null;

  return (
    <div className="bg-[#F9F7F2] border-t-4 border-[#333D3B] p-8 shadow-sm rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="mb-6 border-b border-[#333D3B]/10 pb-6">
        <h4 className="font-serif text-2xl text-[#333D3B] mb-3 flex items-center gap-3">
            <BookOpen size={20} className="text-[#6B705C]"/>
            {data.title}
        </h4>
        <p className="text-[#333D3B]/80 leading-relaxed italic">{data.summary}</p>
      </div>

      <div className="space-y-6">
        {data.sections?.map((section, idx) => (
          <div key={idx} className="bg-white p-6 border border-[#A5A58D]/20 rounded-sm">
            <h5 className="font-bold text-[#333D3B] mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <HelpCircle size={14} className="text-[#6B705C]"/>
                {section.title}
            </h5>
            <div className="text-sm text-[#333D3B]/70 leading-relaxed">
              {section.content.split('\n').map((line, i) => {
                const isBullet = line.trim().startsWith('*') || line.trim().startsWith('-');
                const cleanLine = line.replace(/^[\*-]\s*/, '').trim();
                
                if (!cleanLine) return <br key={i} />;
                
                // Simple bold parser: splits by ** and alternates normal/bold
                const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
                
                const formattedContent = parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-bold text-[#333D3B]">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={j}>{part}</span>;
                });

                if (isBullet) {
                    return (
                        <div key={i} className="flex gap-3 mb-2 ml-2">
                             <div className="mt-[7px] min-w-[6px] h-[6px] rounded-full bg-[#6B705C] shrink-0" />
                             <p>{formattedContent}</p>
                        </div>
                    );
                }
                
                return <p key={i} className="mb-2">{formattedContent}</p>;
              })}
            </div>
          </div>
        ))}
      </div>

      {data.sources && data.sources.length > 0 && (
        <div className="mt-8 pt-4 border-t border-[#A5A58D]/20">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#333D3B]/40 mb-2">Bronnen</p>
          <ul className="space-y-1">
            {data.sources.map((source, i) => (
              <li key={i}>
                <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] text-[#6B705C] hover:underline"
                >
                    <ExternalLink size={10} />
                    {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
