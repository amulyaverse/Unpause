'use client';
import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Task, Priority, TaskStatus } from '@/lib/storage';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { NewTaskModal } from '@/components/tasks/NewTaskModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Plus, Search, Filter, LayoutGrid, List,
  Calendar, CheckCircle2, Clock, AlertTriangle, BookOpen
} from 'lucide-react';

export default function TasksPage() {
  const { data, completeTask, updateTask } = useStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus | 'overdue'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'dueDate' | 'priority' | 'title'>('recent');

  const now = new Date();

  // Filtered & sorted tasks
  const filteredTasks = useMemo(() => {
    return data.tasks
      .filter(task => {
        if (task.archived) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description.toLowerCase().includes(q);
          const matchNotes = task.notes.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchNotes) return false;
        }

        // Status
        if (statusFilter === 'overdue') {
          if (!task.dueDate) return false;
          if (task.status === 'completed') return false;
          const due = new Date(task.dueDate);
          return due < now && due.toDateString() !== now.toDateString();
        } else if (statusFilter !== 'all') {
          if (task.status !== statusFilter) return false;
        }

        // Priority
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
          return false;
        }

        // Subject
        if (subjectFilter !== 'all' && task.subjectId !== subjectFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          const aTime = a.lastWorkedOn ? new Date(a.lastWorkedOn).getTime() : 0;
          const bTime = b.lastWorkedOn ? new Date(b.lastWorkedOn).getTime() : 0;
          return bTime - aTime;
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        if (sortBy === 'priority') {
          const pOrder = { high: 0, medium: 1, low: 2 };
          return pOrder[a.priority] - pOrder[b.priority];
        }
        return a.title.localeCompare(b.title);
      });
  }, [data.tasks, searchQuery, statusFilter, priorityFilter, subjectFilter, sortBy, now]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
            My Tasks 📝
          </h1>
          <p className="text-sm text-[#30205C]/75 font-nunito mt-1">
            Break down assignments, track progress without pressure, and pick up where you left off.
          </p>
        </div>

        <Button
          onClick={() => setIsNewTaskOpen(true)}
          className="flex items-center gap-2 shadow-sm bg-[#7655E9] hover:bg-[#6342D6] text-white"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E8E4D9] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks, descriptions, or notes..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E8E4D9] text-sm font-nunito focus:outline-none focus:ring-2 focus:ring-[#7655E9]"
            />
          </div>

          {/* Quick Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 bg-[#F8F6F0] rounded-xl border border-[#E8E4D9] text-xs font-bold font-nunito">
            {(['all', 'pending', 'in-progress', 'completed', 'overdue'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-lg capitalize whitespace-nowrap transition-colors ${
                  statusFilter === st ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'
                }`}
              >
                {st === 'in-progress' ? 'In Progress' : st}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-[#F8F6F0] p-1 rounded-xl border border-[#E8E4D9]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white text-[#30205C] shadow-xs' : 'text-gray-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white text-[#30205C] shadow-xs' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Filters row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8E4D9] text-xs font-nunito">
          <span className="text-gray-400 font-bold font-jakarta uppercase tracking-wider text-[10px]">Filter by:</span>

          {/* Subject Filter */}
          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-[#E8E4D9] bg-white text-[#30205C] focus:outline-none focus:ring-1 focus:ring-[#7655E9] font-semibold"
          >
            <option value="all">All Subjects</option>
            {data.subjects.filter(s => !s.archived).map(s => (
              <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg border border-[#E8E4D9] bg-white text-[#30205C] focus:outline-none focus:ring-1 focus:ring-[#7655E9] font-semibold"
          >
            <option value="all">All Priorities</option>
            <option value="high">🔥 High</option>
            <option value="medium">⚡ Medium</option>
            <option value="low">🌱 Low</option>
          </select>

          {/* Sort By */}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-gray-400 font-bold font-jakarta uppercase tracking-wider text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E8E4D9] bg-white text-[#30205C] focus:outline-none focus:ring-1 focus:ring-[#7655E9] font-semibold"
            >
              <option value="recent">Recently Worked On</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List / Grid Display */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xs">
          <div className="w-16 h-16 bg-lavender-light text-navy rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
            ⏸
          </div>
          <h3 className="font-jakarta font-bold text-lg text-navy">No tasks found</h3>
          <p className="text-sm text-gray-500 font-nunito mt-1 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'all' || subjectFilter !== 'all'
              ? 'Try adjusting your search filters to find what you are looking for.'
              : 'Add your first assignment, problem set, or study goal to get started!'}
          </p>
          <Button
            onClick={() => setIsNewTaskOpen(true)}
            className="mt-4"
          >
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => setSelectedTask(task)}
              compact={viewMode === 'list'}
            />
          ))}
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          isOpen={true}
          onClose={() => setSelectedTask(null)}
          taskId={selectedTask.id}
        />
      )}

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
      />
    </div>
  );
}
