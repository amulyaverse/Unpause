'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Search, CheckSquare, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const data = useStore(s => s.data);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const q = query.toLowerCase().trim();

  const taskResults = q ? data.tasks.filter(t =>
    !t.archived && (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    )
  ).slice(0, 5) : [];

  const subjectResults = q ? data.subjects.filter(s =>
    !s.archived && (
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    )
  ).slice(0, 3) : [];

  const hasResults = taskResults.length > 0 || subjectResults.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-0">
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E8E4D9]">
        <Search className="w-5 h-5 text-[#7655E9] flex-shrink-0" />
        <input
          autoFocus
          type="text"
          placeholder="Search tasks, subjects, assignments..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 outline-none text-[#30205C] font-nunito text-sm bg-transparent placeholder-gray-400"
        />
      </div>

      <div className="max-h-80 overflow-y-auto">
        {!q && (
          <div className="px-4 py-8 text-center text-gray-400 font-nunito text-sm">
            Start typing to search your tasks and subjects
          </div>
        )}

        {q && !hasResults && (
          <div className="px-4 py-8 text-center text-gray-400 font-nunito text-sm">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}

        {taskResults.length > 0 && (
          <div className="py-2">
            <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wide font-jakarta">Tasks</div>
            {taskResults.map(task => (
              <button
                key={task.id}
                onClick={() => { router.push('/tasks'); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-lavender-light transition-colors text-left"
              >
                <CheckSquare className="w-4 h-4 text-lavender-dark flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy font-jakarta truncate">{task.title}</p>
                  <p className="text-xs text-gray-400 font-nunito truncate">{task.description}</p>
                </div>
                <span className={cn('ml-auto text-xs px-2 py-0.5 rounded-full font-semibold font-nunito flex-shrink-0',
                  task.priority === 'high' ? 'bg-coral/10 text-coral' :
                  task.priority === 'medium' ? 'bg-yellow/40 text-amber-700' :
                  'bg-lavender-light text-navy'
                )}>
                  {task.priority}
                </span>
              </button>
            ))}
          </div>
        )}

        {subjectResults.length > 0 && (
          <div className="py-2 border-t border-gray-50">
            <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wide font-jakarta">Subjects</div>
            {subjectResults.map(subj => (
              <button
                key={subj.id}
                onClick={() => { router.push('/subjects'); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-lavender-light transition-colors text-left"
              >
                <span className="text-lg">{subj.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy font-jakarta truncate">{subj.name}</p>
                  <p className="text-xs text-gray-400 font-nunito truncate">{subj.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
