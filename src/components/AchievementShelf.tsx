import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import {
  ACHIEVEMENT_DEFINITIONS,
  calculateXp,
  getGlobalMetrics,
  getLevelInfo,
  getEarnedAchievementIds,
} from '../utils/progress';
import { cn } from '../utils/helpers';
import { Icon } from './Icon';

export function AchievementShelf() {
  const courses = useStore((state) => state.courses);
  const progress = useStore((state) => state.progress);
  const achievements = useStore((state) => state.achievements);
  const interactionStats = useStore((state) => state.interactionStats);
  const celebration = useStore((state) => state.celebration);
  const metrics = getGlobalMetrics(courses, progress);
  const level = getLevelInfo(calculateXp(metrics));
  const earned = getEarnedAchievementIds(courses, progress, interactionStats);
  const unlocked = new Set([...achievements, ...earned]);

  // Track which achievements should pulse as "freshly unlocked" for ~4 seconds
  // after a new celebration arrives. We key off the celebration id so a fresh
  // celebration restarts the pulse window.
  const [freshlyUnlocked, setFreshlyUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newlyUnlocked = celebration?.achievementIds ?? [];
    // Filter to ones that actually exist in the achievement list — the easter
    // egg's "easter-egg-gang" id is not a real badge so we skip it.
    const known = newlyUnlocked.filter((id) =>
      ACHIEVEMENT_DEFINITIONS.some((definition) => definition.id === id)
    );
    if (known.length === 0) return;
    setFreshlyUnlocked((previous) => {
      const next = new Set(previous);
      known.forEach((id) => next.add(id));
      return next;
    });
    const timeout = window.setTimeout(() => {
      setFreshlyUnlocked((previous) => {
        const next = new Set(previous);
        known.forEach((id) => next.delete(id));
        return next;
      });
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, [celebration?.id, celebration?.achievementIds]);

  return (
    <section className="surface p-5 mb-6" aria-labelledby="achievements-title">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h2 id="achievements-title" className="text-base font-bold flex items-center gap-2">
            <Icon name="medalStar" size="sm" className="text-accent" />
            <span>Little wins, stacked up</span>
          </h2>
          <p className="text-xs text-ink-2 mt-1">
            Personality with a purpose: a gentle nudge to keep showing up.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-ink-3 font-bold">Level</div>
          <div className="text-xl font-extrabold text-accent inline-flex items-center gap-1.5">
            <Icon name="trophy" size="sm" className="text-accent" />
            {level.level}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center text-[11px] text-ink-2 mb-1.5">
          <span>{level.currentXp} XP total</span>
          <span>{level.xpForNextLevel - level.xpIntoLevel} XP to next level</span>
        </div>
        <div
          className="h-2 rounded-full bg-bg-2 overflow-hidden"
          role="progressbar"
          aria-label="Progress to next level"
          aria-valuenow={level.progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-slow ease-standard"
            style={{ width: `${level.progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {ACHIEVEMENT_DEFINITIONS.map((achievement) => {
          const isUnlocked = unlocked.has(achievement.id);
          const isFresh = freshlyUnlocked.has(achievement.id);
          return (
            <div
              key={achievement.id}
              className={cn(
                'group rounded-lg border p-3 transition-colors duration-fast relative overflow-hidden',
                isUnlocked
                  ? 'border-accent/40 bg-accent/5 hover:bg-accent/10 hover:border-accent/60'
                  : 'border-border bg-panel-2 opacity-60',
                isFresh && 'achievement-fresh'
              )}
              title={isUnlocked ? achievement.description : achievement.hint}
              role="group"
              aria-label={isUnlocked ? `${achievement.title}: ${achievement.description}` : `Locked achievement: ${achievement.title}. ${achievement.hint}`}
            >
              {isFresh && (
                <span
                  className="absolute top-1.5 right-1.5 text-[10px] uppercase font-bold text-accent tracking-wider"
                  aria-hidden="true"
                >
                  New
                </span>
              )}
              <div className={cn('text-xl mb-1.5 transition-transform duration-normal ease-spring', isUnlocked && 'group-hover:scale-110', !isUnlocked && 'grayscale opacity-60')} aria-hidden="true">
                {isUnlocked ? (
                  <Icon
                    name={achievement.icon}
                    size="lg"
                    weight="Filled"
                    className="text-accent"
                  />
                ) : (
                  <Icon name="lock" size="lg" className="text-ink-3" />
                )}
              </div>
              <div className="text-xs font-bold text-ink truncate">{achievement.title}</div>
              <div className="text-[10px] text-ink-3 mt-0.5 line-clamp-2">
                {isUnlocked ? 'Unlocked — nice.' : achievement.hint}
              </div>
            </div>
          );
        })}
      </div>

      <p className="sr-only">
        {metrics.doneTasks} of {metrics.totalTasks} tasks complete. {interactionStats.practiceRuns} practice runs.
      </p>
    </section>
  );
}