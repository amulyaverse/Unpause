# UNPAUSE ⏸️✨

> **Start. Pause. Pick up again.**  
> A warm, intelligent, student-first productivity workspace built for the way college students *actually* work.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Production%20Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Local First](https://img.shields.io/badge/Data-100%25%20Local--First-brightgreen?style=for-the-badge)](https://en.wikipedia.org/wiki/Local-first_software)

---

## 💡 The Philosophy Behind UNPAUSE

Most productivity tools assume an idealized reality: infinite discipline, uninterrupted study blocks, and zero chaotic roommate emergencies. 

In real student life, **interruptions happen**:
- Chai breaks stretch from 5 minutes to 45 minutes.
- Lectures get rescheduled.
- Assignments get paused midway, files get lost, and restart friction turns a 20-minute pending task into a multi-day guilt trip.

**UNPAUSE** replaces guilt with seamless continuation. Instead of penalizing you for unfinished work, it remembers exactly what you were doing, bookmarks your subtasks, and lets you **pick up with zero friction the moment you return**.

---

## 🎨 Design System

UNPAUSE features a distinct, youthful visual identity tailored to students—moving away from generic corporate SaaS palettes:

| Color | Hex | Usage |
| :--- | :--- | :--- |
| **Deep Purple** | `#30205C` | Primary text, headings, strong anchors, selected dark UI elements |
| **Electric Lavender** | `#7655E9` | Interactive buttons, active states, key highlights |
| **Soft Lavender** | `#C5B4FF` | Secondary cards, subtle backings, progress bars |
| **Lime Accent** | `#D9F36A` | Completion milestones, energetic feedback, positive badges |
| **Off-White** | `#F8F6F0` | Warm reading surfaces and background canvas |

---

## 🚀 Key Features

### 1. ⚡ "Resume Where You Left Off"
- The dashboard highlights your most recent active task front and center.
- Displays last worked time, subtask progress, and an immediate **"Continue Working →"** action.

### 2. 📂 Smart Subject Organization
- Group tasks and assignments under academic subject folders (e.g., *Data Structures*, *Machine Learning*, *Design Studio*).
- **Recent Activity Prioritization**: Frequently accessed subject folders dynamically bubble to the top.
- Full folder management: inline rename, color accents, and archiving.

### 3. 🍅 Integrated Focus Timer
- Customizable Pomodoro/Deep Work timer (15, 25, 45, or 60-minute blocks).
- Directly link running timers to active tasks.
- Keep quick distraction notes and track completed session logs.

### 4. 👵 Mummy Mode & Mummy Mood Meter
- A lighthearted nod to Indian student life: an affectionate "Mummy Mode" that checks in on your progress.
- Features a reactive **Mummy Mood Meter** ranging from *"Bohot Khush"* (high task completion) to *"Padhai kab karega?"* (lagging tasks) with witty encouragement.

### 5. 📊 Visual Progress Analytics
- Weekly completion charts, daily momentum trackers, and subject-level distribution metrics.
- Keep track of both completed wins and ongoing efforts without toxic streaks.

### 6. 🔒 100% Local-First & Privacy Preserving
- **No account required. No external backend. Zero tracking.**
- All tasks, notes, subjects, and timer logs persist safely in your browser via `localStorage`.
- Includes full **JSON Data Backup (Export & Import)** in Settings.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static Site Generation)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State & Storage**: [Zustand](https://github.com/pmndrs/zustand) with custom hydration-safe persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📦 Project Structure

```
Unpause/
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── dashboard/    # Main student dashboard
│   │   │   ├── tasks/        # Task manager & filters
│   │   │   ├── subjects/     # Subject folder organizer
│   │   │   ├── focus/        # Focus / Pomodoro session timer
│   │   │   ├── progress/     # Weekly stats & progress insights
│   │   │   ├── reminders/    # Mummy reminders & mood meter
│   │   │   ├── archive/      # Archived tasks & subjects
│   │   │   └── settings/     # Theme preferences, backup import/export
│   │   ├── globals.css       # Tailwind & custom tokens
│   │   ├── layout.tsx        # Root layout (fonts & metadata)
│   │   └── page.tsx          # High-converting product landing page
│   ├── components/
│   │   ├── layout/           # Sidebar, TopBar, AppLayout
│   │   ├── tasks/            # TaskCard, TaskDetailModal, NewTaskModal
│   │   ├── subjects/         # SubjectCard, NewSubjectModal
│   │   ├── mummy/            # MummyMoodMeter
│   │   ├── search/           # GlobalSearch modal (Cmd+K)
│   │   └── ui/               # Button, Card, Badge, Modal, Input
│   └── lib/
│       ├── storage.ts        # LocalStorage data schema & migrations
│       ├── store.ts          # Zustand state store
│       └── utils.ts          # Formatting & helper utilities
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💻 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/amulyaverse/Unpause.git
cd Unpause
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start using UNPAUSE!

---

## ⚡ Deployment on Vercel

UNPAUSE is pre-configured for zero-config, single-click deployment on **Vercel**:

1. Fork or push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the **`Unpause`** repository.
4. Leave all build settings at default (`Framework: Next.js`).
5. Click **Deploy**! 🚀

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with 💜 for students everywhere who just need to unpause.
</p>
