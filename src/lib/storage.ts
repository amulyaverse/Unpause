export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type MummyMood = 'chill' | 'suspicious' | 'alert' | 'lecture';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subjectId: string | null;
  priority: Priority;
  status: TaskStatus;
  dueDate: string | null;
  subtasks: Subtask[];
  notes: string;
  progress: number;
  archived: boolean;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  lastWorkedOn: string | null;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  archived: boolean;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  lastWorkedOn: string | null;
}

export interface FocusSession {
  id: string;
  taskId: string | null;
  taskTitle: string;
  duration: number;
  completedAt: string;
  notes: string;
}

export interface Reminder {
  id: string;
  taskId: string | null;
  message: string;
  scheduledFor: string;
  dismissed: boolean;
  createdAt: string;
}

export interface UserPreferences {
  mummyModeEnabled: boolean;
  reminderStyle: 'desi' | 'normal';
  reminderFrequency: 'low' | 'medium' | 'high';
  userName: string;
  theme: 'light';
}

export interface AppData {
  tasks: Task[];
  subjects: Subject[];
  focusSessions: FocusSession[];
  reminders: Reminder[];
  preferences: UserPreferences;
  version: number;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function buildDefaultData(): AppData {
  const now = new Date();
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
  const twoDaysAgo = new Date(now); twoDaysAgo.setDate(now.getDate() - 2);
  const threeDaysAgo = new Date(now); threeDaysAgo.setDate(now.getDate() - 3);
  const nextWeek = new Date(now); nextWeek.setDate(now.getDate() + 7);
  const twoHoursAgo = new Date(now); twoHoursAgo.setHours(now.getHours() - 2);
  const tenMinAgo = new Date(now); tenMinAgo.setMinutes(now.getMinutes() - 10);

  const DEFAULT_SUBJECTS: Subject[] = [
    { id: 'subj-1', name: 'Engineering Mathematics', color: '#7655E9', icon: '📐', description: 'Calculus, Linear Algebra, Differential Equations', archived: false, archivedAt: null, createdAt: threeDaysAgo.toISOString(), updatedAt: twoHoursAgo.toISOString(), lastWorkedOn: twoHoursAgo.toISOString() },
    { id: 'subj-2', name: 'Data Structures & Algorithms', color: '#D9F36A', icon: '🌳', description: 'Trees, Graphs, Dynamic Programming', archived: false, archivedAt: null, createdAt: threeDaysAgo.toISOString(), updatedAt: yesterday.toISOString(), lastWorkedOn: yesterday.toISOString() },
    { id: 'subj-3', name: 'Electrical Circuits', color: '#C5B4FF', icon: '⚡', description: 'Circuit analysis, AC/DC', archived: false, archivedAt: null, createdAt: threeDaysAgo.toISOString(), updatedAt: tenMinAgo.toISOString(), lastWorkedOn: tenMinAgo.toISOString() },
  ];

  const DEFAULT_TASKS: Task[] = [
    {
      id: 'task-1', title: 'Engineering Mathematics — Assignment 3', description: 'Complete the integration problems from Chapter 5. Focus on partial fractions and substitution methods.',
      subjectId: 'subj-1', priority: 'high', status: 'in-progress', dueDate: tomorrow.toISOString(),
      subtasks: [
        { id: 'st-1', title: 'Solve Q1-Q5 (Basic Integration)', completed: true, createdAt: twoDaysAgo.toISOString() },
        { id: 'st-2', title: 'Solve Q6-Q10 (Partial Fractions)', completed: true, createdAt: twoDaysAgo.toISOString() },
        { id: 'st-3', title: 'Solve Q11-Q15 (Substitution)', completed: false, createdAt: twoDaysAgo.toISOString() },
        { id: 'st-4', title: 'Verify all answers', completed: false, createdAt: twoDaysAgo.toISOString() },
        { id: 'st-5', title: 'Write final solutions neatly', completed: false, createdAt: twoDaysAgo.toISOString() },
      ],
      notes: 'Remember: use u-substitution for trig integrals. Sir mentioned this will be in exam too.',
      progress: 40, archived: false, archivedAt: null,
      createdAt: threeDaysAgo.toISOString(), updatedAt: twoHoursAgo.toISOString(), lastWorkedOn: twoHoursAgo.toISOString(),
    },
    {
      id: 'task-2', title: 'DSA Lab Assignment — Binary Trees', description: 'Implement BST with insert, delete, search and traversal methods. Submit by Friday.',
      subjectId: 'subj-2', priority: 'high', status: 'in-progress', dueDate: tomorrow.toISOString(),
      subtasks: [
        { id: 'st-6', title: 'Implement BST Node class', completed: true, createdAt: yesterday.toISOString() },
        { id: 'st-7', title: 'Write insert method', completed: true, createdAt: yesterday.toISOString() },
        { id: 'st-8', title: 'Write delete method', completed: false, createdAt: yesterday.toISOString() },
        { id: 'st-9', title: 'Write traversal methods', completed: false, createdAt: yesterday.toISOString() },
      ],
      notes: '',
      progress: 50, archived: false, archivedAt: null,
      createdAt: yesterday.toISOString(), updatedAt: yesterday.toISOString(), lastWorkedOn: yesterday.toISOString(),
    },
    {
      id: 'task-3', title: 'ECTA Lab Report — RC Circuit', description: 'Write the lab report for the RC circuit experiment. Include circuit diagrams, readings, and analysis.',
      subjectId: 'subj-3', priority: 'medium', status: 'pending', dueDate: nextWeek.toISOString(),
      subtasks: [
        { id: 'st-10', title: 'Draw circuit diagrams', completed: false, createdAt: now.toISOString() },
        { id: 'st-11', title: 'Record experimental readings', completed: false, createdAt: now.toISOString() },
        { id: 'st-12', title: 'Write analysis section', completed: false, createdAt: now.toISOString() },
        { id: 'st-13', title: 'Write conclusion', completed: false, createdAt: now.toISOString() },
      ],
      notes: 'Sir wants at least 3 observation tables. Check lab manual.',
      progress: 0, archived: false, archivedAt: null,
      createdAt: tenMinAgo.toISOString(), updatedAt: tenMinAgo.toISOString(), lastWorkedOn: tenMinAgo.toISOString(),
    },
    {
      id: 'task-4', title: 'Study for Mid-Semester Maths Test', description: 'Revise Chapters 1-4. Focus on sequences, series, and limits.',
      subjectId: 'subj-1', priority: 'high', status: 'pending', dueDate: now.toISOString(),
      subtasks: [],
      notes: '',
      progress: 0, archived: false, archivedAt: null,
      createdAt: twoDaysAgo.toISOString(), updatedAt: twoDaysAgo.toISOString(), lastWorkedOn: null,
    },
    {
      id: 'task-5', title: 'DSA Theory Assignment — Graph Algorithms', description: 'Write short notes on Dijkstra and BFS/DFS. Max 2 pages.',
      subjectId: 'subj-2', priority: 'low', status: 'completed', dueDate: yesterday.toISOString(),
      subtasks: [
        { id: 'st-14', title: 'Write Dijkstra notes', completed: true, createdAt: twoDaysAgo.toISOString() },
        { id: 'st-15', title: 'Write BFS/DFS notes', completed: true, createdAt: twoDaysAgo.toISOString() },
      ],
      notes: 'Submitted!',
      progress: 100, archived: false, archivedAt: null,
      createdAt: threeDaysAgo.toISOString(), updatedAt: yesterday.toISOString(), lastWorkedOn: yesterday.toISOString(),
    },
  ];

  return {
    tasks: DEFAULT_TASKS,
    subjects: DEFAULT_SUBJECTS,
    focusSessions: [],
    reminders: [],
    preferences: {
      mummyModeEnabled: true,
      reminderStyle: 'desi',
      reminderFrequency: 'medium',
      userName: 'Student',
      theme: 'light',
    },
    version: 1,
  };
}

const STORAGE_KEY = 'unpause-data';
const LEGACY_STORAGE_KEY = 'halfdone-data';

export function loadData(): AppData {
  if (typeof window === 'undefined') return buildDefaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) {
      const data = buildDefaultData();
      saveData(data);
      return data;
    }
    const parsed = JSON.parse(raw) as AppData;
    // ensure saved under current key
    saveData(parsed);
    return parsed;
  } catch {
    return buildDefaultData();
  }
}

