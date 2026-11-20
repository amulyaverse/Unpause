'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { getMummyMoodData } from '@/lib/utils';
import {
  LayoutDashboard, CheckSquare, BookOpen, Zap, BarChart2,
  Archive, Bell, Settings, X, Play, Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Brand Star / Unpause Symbol matching UNPAUSE design system
export function BrandStar({ className = "w-6 h-6 text-white" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 8.5L21 9.5L16 14.5L17.5 21L12 17.5L6.5 21L8 14.5L3 9.5L9.5 8.5L12 2Z" fill="#D9F36A" stroke="#30205C" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.8" fill="#30205C" />
    </svg>
  );
}

// Cute sleeping cat doodle mascot with UNPAUSE styling
export function SleepingCatMascot({ className = "w-full" }: { className?: string }) {
  return (
    <div className={cn("relative flex flex-col items-center select-none", className)}>
      <div className="relative w-36 h-24">
        {/* Thought / doodle lines */}
        <div className="absolute -top-2 left-3 text-xs font-bold text-[#D9F36A] rotate-[-10deg] tracking-wider font-jakarta">
          Zzz...
        </div>
        <div className="absolute top-1 right-3 text-[#D9F36A] text-xs">
          ✦
        </div>

        {/* Cat SVG Illustration */}
        <svg viewBox="0 0 140 90" className="w-full h-full drop-shadow-sm">
          {/* Soft Lavender cushion / pillow */}
          <path d="M10 75 Q70 65 130 75 Q135 88 120 88 Q70 82 20 88 Q5 88 10 75 Z" fill="#C5B4FF" stroke="#7655E9" strokeWidth="1.5" />
          
          {/* Cat body */}
          <ellipse cx="65" cy="55" rx="36" ry="24" fill="#FFFFFF" stroke="#30205C" strokeWidth="2" />
          {/* Cat patches */}
          <path d="M75 35 Q90 40 95 55 Q85 62 70 58 Z" fill="#30205C" opacity="0.9" />
          
          {/* Cat head */}
          <ellipse cx="40" cy="50" rx="20" ry="18" fill="#FFFFFF" stroke="#30205C" strokeWidth="2" />
          {/* Left ear */}
          <polygon points="26,40 32,25 42,36" fill="#30205C" stroke="#30205C" strokeWidth="2" />
          {/* Right ear */}
          <polygon points="42,35 52,26 56,41" fill="#FFFFFF" stroke="#30205C" strokeWidth="2" />
          <polygon points="45,36 50,30 53,39" fill="#C5B4FF" />
          
          {/* Sleeping closed eyes */}
          <path d="M30 50 Q34 54 38 50" fill="none" stroke="#30205C" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 50 Q46 54 50 50" fill="none" stroke="#30205C" strokeWidth="2" strokeLinecap="round" />
          {/* Nose & mouth */}
          <path d="M39 54 L41 54 L40 56 Z" fill="#7655E9" />
          <path d="M37 57 Q40 60 43 57" fill="none" stroke="#30205C" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Whiskers */}
          <line x1="22" y1="52" x2="14" y2="50" stroke="#30205C" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="55" x2="15" y2="56" stroke="#30205C" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="52" x2="64" y2="50" stroke="#30205C" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="55" x2="63" y2="56" stroke="#30205C" strokeWidth="1.5" strokeLinecap="round" />

          {/* Sleeping paws */}
          <ellipse cx="44" cy="67" rx="8" ry="6" fill="#FFFFFF" stroke="#30205C" strokeWidth="1.8" />
          <ellipse cx="60" cy="67" rx="8" ry="6" fill="#FFFFFF" stroke="#30205C" strokeWidth="1.8" />
          {/* Curled tail */}
          <path d="M98 60 Q112 55 110 45 Q106 38 100 42" fill="none" stroke="#30205C" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Handwritten text with Lime accent */}
      <div className="text-center mt-1">
        <p className="font-bold text-[#D9F36A] font-jakarta text-xs tracking-tight">
          You&apos;ve got this! <span className="text-[#C5B4FF]">♡</span>
        </p>
      </div>
    </div>
  );
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/tasks', icon: CheckSquare, label: 'My Tasks' },
  { href: '/subjects', icon: BookOpen, label: 'Subjects' },
  { href: '/focus', icon: Zap, label: 'Focus' },
  { href: '/progress', icon: BarChart2, label: 'Progress' },
  { href: '/archive', icon: Archive, label: 'Archive' },
  { href: '/reminders', icon: Bell, label: 'Reminders' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const data = useStore(s => s.data);
  const getMummyMood = useStore(s => s.getMummyMood);
  const mood = getMummyMood();
  const moodData = getMummyMoodData(mood);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#30205C] border-r border-[#422D7A] text-white">
      {/* Brand Logo: UNPAUSE */}
      <div className="px-5 py-5 border-b border-[#422D7A]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#7655E9] border border-[#C5B4FF]/40 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
            <BrandStar className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-jakarta font-black text-lg text-white tracking-tight block leading-tight">
              UNPAUSE
            </span>
            <span className="text-[10px] text-[#C5B4FF] font-nunito font-semibold tracking-wide">
              Start. Pause. Pick up again.
            </span>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 font-nunito',
                isActive
                  ? 'bg-[#7655E9] text-white shadow-sm font-bold'
                  : 'text-[#C5B4FF]/80 hover:bg-[#422D7A] hover:text-white'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-white' : 'text-[#C5B4FF]/70')} />
              <span>{label}</span>
              {label === 'Reminders' && data.reminders.filter(r => !r.dismissed).length > 0 && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#D9F36A] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mummy Mood Widget in Sidebar */}
      <div className="mx-3 mb-2 p-2.5 rounded-xl bg-[#211542] border border-[#422D7A] shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-xl flex-shrink-0">{moodData.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-white font-jakarta truncate">{moodData.label}</p>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#7655E9] text-white font-bold">Mummy Mode</span>
            </div>
            <p className="text-[10px] text-[#C5B4FF] font-nunito truncate mt-0.5">
              {moodData.messages[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Mascot at bottom */}
      <div className="px-4 py-3 border-t border-[#422D7A] bg-[#211542]/60">
        <SleepingCatMascot />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col flex-shrink-0 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-[#211542]/70 backdrop-blur-xs" onClick={onClose} />
          <div className="relative w-64 bg-[#30205C] h-full z-10 shadow-2xl flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#C5B4FF] hover:text-white hover:bg-[#422D7A]"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
