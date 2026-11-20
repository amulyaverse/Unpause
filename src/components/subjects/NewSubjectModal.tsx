'use client';
import { useState, useEffect } from 'react';
import { Subject } from '@/lib/storage';
import { useStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { SUBJECT_COLORS, SUBJECT_ICONS, cn } from '@/lib/utils';

interface NewSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editSubject?: Subject | null;
}

export function NewSubjectModal({ isOpen, onClose, editSubject }: NewSubjectModalProps) {
  const addSubject = useStore(s => s.addSubject);
  const updateSubject = useStore(s => s.updateSubject);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(SUBJECT_COLORS[0]);
  const [icon, setIcon] = useState(SUBJECT_ICONS[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editSubject) {
      setName(editSubject.name);
      setDescription(editSubject.description);
      setColor(editSubject.color);
      setIcon(editSubject.icon);
    } else {
      setName('');
      setDescription('');
      setColor(SUBJECT_COLORS[0]);
      setIcon(SUBJECT_ICONS[0]);
    }
  }, [editSubject, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      if (editSubject) {
        updateSubject(editSubject.id, { name: name.trim(), description, color, icon });
      } else {
        addSubject({ name: name.trim(), description, color, icon, lastWorkedOn: null });
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editSubject ? 'Edit Subject' : 'New Subject'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Subject name *"
          placeholder="e.g., Engineering Mathematics"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
        />
        <Textarea
          label="Description"
          placeholder="What topics does this cover?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={2}
        />

        {/* Icon picker */}
        <div>
          <label className="text-sm font-semibold text-navy font-jakarta block mb-2">Icon</label>
          <div className="flex flex-wrap gap-2">
            {SUBJECT_ICONS.map(ic => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                className={cn(
                  'w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all border-2',
                  icon === ic ? 'border-navy bg-lavender-light' : 'border-transparent bg-gray-50 hover:bg-lavender-light/50'
                )}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* Color picker */}
        <div>
          <label className="text-sm font-semibold text-navy font-jakarta block mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {SUBJECT_COLORS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  color === c ? 'border-navy scale-110' : 'border-transparent hover:scale-105'
                )}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center gap-3 p-3 bg-cream rounded-xl">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: color + '40' }}
          >
            {icon}
          </div>
          <div>
            <p className="font-bold text-navy font-jakarta text-sm">{name || 'Subject Name'}</p>
            <p className="text-xs text-gray-400 font-nunito">{description || 'Description'}</p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading} disabled={!name.trim()}>
            {editSubject ? 'Save Changes' : 'Create Subject'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
