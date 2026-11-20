'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings, User, Bell, Shield, Database, RefreshCw, Download, Check } from 'lucide-react';
import { loadData, saveData } from '@/lib/storage';

export default function SettingsPage() {
  const { data, updatePreferences, hydrate } = useStore();
  const [userName, setUserName] = useState(data.preferences.userName);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    updatePreferences({ userName: userName.trim() });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleExportData = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unpause-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset to the default demo data? All customized tasks will be replaced.')) {
      localStorage.removeItem('unpause-data');
      localStorage.removeItem('halfdone-data');
      hydrate();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-jakarta tracking-tight">
          Settings & Preferences ⚙️
        </h1>
        <p className="text-sm text-navy/70 font-nunito mt-1">
          Customize your profile, notification tones, and personal workspace rules.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <User className="w-5 h-5 text-navy" />
          <h2 className="font-jakarta font-bold text-base text-navy">Student Profile</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
          <div>
            <label className="text-xs font-bold text-gray-500 font-jakarta uppercase tracking-wider block mb-1.5">
              Your Name / Nickname
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full text-sm font-semibold text-navy font-jakarta border border-gray-200 rounded-xl px-4 py-2.5 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-lavender"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Save Profile
            </Button>
            {savedMsg && (
              <span className="text-xs text-green-600 font-bold font-nunito flex items-center gap-1 animate-fadeIn">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Mummy Mode Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Bell className="w-5 h-5 text-navy" />
          <h2 className="font-jakarta font-bold text-base text-navy">Mummy Mode & Nudge Tone</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2]">
            <div>
              <p className="font-jakarta font-bold text-sm text-navy">Enable Mummy Mode</p>
              <p className="text-xs text-gray-500 font-nunito">
                Receive playful, humorous Hinglish reminders instead of generic alerts.
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.preferences.mummyModeEnabled}
              onChange={e => updatePreferences({ mummyModeEnabled: e.target.checked })}
              className="w-5 h-5 text-navy rounded border-gray-300 focus:ring-lavender"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 font-jakarta uppercase tracking-wider block mb-1.5">
              Reminder Tone
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'desi', label: 'Desi Mom (Humorous & Gentle)', desc: 'Playful Hindi/Hinglish quotes' },
                { id: 'normal', label: 'Neutral & Standard', desc: 'Simple objective reminders' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updatePreferences({ reminderStyle: opt.id as any })}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    data.preferences.reminderStyle === opt.id
                      ? 'border-navy bg-lavender-light/40 shadow-xs'
                      : 'border-gray-200 bg-[#FAF7F2] hover:bg-gray-100'
                  }`}
                >
                  <p className="text-xs font-bold text-navy font-jakarta">{opt.label}</p>
                  <p className="text-[11px] text-gray-500 font-nunito mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 font-jakarta uppercase tracking-wider block mb-1.5">
              Frequency
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map(freq => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => updatePreferences({ reminderFrequency: freq })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-jakarta capitalize transition-all ${
                    data.preferences.reminderFrequency === freq
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-gray-600 border border-gray-200'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Storage & Data Management */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Database className="w-5 h-5 text-navy" />
          <h2 className="font-jakarta font-bold text-base text-navy">Storage & Backup</h2>
        </div>

        <p className="text-xs text-gray-500 font-nunito leading-relaxed">
          UNPAUSE stores your data locally in your browser with automatic debounced saving. No cloud accounts or trackers.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleExportData}
            className="gap-2"
          >
            <Download className="w-4 h-4" /> Export Backup (JSON)
          </Button>

          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleResetData}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
}
