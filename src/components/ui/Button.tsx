
import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  fullWidth = false,
  className = '', 
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = "h-10 px-8 max-sm:w-full text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 rounded-sm active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#6B705C] text-white hover:bg-[#585E4A] hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none",
    outline: "border border-[#6B705C]/30 text-[#6B705C] hover:bg-[#6B705C]/5",
    ghost: "text-[#6B705C] hover:bg-[#6B705C]/10"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
};
