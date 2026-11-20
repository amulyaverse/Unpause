'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Priority } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectId?: string;
  initialSubjectId?: string;
}

export function NewTaskModal({ isOpen, onClose, defaultSubjectId, initialSubjectId }: NewTaskModalProps) {
  const addTask = useStore(s => s.addTask);
  const data = useStore(s => s.data);

  const initialSubject = initialSubjectId || defaultSubjectId || '';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(initialSubject);
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      addTask({
        title: title.trim(),
        description,
        subjectId: subjectId || null,
        priority,
        status: 'pending',
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        subtasks: [],
        notes: '',
        lastWorkedOn: null,
      });
      setTitle('');
      setDescription('');
      setSubjectId(defaultSubjectId || '');
      setPriority('medium');
      setDueDate('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task title *"
          placeholder="e.g., Engineering Maths Assignment 4"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
          required
        />

        <Textarea
          label="Description"
          placeholder="What needs to be done?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-navy font-jakarta block mb-1">Subject</label>
            <select
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              className="w-full text-sm font-nunito border border-gray-200 rounded-xl px-3 py-2 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-lavender"
            >
              <option value="">No subject</option>
              {data.subjects.filter(s => !s.archived).map(s => (
                <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
              ))}
            </select>
          </div>
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-navy font-jakarta block mb-2">Priority</label>
          <div className="flex gap-2">
            {(['high', 'medium', 'low'] as Priority[]).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={cn(
                  'flex-1 py-2 rounded-xl text-xs font-semibold font-nunito border transition-all',
                  priority === p
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

        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading} disabled={!title.trim()}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
