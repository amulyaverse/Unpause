'use client';
import { useEffect, ReactNode, useState } from 'react';
import { useStore } from '@/lib/store';
import { Sidebar, BrandStar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppLayout({ children }: { children: ReactNode }) {
  const hydrate = useStore(s => s.hydrate);
  const isHydrated = useStore(s => s.isHydrated);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { hydrate(); }, [hydrate]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#EBE5FF] border border-[#C5B4FF] flex items-center justify-center shadow-sm animate-pulseSubtle">
            <BrandStar className="w-8 h-8 text-[#7655E9]" />
          </div>
          <p className="text-[#30205C] font-jakarta font-extrabold text-2xl tracking-tight">UNPAUSE</p>
          <p className="text-[#7655E9] font-nunito font-semibold text-xs mt-1">Start. Pause. Pick up again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F6F0] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8F6F0]">{children}</main>
      </div>
    </div>
  );
}
