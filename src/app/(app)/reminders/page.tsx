'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { MummyMoodMeter } from '@/components/mummy/MummyMoodMeter';
import { getMummyMoodData, formatRelativeTime, formatDueDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Bell, Plus, Check, Trash2, Heart, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

export default function RemindersPage() {
  const { data, addReminder, dismissReminder, updatePreferences, getMummyMood } = useStore();
  const [customMsg, setCustomMsg] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');

  const mood = getMummyMood();
  const moodData = getMummyMoodData(mood);

  const activeReminders = data.reminders.filter(r => !r.dismissed);

  // Generate automated reminders based on actual tasks
  const overdueTasks = data.tasks.filter(t => !t.archived && t.status !== 'completed' && t.dueDate && new Date(t.dueDate) < new Date());
  const dueTodayTasks = data.tasks.filter(t => !t.archived && t.status !== 'completed' && t.dueDate && new Date(t.dueDate).toDateString() === new Date().toDateString());

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    addReminder({
      taskId: null,
      message: customMsg.trim(),
      scheduledFor: scheduledFor ? new Date(scheduledFor).toISOString() : new Date().toISOString(),
    });
    setCustomMsg('');
    setScheduledFor('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D9F36A]/40 border border-[#D9F36A] text-xs font-extrabold text-[#30205C] font-jakarta mb-2">
          <span>🤱</span>
          <span>Desi Mom Twist • Gentle Accountability</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
          Mummy Mode & Reminders 🔔
        </h1>
        <p className="text-sm text-[#30205C]/75 font-nunito mt-1">
          Forget robotic push notifications. Get gentle, relatable, humorous nudges so you stop putting things off.
        </p>
      </div>

      {/* Mummy Mood Meter Display */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E4D9] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-jakarta font-extrabold text-lg text-[#30205C]">
            Live Mummy Mood Meter
          </h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-bold text-[#30205C] font-nunito">Mummy Mode</span>
            <input
              type="checkbox"
              checked={data.preferences.mummyModeEnabled}
              onChange={e => updatePreferences({ mummyModeEnabled: e.target.checked })}
              className="w-4 h-4 text-[#7655E9] rounded border-[#E8E4D9] focus:ring-[#7655E9]"
            />
          </label>
        </div>

        <MummyMoodMeter />
      </div>

      {/* Overdue & Urgent Task Reminders */}
      {(overdueTasks.length > 0 || dueTodayTasks.length > 0) && (
        <div className="bg-[#FFF5F5] rounded-3xl p-6 border border-[#FF5C5C]/30 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#E04848]">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-jakarta font-bold text-sm text-[#E04848]">
              Urgent Attention Needed (Mummy is watching!)
            </h3>
          </div>

          <div className="space-y-2">
            {overdueTasks.map(t => (
              <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-[#FF5C5C]/20 flex items-center justify-between gap-3 shadow-2xs">
                <div className="min-w-0">
                  <p className="font-jakarta font-bold text-xs text-[#30205C] truncate">{t.title}</p>
                  <p className="text-[11px] text-[#E04848] font-nunito">
                    Overdue since {t.dueDate ? formatDueDate(t.dueDate) : 'recently'} • &ldquo;Abhi bhi time hai, start kar lo beta.&rdquo;
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#FF5C5C]/15 text-[#E04848] font-extrabold font-nunito flex-shrink-0">
                  Overdue
                </span>
              </div>
            ))}

            {dueTodayTasks.map(t => (
              <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-[#D9F36A] flex items-center justify-between gap-3 shadow-2xs">
                <div className="min-w-0">
                  <p className="font-jakarta font-bold text-xs text-[#30205C] truncate">{t.title}</p>
                  <p className="text-[11px] text-[#30205C] font-nunito font-semibold">
                    Due Today! • &ldquo;Bas 10 minute shuru kar lo, phir jo karna hai karo.&rdquo;
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#D9F36A] text-[#30205C] font-extrabold font-nunito flex-shrink-0">
                  Today
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Humorous Desi Quotes Showcase */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E4D9] shadow-xs">
        <h3 className="font-jakarta font-extrabold text-base text-[#30205C] mb-3 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#7655E9]" />
          <span>Mummy&apos;s Favourite Reminders</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Beta, assignment khud complete nahi hoga. Thoda toh dekh lo.",
            "Kitni der se pending hai ye? Bas 10 minute shuru kar lo.",
            "Phone rakh ke 15 minute padh lo, phir jo karna hai karo.",
            "Tumhare future ka sawaal hai... aur tum YouTube pe ho?",
            "Chalo, sirf ek step complete karte hain. Pura mountain aaj nahi chadhna.",
            "Abhi bhi time hai. Panic karne se better hai shuru karna."
          ].map((quote, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8E4D9] flex items-start gap-3">
              <span className="text-xl">💬</span>
              <p className="text-xs font-semibold text-[#30205C]/85 font-nunito leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Reminders List & Input */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E4D9] shadow-xs space-y-4">
        <h3 className="font-jakarta font-extrabold text-base text-[#30205C]">
          Your Personal Reminders
        </h3>

        {/* Input Form */}
        <form onSubmit={handleAddCustom} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customMsg}
            onChange={e => setCustomMsg(e.target.value)}
            placeholder="Add reminder (e.g. submit hard copy to HOD, return library book)..."
            className="flex-1 text-sm font-nunito border border-[#E8E4D9] rounded-xl px-4 py-2.5 bg-[#F8F6F0] focus:outline-none focus:ring-2 focus:ring-[#7655E9]"
          />
          <Button type="submit" size="md" className="bg-[#7655E9] hover:bg-[#6342D6] text-white">
            <Plus className="w-4 h-4" /> Add Reminder
          </Button>
        </form>

        {/* Active Reminders List */}
        {activeReminders.length === 0 ? (
          <p className="text-xs text-gray-400 font-nunito text-center py-4">
            No active custom reminders right now.
          </p>
        ) : (
          <div className="space-y-2 pt-2">
            {activeReminders.map(rem => (
              <div
                key={rem.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E4D9]"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-[#7655E9]" />
                  <span className="text-xs font-semibold text-[#30205C] font-nunito">{rem.message}</span>
                </div>
                <button
                  onClick={() => dismissReminder(rem.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#30205C] hover:bg-[#D9F36A] transition-colors"
                  title="Dismiss / Done"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
