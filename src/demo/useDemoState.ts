import { useState } from 'react';
import { MOODS, type DemoScreen, type Entry, type Period } from './types';

const BLANK = { mood: '', what: '', feeling: '', need: '', notes: '' };

/** All demo state lives in memory. Nothing is stored, sent or kept after the page closes. */
export function useDemoState(initial: DemoScreen = 'home') {
  const [screen, setScreenRaw] = useState<DemoScreen>(initial);
  const [draft, setDraft] = useState(BLANK);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [period, setPeriod] = useState<Period>('week');
  const [textScale, setTextScale] = useState(1);
  const [reminders, setReminders] = useState(true);
  const [displayName, setDisplayName] = useState('Jay');
  const [sub, setSub] = useState<string | null>(null);

  const setScreen = (s: DemoScreen) => {
    setSub(null);
    setJustSaved(false);
    setScreenRaw(s);
  };

  const save = () => {
    if (!draft.mood && !draft.what.trim()) {
      setSaveError('Choose a mood or describe what happened, then save.');
      setJustSaved(false);
      return;
    }
    setEntries((list) => [{ ...draft, mood: draft.mood || 'Noted', id: Date.now(), sample: false }, ...list]);
    setDraft(BLANK);
    setSaveError('');
    setJustSaved(true);
  };

  const fillExample = () => {
    setSaveError('');
    setJustSaved(false);
    setDraft({
      mood: MOODS[2].label,
      what: 'A fictional example: a stressful group chat before dinner.',
      feeling: 'Anxious, a bit restless',
      need: 'A few slow breaths and a message to a friend',
      notes: 'Sample text for this demonstration.',
    });
    setScreen('journal');
  };

  return {
    screen, setScreen, draft, setDraft, entries, setEntries, justSaved, saveError, save, fillExample,
    period, setPeriod, textScale, setTextScale, reminders, setReminders, displayName, setDisplayName, sub, setSub,
  };
}
export type DemoState = ReturnType<typeof useDemoState>;
