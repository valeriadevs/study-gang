import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { getAchievementById, getCourseMetrics } from '../utils/progress';
import {
  bigCelebration,
  celebrateDay,
  preloadConfetti,
  starburst,
  subtleBoost,
} from '../utils/confetti';
import { Icon } from './Icon';
import { zIndex } from '../styles/tokens';

const PARTICLE_STYLES = [
  { left: '7%', top: '76%', delay: '0ms', color: '#f89820' },
  { left: '14%', top: '66%', delay: '80ms', color: '#38bdf8' },
  { left: '23%', top: '84%', delay: '160ms', color: '#34d399' },
  { left: '31%', top: '72%', delay: '240ms', color: '#f472b6' },
  { left: '42%', top: '88%', delay: '320ms', color: '#a78bfa' },
  { left: '52%', top: '70%', delay: '400ms', color: '#ffb84d' },
  { left: '61%', top: '82%', delay: '480ms', color: '#38bdf8' },
  { left: '70%', top: '68%', delay: '560ms', color: '#34d399' },
  { left: '79%', top: '86%', delay: '640ms', color: '#f472b6' },
  { left: '88%', top: '74%', delay: '720ms', color: '#a78bfa' },
  { left: '11%', top: '91%', delay: '120ms', color: '#ffb84d' },
  { left: '28%', top: '62%', delay: '200ms', color: '#f89820' },
  { left: '48%', top: '78%', delay: '280ms', color: '#38bdf8' },
  { left: '67%', top: '92%', delay: '360ms', color: '#34d399' },
  { left: '84%', top: '63%', delay: '440ms', color: '#f472b6' },
];

const KIND_LABELS = {
  task: 'Tiny win',
  day: 'Milestone',
  course: 'Big finish',
  timer: 'Focus ritual',
  achievement: 'New badge',
} as const;

export function CelebrationLayer() {
  const celebration = useStore((state) => state.celebration);
  const dismissCelebration = useStore((state) => state.dismissCelebration);
  const courses = useStore((state) => state.courses);
  const progress = useStore((state) => state.progress);

  // Pre-warm the canvas-confetti module so the first big moment fires instantly.
  useEffect(() => {
    preloadConfetti();
  }, []);

  useEffect(() => {
    if (!celebration) return;
    const timeout = window.setTimeout(
      dismissCelebration,
      celebration.kind === 'task' ? 3600 : 6500
    );
    return () => window.clearTimeout(timeout);
  }, [celebration, dismissCelebration]);

  // Side-effect: actual confetti bursts on the celebration kind.
  useEffect(() => {
    if (!celebration) return;
    switch (celebration.kind) {
      case 'course':
        void bigCelebration();
        break;
      case 'day':
        void celebrateDay();
        break;
      case 'achievement':
        void starburst(2);
        break;
      case 'timer':
        void subtleBoost();
        break;
      default:
        break;
    }
    // We only want to fire on the celebration identity change, not on every
    // render. The previous celebration is dismissed by the timeout above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebration?.id]);

  if (!celebration) return null;

  const course = celebration.courseId
    ? courses.find((item) => item.id === celebration.courseId)
    : undefined;
  const courseMetric = course
    ? getCourseMetrics(course, progress[course.id])
    : undefined;
  const unlocked = (celebration.achievementIds ?? [])
    .map(getAchievementById)
    .filter(Boolean);

  return (
    <>
      <div className="celebration-particles" aria-hidden="true">
        {PARTICLE_STYLES.map((particle, index) => (
          <span
            key={`${celebration.id}-${index}`}
            className="celebration-particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              backgroundColor: particle.color,
              color: particle.color,
            }}
          />
        ))}
      </div>
      <div
        className="fixed bottom-5 right-5 w-[min(380px,calc(100vw-2rem))] pointer-events-none"
        style={{ zIndex: zIndex.toast }}
        role="status"
        aria-live="polite"
      >
        <div className="celebration-toast pointer-events-auto">
          <div className="flex items-start gap-3">
            <div className="celebration-emoji" aria-hidden="true">
              <Icon name={celebration.iconName} size="lg" weight="Filled" className="text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-accent font-bold">
                    {KIND_LABELS[celebration.kind]}
                  </p>
                  <h2 className="text-base font-bold text-ink mt-0.5">
                    {celebration.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={dismissCelebration}
                  className="w-7 h-7 grid place-items-center rounded-md text-ink-2 hover:text-ink hover:bg-white/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Dismiss celebration"
                >
                  <Icon name="close" size="sm" />
                </button>
              </div>
              <p className="text-xs leading-relaxed text-ink-2 mt-1.5">
                {celebration.message}
              </p>

              {courseMetric && (
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
                  <div>
                    <div className="text-sm font-bold text-ink">{courseMetric.doneDays}/{courseMetric.totalDays}</div>
                    <div className="text-xs text-ink-3">days</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{courseMetric.doneTasks}/{courseMetric.totalTasks}</div>
                    <div className="text-xs text-ink-3">tasks</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{courseMetric.minutesStudied}m</div>
                    <div className="text-xs text-ink-3">focused</div>
                  </div>
                </div>
              )}

              {unlocked.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {unlocked.map((achievement) => achievement && (
                    <span key={achievement.id} className="text-xs chip border-accent/40 text-accent inline-flex items-center gap-1">
                      <Icon name={achievement.icon} size="xs" />
                      {achievement.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}