'use client';
import { useStore } from '@/lib/store';
import { Check, Loader2 } from 'lucide-react';

export function AutosaveIndicator() {
  const { isSaving, lastSaved } = useStore();
  if (isSaving) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBE5FF] border border-[#C5B4FF] text-xs font-bold text-[#7655E9] font-nunito animate-pulse">
        <Loader2 className="w-3 h-3 animate-spin" /> Saving...
      </span>
    );
  }
  if (lastSaved) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D9F36A]/40 border border-[#D9F36A] text-xs font-bold text-[#30205C] font-nunito">
        <Check className="w-3 h-3 text-[#30205C]" /> Saved
      </span>
    );
  }
  return null;
}
