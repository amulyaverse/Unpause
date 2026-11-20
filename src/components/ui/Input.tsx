'use client';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-navy font-jakarta">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-navy placeholder-gray-400 font-nunito text-sm',
          'focus:outline-none focus:ring-2 focus:ring-lavender focus:border-lavender transition-all',
          error && 'border-coral focus:ring-coral',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-coral font-nunito">{error}</span>}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-navy font-jakarta">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          'w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-navy placeholder-gray-400 font-nunito text-sm resize-none',
          'focus:outline-none focus:ring-2 focus:ring-lavender focus:border-lavender transition-all',
          error && 'border-coral focus:ring-coral',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-coral font-nunito">{error}</span>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
