/**
 * Design tokens — the single source of truth for numeric design decisions
 * that aren't covered by Tailwind's defaults. Components should reach for
 * these instead of hardcoding values, so the system stays coherent as we
 * grow.
 *
 * Tailwind theme extensions (see `tailwind.config.js`) mirror the same
 * values, so the same vocabulary is available both as CSS utility classes
 * (`duration-fast`, `ease-standard`, `shadow-glow`) and as TS constants
 * (`durations.fast`, `easings.standard`, `shadows.glow`).
 */

/** Spacing scale (px). Tailwind already ships a generous scale; this is the
 *  subset we lean on for surfaces, gaps, and rhythm. */
export const spacing = {
  hairline: '1px',
  px: '1px',
  xs: '0.25rem',   // 4
  sm: '0.5rem',    // 8
  md: '0.75rem',   // 12
  lg: '1rem',      // 16
  xl: '1.5rem',    // 24
  '2xl': '2rem',   // 32
  '3xl': '3rem',   // 48
} as const;

/** Border radii. Mirrors the Tailwind rounded-* utilities so we don't fight them. */
export const radii = {
  sm: '0.375rem', // 6  — rounded-md
  md: '0.5rem',   // 8  — rounded-lg
  lg: '0.75rem',  // 12 — rounded-xl
  xl: '1rem',     // 16 — rounded-2xl
  full: '9999px',
} as const;

/** Motion durations. Used both in inline styles and via Tailwind's
 *  `duration-{fast|normal|slow|page}` classes after the config extension. */
export const durations = {
  fast: '120ms',    // tiny snaps (button press, toggle)
  normal: '200ms',  // default UI motion
  slow: '360ms',    // emphasis (toast in, hover lift)
  page: '480ms',    // route-level transition
} as const;

/** Motion easings. */
export const easings = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
} as const;

/** Box-shadow elevations. The accent "glow" is reserved for fresh-unlocked
 *  achievement and other celebratory moments so it stays rare. */
export const shadows = {
  panel: '0 10px 30px rgba(0,0,0,0.35)',
  lift: '0 4px 14px rgba(0,0,0,0.25)',
  emphasis: '0 6px 20px rgba(0,0,0,0.3)',
  glow: '0 0 0 1px rgba(128,230,200,0.4), 0 0 18px rgba(128,230,200,0.25)',
  'glow-strong': '0 0 0 1px rgba(128,230,200,0.7), 0 0 24px rgba(128,230,200,0.35)',
} as const;

/** Icon size mapping in px. Use these instead of writing magic numbers so
 *  the wrapper can scale coherently later. */
export const iconSizes = {
  xs: 12,  // compact chip / inline
  sm: 16,  // inside buttons
  md: 20,  // toolbar / nav
  lg: 24,  // primary actions
  xl: 32,  // hero / settings tile
} as const;
export type IconSize = keyof typeof iconSizes;

/** Layout constants for the shell. App.tsx, Sidebar, and Header all read from
 *  here so the grid stays in lockstep. */
export const layout = {
  headerHeight: '64px',
  sidebarWidth: '320px',
  contentMaxWidth: '72rem',   // max-w-6xl — HomeView / ReferenceView
  readingMaxWidth: '56rem',   // max-w-4xl — DayContent
} as const;

/** z-index layers. Higher numbers overlay lower. */
export const zIndex = {
  base: 1,
  sticky: 20,
  dropdown: 30,
  overlay: 100,
  toast: 120,
  modal: 130,
} as const;

/** Contrast pairs we use repeatedly. These are the dark-theme-on-accent
 *  text colours that keep WCAG-readable contrast on a coloured surface. */
export const contrast = {
  onAccent: '#1a2630',
  onSuccess: '#1a2630',
} as const;