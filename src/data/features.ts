import { BookOpen, Compass, HeartHandshake, LayoutDashboard, LifeBuoy, Sparkles, UserRound, type LucideIcon } from 'lucide-react';
import type { DemoScreen } from '../demo/types';

export type Feature = {
  id: string;
  name: string;
  summary: string;
  detail: string;
  caveat?: string;
  icon: LucideIcon;
  screen: DemoScreen;
  screenLabel: string;
  planned?: boolean;
};

/** Ordered from the innermost ring outward: from the person, out to wider support. */
export const FEATURES: Feature[] = [
  {
    id: 'profile', name: 'Recovery Profile', icon: UserRound, screen: 'me', screenLabel: 'Me',
    summary: 'Start with what matters to you.',
    detail: 'Set your own goals, preferences and known triggers.',
  },
  {
    id: 'journal', name: 'Trigger Journal', icon: BookOpen, screen: 'journal', screenLabel: 'Trigger journal',
    summary: 'Notice what set a feeling off.',
    detail: 'Record emotions, triggers and reflections while they are fresh.',
  },
  {
    id: 'dashboard', name: 'Recovery Dashboard', icon: LayoutDashboard, screen: 'home', screenLabel: 'Home',
    summary: 'See your journey in one calm view.',
    detail: 'Look back on progress and reflections. It is never a competition or a measure of your worth.',
  },
  {
    id: 'safe', name: 'Safe Mode', icon: LifeBuoy, screen: 'safe', screenLabel: 'Safe Mode',
    summary: 'Coping tools, one tap away.',
    detail: 'Grounding exercises, a calming activity and a shortcut to someone you trust.',
    caveat: 'Safe Mode is not an emergency service.',
  },
  {
    id: 'circle', name: 'Support Circle', icon: HeartHandshake, screen: 'me', screenLabel: 'Me',
    summary: 'Keep your people close.',
    detail: 'Choose trusted contacts and reach them quickly. You decide who is included.',
  },
  {
    id: 'hub', name: 'Professional Hub', icon: Compass, screen: 'support', screenLabel: 'Support & help',
    summary: 'Find support you can trust.',
    detail: 'Professional support, education and recovery services in one place.',
  },
  {
    id: 'ai', name: 'AI Behavioural Insights', icon: Sparkles, screen: 'insights', screenLabel: 'Insights', planned: true,
    summary: 'Planned: gentle prompts from your entries.',
    detail: 'Would look for recurring emotions and triggers in entries, then offer questions to reflect on.',
    caveat: 'Not clinically validated. It would not diagnose, predict relapse or replace professional judgment. The demo shows hand-written examples.',
  },
];
