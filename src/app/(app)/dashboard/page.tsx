'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Task } from '@/lib/storage';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { NewTaskModal } from '@/components/tasks/NewTaskModal';
import { getMummyMoodData, formatRelativeTime, formatDueDate, getDueDateStatus } from '@/lib/utils';
import {
  CheckCircle2, Circle, Clock, Play, Plus, ArrowRight,
  Sparkles, Calendar, BookOpen, MoreVertical, AlertTriangle,
  Bell, ChevronRight, Zap, Check
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data, touchTask, completeTask, getMummyMood } = useStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const mood = getMummyMood();
  const moodData = getMummyMoodData(mood);

  // Active (non-archived) tasks
  const activeTasks = data.tasks.filter(t => !t.archived);
  const completedTasks = activeTasks.filter(t => t.status === 'completed');
  const inProgressTasks = activeTasks.filter(t => t.status === 'in-progress');
  const pendingTasks = activeTasks.filter(t => t.status === 'pending');

  // Most recently active task for "Resume Where You Left Off"
  const recentlyActiveTask = [...activeTasks]
    .filter(t => t.status !== 'completed')
    .sort((a, b) => {
      const aTime = a.lastWorkedOn ? new Date(a.lastWorkedOn).getTime() : 0;
      const bTime = b.lastWorkedOn ? new Date(b.lastWorkedOn).getTime() : 0;
      return bTime - aTime;
    })[0] || activeTasks[0];

  // Completion calculation
  const totalCount = activeTasks.length;
  const completedCount = completedTasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Prioritize recently accessed subjects (Section 5 requirement)
  const prioritizedSubjects = [...data.subjects]
    .filter(s => !s.archived)
    .sort((a, b) => {
      const aTime = a.lastWorkedOn ? new Date(a.lastWorkedOn).getTime() : 0;
      const bTime = b.lastWorkedOn ? new Date(b.lastWorkedOn).getTime() : 0;
      return bTime - aTime;
    });

  // Handle resume action
  const handleResumeTask = (task: Task) => {
    touchTask(task.id);
    setSelectedTask(task);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Welcome Header with visual doodles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
              Welcome back, {data.preferences.userName}! 👋
            </h1>
            <span className="hidden sm:inline-block text-[#D9F36A] text-xl animate-bounce">✨</span>
          </div>
          <p className="text-sm text-[#30205C]/75 font-nunito mt-1 flex items-center gap-2">
            <span>Let&apos;s pick up where you left off.</span>
            <span className="text-[11px] bg-[#D9F36A]/40 text-[#30205C] border border-[#D9F36A] px-2.5 py-0.5 rounded-full font-bold">
              Autosave Active
            </span>
          </p>
        </div>

        <button
          onClick={() => setIsNewTaskOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#7655E9] text-white px-5 py-2.5 rounded-xl font-bold font-jakarta text-sm hover:bg-[#6342D6] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Top 2 Cards: Weekly Progress & Resume Where You Left Off */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Your Progress This Week (7 cols) */}
        <div className="lg:col-span-7 bg-[#EBE5FF] rounded-3xl p-5 border border-[#C5B4FF] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#30205C] font-extrabold text-base font-jakarta">Your Progress This Week</span>
              <span className="text-xs text-[#7655E9]">✦</span>
            </div>
            <Link href="/progress" className="text-xs font-bold text-[#7655E9] hover:underline font-nunito flex items-center gap-1">
              View Insights <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Donut progress ring */}
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-white/60">
              <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-[#EBE5FF]"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress stroke */}
                  <path
                    className="text-[#7655E9] transition-all duration-1000 ease-out"
                    strokeDasharray={`${completionPercentage}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-[#30205C] font-jakarta">{completionPercentage}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-extrabold text-[#30205C] font-jakarta leading-tight">
                  {completedCount} / {totalCount} Tasks
                </p>
                <p className="text-xs text-[#30205C]/70 font-nunito">Completed</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#30205C] bg-[#D9F36A] px-2.5 py-0.5 rounded-full mt-1.5 font-nunito shadow-2xs">
                  <span>↗ +12%</span> from last week
                </div>
              </div>
            </div>

            {/* Mini weekly bar chart */}
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-white/60">
              <div className="flex items-end justify-between h-16 gap-1 px-1">
                {[
                  { day: 'Mon', val: 40 },
                  { day: 'Tue', val: 65 },
                  { day: 'Wed', val: 30 },
                  { day: 'Thu', val: 85 },
                  { day: 'Fri', val: 45 },
                  { day: 'Sat', val: 90 },
                  { day: 'Sun', val: 60 },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full bg-[#EBE5FF] rounded-t-sm h-12 flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#7655E9] hover:bg-[#30205C] transition-colors rounded-t-sm"
                        style={{ height: `${item.val}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#30205C]/70 font-bold font-nunito">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Resume Where You Left Off */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-[#7655E9]/30 shadow-xs relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#D9F36A] flex items-center justify-center text-xs font-bold text-[#30205C]">
                ⚡
              </span>
              <span className="font-jakarta font-extrabold text-[#30205C] text-sm sm:text-base">
                Resume Where You Left Off
              </span>
            </div>
            {recentlyActiveTask?.lastWorkedOn && (
              <span className="text-[11px] text-[#7655E9] font-bold font-nunito">
                {formatRelativeTime(recentlyActiveTask.lastWorkedOn)}
              </span>
            )}
          </div>

          {recentlyActiveTask ? (
            <div className="space-y-3 my-auto">
              {/* Task snippet with preview */}
              <div className="flex items-center gap-3 bg-[#F8F6F0] p-3 rounded-2xl border border-[#E8E4D9]">
                <div className="w-12 h-12 rounded-xl bg-[#EBE5FF] border border-[#C5B4FF] flex items-center justify-center flex-shrink-0 text-xl">
                  💻
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-jakarta font-bold text-[#30205C] text-sm truncate">
                    {recentlyActiveTask.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-extrabold bg-[#D9F36A] text-[#30205C] px-2 py-0.5 rounded-full font-nunito">
                      {recentlyActiveTask.progress}% complete
                    </span>
                    {recentlyActiveTask.dueDate && (
                      <span className="text-[11px] text-gray-500 font-nunito truncate">
                        Due: {formatDueDate(recentlyActiveTask.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#EBE5FF] h-2.5 rounded-full overflow-hidden border border-[#C5B4FF]/40">
                <div
                  className="bg-[#7655E9] h-full rounded-full transition-all duration-500"
                  style={{ width: `${recentlyActiveTask.progress}%` }}
                />
              </div>

              {/* Continue button */}
              <button
                onClick={() => handleResumeTask(recentlyActiveTask)}
                className="w-full flex items-center justify-center gap-2 bg-[#30205C] text-white py-2.5 px-4 rounded-xl font-bold font-jakarta text-sm hover:bg-[#422D7A] transition-all shadow-xs hover:gap-3"
              >
                <span>Continue Working</span>
                <ArrowRight className="w-4 h-4 text-[#D9F36A]" />
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-[#30205C]/70 font-nunito">All caught up! No active tasks to resume.</p>
              <button
                onClick={() => setIsNewTaskOpen(true)}
                className="mt-2 text-xs font-bold text-[#7655E9] underline font-jakarta"
              >
                + Create a new task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mummy Mode Banner — Desi Humor & Gentle Reminders */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E8E4D9] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EBE5FF] border border-[#C5B4FF] flex items-center justify-center text-2xl flex-shrink-0">
            {moodData.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-jakarta font-extrabold text-xs uppercase tracking-wider text-[#7655E9]">
                Mummy Mode • {moodData.label}
              </span>
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs text-gray-400 font-nunito">Gentle Desi Reminder</span>
            </div>
            <p className="text-sm font-bold text-[#30205C] font-jakarta mt-0.5">
              &ldquo;{moodData.messages[0]}&rdquo;
            </p>
          </div>
        </div>

        <Link
          href="/reminders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#30205C] bg-[#D9F36A] hover:bg-[#C8E350] px-3.5 py-2 rounded-xl transition-colors font-jakarta flex-shrink-0 shadow-2xs"
        >
          <span>Mummy Mood Meter</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* All Tasks Section with 3 columns */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-[#30205C] font-jakarta">All Tasks</h2>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E4D9] text-xs font-bold font-nunito shadow-2xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'all' ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'}`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'pending' ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'}`}
              >
                Pending ({pendingTasks.length})
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'in-progress' ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'}`}
              >
                In Progress ({inProgressTasks.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'completed' ? 'bg-[#7655E9] text-white shadow-xs' : 'text-[#30205C]/70 hover:text-[#30205C]'}`}
              >
                Completed ({completedTasks.length})
              </button>
            </div>
          </div>

          <Link href="/tasks" className="text-xs font-bold text-[#7655E9] hover:underline font-nunito flex items-center gap-1">
            View All in Task Manager <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Interactive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Completed Column (Lime Tinted) */}
          <div className="bg-white rounded-3xl border border-[#D9F36A] shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#D9F36A]/30 px-4 py-3 border-b border-[#D9F36A]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#30205C]" />
                <span className="font-jakarta font-extrabold text-xs text-[#30205C]">
                  Completed ({completedTasks.length})
                </span>
              </div>
              <Link href="/tasks?status=completed" className="text-[11px] font-bold text-[#30205C] hover:underline">
                View All →
              </Link>
            </div>

            <div className="p-3 space-y-2 flex-1">
              {completedTasks.length === 0 ? (
                <p className="text-xs text-gray-400 font-nunito text-center py-6">No completed tasks yet.</p>
              ) : (
                completedTasks.slice(0, 4).map(task => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F6F0] transition-colors cursor-pointer border border-transparent hover:border-[#E8E4D9]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-4 h-4 rounded-full bg-[#D9F36A] text-[#30205C] flex items-center justify-center flex-shrink-0 text-[10px] font-black">
                        ✓
                      </span>
                      <span className="text-xs font-semibold text-gray-400 line-through truncate font-nunito">
                        {task.title}
                      </span>
                    </div>
                    {task.updatedAt && (
                      <span className="text-[10px] text-gray-400 font-nunito flex-shrink-0 ml-2">
                        {formatDueDate(task.updatedAt)}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. In Progress Column (Soft Lavender Tinted) */}
          <div className="bg-white rounded-3xl border border-[#C5B4FF] shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#EBE5FF] px-4 py-3 border-b border-[#C5B4FF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#7655E9] fill-[#7655E9]" />
                <span className="font-jakarta font-extrabold text-xs text-[#30205C]">
                  In Progress ({inProgressTasks.length})
                </span>
              </div>
              <Link href="/tasks?status=in-progress" className="text-[11px] font-bold text-[#7655E9] hover:underline">
                View All →
              </Link>
            </div>

            <div className="p-3 space-y-2 flex-1">
              {inProgressTasks.length === 0 ? (
                <p className="text-xs text-gray-400 font-nunito text-center py-6">No tasks in progress.</p>
              ) : (
                inProgressTasks.slice(0, 4).map(task => (
                  <div
                    key={task.id}
                    onClick={() => handleResumeTask(task)}
                    className="p-3 rounded-2xl bg-[#F8F6F0] hover:bg-[#EBE5FF] transition-all cursor-pointer border border-[#E8E4D9]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#30205C] truncate font-jakarta">
                        {task.title}
                      </span>
                      <span className="text-[10px] font-extrabold text-[#30205C] bg-[#D9F36A] px-2 py-0.5 rounded-full font-nunito shadow-2xs">
                        {task.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-[#EBE5FF] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#7655E9] h-full rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Pending Column */}
          <div className="bg-white rounded-3xl border border-[#E8E4D9] shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#F8F6F0] px-4 py-3 border-b border-[#E8E4D9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7655E9]" />
                <span className="font-jakarta font-extrabold text-xs text-[#30205C]">
                  Pending ({pendingTasks.length})
                </span>
              </div>
              <Link href="/tasks?status=pending" className="text-[11px] font-bold text-[#7655E9] hover:underline">
                View All →
              </Link>
            </div>

            <div className="p-3 space-y-2 flex-1">
              {pendingTasks.length === 0 ? (
                <p className="text-xs text-gray-400 font-nunito text-center py-6">No pending tasks.</p>
              ) : (
                pendingTasks.slice(0, 4).map(task => {
                  const dueStatus = getDueDateStatus(task.dueDate);
                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F6F0] transition-colors cursor-pointer border border-transparent hover:border-[#E8E4D9]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Circle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-xs font-semibold text-[#30205C] truncate font-nunito">
                          {task.title}
                        </span>
                      </div>
                      {task.dueDate && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-nunito flex-shrink-0 ml-2 ${
                          dueStatus === 'overdue' ? 'bg-[#FF5C5C]/15 text-[#E04848]' :
                          dueStatus === 'today' ? 'bg-[#D9F36A] text-[#30205C]' : 'bg-[#EBE5FF] text-[#7655E9]'
                        }`}>
                          {formatDueDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick Stats & Upcoming Reminder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Quick Stats (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">📊</span>
            <span className="font-jakarta font-extrabold text-sm text-[#30205C]">Quick Stats</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <div className="bg-[#F8F6F0] p-3 rounded-2xl border border-[#E8E4D9] text-center">
              <span className="text-lg block">📋</span>
              <p className="text-lg font-black text-[#30205C] font-jakarta mt-1">{totalCount}</p>
              <p className="text-[10px] text-gray-500 font-nunito font-bold">Total</p>
            </div>
            <div className="bg-[#D9F36A]/30 p-3 rounded-2xl border border-[#D9F36A] text-center">
              <span className="text-lg block">✅</span>
              <p className="text-lg font-black text-[#30205C] font-jakarta mt-1">{completedCount}</p>
              <p className="text-[10px] text-[#30205C] font-nunito font-extrabold">Done</p>
            </div>
            <div className="bg-[#EBE5FF] p-3 rounded-2xl border border-[#C5B4FF] text-center">
              <span className="text-lg block">▶️</span>
              <p className="text-lg font-black text-[#7655E9] font-jakarta mt-1">{inProgressTasks.length}</p>
              <p className="text-[10px] text-[#7655E9] font-nunito font-extrabold">In Flow</p>
            </div>
            <div className="bg-[#FFF5F5] p-3 rounded-2xl border border-[#FF5C5C]/30 text-center">
              <span className="text-lg block">⏳</span>
              <p className="text-lg font-black text-[#E04848] font-jakarta mt-1">{pendingTasks.length}</p>
              <p className="text-[10px] text-[#E04848] font-nunito font-extrabold">Pending</p>
            </div>
          </div>
        </div>

        {/* Upcoming Reminder Pill (6 cols) */}
        <div className="lg:col-span-6 bg-[#EBE5FF] rounded-3xl p-5 border border-[#C5B4FF] shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#7655E9] shadow-xs">
              <Bell className="w-5 h-5 text-[#7655E9]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#30205C] font-jakarta">Upcoming Reminder</p>
              <p className="text-xs text-[#30205C]/80 font-nunito mt-0.5">
                {recentlyActiveTask ? (
                  <>Your &ldquo;{recentlyActiveTask.title}&rdquo; is waiting. Pick up where you left off!</>
                ) : (
                  <>Everything is organized! Feel free to pause and relax.</>
                )}
              </p>
            </div>
          </div>
          <div className="bg-white px-3.5 py-2 rounded-2xl border border-[#C5B4FF] text-center flex-shrink-0 shadow-2xs">
            <span className="text-[10px] font-bold text-[#7655E9] uppercase tracking-wider block font-jakarta">Today</span>
            <span className="text-xs font-black text-[#30205C] font-jakarta">
              {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {/* My Subject Folders Section (Sorted by Recently Active) */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8E4D9] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7655E9]" />
            <h2 className="font-jakarta font-extrabold text-base text-[#30205C]">
              My Subject Folders
            </h2>
            <span className="text-xs text-gray-400 font-nunito">(Prioritized by Recent Activity)</span>
          </div>
          <Link href="/subjects" className="text-xs font-bold text-[#7655E9] hover:underline font-nunito flex items-center gap-1">
            Manage Subjects <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {prioritizedSubjects.map(subject => {
            const subjectTasks = data.tasks.filter(t => t.subjectId === subject.id && !t.archived);
            const doneSubTasks = subjectTasks.filter(t => t.status === 'completed').length;
            const subProgress = subjectTasks.length > 0 ? Math.round((doneSubTasks / subjectTasks.length) * 100) : 0;
            return (
              <Link
                key={subject.id}
                href={`/subjects?id=${subject.id}`}
                className="group p-4 rounded-2xl border border-[#E8E4D9] hover:border-[#7655E9] transition-all bg-[#F8F6F0] hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-2 rounded-xl bg-white border border-[#E8E4D9] shadow-2xs">
                    {subject.icon}
                  </span>
                  <span className="text-xs font-bold text-[#30205C] bg-white px-2.5 py-1 rounded-full border border-[#E8E4D9] font-nunito">
                    {subjectTasks.length} task{subjectTasks.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <h3 className="font-jakarta font-bold text-sm text-[#30205C] group-hover:text-[#7655E9] truncate">
                  {subject.name}
                </h3>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-nunito mb-1">
                    <span>Progress</span>
                    <span className="font-bold text-[#30205C]">{subProgress}%</span>
                  </div>
                  <div className="w-full bg-[#EBE5FF] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${subProgress}%`, backgroundColor: subject.color || '#7655E9' }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

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
