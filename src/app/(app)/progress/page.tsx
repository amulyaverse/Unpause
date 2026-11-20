'use client';
import { useStore } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';
import {
  BarChart2, CheckCircle2, Clock, Zap, BookOpen,
  TrendingUp, Award, Calendar, HeartHandshake
} from 'lucide-react';
import Link from 'next/link';

export default function ProgressPage() {
  const { data } = useStore();

  const activeTasks = data.tasks.filter(t => !t.archived);
  const completedTasks = activeTasks.filter(t => t.status === 'completed');
  const inProgressTasks = activeTasks.filter(t => t.status === 'in-progress');
  const pendingTasks = activeTasks.filter(t => t.status === 'pending');

  const totalTasks = activeTasks.length;
  const overallPct = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  // Total focus minutes
  const totalFocusMinutes = data.focusSessions.reduce((acc, s) => acc + s.duration, 0);

  // Subject completion breakdown
  const subjectsBreakdown = data.subjects.filter(s => !s.archived).map(sub => {
    const subTasks = data.tasks.filter(t => t.subjectId === sub.id && !t.archived);
    const subDone = subTasks.filter(t => t.status === 'completed').length;
    const subPct = subTasks.length > 0 ? Math.round((subDone / subTasks.length) * 100) : 0;
    return {
      ...sub,
      total: subTasks.length,
      done: subDone,
      pct: subPct,
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE5FF] border border-[#C5B4FF] text-xs font-bold text-[#7655E9] font-jakarta mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#7655E9]" />
            <span>Gentle Productivity • Zero Guilt</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
            Progress Tracking 📊
          </h1>
          <p className="text-sm text-[#30205C]/75 font-nunito mt-1">
            Real momentum without streaks pressure. Every step counts.
          </p>
        </div>
      </div>

      {/* Top Stats 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wider">Completion</span>
            <CheckCircle2 className="w-4 h-4 text-[#7655E9]" />
          </div>
          <p className="text-3xl font-black text-[#30205C] font-jakarta">{overallPct}%</p>
          <p className="text-xs text-gray-500 font-nunito mt-1">
            {completedTasks.length} of {totalTasks} tasks done
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-[#7655E9]" />
          </div>
          <p className="text-3xl font-black text-[#30205C] font-jakarta">{inProgressTasks.length}</p>
          <p className="text-xs text-gray-500 font-nunito mt-1">
            Paused & ready to resume
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wider">Focus Time</span>
            <Zap className="w-4 h-4 text-[#7655E9]" />
          </div>
          <p className="text-3xl font-black text-[#30205C] font-jakarta">{totalFocusMinutes}m</p>
          <p className="text-xs text-gray-500 font-nunito mt-1">
            Across {data.focusSessions.length} sessions
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 font-jakarta uppercase tracking-wider">Active Subjects</span>
            <BookOpen className="w-4 h-4 text-[#C5B4FF]" />
          </div>
          <p className="text-3xl font-black text-[#30205C] font-jakarta">
            {subjectsBreakdown.length}
          </p>
          <p className="text-xs text-gray-500 font-nunito mt-1">
            Organized study modules
          </p>
        </div>
      </div>

      {/* Weekly Activity Chart & Progress Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-jakarta font-extrabold text-base text-[#30205C]">Weekly Activity Flow</h2>
              <p className="text-xs text-gray-500 font-nunito">Consistent pacing through the semester</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#30205C] bg-[#D9F36A] px-3 py-1 rounded-full font-nunito shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12% this week</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="flex items-end justify-between h-44 gap-2 pt-6 px-2 border-b border-[#E8E4D9]">
            {[
              { day: 'Monday', short: 'Mon', tasks: 3, height: '55%' },
              { day: 'Tuesday', short: 'Tue', tasks: 5, height: '80%' },
              { day: 'Wednesday', short: 'Wed', tasks: 2, height: '40%' },
              { day: 'Thursday', short: 'Thu', tasks: 6, height: '95%' },
              { day: 'Friday', short: 'Fri', tasks: 4, height: '70%' },
              { day: 'Saturday', short: 'Sat', tasks: 3, height: '60%' },
              { day: 'Sunday', short: 'Sun', tasks: 2, height: '35%' },
            ].map(col => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-[#F8F6F0] rounded-t-xl h-36 flex items-end justify-center p-1 relative">
                  <div
                    className="w-full max-w-[36px] bg-[#7655E9] group-hover:bg-[#30205C] transition-all duration-300 rounded-t-lg relative"
                    style={{ height: col.height }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#30205C] text-white text-[10px] py-0.5 px-1.5 rounded-md font-bold whitespace-nowrap transition-opacity">
                      {col.tasks} tasks
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#30205C]/75 font-nunito">{col.short}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 font-nunito mt-3 text-center">
            Peak focus days: Thursday & Tuesday. Weekends kept gentle.
          </p>
        </div>

        {/* Small Steps Big Change Card */}
        <div className="lg:col-span-4 bg-[#EBE5FF] rounded-3xl p-6 border border-[#C5B4FF] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl mb-3 shadow-xs">
              ✨
            </div>
            <h3 className="font-jakarta font-extrabold text-xl text-[#30205C] leading-tight">
              Small Steps.<br />Big Change.
            </h3>
            <p className="text-xs text-[#30205C]/75 font-nunito mt-2 leading-relaxed">
              &ldquo;You don&apos;t have to finish the entire assignment in one sitting. Finishing just one problem or reviewing one note page is a win.&rdquo;
            </p>
          </div>

          <div className="bg-white/80 rounded-2xl p-4 border border-white mt-6">
            <div className="flex items-center justify-between text-xs font-bold text-[#30205C] font-jakarta mb-1">
              <span>Semester Balance</span>
              <span className="text-[#7655E9] font-extrabold">On Track</span>
            </div>
            <div className="w-full bg-[#EBE5FF] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#7655E9] h-full rounded-full" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Progress Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E4D9] shadow-xs">
        <h2 className="font-jakarta font-extrabold text-base text-[#30205C] mb-4">
          Subject-Wise Progress
        </h2>

        <div className="space-y-4">
          {subjectsBreakdown.map(sub => (
            <div key={sub.id} className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E8E4D9]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{sub.icon}</span>
                  <div>
                    <h3 className="font-jakarta font-bold text-sm text-[#30205C]">{sub.name}</h3>
                    <p className="text-xs text-gray-500 font-nunito">
                      {sub.done} of {sub.total} completed
                    </p>
                  </div>
                </div>
                <span className="text-sm font-black text-[#30205C] font-jakarta">{sub.pct}%</span>
              </div>

              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#E8E4D9]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${sub.pct}%`, backgroundColor: sub.color || '#7655E9' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
