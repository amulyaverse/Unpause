import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, isToday, isTomorrow, isPast, isThisWeek } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return 'some time ago';
  }
}

export function formatDueDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMM d');
  } catch {
    return '';
  }
}

export type DueDateStatus = 'overdue' | 'today' | 'soon' | 'upcoming';

export function getDueDateStatus(dateStr: string | null): DueDateStatus | null {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    if (isPast(date) && !isToday(date)) return 'overdue';
    if (isToday(date)) return 'today';
    if (isThisWeek(date)) return 'soon';
    return 'upcoming';
  } catch {
    return null;
  }
}

export function getMummyMoodData(mood: string) {
  const moods = {
    chill: {
      emoji: '😊',
      label: 'Chill Mummy',
      color: '#7655E9',
      bgColor: '#EBE5FF',
      messages: [
        'Achha, kaam ho raha hai. Theek hai.',
        'Dekho, bina kahe bhi kar sakte ho.',
        'Bahut acha beta. Mujhe proud feel ho raha hai.',
        'All good! Aise hi rehna.',
      ],
      level: 1,
    },
    suspicious: {
      emoji: '🤨',
      label: 'Suspicious Mummy',
      color: '#D9F36A',
      bgColor: '#F9FDE6',
      messages: [
        "Ye sab kal ke liye kyun chhod rakha hai?",
        "Tumhara 'baad mein' kab aayega?",
        'Thoda aur mehnat kar lo beta.',
        'Sirf ek aur task kar lo, phir rest karna.',
      ],
      level: 2,
    },
    alert: {
      emoji: '😤',
      label: 'Alert Mummy',
      color: '#C5B4FF',
      bgColor: '#F4EFFF',
      messages: [
        'Beta, deadline dekh lo. Main phir bol rahi hoon.',
        'Abhi shuru karoge toh ho jayega.',
        'Phone rakh ke 15 minute padh lo, phir jo karna hai karo.',
        'Kitni der se pending hai ye? Bas 10 minute shuru kar lo.',
      ],
      level: 3,
    },
    lecture: {
      emoji: '🔥',
      label: 'Full Lecture Mode',
      color: '#FF5C5C',
      bgColor: '#FFF0F0',
      messages: [
        'Mujhe sab pata hai. Tumne task khola bhi nahi.',
        'Phone side mein rakho. 20 minute. Bas.',
        'Ab koi excuse nahi. Ek task toh complete karo.',
        'Beta, deadline paas aa rahi hai. Ab toh seriously dekh lo.',
        'Tumhare future ka sawaal hai... aur tum YouTube pe ho?',
      ],
      level: 4,
    },
  };
  return moods[mood as keyof typeof moods] || moods.chill;
}

export const SUBJECT_COLORS = [
  '#7655E9', '#D9F36A', '#C5B4FF', '#30205C', '#8DA716',
  '#6342D6', '#A892FF', '#422D7A', '#F2FBC8', '#211542',
];

export const SUBJECT_ICONS = ['📐', '🌳', '⚡', '🔬', '📚', '💻', '🎨', '🧮', '🔭', '📝', '🏛️', '🧪'];
