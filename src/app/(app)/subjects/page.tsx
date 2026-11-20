'use client';
import { useState, useMemo, Suspense } from 'react';
import { useStore } from '@/lib/store';
import { Subject, Task } from '@/lib/storage';
import { NewSubjectModal } from '@/components/subjects/NewSubjectModal';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { NewTaskModal } from '@/components/tasks/NewTaskModal';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Button } from '@/components/ui/Button';
import { formatRelativeTime } from '@/lib/utils';
import {
  BookOpen, Plus, FolderPlus, ArrowLeft, Search,
  Calendar, CheckCircle2, Clock, Trash2, Archive, Edit3, Settings2
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function SubjectsContent() {
  const searchParams = useSearchParams();
  const initialSubjectId = searchParams.get('id');

  const { data, updateSubject, deleteSubject, archiveSubject } = useStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initialSubjectId);
  const [isNewSubjectOpen, setIsNewSubjectOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Active subjects naturally prioritized by recently accessed
  const subjects = useMemo(() => {
    return [...data.subjects]
      .filter(s => !s.archived)
      .sort((a, b) => {
        const aTime = a.lastWorkedOn ? new Date(a.lastWorkedOn).getTime() : 0;
        const bTime = b.lastWorkedOn ? new Date(b.lastWorkedOn).getTime() : 0;
        return bTime - aTime;
      });
  }, [data.subjects]);

  // Selected subject object
  const activeSubject = subjects.find(s => s.id === selectedSubjectId);

  // Tasks for selected subject
  const subjectTasks = useMemo(() => {
    if (!selectedSubjectId) return [];
    return data.tasks.filter(t => t.subjectId === selectedSubjectId && !t.archived);
  }, [data.tasks, selectedSubjectId]);

  // Overall stats for selected subject
  const completedCount = subjectTasks.filter(t => t.status === 'completed').length;
  const progressPct = subjectTasks.length > 0 ? Math.round((completedCount / subjectTasks.length) * 100) : 0;

  const handleEditSubject = (subj: Subject, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingSubject(subj);
    setIsNewSubjectOpen(true);
  };

  const handleOpenSubject = (id: string) => {
    updateSubject(id, { lastWorkedOn: new Date().toISOString() });
    setSelectedSubjectId(id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      {!activeSubject ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
              Subject Folders 📁
            </h1>
            <p className="text-sm text-[#30205C]/70 font-nunito mt-1">
              Organize assignments, syllabus modules, notes, and tasks by subject. Recently active subjects appear first.
            </p>
          </div>

          <Button
            onClick={() => { setEditingSubject(null); setIsNewSubjectOpen(true); }}
            className="flex items-center gap-2 shadow-sm bg-[#7655E9] hover:bg-[#6342D6] text-white"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Subject</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedSubjectId(null)}
              className="p-2 rounded-xl bg-white border border-[#E8E4D9] text-[#30205C] hover:bg-[#EBE5FF] transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeSubject.icon}</span>
                <h1 className="text-2xl font-extrabold text-[#30205C] font-jakarta">
                  {activeSubject.name}
                </h1>
                <button
                  onClick={() => handleEditSubject(activeSubject)}
                  className="p-1 text-gray-400 hover:text-[#7655E9] rounded-lg transition-colors"
                  title="Edit Folder Name / Color"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#30205C]/70 font-nunito mt-0.5">
                {activeSubject.description || 'Subject workspace'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleEditSubject(activeSubject)}
              className="gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Folder
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { archiveSubject(activeSubject.id); setSelectedSubjectId(null); }}
              className="text-gray-500 hover:text-[#30205C]"
            >
              <Archive className="w-3.5 h-3.5" /> Archive
            </Button>
            <Button
              onClick={() => setIsNewTaskOpen(true)}
              className="flex items-center gap-2 shadow-sm bg-[#7655E9] hover:bg-[#6342D6] text-white"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content: Folder Grid or Folder Details */}
      {!activeSubject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map(subject => {
            const tasks = data.tasks.filter(t => t.subjectId === subject.id && !t.archived);
            const done = tasks.filter(t => t.status === 'completed').length;
            const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

            return (
              <div
                key={subject.id}
                onClick={() => handleOpenSubject(subject.id)}
                className="bg-white rounded-3xl p-5 border border-[#E8E4D9] hover:border-[#7655E9] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-2xs border border-black/5"
                      style={{ backgroundColor: (subject.color || '#7655E9') + '25' }}
                    >
                      {subject.icon}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#30205C] bg-[#F8F6F0] px-2.5 py-1 rounded-full border border-[#E8E4D9] font-nunito">
                        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={(e) => handleEditSubject(subject, e)}
                        className="p-1 rounded-lg text-gray-300 hover:text-[#7655E9] transition-colors"
                        title="Edit Subject"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-jakarta font-extrabold text-base text-[#30205C] group-hover:text-[#7655E9] mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-nunito line-clamp-2 mb-4">
                    {subject.description || 'Assignments, syllabus, and problem sets.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E4D9]">
                  <div className="flex items-center justify-between text-xs font-nunito text-gray-500 mb-1.5">
                    <span>Progress</span>
                    <span className="font-extrabold text-[#30205C]">{pct}%</span>
                  </div>
                  <div className="w-full bg-[#EBE5FF] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: subject.color || '#7655E9' }}
                    />
                  </div>
                  {subject.lastWorkedOn && (
                    <p className="text-[10px] text-[#7655E9] font-semibold font-nunito mt-2 text-right">
                      Active {formatRelativeTime(subject.lastWorkedOn)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Create Subject Card CTA */}
          <div
            onClick={() => { setEditingSubject(null); setIsNewSubjectOpen(true); }}
            className="border-2 border-dashed border-[#C5B4FF] hover:border-[#7655E9] rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#EBE5FF]/40 transition-all min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EBE5FF] text-[#7655E9] flex items-center justify-center mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <p className="font-jakarta font-bold text-[#30205C] text-sm">Add New Subject</p>
            <p className="text-xs text-gray-400 font-nunito mt-1">E.g. Physics, DBMS, Control Systems</p>
          </div>
        </div>
      ) : (
        /* Single Subject Detail View */
        <div className="space-y-6">
          {/* Progress summary banner */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E4D9] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: (activeSubject.color || '#7655E9') + '25' }}>
                {activeSubject.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-[#7655E9] font-jakarta uppercase tracking-wider">Subject Progress</p>
                <p className="text-xl font-extrabold text-[#30205C] font-jakarta mt-0.5">
                  {completedCount} of {subjectTasks.length} tasks completed ({progressPct}%)
                </p>
              </div>
            </div>

            <div className="w-full sm:w-48 bg-[#EBE5FF] h-3 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPct}%`, backgroundColor: activeSubject.color || '#7655E9' }}
              />
            </div>
          </div>

          {/* Tasks in this Subject */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#30205C] font-jakarta">Tasks & Assignments</h2>
              <Button size="sm" onClick={() => setIsNewTaskOpen(true)} className="bg-[#7655E9] hover:bg-[#6342D6] text-white">
                <Plus className="w-3.5 h-3.5" /> Add Task Here
              </Button>
            </div>

            {subjectTasks.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E8E4D9] p-8 text-center">
                <p className="text-sm text-gray-500 font-nunito">No tasks in this subject folder yet.</p>
                <Button size="sm" className="mt-3 bg-[#7655E9] text-white" onClick={() => setIsNewTaskOpen(true)}>
                  Create first task
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => setSelectedTaskId(task.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* New / Edit Subject Modal */}
      <NewSubjectModal
        isOpen={isNewSubjectOpen}
        onClose={() => { setIsNewSubjectOpen(false); setEditingSubject(null); }}
        editSubject={editingSubject}
      />

      {/* New Task Modal (Pre-linked to this subject if open) */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        initialSubjectId={selectedSubjectId || undefined}
      />

      {/* Task Detail Modal */}
      {selectedTaskId && (
        <TaskDetailModal
          isOpen={true}
          onClose={() => setSelectedTaskId(null)}
          taskId={selectedTaskId}
        />
      )}
    </div>
  );
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-unpause-deep/60">Loading subjects...</div>}>
      <SubjectsContent />
    </Suspense>
  );
}