export function saveData(data: AppData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, version: 1 }));
}

export function updateTaskProgress(task: Task): Task {
  if (task.subtasks.length === 0) return task;
  const done = task.subtasks.filter(s => s.completed).length;
  const progress = Math.round((done / task.subtasks.length) * 100);
  const status: TaskStatus = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'pending';
  return { ...task, progress, status };
}

export function calculateMummyMood(data: AppData): MummyMood {
  const now = new Date();
  const activeTasks = data.tasks.filter(t => !t.archived && t.status !== 'completed');
  const overdue = activeTasks.filter(t => t.dueDate && new Date(t.dueDate) < now);
  const dueToday = activeTasks.filter(t => {
    if (!t.dueDate) return false;
    const d = new Date(t.dueDate);
    return d.toDateString() === now.toDateString();
  });
  if (overdue.length > 0) return 'lecture';
  if (dueToday.length > 0) return 'alert';
  if (activeTasks.length > 3) return 'suspicious';
  return 'chill';
}

export function getRecentlyActive(data: AppData): Task[] {
  return data.tasks
    .filter(t => !t.archived)
    .sort((a, b) => {
      const aTime = a.lastWorkedOn ? new Date(a.lastWorkedOn).getTime() : 0;
      const bTime = b.lastWorkedOn ? new Date(b.lastWorkedOn).getTime() : 0;
      return bTime - aTime;
    });
}
