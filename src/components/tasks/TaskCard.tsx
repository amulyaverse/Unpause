'use client';
import { Task } from '@/lib/storage';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { cn, formatDueDate, getDueDateStatus, formatRelativeTime } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  compact?: boolean;
}

export function TaskCard({ task, onClick, compact = false }: TaskCardProps) {
  const getSubjectById = useStore(s => s.getSubjectById);
  const subject = task.subjectId ? getSubjectById(task.subjectId) : null;
  const dueDateStatus = getDueDateStatus(task.dueDate);

  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5',
        compact ? 'p-3' : 'p-4'
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 min-w-0">
          {task.status === 'completed'
            ? <CheckCircle2 className="w-4 h-4 text-[#7655E9] mt-0.5 flex-shrink-0" />
            : <Circle className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
          }
          <h3 className={cn(
            'text-sm font-bold text-[#30205C] font-jakarta leading-tight',
            task.status === 'completed' && 'line-through text-gray-400'
          )}>
            {task.title}
          </h3>
        </div>
        <Badge variant={`priority-${task.priority}`} className="flex-shrink-0">
          {task.priority}
        </Badge>
      </div>

      {/* Description */}
      {!compact && task.description && (
        <p className="text-xs text-gray-500 font-nunito mb-2 line-clamp-2 ml-6">{task.description}</p>
      )}

      {/* Progress */}
      {task.subtasks.length > 0 && (
        <div className="ml-6 mb-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-nunito mb-1">
            <span>{completedSubtasks}/{task.subtasks.length} subtasks</span>
            <span className="font-bold text-[#30205C]">{task.progress}%</span>
          </div>
          <div className="h-1.5 bg-[#EBE5FF] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${task.progress}%`,
                background: task.progress === 100 ? '#D9F36A' : '#7655E9',
              }}
            />
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap ml-6">
        {subject && (
          <span
            className="text-xs font-semibold font-nunito px-2 py-0.5 rounded-lg"
            style={{ background: subject.color + '30', color: '#18264A' }}
          >
            {subject.icon} {subject.name}
          </span>
        )}
        {task.dueDate && (
          <span className={cn(
            'flex items-center gap-1 text-xs font-nunito',
            dueDateStatus === 'overdue' ? 'text-coral font-bold' :
            dueDateStatus === 'today' ? 'text-amber-600 font-bold' :
            'text-gray-400'
          )}>
            <Calendar className="w-3 h-3" />
            {formatDueDate(task.dueDate)}
            {dueDateStatus === 'overdue' && ' ⚠️'}
          </span>
        )}
        {task.lastWorkedOn && (
          <span className="flex items-center gap-1 text-xs text-gray-400 font-nunito ml-auto">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(task.lastWorkedOn)}
          </span>
        )}
      </div>
    </div>
  );
}
