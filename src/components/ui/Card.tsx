import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'lavender' | 'lime' | 'purple' | 'soft' | 'cream' | 'offwhite';
  hover?: boolean;
}

export function Card({ className, variant = 'default', hover = false, children, ...props }: CardProps) {
  const variants = {
    default: 'bg-white border border-[#E8E4D9]',
    lavender: 'bg-[#EBE5FF] border border-[#C5B4FF]',
    lime: 'bg-[#D9F36A]/20 border border-[#D9F36A]',
    purple: 'bg-[#30205C] text-white border border-[#422D7A]',
    soft: 'bg-[#EBE5FF] border border-[#C5B4FF]',
    cream: 'bg-[#F8F6F0] border border-[#E8E4D9]',
    offwhite: 'bg-[#F8F6F0] border border-[#E8E4D9]',
  };
  return (
    <div
      className={cn(
        'rounded-2xl p-4 shadow-xs',
        variants[variant],
        hover && 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
