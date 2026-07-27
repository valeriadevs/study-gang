import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Book,
  BookOpen,
  BookSaved,
  Bookmark,
  Bulb,
  Calendar,
  Cards,
  ChartBar,
  Checklist,
  Crown,
  CalendarCheck,
  CalendarDays,
  CalendarMark,
  Check,
  CheckSquare,
  Clipboard,
  ClipboardText,
  CloseCircle,
  CloudSun,
  Coffee,
  Confetti,
  Database,
  Document,
  DocumentNormal,
  DocumentText,
  Eye,
  EyeOff,
  Flag,
  Fire,
  Home,
  Leaf,
  Link,
  Lock,
  Medal,
  MedalStar,
  Menu,
  Moon,
  Note,
  Notebook,
  Pause,
  Play,
  Refresh,
  Rocket,
  Rocket2,
  Search,
  Shield,
  Search2,
  SearchNormal,
  Setting,
  Settings,
  Sparkle,
  Sparkles,
  Star,
  Sun,
  Sun2,
  Target,
  TickCircle,
  Timer,
  Trophy,
  Watch,
} from 'reicon-react';
import type { ComponentType } from 'react';
import type { IconProps as ReiconIconProps, IconWeight } from 'reicon-react';
import { iconSizes, type IconSize } from '../styles/tokens';

/** Constant describing which icon library + curated set the app is on.
 *  Surfaces in the header so it's obvious when the icon system changes. */
export const ICON_SET_VERSION = 'reicon-react v1.1 · curated';

/**
 * Curated map of icon names we lean on across the app. Each entry resolves to
 * a reicon-react component (Outline weight by default). Add to this map rather
 * than importing reicon-react components directly elsewhere — that way the
 * UI Designer can later swap underlying libraries without touching call sites.
 *
 * Semantic aliases are added at the bottom so call sites can read in plain
 * English (e.g. `books` instead of `Book`) without forcing us to maintain
 * parallel icon names in the upstream library.
 */
const reiconRegistry: Record<string, ComponentType<ReiconIconProps>> = {
  // Direction
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,

  // Actions
  check: Check,
  checkSquare: CheckSquare,
  tickCircle: TickCircle,
  close: CloseCircle,
  refresh: Refresh,
  play: Play,
  pause: Pause,
  copy: ClipboardText,

  // Navigation
  home: Home,
  menu: Menu,
  search: Search,

  // Settings
  cog: Setting,
  settings: Settings,

  // Status / category
  book: Book,
  books: Book, // alias — "Study Gang" branding reads better in the plural
  bookOpen: BookOpen,
  bookSaved: BookSaved,
  bookmark: Bookmark,
  calendar: Calendar,
  calendarDays: CalendarDays,
  calendarCheck: CalendarCheck,
  calendarMark: CalendarMark,
  clipboard: Clipboard,
  clipboardText: ClipboardText,
  crown: Crown,
  // Course marks (referenced directly by data/courses/*.ts)
  coffee: Coffee,
  database: Database,
  chartBar: ChartBar,
  document: Document,
  documentText: DocumentText,
  documentNormal: DocumentNormal,
  fire: Fire,
  fireStreak: Fire, // UI Designer's semantic alias for "fire streak"
  flag: Flag,
  leaf: Leaf,
  link: Link,
  medal: Medal,
  medalStar: MedalStar,
  medalLevel: Trophy, // alias — reicon-react ships no MedalLevel
  lock: Lock,
  star: Star,
  star2: Star,
  cardsIcon: Cards, // alias — reicon-react ships no CardsIcon
  cards: Cards,
  checklist: Checklist,
  eye: Eye,
  eyeOff: EyeOff,
  target: Target,
  timer: Timer,
  trophy: Trophy,
  watch: Watch,

  // Editorial (post-its, writing)
  note: Note,
  notepad: DocumentText, // alias — reicon-react ships no Notepad
  notebook: Notebook,

  // Mood (24-hour greeting icons in HomeView)
  moodMidnight: Moon,
  moodMorning: Coffee,
  moodAfternoon: Sun2,
  moodEvening: CloudSun,
  moodLateNight: Star,

  // Buddy (study-buddy faces in HomeView; reicon has no mascots so we map to
  // theme icons that read similarly when Filled.)
  buddySage: Trophy,
  buddyLaunch: Rocket2,
  buddyCurious: BookOpen,
  buddyWarm: Bulb,
  buddyIdle: Book,

  // Whimsy / accents
  bulb: Bulb,
  sparkle: Sparkle,
  sparkles: Sparkles,
  sun: Sun,
  moon: Moon,

  // Final-day rocket (Course finale)
  rocket: Rocket,
  rocketLaunch: Rocket, // alias — reicon-react ships no RocketLaunch

  // Confetti (used in celebration chip)
  confetti: Confetti,
};

