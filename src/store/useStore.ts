import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { courses, references } from '../data/courses';
import type {
  Celebration,
  InteractionStats,
  InteractionType,
  Progress,
  TestResult,
  View,
} from '../types';
import {
  ACHIEVEMENT_DEFINITIONS,
  EMPTY_INTERACTION_STATS,
  calculateXp,
  getCourseMetrics,
  getEarnedAchievementIds,
  getGlobalMetrics,
  getLevelInfo,
  getReachedMilestone,
} from '../utils/progress';

interface AppState {
  courses: typeof courses;
  references: typeof references;
  selectedCourseId: string | null;
  selectedDayId: string | null;
  view: View;
  referenceId: string | null;
  progress: Record<string, Progress>;
  achievements: string[];
  interactionStats: InteractionStats;
  celebration: Celebration | null;
  settingsOpen: boolean;
  /** Last study level surfaced to the user — used to detect level-ups. */
  lastSeenLevel: number;
  /** Persisted flag so the gang easter egg only celebrates once. */
  gangFound: boolean;
  /** Display name used on the home greeting. Editable from Settings. */
  userName: string;
  /** Whether the AI chat sidebar panel is open. */
  chatOpen: boolean;
  /** Whether the left day/phase navigation sidebar is collapsed. */
  sidebarCollapsed: boolean;

  goHome: () => void;
  selectCourse: (id: string) => void;
  selectDay: (courseId: string, dayId: string) => void;
  openReference: (id: string) => void;
  openTests: () => void;
  setChatOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  toggleTask: (courseId: string, taskId: string) => void;
  toggleDay: (courseId: string, dayId: string) => void;
  setNote: (courseId: string, dayId: string, note: string) => void;
  addMinutes: (courseId: string, minutes: number, studyHour?: number) => void;
  recordTestResult: (courseId: string, result: TestResult) => void;
  recordInteraction: (type: InteractionType) => void;
  celebrateCourse: (courseId: string) => void;
  celebrateTimer: (courseId: string, minutes: number) => void;
  celebrateNoReason: () => void;
  celebrateEasterEgg: () => void;
  dismissCelebration: () => void;

  openSettings: () => void;
  closeSettings: () => void;
  setUserName: (name: string) => void;
  resetProgress: () => void;
}

const emptyProgress = (): Progress => ({
  tasks: {},
  days: {},
  notes: {},
  minutesStudied: 0,
  studyDates: [],
  milestonesCelebrated: [],
});

const TASK_MESSAGES = [
  'One more brick in the knowledge castle.',
  'That concept just moved from “hmm” to “handled.”',
  'Future-you says: excellent investment.',
  'Tiny checkbox. Surprisingly mighty momentum.',
  'The Study Gang noticed that win.',
  'Clean work. Keep the streak warm.',
];

const MILESTONE_MESSAGES: Record<25 | 50 | 75 | 100, { title: string; message: string; iconName: string }> = {
  25: {
    title: 'Quarter trail blazed',
    message: 'You are 25% of the way through. The momentum is official.',
    iconName: 'leaf',
  },
  50: {
    title: 'Halfway hero moves',
    message: '50% done. The mountain now has a faint path going down the other side.',
    iconName: 'shield',
  },
  75: {
    title: 'Three-quarters home',
    message: '75% in. The finish line is genuinely close enough to spot.',
    iconName: 'flag',
  },
  100: {
    title: 'Course at full glow',
    message: '100% of tasks checked. Take a second to feel the weight of that.',
    iconName: 'crown',
  },
};

