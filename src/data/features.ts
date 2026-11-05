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
    summary: 'Your goals, your preferences, your triggers.',
    detail: 'Everything starts with you. Set the recovery goals that matter to you, along with your preferences and the triggers you already know about.',
  },
  {
    id: 'journal', name: 'Trigger Journal', icon: BookOpen, screen: 'journal', screenLabel: 'Trigger journal',
    summary: 'Write down what happened and how it felt.',
    detail: 'Record emotions, experiences, triggers and reflections while they are fresh, so you can understand them better later.',
  },
  {
    id: 'dashboard', name: 'Recovery Dashboard', icon: LayoutDashboard, screen: 'home', screenLabel: 'Home',
    summary: 'See your progress and activity in one calm view.',
    detail: 'Look back over your progress, activities and reflections. Nothing here is a competition, and no number measures your worth.',
  },
  {
    id: 'safe', name: 'Safe Mode', icon: LifeBuoy, screen: 'safe', screenLabel: 'Safe Mode',
    summary: 'Coping tools for difficult moments, one tap away.',
    detail: 'Open grounding exercises, a short calming activity or a shortcut to someone you trust when a moment gets hard.',
    caveat: 'Safe Mode is not an emergency service.',
  },
  {
    id: 'circle', name: 'Support Circle', icon: HeartHandshake, screen: 'me', screenLabel: 'Me',
    summary: 'Keep the people you trust close by.',
    detail: 'Choose trusted personal contacts who support your recovery and reach them quickly. You decide who is included and what you share.',
  },
  {
    id: 'hub', name: 'Professional Hub', icon: Compass, screen: 'support', screenLabel: 'Support & help',
    summary: 'Find professional support and reliable information.',
    detail: 'Discover professional support resources, educational information and recovery-support services in one place.',
  },
  {
    id: 'ai', name: 'AI Behavioural Insights', icon: Sparkles, screen: 'insights', screenLabel: 'Insights', planned: true,
    summary: 'Planned: reflective prompts drawn from your entries.',
    detail: 'A planned AI-assisted feature that looks for recurring emotions and triggers in journal entries, then offers questions to reflect on.',
    caveat: 'This is not clinically validated. It would not diagnose, predict relapse or replace professional judgment. The demo shows hand-written examples, not AI output.',
  },
];
