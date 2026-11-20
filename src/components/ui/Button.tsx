'use client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'lavender' | 'lime' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-jakarta';
    const variants = {
      primary: 'bg-[#7655E9] text-white hover:bg-[#6342D6] focus:ring-[#7655E9] shadow-sm',
      secondary: 'bg-[#EBE5FF] text-[#30205C] hover:bg-[#C5B4FF] focus:ring-[#7655E9] border border-[#C5B4FF]',
      ghost: 'bg-transparent text-[#30205C] hover:bg-[#EBE5FF] focus:ring-[#7655E9]',
      danger: 'bg-[#FF5C5C] text-white hover:bg-[#E04848] focus:ring-[#FF5C5C]',
      lavender: 'bg-[#7655E9] text-white hover:bg-[#6342D6] focus:ring-[#7655E9] shadow-sm',
      lime: 'bg-[#D9F36A] text-[#30205C] hover:bg-[#C8E350] focus:ring-[#D9F36A] font-extrabold shadow-sm',
      purple: 'bg-[#30205C] text-white hover:bg-[#422D7A] focus:ring-[#30205C] shadow-sm',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
