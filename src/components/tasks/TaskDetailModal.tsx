'use client';
import { useState } from 'react';
import { Task, Subtask, Priority, TaskStatus } from '@/lib/storage';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/lib/storage';
import { cn, formatRelativeTime } from '@/lib/utils';
import { Check, Trash2, Archive, Plus, X, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TaskDetailModalProps {
  task?: Task | null;
  taskId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];
const STATUSES: TaskStatus[] = ['pending', 'in-progress', 'completed'];

export function TaskDetailModal({ task: initialTask, taskId, isOpen, onClose }: TaskDetailModalProps) {
  const router = useRouter();
  const updateTask = useStore(s => s.updateTask);
  const deleteTask = useStore(s => s.deleteTask);
  const archiveTask = useStore(s => s.archiveTask);
  const touchTask = useStore(s => s.touchTask);
  const data = useStore(s => s.data);

  const [newSubtask, setNewSubtask] = useState('');

  // Always resolve the freshest task from store
  const targetId = taskId || initialTask?.id;
  const task = data.tasks.find(t => t.id === targetId) || initialTask;

  if (!task) return null;

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    const subtask: Subtask = {
      id: generateId(),
      title: newSubtask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    updateTask(task.id, { subtasks: [...task.subtasks, subtask], lastWorkedOn: new Date().toISOString() });
    setNewSubtask('');
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updated = task.subtasks.map(s =>
      s.id === subtaskId ? { ...s, completed: !s.completed } : s
    );
    updateTask(task.id, { subtasks: updated, lastWorkedOn: new Date().toISOString() });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    updateTask(task.id, { subtasks: task.subtasks.filter(s => s.id !== subtaskId) });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  const handleArchive = () => {
    archiveTask(task.id);
    onClose();
  };

  const handleStartFocus = () => {
    touchTask(task.id);
    onClose();
    router.push(`/focus?taskId=${task.id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" className="max-h-[90vh] overflow-y-auto">
      {/* Title */}
      <div className="mb-4">
        <input
          className="w-full text-lg font-bold text-navy font-jakarta bg-transparent border-0 outline-none focus:ring-0 p-0 placeholder-gray-300"
          value={task.title}
          onChange={e => updateTask(task.id, { title: e.target.value, lastWorkedOn: new Date().toISOString() })}
          placeholder="Task title..."
        />
        {task.lastWorkedOn && (
          <p className="text-xs text-gray-400 font-nunito mt-1">
            Last worked on {formatRelativeTime(task.lastWorkedOn)}
          </p>
        )}
      </div>

      {/* Priority & Status */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <p className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide mb-1">Priority</p>
          <div className="flex gap-1">
            {PRIORITIES.map(p => (
              <button
                key={p}
                onClick={() => updateTask(task.id, { priority: p })}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold font-nunito border transition-all',
                  task.priority === p
                    ? p === 'high' ? 'bg-coral text-white border-coral'
                      : p === 'medium' ? 'bg-yellow text-navy border-yellow'
                      : 'bg-lavender text-navy border-lavender'
                    : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide mb-1">Status</p>
          <div className="flex gap-1">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => updateTask(task.id, { status: s, lastWorkedOn: new Date().toISOString() })}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold font-nunito border transition-all',
                  task.status === s
                    ? 'bg-navy text-white border-navy'
                    : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subject & Due Date */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-32">
          <label className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide block mb-1">Subject</label>
          <select
            value={task.subjectId || ''}
            onChange={e => updateTask(task.id, { subjectId: e.target.value || null })}
            className="w-full text-sm font-nunito border border-gray-200 rounded-xl px-3 py-2 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-lavender"
          >
            <option value="">No subject</option>
            {data.subjects.filter(s => !s.archived).map(s => (
              <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-32">
          <label className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide block mb-1">Due Date</label>
          <input
            type="date"
            value={task.dueDate ? task.dueDate.split('T')[0] : ''}
            onChange={e => updateTask(task.id, { dueDate: e.target.value ? new Date(e.target.value).toISOString() : null })}
            className="w-full text-sm font-nunito border border-gray-200 rounded-xl px-3 py-2 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-lavender"
          />
        </div>
      </div>

      {/* Description with Autosave */}
      <div className="mb-4">
        <label className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide block mb-1">Description (Autosaved)</label>
        <textarea
          value={task.description}
          onChange={e => updateTask(task.id, { description: e.target.value, lastWorkedOn: new Date().toISOString() })}
          placeholder="Add details, formula, assignment question..."
          rows={3}
          className="w-full text-sm font-nunito border border-gray-200 rounded-xl px-3 py-2 bg-white text-navy placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lavender resize-none"
        />
      </div>

      {/* Break Down Big Tasks — Subtasks Checklist */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide">
            Break Down Task Steps ({task.subtasks.filter(s => s.completed).length}/{task.subtasks.length})
          </label>
          {task.subtasks.length > 0 && (
            <div className="text-xs font-bold text-navy font-nunito">{task.progress}% complete</div>
          )}
        </div>

        {task.subtasks.length > 0 && (
          <div className="h-2 bg-[#EBE5FF] rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%`, background: task.progress === 100 ? '#D9F36A' : '#7655E9' }}
            />
          </div>
        )}

        <div className="space-y-1.5 mb-2">
          {task.subtasks.map(st => (
            <div key={st.id} className="flex items-center gap-2 group bg-[#F8F6F0] p-2 rounded-xl border border-[#E8E4D9]">
              <button
                type="button"
                onClick={() => handleToggleSubtask(st.id)}
                className={cn(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0',
                  st.completed ? 'bg-[#7655E9] border-[#7655E9]' : 'border-gray-300 hover:border-[#7655E9] bg-white'
                )}
              >
                {st.completed && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              <span className={cn('flex-1 text-sm font-nunito', st.completed && 'line-through text-gray-400')}>
                {st.title}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteSubtask(st.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-coral transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSubtask}
            onChange={e => setNewSubtask(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSubtask();
              }
            }}
            placeholder="Add a step (e.g. solve problem 1, research bibliography)..."
            className="flex-1 text-sm font-nunito border border-gray-200 rounded-xl px-3 py-2 bg-white text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lavender"
          />
          <Button size="sm" variant="secondary" onClick={handleAddSubtask}>
            <Plus className="w-4 h-4" /> Add Step
          </Button>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wide block mb-1">Study Notes / Where you paused</label>
        <textarea
          value={task.notes}
          onChange={e => updateTask(task.id, { notes: e.target.value, lastWorkedOn: new Date().toISOString() })}
          placeholder="Where did you stop? (e.g. 'Paused at page 45 step 3')..."
          rows={2}
          className="w-full text-sm font-nunito border border-gray-200 rounded-xl px-3 py-2 bg-white text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lavender resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="lavender"
            size="sm"
            onClick={handleStartFocus}
            className="gap-1.5"
          >
            <Zap className="w-4 h-4" /> Start Focus
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleArchive}
            className="text-gray-400 hover:text-navy"
          >
            <Archive className="w-4 h-4" /> Archive
          </Button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
