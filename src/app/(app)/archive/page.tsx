'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Archive, RotateCcw, Trash2, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

export default function ArchivePage() {
  const { data, restoreTask, deleteTask, restoreSubject, deleteSubject } = useStore();
  const [activeTab, setActiveTab] = useState<'tasks' | 'subjects'>('tasks');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const archivedTasks = data.tasks.filter(t => t.archived);
  const archivedSubjects = data.subjects.filter(s => s.archived);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBE5FF] border border-[#C5B4FF] text-xs font-bold text-[#7655E9] font-jakarta mb-2">
            <Archive className="w-3.5 h-3.5 text-[#7655E9]" />
            <span>Clean Workspace • Nothing Lost</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
            Archive Box 📦
          </h1>
          <p className="text-sm text-[#30205C]/75 font-nunito mt-1">
            Finished terms, old homework, and past modules tucked away. Restore anytime.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#E8E4D9] text-xs font-bold font-nunito shadow-xs">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'tasks' ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'
            }`}
          >
            Archived Tasks ({archivedTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'subjects' ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'
            }`}
          >
            Archived Subjects ({archivedSubjects.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'tasks' ? (
        archivedTasks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="w-16 h-16 bg-lavender-light rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
              📦
            </div>
            <h3 className="font-jakarta font-bold text-lg text-navy">No archived tasks</h3>
            <p className="text-sm text-gray-500 font-nunito mt-1 max-w-sm mx-auto">
              When you finish a major term or want to declutter your list without losing work, archive it from the task detail modal.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {archivedTasks.map(task => (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-bold font-nunito">
                      {task.status}
                    </span>
                    <h3 className="font-jakarta font-bold text-sm text-navy truncate">
                      {task.title}
                    </h3>
                  </div>
                  {task.archivedAt && (
                    <p className="text-[11px] text-gray-400 font-nunito mt-1">
                      Archived {formatRelativeTime(task.archivedAt)}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => restoreTask(task.id)}
                    className="gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteTask(task.id)}
                    className="p-2"
                    title="Permanently Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        archivedSubjects.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xs">
            <div className="w-16 h-16 bg-lavender-light rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
              📚
            </div>
            <h3 className="font-jakarta font-bold text-lg text-navy">No archived subjects</h3>
            <p className="text-sm text-gray-500 font-nunito mt-1 max-w-sm mx-auto">
              Past semesters or concluded courses can be archived to keep your current subjects front and center.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {archivedSubjects.map(sub => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl">{sub.icon}</span>
                  <div>
                    <h3 className="font-jakarta font-bold text-sm text-navy truncate">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-nunito">
                      {sub.description || 'Subject folder'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => restoreSubject(sub.id)}
                    className="gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteSubject(sub.id)}
                    className="p-2"
                    title="Permanently Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
