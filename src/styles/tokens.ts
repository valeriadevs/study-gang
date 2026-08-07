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