function makeCelebration(input: Omit<Celebration, 'id'>): Celebration {
  return {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
}

function markStudyDate(progress: Progress): Progress {
  const today = new Date();
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return {
    ...progress,
    studyDates: Array.from(new Set([...(progress.studyDates ?? []), date])),
  };
}

function taskMessage(taskId: string): string {
  const hash = Array.from(taskId).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return TASK_MESSAGES[hash % TASK_MESSAGES.length];
}

function findTaskContext(courseList: typeof courses, courseId: string, taskId: string) {
  const course = courseList.find((item) => item.id === courseId);
  if (!course) return undefined;
  for (const phase of course.phases ?? []) {
    for (const day of phase.days) {
      const task = day.tasks?.find((item) => item.id === taskId);
      if (task) return { course, phase, day, task };
    }
  }
  return undefined;
}

function evaluateAchievements(
  courseList: typeof courses,
  progress: Record<string, Progress>,
  currentAchievements: string[],
  interactionStats: InteractionStats,
  studyHour: number | undefined,
  fallback?: Celebration,
  existingCelebration?: Celebration | null
): { achievements: string[]; celebration: Celebration | null } {
  const context = {
    studyHour,
    lateNightStudy: typeof studyHour === 'number' && (studyHour < 4 || studyHour >= 23),
  };
  const earned = getEarnedAchievementIds(courseList, progress, interactionStats, context);
  const newlyUnlocked = earned.filter((id) => !currentAchievements.includes(id));
  const achievements = Array.from(new Set([...currentAchievements, ...earned]));

  if (!fallback && newlyUnlocked.length > 0) {
    const first = ACHIEVEMENT_DEFINITIONS.find((item) => item.id === newlyUnlocked[0]);
    if (first) {
      const extraCount = newlyUnlocked.length - 1;
      fallback = makeCelebration({
        kind: 'achievement',
        title: extraCount > 0 ? `${first.title} +${extraCount} more unlocked` : `${first.title} unlocked`,
        message: first.description,
        iconName: first.icon,
      });
    }
  }

  if (fallback && newlyUnlocked.length > 0) {
    fallback = { ...fallback, achievementIds: newlyUnlocked };
  }

  return { achievements, celebration: fallback ?? existingCelebration ?? null };
}

function detectMilestone(
  courseList: typeof courses,
  previousProgress: Record<string, Progress>,
  nextProgress: Record<string, Progress>,
  courseId: string
): { milestone: 25 | 50 | 75 | 100; celebration: Celebration } | null {
  const course = courseList.find((c) => c.id === courseId);
  if (!course) return null;
  const prevMetric = getCourseMetrics(course, previousProgress[courseId]);
  const nextMetric = getCourseMetrics(course, nextProgress[courseId]);
  const alreadyCelebrated = nextProgress[courseId]?.milestonesCelebrated ?? [];
  const milestone = getReachedMilestone(prevMetric.taskPercent, nextMetric.taskPercent);
  if (!milestone) return null;
  if (alreadyCelebrated.includes(milestone)) return null;
  const meta = MILESTONE_MESSAGES[milestone];
  return {
    milestone,
    celebration: makeCelebration({
      kind: 'day',
      title: meta.title,
      message: meta.message,
      iconName: meta.iconName,
      courseId,
    }),
  };
}

function detectLevelUp(
  courseList: typeof courses,
  progress: Record<string, Progress>,
  interactionStats: InteractionStats,
  studyHour: number | undefined,
  lastSeenLevel: number
): { level: number; celebration: Celebration } | null {
  const metrics = getGlobalMetrics(courseList, progress);
  const level = getLevelInfo(calculateXp(metrics)).level;
  if (level <= lastSeenLevel) return null;
  return {
    level,
    celebration: makeCelebration({
      kind: 'achievement',
      title: `Level ${level} unlocked`,
      message: lastSeenLevel === 0
        ? 'Your study XP has a new home. Level up unlocks new perks of focus.'
        : `You levelled up from ${lastSeenLevel} to ${level}. Tiny consistent sessions really do add up.`,
      iconName: 'medalLevel',
      achievementIds: [],
    }),
  };
}

function prependCelebration(
  candidate: Celebration | null,
  existing: Celebration | null
): Celebration | null {
  // We keep the freshest celebration. If a higher-priority celebration arrived
  // it wins; otherwise we keep the existing one in place so the user reads the
  // full message before it gets swapped.
  if (!candidate) return existing;
  if (!existing) return candidate;
  // Prefer milestone / level-up / course over a plain task win.
  const priority: Record<Celebration['kind'], number> = {
    course: 4,
    achievement: 3,
    day: 2,
    timer: 2,
    task: 1,
  };
  return priority[candidate.kind] > priority[existing.kind] ? candidate : existing;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      courses,
      references,
      selectedCourseId: null,
      selectedDayId: null,
      view: 'home',
      referenceId: null,
      progress: {},
      achievements: [],
      interactionStats: { ...EMPTY_INTERACTION_STATS },
      celebration: null,
      settingsOpen: false,
      lastSeenLevel: 1,
      gangFound: false,
      userName: 'Vinayakak',
      chatOpen: false,
      sidebarCollapsed: false,

      goHome: () =>
        set({
          view: 'home',
          selectedCourseId: null,
          selectedDayId: null,
          referenceId: null,
        }),

      selectCourse: (id) => {
        const course = get().courses.find((c) => c.id === id);
        const firstDay = course?.phases?.[0]?.days?.[0];
        set({
          view: 'course',
          selectedCourseId: id,
          selectedDayId: firstDay?.id ?? null,
          referenceId: null,
        });
      },

      selectDay: (courseId, dayId) => {
        set({
          view: 'course',
          selectedCourseId: courseId,
          selectedDayId: dayId,
          referenceId: null,
        });
      },

      setChatOpen: (open) => set({ chatOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      openReference: (id) =>
        set({ view: 'reference', referenceId: id, selectedDayId: null }),
      openTests: () =>
        set({ view: 'tests', referenceId: null, selectedDayId: null }),

      toggleTask: (courseId, taskId) =>
        set((state) => {
          const cp = state.progress[courseId] ?? emptyProgress();
          const wasDone = Boolean(cp.tasks[taskId]);
          const nowDone = !wasDone;
          const tasks = { ...cp.tasks, [taskId]: nowDone };
          const nextCp = nowDone
            ? markStudyDate({ ...cp, tasks })
            : { ...cp, tasks };
          const nextProgress = {
            ...state.progress,
            [courseId]: nextCp,
          };

          const context = findTaskContext(state.courses, courseId, taskId);
          let fallback: Celebration | undefined;
          if (nowDone && context) {
            const dayTasks = context.day.tasks ?? [];
            const wasDayTasksComplete =
              dayTasks.length > 0 && dayTasks.every((task) => Boolean(cp.tasks[task.id]));
            const isDayTasksComplete =
              dayTasks.length > 0 && dayTasks.every((task) => Boolean(tasks[task.id]));

            if (isDayTasksComplete && !wasDayTasksComplete) {
              fallback = makeCelebration({
                kind: 'day',
                title: `Day ${context.day.number} tasks cleared`,
                message: 'The hard part is now a checked-off part. Take a breath, then mark the day complete when you are ready.',
                iconName: 'confetti',
                courseId,
                dayId: context.day.id,
              });
            } else {
              fallback = makeCelebration({
                kind: 'task',
                title: 'Nice work',
                message: taskMessage(taskId),
                iconName: 'sparkle',
                courseId,
                dayId: context.day.id,
              });
            }
          }

          // Milestone detection (only when a task is being added, not removed).
          let milestoneCelebration: Celebration | null = null;
          if (nowDone) {
            const milestone = detectMilestone(state.courses, state.progress, nextProgress, courseId);
            if (milestone) {
              const refreshedMilestones = Array.from(
                new Set([...(nextProgress[courseId]?.milestonesCelebrated ?? []), milestone.milestone])
              );
              nextProgress[courseId] = {
                ...nextProgress[courseId],
                milestonesCelebrated: refreshedMilestones,
              };
              milestoneCelebration = milestone.celebration;
            }
          }

          const hour = new Date().getHours();
          const evaluated = evaluateAchievements(
            state.courses,
            nextProgress,
            state.achievements,
            state.interactionStats,
            hour,
            fallback,
            state.celebration
          );

          const levelUp = detectLevelUp(
            state.courses,
            nextProgress,
            state.interactionStats,
            hour,
            state.lastSeenLevel
          );

          const composed = prependCelebration(
            prependCelebration(levelUp?.celebration ?? null, milestoneCelebration),
            evaluated.celebration
          );

          // Advance lastSeenLevel only when the level-up toast is actually
          // shown, so it cannot be permanently swallowed by a higher-priority
          // celebration (it will fire again on the next study action).
          const nextLevel = levelUp ? levelUp.level : state.lastSeenLevel;

          return {
            progress: nextProgress,
            achievements: evaluated.achievements,
            celebration: composed,
            lastSeenLevel: nextLevel,
          };
        }),

      toggleDay: (courseId, dayId) =>
        set((state) => {
          const cp = state.progress[courseId] ?? emptyProgress();
          const wasDone = Boolean(cp.days[dayId]);
          const nowDone = !wasDone;
          const days = { ...cp.days, [dayId]: nowDone };
          const nextCp = nowDone
            ? markStudyDate({ ...cp, days })
            : { ...cp, days };
          const nextProgress = {
            ...state.progress,
            [courseId]: nextCp,
          };
          const course = state.courses.find((item) => item.id === courseId);
          const allDays = (course?.phases ?? []).flatMap((phase) => phase.days);
          const wasCourseComplete =
            allDays.length > 0 && allDays.every((day) => Boolean(cp.days[day.id]));
          const isCourseComplete =
            allDays.length > 0 && allDays.every((day) => Boolean(days[day.id]));

          let fallback: Celebration | undefined;
          if (nowDone) {
            if (isCourseComplete && !wasCourseComplete && course) {
              fallback = makeCelebration({
                kind: 'course',
                title: `${course.name} conquered`,
                message: 'Every planned day is in the books. That is a genuinely big deal.',
                iconName: 'trophy',
                courseId,
              });
            } else {
              fallback = makeCelebration({
                kind: 'day',
                title: 'Day complete',
                message: 'A complete day is a strong vote for the person you are becoming.',
                iconName: 'check',
                courseId,
                dayId,
              });
            }
          }

          let milestoneCelebration: Celebration | null = null;
          if (nowDone) {
            const milestone = detectMilestone(state.courses, state.progress, nextProgress, courseId);
            if (milestone) {
              const refreshedMilestones = Array.from(
                new Set([...(nextProgress[courseId]?.milestonesCelebrated ?? []), milestone.milestone])
              );
              nextProgress[courseId] = {
                ...nextProgress[courseId],
                milestonesCelebrated: refreshedMilestones,
              };
              milestoneCelebration = milestone.celebration;
            }
          }

          const hour = new Date().getHours();
          const evaluated = evaluateAchievements(
            state.courses,
            nextProgress,
            state.achievements,
            state.interactionStats,
            hour,
            fallback,
            state.celebration
          );

          const levelUp = detectLevelUp(
            state.courses,
            nextProgress,
            state.interactionStats,
            hour,
            state.lastSeenLevel
          );

          const composed = prependCelebration(
            prependCelebration(levelUp?.celebration ?? null, milestoneCelebration),
            evaluated.celebration
          );

          const nextLevel = levelUp ? levelUp.level : state.lastSeenLevel;

          return {
            progress: nextProgress,
            achievements: evaluated.achievements,
            celebration: composed,
            lastSeenLevel: nextLevel,
          };
        }),

      setNote: (courseId, dayId, note) =>
        set((state) => {
          const cp = state.progress[courseId] ?? emptyProgress();
          const notes = { ...cp.notes, [dayId]: note };
          const nextCp = note.trim()
            ? markStudyDate({ ...cp, notes })
            : { ...cp, notes };
          const nextProgress = {
            ...state.progress,
            [courseId]: nextCp,
          };
          const hour = new Date().getHours();
          const evaluated = evaluateAchievements(
            state.courses,
            nextProgress,
            state.achievements,
            state.interactionStats,
            hour,
            undefined,
            state.celebration
          );
          return {
            progress: nextProgress,
            achievements: evaluated.achievements,
            celebration: evaluated.celebration,
          };
        }),

      addMinutes: (courseId, minutes, studyHour) =>
        set((state) => {
          const amount = Math.max(0, Math.floor(minutes));
          if (amount === 0) return {};
          const cp = state.progress[courseId] ?? emptyProgress();
          const nextCp = markStudyDate({
            ...cp,
            minutesStudied: cp.minutesStudied + amount,
          });
          const nextProgress = {
            ...state.progress,
            [courseId]: nextCp,
          };
          const hour = studyHour ?? new Date().getHours();
          const evaluated = evaluateAchievements(
            state.courses,
            nextProgress,
            state.achievements,
            state.interactionStats,
            hour,
            undefined,
            state.celebration
          );
          return {
            progress: nextProgress,
            achievements: evaluated.achievements,
            celebration: evaluated.celebration,
          };
        }),

      recordTestResult: (courseId, result) =>
        set((state) => {
          const cp = state.progress[courseId] ?? emptyProgress();
          const existing = cp.testResults ?? [];
          const testResults = [result, ...existing].slice(0, 50);
          const nextCp = markStudyDate({ ...cp, testResults });
          const nextProgress = {
            ...state.progress,
            [courseId]: nextCp,
          };
          const hour = new Date().getHours();
          const evaluated = evaluateAchievements(
            state.courses,
            nextProgress,
            state.achievements,
            state.interactionStats,
            hour,
            undefined,
            state.celebration
          );
          return {
            progress: nextProgress,
            achievements: evaluated.achievements,
            celebration: evaluated.celebration,
          };
        }),

      recordInteraction: (type) =>
        set((state) => {
          const interactionStats = {
            ...state.interactionStats,
            [type]: (state.interactionStats[type] ?? 0) + 1,
          };
          const hour = new Date().getHours();
          const evaluated = evaluateAchievements(
            state.courses,
            state.progress,
            state.achievements,
            interactionStats,
            hour,
            undefined,
            state.celebration
          );
          return {
            interactionStats,
            achievements: evaluated.achievements,
            celebration: evaluated.celebration,
          };
        }),

      celebrateCourse: (courseId) => {
        const state = get();
        const course = state.courses.find((item) => item.id === courseId);
        if (!course) return;
        const metric = getCourseMetrics(course, state.progress[courseId]);
        set({
          celebration: makeCelebration({
            kind: 'course',
            title: metric.complete ? `${course.name} conquered` : `${course.name} finale`,
            message: metric.complete
              ? 'Every planned day is in the books. Take the victory lap — then choose your next adventure.'
              : `You reached the final day with ${metric.doneDays} of ${metric.totalDays} days marked complete. Finish at your own pace.`,
            iconName: metric.complete ? 'trophy' : 'rocketLaunch',
            courseId,
          }),
        });
      },

      celebrateTimer: (courseId, minutes) => {
        const course = get().courses.find((item) => item.id === courseId);
        set({
          celebration: makeCelebration({
            kind: 'timer',
            title: 'Focus session complete',
            message: `${minutes} focused minute${minutes === 1 ? '' : 's'} in the bank. Your brain may now accept a well-earned stretch.`,
            iconName: course?.icon ?? 'timer',
            courseId,
            minutes,
          }),
        });
      },

      celebrateNoReason: () => {
        set({
          celebration: makeCelebration({
            kind: 'timer',
            title: 'Just because',
            message: 'No goals, no scoreboard — just a tiny shower of pixels to mark the moment.',
            iconName: 'confetti',
          }),
        });
      },

      celebrateEasterEgg: () => {
        const state = get();
        if (state.gangFound) return;
        set({
          gangFound: true,
          celebration: makeCelebration({
            kind: 'achievement',
            title: 'Gang assembled',
            message: 'You typed the secret word. Welcome to the behind-the-scenes bits.',
            iconName: 'sparkle',
            achievementIds: ['easter-egg-gang'],
          }),
        });
      },

      dismissCelebration: () => set({ celebration: null }),

      openSettings: () => set({ settingsOpen: true }),
      closeSettings: () => set({ settingsOpen: false }),
      setUserName: (name) => set({ userName: name.trim() || 'Vinayakak' }),
      resetProgress: () =>
        set({
          progress: {},
          achievements: [],
          interactionStats: { ...EMPTY_INTERACTION_STATS },
          celebration: null,
          lastSeenLevel: 1,
          gangFound: false,
        }),
    }),
    {
      name: 'study-gang-storage',
      partialize: (state) => ({
        progress: state.progress,
        achievements: state.achievements,
        interactionStats: state.interactionStats,
        lastSeenLevel: state.lastSeenLevel,
        gangFound: state.gangFound,
        userName: state.userName,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AppState>;
        // If the user had progress before lastSeenLevel was introduced, seed
        // it from the current XP so they don't get a "level up" toast on
        // their very next action.
        let lastSeenLevel = persisted.lastSeenLevel ?? currentState.lastSeenLevel;
        if (persisted.lastSeenLevel === undefined) {
          const metrics = getGlobalMetrics(currentState.courses, persisted.progress ?? {});
          lastSeenLevel = getLevelInfo(calculateXp(metrics)).level;
        }
        return {
          ...currentState,
          ...persisted,
          interactionStats: {
            ...currentState.interactionStats,
            ...(persisted.interactionStats ?? {}),
          },
          lastSeenLevel,
        };
      },
    }
  )
);
