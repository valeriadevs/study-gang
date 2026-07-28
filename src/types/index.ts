export type BlockType =
  | 'paragraph'
  | 'heading'
  | 'code'
  | 'list'
  | 'table'
  | 'callout'
  | 'divider'
  | 'practice'
  | 'quiz'
  | 'flashcard';

export type CalloutType = 'info' | 'tip' | 'warn' | 'success' | 'note' | 'doubt' | 'exam' | 'bridge';

export type ListStyle = 'bullet' | 'number' | 'check';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FlashcardDef {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface ContentBlock {
  type: BlockType;
  id?: string;
  content?: string;
  level?: 2 | 3 | 4;
  lang?: 'java' | 'sql' | 'python' | 'bash' | 'json' | 'javascript' | 'text';
  code?: string;
  items?: string[];
  listStyle?: ListStyle;
  headers?: string[];
  rows?: string[][];
  calloutType?: CalloutType;
  title?: string;
  // For practice editor
  starter?: string;
  hint?: string;
  // For quiz block
  questions?: QuizQuestion[];
  // For flashcard block
  cards?: FlashcardDef[];
  /** When true on a code block, the snippet starts hidden and types itself in. */
  typewriter?: boolean;
}

export type TaskTag = 'lab' | 'bonus' | 'mcq' | 'review' | 'drill';

export interface Task {
  id: string;
  text: string;
  tag?: TaskTag;
  done?: boolean;
}

export interface Day {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  duration?: number;
  topics?: string[];
  alignment?: string[];
  blocks?: ContentBlock[];
  tasks?: Task[];
  notes?: string;
}

export interface Phase {
  name: string;
  days: Day[];
}

export interface Course {
  id: string;
  name: string;
  subtitle: string;
  /**
   * Icon for the course. Either a reicon camelCase name (e.g. `"coffee"`,
   * `"database"`) or a single emoji glyph (e.g. `"☕"`). The Icon wrapper
   * resolves either form.
   */
  icon: string;
  color: string;
  duration: number;
  dailyMinutes: number;
  description?: string;
  examType?: string;
  startDate?: string;
  phases?: Phase[];
  references?: Reference[];
}

export interface Reference {
  id: string;
  title: string;
  category: string;
  /** Links this reference to a specific course. When set, the sidebar filters to this course. */
  courseId?: string;
  description?: string;
  blocks?: ContentBlock[];
  timeLimit?: number;
  passingScore?: number;
  /**
   * Guidance for tests/quizzes about when to attempt them. `days` is the day
   * range covered, `topics` is a short list of pre-requisite topics, and
   * `level` is a free-form readiness hint shown alongside the card.
   */
  attemptAfter?: {
    days?: string;
    topics: string[];
    level?: string;
  };
}

export interface Progress {
  tasks: Record<string, boolean>;
  days: Record<string, boolean>;
  notes: Record<string, string>;
  minutesStudied: number;
  /** Calendar dates (YYYY-MM-DD) on which the student did something study-shaped. */
  studyDates?: string[];
  /** Milestones (25/50/75/100) that have already been celebrated for this course. */
  milestonesCelebrated?: number[];
}

export interface InteractionStats {
  codeCopies: number;
  practiceRuns: number;
  quizCorrect: number;
  flashcardsFlipped: number;
}

export type InteractionType = keyof InteractionStats;

export type CelebrationKind = 'task' | 'day' | 'course' | 'timer' | 'achievement';

export interface Celebration {
  id: string;
  kind: CelebrationKind;
  title: string;
  message: string;
  /**
   * Icon shown in the celebration toast. Either a reicon camelCase name or a
   * single emoji glyph — the Icon wrapper resolves both.
   */
  iconName: string;
  courseId?: string;
  dayId?: string;
  minutes?: number;
  achievementIds?: string[];
}

export type View = 'home' | 'course' | 'reference' | 'tests';
