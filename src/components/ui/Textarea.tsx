
import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'light' | 'dark' | 'glass';
}

export const Textarea = ({ 
  className = '', 
  variant = 'light',
  ...props 
}: TextareaProps) => {
  const baseStyles = "w-full p-4 text-sm outline-none transition-all rounded-sm resize-y min-h-[120px]";
  
  const variants = {
    light: "bg-white border border-[#A5A58D]/30 focus:border-[#6B705C] text-[#333D3B] placeholder:text-[#333D3B]/50",
    dark: "bg-[#333D3B] border border-[#A5A58D]/30 text-white focus:border-white placeholder:text-white/50",
    glass: "bg-white/10 border border-white/20 text-white focus:border-white placeholder:text-white/50 backdrop-blur-sm"
  };

  return (
    <textarea 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
