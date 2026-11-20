'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw, CheckCircle, Zap, Clock, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { formatRelativeTime } from '@/lib/utils';

function FocusContent() {
  const searchParams = useSearchParams();
  const initialTaskId = searchParams.get('taskId');

  const { data, addFocusSession, touchTask } = useStore();
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTaskId || '');
  const [timerMinutes, setTimerMinutes] = useState<number>(25);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeTasks = data.tasks.filter(t => !t.archived && t.status !== 'completed');
  const selectedTask = data.tasks.find(t => t.id === selectedTaskId);

  // Set initial task if none selected but tasks exist
  useEffect(() => {
    if (!selectedTaskId && activeTasks.length > 0) {
      setSelectedTaskId(activeTasks[0].id);
    }
  }, [activeTasks, selectedTaskId]);

  // Handle countdown
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleSetDuration = (mins: number) => {
    setIsRunning(false);
    setTimerMinutes(mins);
    setSecondsRemaining(mins * 60);
    setSessionCompleted(false);
  };

  const handleStart = () => {
    if (selectedTaskId) {
      touchTask(selectedTaskId);
    }
    setIsRunning(true);
    setSessionCompleted(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(timerMinutes * 60);
    setSessionCompleted(false);
  };

  const handleCompleteSession = () => {
    setIsRunning(false);
    setSessionCompleted(true);
    addFocusSession({
      taskId: selectedTaskId || null,
      taskTitle: selectedTask ? selectedTask.title : 'Freeform Focus',
      duration: timerMinutes,
      completedAt: new Date().toISOString(),
      notes: notes.trim(),
    });
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const totalSeconds = timerMinutes * 60;
  const progressPercent = totalSeconds > 0 ? Math.round(((totalSeconds - secondsRemaining) / totalSeconds) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="text-center max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBE5FF] border border-[#C5B4FF] text-xs font-bold text-[#7655E9] font-jakarta mb-2">
          <Zap className="w-3.5 h-3.5 fill-[#7655E9]" />
          <span>Distraction-Free Focus Space</span>
        </div>
        <h1 className="text-3xl font-black text-[#30205C] font-jakarta tracking-tight">
          Focus Mode 🎯
        </h1>
        <p className="text-sm text-[#30205C]/75 font-nunito mt-1">
          Pick a task, silence distractions for 25 minutes, and pick up your momentum.
        </p>
      </div>

      {/* Main Focus Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4D9] shadow-sm text-center relative overflow-hidden">
        {/* Task Selector */}
        <div className="max-w-md mx-auto mb-6">
          <label className="text-xs font-bold text-gray-500 font-jakarta uppercase tracking-wider block mb-1.5">
            Focusing on:
          </label>
          <select
            value={selectedTaskId}
            onChange={e => setSelectedTaskId(e.target.value)}
            disabled={isRunning}
            className="w-full text-sm font-bold text-[#30205C] font-jakarta border border-[#E8E4D9] rounded-xl px-4 py-2.5 bg-[#F8F6F0] focus:outline-none focus:ring-2 focus:ring-[#7655E9]"
          >
            <option value="">Freeform / General Study Session</option>
            {activeTasks.map(task => (
              <option key={task.id} value={task.id}>
                {task.title} ({task.progress}% done)
              </option>
            ))}
          </select>
        </div>

        {/* Duration Presets */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[15, 25, 45, 60].map(mins => (
            <button
              key={mins}
              onClick={() => handleSetDuration(mins)}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold font-jakarta transition-all ${
                timerMinutes === mins
                  ? 'bg-[#7655E9] text-white shadow-xs scale-105'
                  : 'bg-[#F8F6F0] text-[#30205C]/80 hover:bg-[#EBE5FF] border border-[#E8E4D9]'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Timer Ring & Display */}
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center select-none">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#EBE5FF"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#7655E9"
              strokeWidth="5"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Time text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-[#30205C] font-jakarta tracking-tight">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold text-[#7655E9] font-nunito mt-1 uppercase tracking-wider">
              {isRunning ? 'In Progress' : sessionCompleted ? 'Completed! 🎉' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-[#F8F6F0] text-[#30205C] hover:bg-[#EBE5FF] transition-colors border border-[#E8E4D9]"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {!isRunning ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="px-8 py-3 rounded-2xl text-base gap-2 bg-[#7655E9] hover:bg-[#6342D6] text-white shadow-md hover:scale-105"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{secondsRemaining < totalSeconds ? 'Resume Focus' : 'Start Focus'}</span>
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              variant="secondary"
              size="lg"
              className="px-8 py-3 rounded-2xl text-base gap-2 shadow-sm"
            >
              <Pause className="w-5 h-5 fill-[#30205C]" />
              <span>Pause</span>
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={handleCompleteSession}
            disabled={secondsRemaining === totalSeconds}
            className="text-xs text-[#30205C]/70 hover:text-[#30205C]"
          >
            End & Save
          </Button>
        </div>

        {/* Session Finished Notification */}
        {sessionCompleted && (
          <div className="mt-6 p-4 rounded-2xl bg-[#D9F36A]/30 border border-[#D9F36A] text-[#30205C] text-sm font-nunito max-w-md mx-auto animate-fadeIn font-semibold">
            🎉 <strong>Well done!</strong> Focus session saved to your progress tracker. Take a 5-minute break.
          </div>
        )}
      </div>

      {/* Motivational Insight Banner matching Image 2 */}
      <div className="bg-[#30205C] text-white rounded-3xl p-6 shadow-sm border border-[#422D7A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="text-4xl text-[#D9F36A] font-serif leading-none">“</span>
          <div>
            <p className="text-base font-bold font-jakarta leading-relaxed">
              Your future is created by what you do today, not tomorrow.
            </p>
            <p className="text-xs text-[#C5B4FF] font-nunito mt-1">
              INSIGHT • Small consistent 25-minute sprints beat all-night cramming.
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-3xl font-black text-[#D9F36A] font-jakarta block leading-tight">
            {data.focusSessions.length}
          </span>
          <span className="text-xs text-[#C5B4FF] font-nunito">Sessions Completed</span>
        </div>
      </div>

      {/* Recent Sessions History */}
      {data.focusSessions.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-[#E8E4D9] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[#7655E9]" />
            <h3 className="font-jakarta font-bold text-sm text-[#30205C]">Recent Focus Sessions</h3>
          </div>
          <div className="space-y-2">
            {data.focusSessions.slice(-4).reverse().map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E4D9]"
              >
                <div>
                  <p className="text-xs font-bold text-[#30205C] font-jakarta">{session.taskTitle}</p>
                  <p className="text-[10px] text-gray-500 font-nunito">
                    {formatRelativeTime(session.completedAt)}
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#EBE5FF] text-[#7655E9] px-2.5 py-1 rounded-full font-nunito">
                  {session.duration} mins
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FocusPage() {
  return (
    <Suspense fallback={<div className="p-8 text-unpause-deep/60">Loading focus timer...</div>}>
      <FocusContent />
    </Suspense>
  );
}
