import Link from 'next/link';
import { BrandStar, SleepingCatMascot } from '@/components/layout/Sidebar';
import {
  RotateCcw, CheckSquare, BarChart2, Bell, ArrowRight,
  Sparkles, CheckCircle2, Bookmark, Folder, Heart
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#30205C] font-nunito selection:bg-[#C5B4FF] selection:text-[#30205C]">
      {/* Navbar with UNPAUSE Branding */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E8E4D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7655E9] border border-[#C5B4FF]/40 flex items-center justify-center shadow-xs">
              <BrandStar className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-jakarta font-black text-[#30205C] text-lg tracking-tight leading-none block">
                UNPAUSE
              </span>
              <span className="text-[10px] text-[#7655E9] font-bold font-nunito">
                Start. Pause. Pick up again.
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold font-jakarta text-[#30205C]/80">
            <Link href="/" className="text-[#7655E9] hover:text-[#7655E9] transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-[#7655E9] transition-colors">Dashboard</Link>
            <Link href="/tasks" className="hover:text-[#7655E9] transition-colors">My Tasks</Link>
            <Link href="/subjects" className="hover:text-[#7655E9] transition-colors">Subjects</Link>
            <Link href="/progress" className="hover:text-[#7655E9] transition-colors">Progress</Link>
          </div>

          {/* Open App button */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="bg-[#7655E9] text-white px-5 py-2.5 rounded-xl text-sm font-bold font-jakarta hover:bg-[#6342D6] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Open App →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Card Canvas */}
          <div className="bg-white rounded-[36px] border border-[#E8E4D9] p-8 md:p-12 shadow-sm relative overflow-hidden">
            {/* Subtle doodle accents */}
            <div className="absolute top-6 right-8 text-[#D9F36A] text-2xl select-none hidden sm:block">
              ✦
            </div>
            <div className="absolute bottom-6 left-8 text-[#C5B4FF] text-2xl select-none hidden sm:block">
              ✨
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Headline and Story */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#EBE5FF] border border-[#C5B4FF] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#7655E9] font-jakarta">
                  <span>⚡</span>
                  <span>A Student Productivity Space</span>
                </div>

                <div>
                  <h1 className="font-jakarta font-black text-4xl sm:text-5xl lg:text-6xl text-[#30205C] tracking-tight leading-[1.12]">
                    Life happens.<br />
                    <span className="text-[#7655E9]">Unpause in seconds.</span>
                  </h1>
                  <p className="font-jakarta font-bold text-2xl sm:text-3xl text-[#30205C]/80 mt-2">
                    Start. Pause. Pick up again.
                  </p>
                </div>

                <p className="text-base sm:text-lg text-gray-600 font-nunito max-w-xl leading-relaxed">
                  Assignments, notes, deadlines and half-finished work — all in one place. UNPAUSE helps you remember exactly where you stopped and pick up momentum without guilt or aggressive streaks.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-[#7655E9] text-white px-7 py-3.5 rounded-2xl text-base font-bold font-jakarta hover:bg-[#6342D6] transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 text-[#D9F36A]" />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-[#F8F6F0] border border-[#E8E4D9] text-[#30205C] px-6 py-3.5 rounded-2xl text-base font-bold font-jakarta hover:bg-[#EBE5FF] transition-all"
                  >
                    <span>See Demo Workspace</span>
                  </Link>
                </div>

                <p className="text-xs text-gray-400 font-nunito">
                  ✓ Instant local autosave &bull; No registration required &bull; 100% free for students
                </p>
              </div>

              {/* Right Column: Sleeping Cat Mascot Illustration & Workspace preview */}
              <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md bg-[#F8F6F0] rounded-3xl p-6 border border-[#E8E4D9] shadow-inner text-center">
                  <div className="text-left mb-2">
                    <span className="text-[10px] font-extrabold text-[#7655E9] uppercase tracking-widest font-jakarta">
                      Your Desk Companion
                    </span>
                  </div>

                  {/* Sleeping Cat Illustration with Laptop */}
                  <div className="my-2">
                    <SleepingCatMascot />
                  </div>

                  {/* Mockup task floating pill */}
                  <div className="mt-4 bg-white p-3.5 rounded-2xl border border-[#C5B4FF] shadow-xs text-left">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-jakarta font-bold text-xs text-[#30205C] truncate">
                        Engineering Maths — Assignment 3
                      </span>
                      <span className="text-[10px] font-extrabold text-[#30205C] bg-[#D9F36A] px-2 py-0.5 rounded-full font-nunito">
                        60% done
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-nunito mb-2">
                      Last paused: Problem 6 (Partial Fractions) &bull; 2h ago
                    </p>
                    <div className="w-full bg-[#EBE5FF] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#7655E9] h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Feature Badges Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 pt-8 border-t border-[#E8E4D9]">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8E4D9]">
                <div className="w-10 h-10 rounded-xl bg-[#EBE5FF] flex items-center justify-center text-[#7655E9] flex-shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-xs text-[#30205C] leading-tight">
                    Resume Where You Left Off
                  </h4>
                  <p className="text-[11px] text-gray-500 font-nunito mt-0.5">Pick up instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8E4D9]">
                <div className="w-10 h-10 rounded-xl bg-[#D9F36A]/40 flex items-center justify-center text-[#30205C] flex-shrink-0">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-xs text-[#30205C] leading-tight">
                    Break Down Big Tasks
                  </h4>
                  <p className="text-[11px] text-gray-500 font-nunito mt-0.5">Small checkable steps</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8E4D9]">
                <div className="w-10 h-10 rounded-xl bg-[#EBE5FF] flex items-center justify-center text-[#7655E9] flex-shrink-0">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-xs text-[#30205C] leading-tight">
                    Track Your Progress
                  </h4>
                  <p className="text-[11px] text-gray-500 font-nunito mt-0.5">Calm weekly insight</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E8E4D9]">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] flex items-center justify-center text-[#FF5C5C] flex-shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-xs text-[#30205C] leading-tight">
                    Get Gentle Reminders
                  </h4>
                  <p className="text-[11px] text-gray-500 font-nunito mt-0.5">Desi Mummy Mode</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: 6 Cards Grid */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#7655E9] uppercase tracking-widest font-jakarta">Why UNPAUSE Works</span>
          <h2 className="text-3xl font-extrabold text-[#30205C] font-jakarta tracking-tight mt-1">
            Built for how student life actually happens
          </h2>
          <p className="text-sm text-gray-600 font-nunito mt-2">
            Most productivity apps make you feel guilty for pausing. We make resuming feel effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Pick Up Where You Left Off */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EBE5FF] flex items-center justify-center text-2xl mb-4">
                🔁
              </div>
              <h3 className="font-jakarta font-bold text-lg text-[#30205C] mb-2">
                Pick up where you left off
              </h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">
                UNPAUSE intelligently preserves your last active task and study notes. When you return, one click takes you right back to where you stopped.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E4D9] text-xs font-bold text-[#7655E9] font-jakarta">
              Zero restart friction →
            </div>
          </div>

          {/* 2. Keep Subjects Organized */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D9F36A]/30 flex items-center justify-center text-2xl mb-4">
                📁
              </div>
              <h3 className="font-jakarta font-bold text-lg text-[#30205C] mb-2">
                Keep subjects organized
              </h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">
                Color-coded subject folders for Maths, Circuits, DSA, and Projects. Keep homework, lab files, and notes unified in one clean workspace.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E4D9] text-xs font-bold text-[#7655E9] font-jakarta">
              Subject workspaces →
            </div>
          </div>

          {/* 3. Break Big Tasks Down */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EBE5FF] flex items-center justify-center text-2xl mb-4">
                ✂️
              </div>
              <h3 className="font-jakarta font-bold text-lg text-[#30205C] mb-2">
                Break big tasks down
              </h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">
                Turn overwhelming assignments into bite-sized subtasks. Checking off subtasks automatically recalculates your percentage progress.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E4D9] text-xs font-bold text-[#7655E9] font-jakarta">
              Actionable checklists →
            </div>
          </div>

          {/* 4. Progress Without Pressure */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D9F36A]/30 flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="font-jakarta font-bold text-lg text-[#30205C] mb-2">
                Progress without pressure
              </h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">
                No aggressive streak counters that reset to zero when exams hit. Just honest weekly rhythm, completion rings, and positive momentum.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E4D9] text-xs font-bold text-[#7655E9] font-jakarta">
              Calm analytics →
            </div>
          </div>

          {/* 5. Desi Mom Reminders */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] flex items-center justify-center text-2xl mb-4">
                🤱
              </div>
              <h3 className="font-jakarta font-bold text-lg text-[#30205C] mb-2">
                Mummy Mode Reminders
              </h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">
                Humorous, relatable Indian-mom-inspired nudges like &ldquo;Beta, assignment khud complete nahi hoga. Thoda toh dekh lo.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E4D9] text-xs font-bold text-[#7655E9] font-jakarta">
              Playful accountability →
            </div>
          </div>

          {/* 6. Reliable Autosave */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EBE5FF] flex items-center justify-center text-2xl mb-4">
                💾
              </div>
              <h3 className="font-jakarta font-bold text-lg text-[#30205C] mb-2">
                Automatic debounced save
              </h3>
              <p className="text-sm text-gray-500 font-nunito leading-relaxed">
                Every keystroke in your task notes and descriptions saves automatically in your browser. Never worry about losing progress when the tab closes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E4D9] text-xs font-bold text-[#7655E9] font-jakarta">
              Real-time persistence →
            </div>
          </div>
        </div>
      </section>

      {/* Mummy Mode Teaser Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-[#EBE5FF] rounded-[36px] p-8 md:p-12 border border-[#C5B4FF] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D9F36A] px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#30205C] font-jakarta mb-3 shadow-2xs">
                <span>🔥</span>
                <span>The Mummy Mood Meter</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#30205C] font-jakarta tracking-tight">
                Accountability that makes you smile
              </h2>
              <p className="text-sm sm:text-base text-[#30205C]/80 font-nunito mt-3 leading-relaxed">
                The Mummy Mood Meter monitors your pending tasks and deadlines. If you are on track, Mummy is Chill 😊. If you leave 3 assignments till midnight, expect Full Lecture Mode 🔥!
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/reminders"
                  className="bg-[#30205C] text-white px-6 py-3 rounded-xl text-sm font-bold font-jakarta hover:bg-[#422D7A] transition-all shadow-sm"
                >
                  Test the Mood Meter →
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { mood: 'Chill Mummy 😊', quote: 'Achha, kaam ho raha hai. Theek hai beta.', color: 'bg-white border-[#C5B4FF]' },
                { mood: 'Suspicious Mummy 🤨', quote: 'Ye sab kal ke liye kyun chhod rakha hai? Tumhara baad mein kab aayega?', color: 'bg-white border-[#D9F36A]' },
                { mood: 'Full Lecture Mode 🔥', quote: 'Phone side mein rakho. 20 minute. Bas ek task toh complete karo!', color: 'bg-[#FFF0F0] border-[#FF5C5C]' },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border shadow-xs ${item.color}`}>
                  <p className="font-jakarta font-extrabold text-xs text-[#30205C]">{item.mood}</p>
                  <p className="font-nunito text-xs text-gray-700 italic mt-1">&ldquo;{item.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E4D9] py-12 px-4 bg-white mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7655E9] flex items-center justify-center">
              <BrandStar className="w-5 h-5 text-white" />
            </div>
            <span className="font-jakarta font-black text-[#30205C] text-lg tracking-tight">
              UNPAUSE
            </span>
            <span className="text-xs text-gray-500 font-nunito">&bull; Start. Pause. Pick up again.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-[#30205C]/80 font-jakarta">
            <Link href="/dashboard" className="hover:text-[#7655E9]">Dashboard</Link>
            <Link href="/tasks" className="hover:text-[#7655E9]">Tasks</Link>
            <Link href="/subjects" className="hover:text-[#7655E9]">Subjects</Link>
            <Link href="/focus" className="hover:text-[#7655E9]">Focus Mode</Link>
            <Link href="/progress" className="hover:text-[#7655E9]">Progress</Link>
            <Link href="/reminders" className="hover:text-[#7655E9]">Reminders</Link>
          </div>

          <p className="text-xs text-gray-400 font-nunito">
            Made with <Heart className="w-3.5 h-3.5 inline text-[#7655E9] fill-[#7655E9]" /> for college students.
          </p>
        </div>
      </footer>
    </div>
  );
}
