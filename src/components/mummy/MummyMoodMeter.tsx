'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { getMummyMoodData } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDueDate } from '@/lib/utils';

const MOODS = ['chill', 'suspicious', 'alert', 'lecture'] as const;

export function MummyMoodMeter() {
  const [expanded, setExpanded] = useState(false);
  const getMoodFn = useStore(s => s.getMummyMood);
  const data = useStore(s => s.data);
  const mood = getMoodFn();
  const moodData = getMummyMoodData(mood);
  const [msgIdx] = useState(() => Math.floor(Math.random() * moodData.messages.length));

  const activeTasks = data.tasks.filter(t => !t.archived && t.status !== 'completed');
  const now = new Date();
  const overdue = activeTasks.filter(t => t.dueDate && new Date(t.dueDate) < now && new Date(t.dueDate).toDateString() !== now.toDateString());
  const dueToday = activeTasks.filter(t => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate).toDateString() === now.toDateString();
  });

  const whyText = () => {
    if (mood === 'lecture' && overdue.length > 0) {
      return `You have ${overdue.length} overdue task${overdue.length > 1 ? 's' : ''}: "${overdue[0].title}"${overdue.length > 1 ? ` and ${overdue.length - 1} more` : ''}. Mummy is NOT happy.`;
    }
    if (mood === 'alert' && dueToday.length > 0) {
      return `${dueToday.length} task${dueToday.length > 1 ? 's' : ''} due today! Get moving: "${dueToday[0].title}".`;
    }
    if (mood === 'suspicious') {
      return `You have ${activeTasks.length} pending tasks. Mummy is watching.`;
    }
    return `All tasks are on track. Keep it up!`;
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Header */}
      <div
        className="flex items-center gap-4 p-4 cursor-pointer"
        style={{ background: moodData.bgColor }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-4xl">{moodData.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-navy font-jakarta text-sm">{moodData.label}</p>
          </div>
          <p className="text-sm text-navy/70 font-nunito italic">&ldquo;{moodData.messages[msgIdx % moodData.messages.length]}&rdquo;</p>
          {/* Mood bar */}
          <div className="flex gap-1 mt-2">
            {MOODS.map((m) => {
              const md = getMummyMoodData(m);
              return (
                <div key={m} className="flex-1 relative">
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      mood === m ? 'scale-y-150 origin-bottom' : 'opacity-40'
                    )}
                    style={{ background: md.color }}
                  />
                  {mood === m && (
                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs"
                    >
                      {md.emoji}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button className="text-navy/40 hover:text-navy transition-colors">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="bg-white border-t border-gray-100 p-4 animate-fadeIn">
          <p className="text-sm font-bold text-navy font-jakarta mb-1">Why is Mummy {mood === 'chill' ? 'chill' : mood === 'suspicious' ? 'suspicious' : mood === 'alert' ? 'alert' : 'in full lecture mode'}?</p>
          <p className="text-sm text-gray-600 font-nunito mb-3">{whyText()}</p>

          {overdue.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-bold text-coral font-jakarta uppercase tracking-wide">Overdue</p>
              {overdue.slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center gap-2 text-xs text-gray-600 font-nunito">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                  <span className="truncate">{t.title}</span>
                  <span className="ml-auto text-coral flex-shrink-0">{t.dueDate ? formatDueDate(t.dueDate) : ''}</span>
                </div>
              ))}
            </div>
          )}

          {dueToday.length > 0 && (
            <div className="space-y-1 mt-2">
              <p className="text-xs font-bold text-amber-600 font-jakarta uppercase tracking-wide">Due Today</p>
              {dueToday.slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center gap-2 text-xs text-gray-600 font-nunito">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
