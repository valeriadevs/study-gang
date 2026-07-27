import type {
  Course,
  Day,
  InteractionStats,
  Progress,
} from '../types';

export interface CourseProgressMetrics {
  totalTasks: number;
  doneTasks: number;
  totalDays: number;
  doneDays: number;
  taskPercent: number;
  dayPercent: number;
  minutesStudied: number;
  complete: boolean;
}

export interface GlobalProgressMetrics {
  totalTasks: number;
  doneTasks: number;
  totalDays: number;
  doneDays: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  completedCourses: number;
  totalCourses: number;
  courseMetrics: Record<string, CourseProgressMetrics>;
  studyDates: string[];
}

export interface LevelInfo {
  level: number;
  currentXp: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  hint: string;
  condition: (
    metrics: GlobalProgressMetrics,
    stats: InteractionStats,
    courses: Course[],
    context?: AchievementContext
  ) => boolean;
}

const LEVEL_SIZE = 250;

export const EMPTY_INTERACTION_STATS: InteractionStats = {
  codeCopies: 0,
  practiceRuns: 0,
  quizCorrect: 0,
  flashcardsFlipped: 0,
};

export const ACHIEVEMENT_DEFINITIONS: readonly AchievementDefinition[] = [
  {
    id: 'first-task',
    title: 'First Step',
    description: 'Checked off your first study task.',
    icon: 'leaf',
    hint: 'Complete one task',
    condition: (metrics) => metrics.doneTasks >= 1,
  },
  {
    id: 'day-slayer',
    title: 'Day Slayer',
    description: 'Finished your first full study day.',
    icon: 'flashBolt',
    hint: 'Mark one day complete',
    condition: (metrics) => metrics.doneDays >= 1,
  },
  {
    id: 'snippet-scout',
    title: 'Snippet Scout',
    description: 'Copied a code example for future-you.',
    icon: 'puzzle',
    hint: 'Copy a code example',
    condition: (_metrics, stats) => stats.codeCopies >= 1,
  },
  {
    id: 'practice-pilot',
    title: 'Practice Pilot',
    description: 'Ran your first interactive practice editor.',
    icon: 'tools',
    hint: 'Run a practice editor',
    condition: (_metrics, stats) => stats.practiceRuns >= 1,
  },
  {
    id: 'quiz-spark',
    title: 'Quiz Spark',
    description: 'Answered a quiz question correctly.',
    icon: 'sparkle',
    hint: 'Get one quiz answer right',
    condition: (_metrics, stats) => stats.quizCorrect >= 1,
  },
  {
    id: 'steady-learner',
    title: 'Steady Learner',
    description: 'Built a three-day study streak.',
    icon: 'fireStreak',
    hint: 'Study on three consecutive days',
    condition: (metrics) => metrics.longestStreak >= 3,
  },
  {
    id: 'course-conqueror',
    title: 'Course Conqueror',
    description: 'Completed an entire course plan.',
    icon: 'flag',
    hint: 'Complete every day in one course',
    condition: (metrics) => metrics.completedCourses >= 1,
  },
  {
    id: 'semester-legend',
    title: 'Semester Legend',
    description: 'Completed every course in the Study Gang.',
    icon: 'starLegend',
    hint: 'Complete all loaded courses',
    condition: (metrics, _stats, courses) =>
      courses.length > 0 && metrics.completedCourses === courses.length,
  },
  {
    id: 'first-code',
    title: 'First Code',
    description: 'Saved five code snippets for future-you.',
    icon: 'saveIcon',
    hint: 'Copy 5 code examples',
    condition: (_metrics, stats) => stats.codeCopies >= 5,
  },
  {
    id: 'loop-lord',
    title: 'Loop Lord',
    description: 'Ran the practice editor ten times.',
    icon: 'repeat',
    hint: 'Run 10 practice editors',
    condition: (_metrics, stats) => stats.practiceRuns >= 10,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Answered ten quiz questions correctly.',
    icon: 'target',
    hint: 'Get 10 quiz answers right',
    condition: (_metrics, stats) => stats.quizCorrect >= 10,
  },
  {
    id: 'flashcard-fan',
    title: 'Flashcard Fan',
    description: 'Revealed ten flashcards.',
    icon: 'cardsIcon',
    hint: 'Reveal 10 flashcards',
    condition: (_metrics, stats) => stats.flashcardsFlipped >= 10,
  },
  {
    id: 'sql-sorcerer',
    title: 'SQL Sorcerer',
    description: 'Conquered the DBMS SQL speedrun.',
    icon: 'magicWand',
    hint: 'Complete the DBMS course',
    condition: (metrics) => Boolean(metrics.courseMetrics['dbms-8']?.complete),
  },
  {
    id: 'java-jester',
    title: 'Java Jester',
    description: 'Conquered the Java 14-day mastery.',
    icon: 'maskHappy',
    hint: 'Complete the Java course',
    condition: (metrics) => Boolean(metrics.courseMetrics['java-14']?.complete),
  },
  {
    id: 'sde-sage',
    title: 'SDE Sage',
    description: 'Conquered the SDE speedrun.',
    icon: 'graduate',
    hint: 'Complete the SDE course',
    condition: (metrics) => Boolean(metrics.courseMetrics['sde-8']?.complete),
  },
  {
    id: 'rocket-ranger',
    title: 'Rocket Ranger',
    description: 'Conquered Advanced Java.',
    icon: 'rocketLaunch',
    hint: 'Complete the Advanced Java course',
    condition: (metrics) => Boolean(metrics.courseMetrics['java-adv']?.complete),
  },
  {
    id: 'halfway-hero',
    title: 'Halfway Hero',
    description: 'Hit 50% of the entire study plan.',
    icon: 'shieldCheck',
    hint: 'Reach 50% global progress',
    condition: (metrics) => {
      const total = metrics.totalTasks + metrics.totalDays;
      if (total === 0) return false;
      const done = metrics.doneTasks + metrics.doneDays;
      return done / total >= 0.5;
    },
  },
  {
    id: 'midnight-coder',
    title: 'Midnight Coder',
    description: 'Studied between midnight and 4am.',
    icon: 'moon',
    hint: 'Code while the world sleeps',
    // Checked by the store at the time of the latest study action.
    condition: (_metrics, _stats, _courses, context) =>
      Boolean(context?.lateNightStudy),
  },
  {
    id: 'level-5',
    title: 'Quarter Century',
    description: 'Reached study level 5.',
    icon: 'medalLevel',
    hint: 'Reach level 5',
    condition: (metrics) => {
      const level = Math.floor((metrics.doneTasks * 10 + metrics.doneDays * 25 + metrics.totalMinutes + metrics.completedCourses * 100) / 250) + 1;
      return level >= 5;
    },
  },
  {
    id: 'level-10',
    title: 'Decade of Study',
    description: 'Reached study level 10.',
    icon: 'trophyLevel',
    hint: 'Reach level 10',
    condition: (metrics) => {
      const level = Math.floor((metrics.doneTasks * 10 + metrics.doneDays * 25 + metrics.totalMinutes + metrics.completedCourses * 100) / 250) + 1;
      return level >= 10;
    },
  },
];

