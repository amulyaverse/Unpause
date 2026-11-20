import { create } from 'zustand';
import {
  AppData, Task, Subject, FocusSession, Reminder, UserPreferences,
  loadData, saveData, generateId, updateTaskProgress, calculateMummyMood,
  MummyMood, TaskStatus,
} from './storage';

let saveTimer: ReturnType<typeof setTimeout> | null = null;

interface AppStore {
  data: AppData;
  isSaving: boolean;
  lastSaved: Date | null;
  isHydrated: boolean;

  hydrate: () => void;
  triggerSave: () => void;

  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'archived' | 'archivedAt' | 'progress'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  archiveTask: (id: string) => void;
  restoreTask: (id: string) => void;
  completeTask: (id: string) => void;
  touchTask: (id: string) => void;

  addSubject: (subject: Omit<Subject, 'id' | 'createdAt' | 'updatedAt' | 'archived' | 'archivedAt'>) => Subject;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  archiveSubject: (id: string) => void;
  restoreSubject: (id: string) => void;

  addFocusSession: (session: Omit<FocusSession, 'id'>) => void;

  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'dismissed'>) => void;
  dismissReminder: (id: string) => void;

  updatePreferences: (prefs: Partial<UserPreferences>) => void;

  getMummyMood: () => MummyMood;
  getSubjectById: (id: string) => Subject | undefined;
  getTasksBySubject: (subjectId: string) => Task[];
}

export const useStore = create<AppStore>((set, get) => ({
  data: {
    tasks: [], subjects: [], focusSessions: [], reminders: [],
    preferences: { mummyModeEnabled: true, reminderStyle: 'desi', reminderFrequency: 'medium', userName: 'Student', theme: 'light' },
    version: 1,
  },
  isSaving: false,
  lastSaved: null,
  isHydrated: false,

  hydrate: () => {
    const data = loadData();
    set({ data, isHydrated: true });
  },

  triggerSave: () => {
    if (saveTimer) clearTimeout(saveTimer);
    set({ isSaving: true });
    saveTimer = setTimeout(() => {
      const { data } = get();
      saveData(data);
      set({ isSaving: false, lastSaved: new Date() });
    }, 500);
  },

  addTask: (taskData) => {
    const now = new Date().toISOString();
    const task: Task = { ...taskData, id: generateId(), createdAt: now, updatedAt: now, archived: false, archivedAt: null, progress: 0 };
    set(state => ({ data: { ...state.data, tasks: [...state.data.tasks, task] } }));
    get().triggerSave();
    return task;
  },

  updateTask: (id, updates) => {
    set(state => ({
      data: {
        ...state.data,
        tasks: state.data.tasks.map(t => {
          if (t.id !== id) return t;
          const updated = { ...t, ...updates, updatedAt: new Date().toISOString() };
          return updateTaskProgress(updated);
        }),
      },
    }));
    get().triggerSave();
  },

  deleteTask: (id) => {
    set(state => ({ data: { ...state.data, tasks: state.data.tasks.filter(t => t.id !== id) } }));
    get().triggerSave();
  },

  archiveTask: (id) => {
    const now = new Date().toISOString();
    set(state => ({
      data: { ...state.data, tasks: state.data.tasks.map(t => t.id === id ? { ...t, archived: true, archivedAt: now, updatedAt: now } : t) },
    }));
    get().triggerSave();
  },

  restoreTask: (id) => {
    const now = new Date().toISOString();
    set(state => ({
      data: { ...state.data, tasks: state.data.tasks.map(t => t.id === id ? { ...t, archived: false, archivedAt: null, updatedAt: now } : t) },
    }));
    get().triggerSave();
  },

  completeTask: (id) => {
    const now = new Date().toISOString();
    set(state => ({
      data: { ...state.data, tasks: state.data.tasks.map(t => t.id === id ? { ...t, status: 'completed' as TaskStatus, progress: 100, updatedAt: now, lastWorkedOn: now } : t) },
    }));
    get().triggerSave();
  },

  touchTask: (id) => {
    const now = new Date().toISOString();
    set(state => ({
      data: { ...state.data, tasks: state.data.tasks.map(t => t.id === id ? { ...t, lastWorkedOn: now, updatedAt: now } : t) },
    }));
    get().triggerSave();
  },

  addSubject: (subjectData) => {
    const now = new Date().toISOString();
    const subject: Subject = { ...subjectData, id: generateId(), createdAt: now, updatedAt: now, archived: false, archivedAt: null, lastWorkedOn: null };
    set(state => ({ data: { ...state.data, subjects: [...state.data.subjects, subject] } }));
    get().triggerSave();
    return subject;
  },

  updateSubject: (id, updates) => {
    set(state => ({
      data: { ...state.data, subjects: state.data.subjects.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s) },
    }));
    get().triggerSave();
  },

  deleteSubject: (id) => {
    set(state => ({ data: { ...state.data, subjects: state.data.subjects.filter(s => s.id !== id) } }));
    get().triggerSave();
  },

  archiveSubject: (id) => {
    const now = new Date().toISOString();
    set(state => ({
      data: { ...state.data, subjects: state.data.subjects.map(s => s.id === id ? { ...s, archived: true, archivedAt: now } : s) },
    }));
    get().triggerSave();
  },

  restoreSubject: (id) => {
    set(state => ({
      data: { ...state.data, subjects: state.data.subjects.map(s => s.id === id ? { ...s, archived: false, archivedAt: null } : s) },
    }));
    get().triggerSave();
  },

  addFocusSession: (session) => {
    const fs: FocusSession = { ...session, id: generateId() };
    set(state => ({ data: { ...state.data, focusSessions: [...state.data.focusSessions, fs] } }));
    get().triggerSave();
  },

  addReminder: (reminder) => {
    const r: Reminder = { ...reminder, id: generateId(), createdAt: new Date().toISOString(), dismissed: false };
    set(state => ({ data: { ...state.data, reminders: [...state.data.reminders, r] } }));
    get().triggerSave();
  },

  dismissReminder: (id) => {
    set(state => ({
      data: { ...state.data, reminders: state.data.reminders.map(r => r.id === id ? { ...r, dismissed: true } : r) },
    }));
    get().triggerSave();
  },

  updatePreferences: (prefs) => {
    set(state => ({ data: { ...state.data, preferences: { ...state.data.preferences, ...prefs } } }));
    get().triggerSave();
  },

  getMummyMood: () => calculateMummyMood(get().data),
  getSubjectById: (id) => get().data.subjects.find(s => s.id === id),
  getTasksBySubject: (subjectId) => get().data.tasks.filter(t => t.subjectId === subjectId && !t.archived),
}));
