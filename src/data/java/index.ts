import type { Course } from '../../types';
import { phase1days } from './phases/phase1';
import { phase2days } from './phases/phase2';
import { phase3days } from './phases/phase3';
import { phase4days } from './phases/phase4';
import { phase5days } from './phases/phase5';
import { phase6days } from './phases/phase6';

export const java14Course: Course = {
  id: 'java-14',
  name: 'Java Mastery',
  subtitle: '20-Day University Lab Alignment',
  icon: 'coffee',
  color: '#f89820',
  duration: 20,
  dailyMinutes: 120,
  description:
    'High-intensity 20-day program for the B.E. (AIML) Java syllabus. Covers fundamentals through modern Java — recursion, enums, generics, HashMaps, TreeMaps, streams, lambdas, and inner classes. Every day includes concept explanations, doubt clinics, exam alerts, practice editors, quizzes, and flashcards.',
  examType: 'Continuous Evaluations (CE-1, CE-2) + End Semester Exam',
  phases: [
    { name: 'Phase 1: Java Fundamentals', days: phase1days },
    { name: 'Phase 2: Methods, Arrays, and Strings', days: phase2days },
    { name: 'Phase 3: Object-Oriented Programming Core', days: phase3days },
    { name: 'Phase 4: Advanced Logic & Robustness', days: phase4days },
    { name: 'Phase 5: Collections, Files, & Final Mastery', days: phase5days },
    { name: 'Phase 6: Modern Java — Recursion, Generics, Collections & Streams', days: phase6days },
  ],
};