/**
 * Returns the milestone (25 / 50 / 75 / 100) that was just crossed (or null).
 * `previousPercent` and `currentPercent` are non-negative integers.
 */
export function getReachedMilestone(
  previousPercent: number,
  currentPercent: number
): 25 | 50 | 75 | 100 | null {
  const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
  for (const milestone of milestones) {
    if (previousPercent < milestone && currentPercent >= milestone) {
      return milestone;
    }
  }
  return null;
}

/**
 * Shape of context that the achievement condition may need beyond what the
 * global metrics already provide. Right now: only the hour of the study
 * session, used by the midnight-coder achievement.
 */
export interface AchievementContext {
  studyHour?: number;
  lateNightStudy?: boolean;
}

export function getDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(key: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function shiftDateKey(key: string, amount: number): string {
  const date = parseDateKey(key) ?? new Date();
  date.setDate(date.getDate() + amount);
  return getDateKey(date);
}

function uniqueStudyDates(progress: Record<string, Progress>): string[] {
  return Array.from(
    new Set(
      Object.values(progress).flatMap((courseProgress) => courseProgress.studyDates ?? [])
    )
  ).sort();
}

export function getCurrentStreak(dates: string[], today = new Date()): number {
  const dateSet = new Set(dates);
  let cursor = getDateKey(today);

  // A study session from yesterday still counts as an active streak when today
  // has not started yet. A gap of two days or more means the streak is asleep.
  if (!dateSet.has(cursor)) {
    cursor = shiftDateKey(cursor, -1);
    if (!dateSet.has(cursor)) return 0;
  }

  let streak = 0;
  while (dateSet.has(cursor)) {
    streak += 1;
    cursor = shiftDateKey(cursor, -1);
  }
  return streak;
}

export function getLongestStreak(dates: string[]): number {
  const validDates = Array.from(new Set(dates))
    .filter((date) => parseDateKey(date) !== null)
    .sort();
  if (validDates.length === 0) return 0;

  let longest = 1;
  let current = 1;
  for (let i = 1; i < validDates.length; i += 1) {
    if (shiftDateKey(validDates[i - 1], 1) === validDates[i]) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

export function getCourseMetrics(
  course: Course,
  courseProgress?: Progress
): CourseProgressMetrics {
  const tasks = courseProgress?.tasks ?? {};
  const days = courseProgress?.days ?? {};
  const allDays = (course.phases ?? []).flatMap((phase) => phase.days);
  const allTasks = allDays.flatMap((day) => day.tasks ?? []);
  const doneTasks = allTasks.filter((task) => Boolean(tasks[task.id])).length;
  const doneDays = allDays.filter((day) => Boolean(days[day.id])).length;
  const totalTasks = allTasks.length;
  const totalDays = allDays.length;

  return {
    totalTasks,
    doneTasks,
    totalDays,
    doneDays,
    taskPercent: totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0,
    dayPercent: totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0,
    minutesStudied: courseProgress?.minutesStudied ?? 0,
    complete: totalDays > 0 && doneDays === totalDays,
  };
}

export function getGlobalMetrics(
  courses: Course[],
  progress: Record<string, Progress>
): GlobalProgressMetrics {
  const courseMetrics = courses.reduce<Record<string, CourseProgressMetrics>>(
    (acc, course) => {
      acc[course.id] = getCourseMetrics(course, progress[course.id]);
      return acc;
    },
    {}
  );
  const metrics = Object.values(courseMetrics);
  const studyDates = uniqueStudyDates(progress);

  return {
    totalTasks: metrics.reduce((sum, metric) => sum + metric.totalTasks, 0),
    doneTasks: metrics.reduce((sum, metric) => sum + metric.doneTasks, 0),
    totalDays: metrics.reduce((sum, metric) => sum + metric.totalDays, 0),
    doneDays: metrics.reduce((sum, metric) => sum + metric.doneDays, 0),
    totalMinutes: metrics.reduce((sum, metric) => sum + metric.minutesStudied, 0),
    currentStreak: getCurrentStreak(studyDates),
    longestStreak: getLongestStreak(studyDates),
    completedCourses: metrics.filter((metric) => metric.complete).length,
    totalCourses: courses.length,
    courseMetrics,
    studyDates,
  };
}

export function calculateXp(metrics: GlobalProgressMetrics): number {
  // Small, legible rewards: tasks are the main loop, days are milestones,
  // and focused minutes acknowledge time spent without making the app a game.
  return (
    metrics.doneTasks * 10 +
    metrics.doneDays * 25 +
    metrics.totalMinutes +
    metrics.completedCourses * 100
  );
}

export function getLevelInfo(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp));
  const level = Math.floor(safeXp / LEVEL_SIZE) + 1;
  const xpIntoLevel = safeXp % LEVEL_SIZE;
  return {
    level,
    currentXp: safeXp,
    xpIntoLevel,
    xpForNextLevel: LEVEL_SIZE,
    progressPercent: Math.round((xpIntoLevel / LEVEL_SIZE) * 100),
  };
}

export function getEarnedAchievementIds(
  courses: Course[],
  progress: Record<string, Progress>,
  stats: InteractionStats,
  context?: AchievementContext
): string[] {
  const metrics = getGlobalMetrics(courses, progress);
  return ACHIEVEMENT_DEFINITIONS.filter((achievement) =>
    achievement.condition(metrics, stats, courses, context)
  ).map((achievement) => achievement.id);
}

export function estimateDayReadingMinutes(day: Day): number {
  let words = 0;
  let codeLines = 0;
  let interactiveItems = 0;

  for (const block of day.blocks ?? []) {
    const textParts = [
      block.content,
      block.title,
      ...(block.items ?? []),
      ...(block.headers ?? []),
      ...(block.rows ?? []).flat(),
      ...(block.questions ?? []).flatMap((question) => [
        question.question,
        question.explanation,
        ...question.options,
      ]),
      ...(block.cards ?? []).flatMap((card) => [card.front, card.back, card.hint]),
      block.hint,
    ].filter(Boolean) as string[];

    words += textParts.join(' ').trim().split(/\s+/).filter(Boolean).length;
    codeLines += (block.code ?? block.starter ?? '').split('\n').filter((line) => line.trim()).length;
    interactiveItems += (block.questions?.length ?? 0) + (block.cards?.length ?? 0);
  }

  // This is intentionally an estimate, not a promise: it helps a student
  // choose a session length without pretending that every reader is identical.
  const minutes = words / 190 + codeLines / 14 + interactiveItems * 0.15;
  return Math.max(1, Math.round(minutes));
}

export function getNextStudyTarget(
  courses: Course[],
  progress: Record<string, Progress>
): { course: Course; day: Day } | null {
  for (const course of courses) {
    const courseProgress = progress[course.id];
    const days = (course.phases ?? []).flatMap((phase) => phase.days);
    const nextDay = days.find((day) => !courseProgress?.days?.[day.id]);
    if (nextDay) return { course, day: nextDay };
  }
  return null;
}

export function getAchievementById(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENT_DEFINITIONS.find((achievement) => achievement.id === id);
}
