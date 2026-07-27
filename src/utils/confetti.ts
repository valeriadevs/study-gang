// Thin typed wrapper around canvas-confetti. The library ships no TypeScript
// types, so we declare just enough to keep call sites happy.
//
// Every helper respects `prefers-reduced-motion`: if the user prefers less
// motion, the canvas call is skipped silently. We never want a celebration to
// become a distraction for someone who has asked for stillness.

type ConfettiShape = 'square' | 'circle' | 'star';

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  ticks?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  shapes?: ConfettiShape[];
  angle?: number;
  drift?: number;
  gravity?: number;
}

type ConfettiFn = (options?: ConfettiOptions) => null;

let confettiImpl: ConfettiFn | null = null;
let confettiLoadPromise: Promise<void> | null = null;

async function loadConfetti(): Promise<void> {
  if (confettiImpl) return;
  if (confettiLoadPromise) return confettiLoadPromise;
  confettiLoadPromise = import('canvas-confetti').then((mod) => {
    const candidate = (mod as unknown as { default?: ConfettiFn }).default
      ?? (mod as unknown as ConfettiFn);
    confettiImpl = candidate;
  });
  return confettiLoadPromise;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function fire(options: ConfettiOptions): Promise<void> {
  if (prefersReducedMotion()) return;
  await loadConfetti();
  confettiImpl?.(options);
}

const PALETTE = ['#f89820', '#ffb84d', '#38bdf8', '#34d399', '#a78bfa', '#f472b6'];

/** A small gentle puff — good for daily task streaks. */
export async function subtleBoost(): Promise<void> {
  await fire({
    particleCount: 35,
    spread: 50,
    startVelocity: 22,
    decay: 0.92,
    scalar: 0.7,
    ticks: 110,
    origin: { x: 0.85, y: 0.85 },
    colors: PALETTE,
  });
}

/** A balanced celebration — good for finishing a day. */
export async function celebrateDay(): Promise<void> {
  await fire({
    particleCount: 70,
    spread: 70,
    startVelocity: 30,
    decay: 0.9,
    scalar: 0.85,
    ticks: 160,
    origin: { x: 0.5, y: 0.65 },
    colors: PALETTE,
    shapes: ['square', 'circle'],
  });
}

/** A big moment — course completion, end of streak, level milestone. */
export async function bigCelebration(): Promise<void> {
  await Promise.all([
    fire({
      particleCount: 90,
      angle: 60,
      spread: 65,
      startVelocity: 45,
      decay: 0.9,
      scalar: 1,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
    }),
    fire({
      particleCount: 90,
      angle: 120,
      spread: 65,
      startVelocity: 45,
      decay: 0.9,
      scalar: 1,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
    }),
  ]);
}

/** Centered starburst — used for level-ups and the Celebrate button. */
export async function starburst(intensity: 1 | 2 | 3 = 2): Promise<void> {
  const scaled = 40 * intensity;
  await fire({
    particleCount: scaled,
    spread: 360,
    startVelocity: 30 + intensity * 8,
    scalar: 0.9,
    decay: 0.94,
    ticks: 200,
    origin: { x: 0.5, y: 0.5 },
    colors: PALETTE,
    shapes: ['star', 'circle'],
  });
}

/** Side confetti — used when the user clicks Celebrate on Home. */
export async function sideBurst(): Promise<void> {
  await Promise.all([
    fire({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: PALETTE,
    }),
    fire({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: PALETTE,
    }),
  ]);
}

/** Warm up the dynamic import without firing confetti — useful right after
 *  a user interaction so the import has already happened. */
export function preloadConfetti(): void {
  if (confettiLoadPromise) return;
  void loadConfetti();
}
