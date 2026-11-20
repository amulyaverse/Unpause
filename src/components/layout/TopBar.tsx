'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { AutosaveIndicator } from '@/components/ui/AutosaveIndicator';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { Menu, Search, Bell, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const data = useStore(s => s.data);
  const name = data.preferences.userName;
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const pendingReminders = data.reminders.filter(r => !r.dismissed).length;

  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-[#E8E4D9] flex-shrink-0">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl hover:bg-[#EBE5FF] text-[#30205C] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#7655E9] font-jakarta bg-[#EBE5FF] px-2.5 py-1 rounded-full border border-[#C5B4FF]">
              {format(new Date(), 'EEEE, d MMM yyyy')}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <AutosaveIndicator />
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-xl hover:bg-[#EBE5FF] text-[#30205C]/70 hover:text-[#30205C] transition-colors border border-transparent hover:border-[#C5B4FF]"
            title="Global Search (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => { window.location.href = '/reminders'; }}
            className="relative p-2 rounded-xl hover:bg-[#EBE5FF] text-[#30205C]/70 hover:text-[#30205C] transition-colors border border-transparent hover:border-[#C5B4FF]"
            title="Notifications & Reminders"
          >
            <Bell className="w-4 h-4" />
            {pendingReminders > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#D9F36A] text-[#30205C] text-[10px] rounded-full flex items-center justify-center font-black shadow-xs">
                {pendingReminders}
              </span>
            )}
          </button>
          <div className={cn(
            'w-8 h-8 rounded-xl bg-[#7655E9] text-white flex items-center justify-center',
            'text-xs font-extrabold font-jakarta cursor-pointer select-none shadow-xs hover:scale-105 transition-transform'
          )}>
            {initials || 'U'}
          </div>
        </div>
      </header>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
