export type DemoScreen = 'home' | 'safe' | 'journal' | 'insights' | 'support' | 'me';
export type Period = 'week' | 'month' | 'all';

export type Entry = { id: number; mood: string; what: string; feeling: string; need: string; notes: string; sample: boolean };

export const MOODS = [
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😨', label: 'Anxious' },
  { emoji: '😬', label: 'Tense' },
  { emoji: '😵', label: 'Overwhelmed' },
];

export const SCREENS: { id: DemoScreen; label: string; tip: string }[] = [
  { id: 'home', label: 'Home', tip: 'Tap Safe Mode, or use the bottom navigation to move around.' },
  { id: 'safe', label: 'Safe Mode', tip: 'Tap the numbers in order, open Grounding exercises, then close with the X.' },
  { id: 'journal', label: 'Trigger journal', tip: 'Choose a mood, write something fictional and save it. Your entry appears in Insights.' },
  { id: 'insights', label: 'Insights', tip: 'Switch between week, month and all time, then review the example entries.' },
  { id: 'support', label: 'Support & help', tip: 'Open a row to see what each part of the Professional Hub is for.' },
  { id: 'me', label: 'Me', tip: 'Open a row. Try a text size in Display & accessibility.' },
];

export const PERIODS: Record<Period, { tab: string; title: string; counts: { name: string; n: number }[] }> = {
  week: { tab: 'This week', title: 'Example week: 19–25 Oct', counts: [{ name: 'Anxious', n: 3 }, { name: 'Overwhelmed', n: 2 }, { name: 'Sad', n: 1 }] },
  month: { tab: 'This month', title: 'Example month: October', counts: [{ name: 'Anxious', n: 9 }, { name: 'Overwhelmed', n: 6 }, { name: 'Sad', n: 4 }] },
  all: { tab: 'All time', title: 'Example: all time', counts: [{ name: 'Anxious', n: 21 }, { name: 'Overwhelmed', n: 14 }, { name: 'Sad', n: 11 }] },
};

export const SAMPLE_ENTRIES: Entry[] = [
  { id: 1, mood: 'Anxious', what: 'Busy family dinner', feeling: 'Anxious, watched', need: 'A short walk outside', notes: '', sample: true },
  { id: 2, mood: 'Overwhelmed', what: 'Long day with no breaks', feeling: 'Overwhelmed, tired', need: 'Quiet time and a call with a friend', notes: '', sample: true },
  { id: 3, mood: 'Sad', what: 'Saw an old photo', feeling: 'Sad', need: 'To talk to someone I trust', notes: '', sample: true },
];
