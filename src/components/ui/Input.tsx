
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'light' | 'dark' | 'glass';
}

export const Input = ({ 
  className = '', 
  variant = 'light',
  ...props 
}: InputProps) => {
  const baseStyles = "h-10 w-full px-4 text-sm outline-none transition-all rounded-sm";
  
  const variants = {
    light: "bg-white border border-[#A5A58D]/30 focus:border-[#6B705C] text-[#333D3B] placeholder:text-[#333D3B]/50",
    dark: "bg-[#333D3B] border border-[#A5A58D]/30 text-white focus:border-white placeholder:text-white/50",
    glass: "bg-white/10 border border-white/20 text-white focus:border-white placeholder:text-white/50 backdrop-blur-sm"
  };

  return (
    <input 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
