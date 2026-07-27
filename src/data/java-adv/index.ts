import type { Course } from '../../types';
import { javaAdvDays } from './days';

export const javaAdvCourse: Course = {
  id: 'java-adv',
  name: 'Advanced Java',
  subtitle: 'JDBC, SQL & Project Foundations',
  icon: 'rocketLaunch',
  color: '#ef4444',
  duration: 6,
  dailyMinutes: 90,
  description:
    'Advanced Java (24CAI0202) covering evaluation structure, project-based learning, JDBC connectivity, PreparedStatement, CRUD patterns, transactions, and batch processing. Doubt clinics, exam alerts, practice editors, quizzes, and flashcards included.',
  examType: 'CE-1: 10 Oct 2026 · CE-2: 30 Oct 2026 · CE-3: 27 Nov 2026',
  startDate: '23 Sep 2026',
  phases: [
    { name: 'Phase 1: Course Administration & Project', days: javaAdvDays.slice(0, 2) },
    { name: 'Phase 2: Database & JDBC Core', days: javaAdvDays.slice(2, 4) },
    { name: 'Phase 3: Advanced JDBC & Transactions', days: javaAdvDays.slice(4, 6) },
  ],
};
