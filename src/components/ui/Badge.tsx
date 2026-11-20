import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'priority-high' | 'priority-medium' | 'priority-low' | 'status-pending' | 'status-in-progress' | 'status-completed' | 'overdue' | 'today' | 'lime' | 'default';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    'priority-high': 'bg-[#FF5C5C]/15 text-[#E04848] border-[#FF5C5C]/30',
    'priority-medium': 'bg-[#D9F36A]/40 text-[#30205C] border-[#D9F36A] font-bold',
    'priority-low': 'bg-[#EBE5FF] text-[#30205C] border-[#C5B4FF]',
    'status-pending': 'bg-[#EDE9DE] text-[#30205C]/80 border-[#E8E4D9]',
    'status-in-progress': 'bg-[#EBE5FF] text-[#7655E9] border-[#C5B4FF] font-bold',
    'status-completed': 'bg-[#D9F36A] text-[#30205C] border-[#D9F36A] font-extrabold',
    'overdue': 'bg-[#FF5C5C]/15 text-[#E04848] border-[#FF5C5C]/30 font-bold',
    'today': 'bg-[#D9F36A]/50 text-[#30205C] border-[#D9F36A] font-bold',
    'lime': 'bg-[#D9F36A] text-[#30205C] border-[#D9F36A] font-extrabold',
    'default': 'bg-[#EDE9DE] text-[#30205C]/80 border-[#E8E4D9]',
  };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold border font-nunito', variants[variant], className)}>
      {children}
    </span>
  );
}