export type IconName = keyof typeof reiconRegistry;

interface IconBaseProps {
  /** Semantic name from the curated registry. */
  name?: IconName | string;
  /** Size token — `xs` for chip/inline, `sm` for buttons, `md`/`lg`/`xl` as you grow. */
  size?: IconSize;
  /** Visual weight. Reicon-specific, default outline. */
  weight?: IconWeight;
  /** Extra Tailwind classes for colour/spacing/alignment. */
  className?: string;
  /** Decorative by default — set when the icon carries meaning the AT should read. */
  title?: string;
  /** Forward to the underlying <svg>. Useful for click handlers. */
  onClick?: () => void;
  /** Optional inline override for colour or position. Forwarded to the SVG. */
  style?: React.CSSProperties;
}

/** Inline fallback for icons we haven't curated yet. Pass the SVG body plus the
 *  viewBox the path expects. */
interface InlineIconProps extends IconBaseProps {
  /** SVG body, e.g. "<path d=… />". Required when `name` is omitted. */
  path?: string;
  /** viewBox attribute (default '0 0 24 24'). */
  viewBox?: string;
  /** stroke-width on the rendered path. Default 2 to match reicon's outline weight. */
  strokeWidth?: number;
  /** Filled icon (no stroke). */
  fill?: boolean;
}

export type IconProps = InlineIconProps;

/**
 * Single entry point for every icon in the app. Components must never embed
 * raw SVG paths themselves — reach for this wrapper so the system stays
 * swappable. Inherits `currentColor` so the parent's text colour wins.
 *
 * Behaviour:
 * - `name` matches a curated entry → render the reicon component.
 * - `name` is unknown but `path` is set → render the inline SVG.
 * - Neither → render a sized placeholder span so layout doesn't collapse.
 */
export function Icon({
  name,
  size = 'md',
  weight = 'Outline',
  className = '',
  title,
  onClick,
  path,
  viewBox = '0 0 24 24',
  strokeWidth = 2,
  fill = false,
  style,
}: IconProps) {
  const dimension = iconSizes[size];
  const ariaProps = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true, focusable: false };

  if (name && reiconRegistry[name]) {
    const Component = reiconRegistry[name];
    return (
      <Component
        size={dimension}
        weight={weight}
        className={className}
        style={style}
        onClick={onClick}
        {...ariaProps}
      />
    );
  }

  if (!path) {
    // No registry match and no fallback path — render an empty 1×1 box so
    // missing icons don't crash layout.
    return (
      <span
        style={{ width: dimension, height: dimension, display: 'inline-block', ...style }}
        aria-hidden
      />
    );
  }

  const baseProps = {
    width: dimension,
    height: dimension,
    viewBox,
    className,
    style,
    onClick,
    fill: fill ? 'currentColor' : 'none',
    stroke: fill ? 'none' : 'currentColor',
    strokeWidth: fill ? 0 : strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <svg {...baseProps} {...ariaProps}>
      <g dangerouslySetInnerHTML={{ __html: path }} />
    </svg>
  );
}