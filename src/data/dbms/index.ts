import type { Course } from '../../types';
import { dbmsPhase1days } from './phases/phase1';
import { dbmsPhase2days } from './phases/phase2';
import { dbmsPhase3days } from './phases/phase3';
import { dbmsPhase4days } from './phases/phase4';

export const dbms8Course: Course = {
  id: 'dbms-8',
  name: 'DBMS Speedrun',
  subtitle: '10-Day SQL Mastery',
  icon: 'database',
  color: '#38bdf8',
  duration: 10,
  dailyMinutes: 60,
  description:
    'High-intensity 10-day DBMS programme covering DDL, DML, joins, aggregates, normalisation theory, views, indexes, stored procedures, and triggers. Every day includes doubt clinics, exam alerts, practice editors, quizzes, and flashcards — all self-contained.',
  examType: 'ST-1 (DBMS) — 60 min · 40 marks · CE-1 — 60 min · 20 marks',
  phases: [
    { name: 'Phase 1: Environment & Data Definition', days: dbmsPhase1days },
    { name: 'Phase 2: Data Manipulation & Integrity', days: dbmsPhase2days },
    { name: 'Phase 3: Analysis, Theory & Final Mock', days: dbmsPhase3days },
    { name: 'Phase 4: Performance & Programming', days: dbmsPhase4days },
  ],
};
