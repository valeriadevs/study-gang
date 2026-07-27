import type { Course } from '../../types';
import { sdePhase1days } from './phases/phase1';
import { sdePhase2days } from './phases/phase2';
import { sdePhase3days } from './phases/phase3';

export const sde8Course: Course = {
  id: 'sde-8',
  name: 'SDE Speedrun',
  subtitle: 'Statistics & Data Engineering',
  icon: 'chartBar',
  color: '#34d399',
  duration: 10,
  dailyMinutes: 60,
  description:
    'Accelerated 10-day path for Statistics & Data Engineering (25CAI0201). Phase 1 prepares ST-1 (Python wrangling + statistics). Phase 2 prepares ST-2 (Big Data architecture & ETL). Phase 3 adds data visualization with Matplotlib & Seaborn. Doubt clinics, exam alerts, practice editors, quizzes, and flashcards included.',
  examType: 'ST-1: 22 Aug 2026 · ST-2: 21 Nov 2026 (60 min · 30 marks)',
  startDate: '22 Aug 2026',
  phases: [
    { name: 'Phase 1: ST-1 — Statistics & Python Wrangling', days: sdePhase1days },
    { name: 'Phase 2: ST-2 — Big Data Architecture', days: sdePhase2days },
    { name: 'Phase 3: Data Visualization — Matplotlib & Seaborn', days: sdePhase3days },
  ],
};
