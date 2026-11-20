'use client';
import { Subject } from '@/lib/storage';
import { useStore } from '@/lib/store';
import { MoreVertical, Archive, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  subject: Subject;
  onClick?: () => void;
  onEdit?: () => void;
}

export function SubjectCard({ subject, onClick, onEdit }: SubjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const getTasksBySubject = useStore(s => s.getTasksBySubject);
  const archiveSubject = useStore(s => s.archiveSubject);
  const deleteSubject = useStore(s => s.deleteSubject);

  const tasks = getTasksBySubject(subject.id);
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    archiveSubject(subject.id);
    setMenuOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete "${subject.name}"? This won't delete its tasks.`)) {
      deleteSubject(subject.id);
    }
    setMenuOpen(false);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative bg-white rounded-2xl border border-gray-100 shadow-sm p-4 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5'
      )}
    >
      {/* Menu */}
      <div className="absolute top-3 right-3" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 rounded-lg text-gray-300 hover:text-navy hover:bg-lavender-light transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-8 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-32">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit?.(); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-navy hover:bg-lavender-light font-nunito"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={handleArchive}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-navy hover:bg-lavender-light font-nunito"
              >
                <Archive className="w-3 h-3" /> Archive
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-coral hover:bg-coral/5 font-nunito"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Icon & Name */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: subject.color + '30' }}
        >
          {subject.icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-navy font-jakarta text-sm leading-tight truncate">{subject.name}</h3>
          <p className="text-xs text-gray-400 font-nunito truncate">{subject.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-gray-500 font-nunito mb-2">
        <span>{totalTasks} task{totalTasks !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{completedTasks} done</span>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: subject.color }}
        />
      </div>
      <div className="text-right mt-1">
        <span className="text-xs text-gray-400 font-nunito">{progress}%</span>
      </div>
    </div>
  );
}
