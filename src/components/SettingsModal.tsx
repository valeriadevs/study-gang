import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { exportProgress, downloadJSON } from '../utils/helpers';
import { calculateXp, getGlobalMetrics, getLevelInfo } from '../utils/progress';
import { Icon } from './Icon';
import { zIndex } from '../styles/tokens';

export function SettingsModal() {
  const closeSettings = useStore((state) => state.closeSettings);
  const resetProgress = useStore((state) => state.resetProgress);
  const progress = useStore((state) => state.progress);
  const courses = useStore((state) => state.courses);
  const achievements = useStore((state) => state.achievements);
  const interactionStats = useStore((state) => state.interactionStats);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const metrics = getGlobalMetrics(courses, progress);
  const level = getLevelInfo(calculateXp(metrics));

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeSettings();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSettings]);

  function handleExport() {
    const json = exportProgress({ progress, achievements, interactionStats });
    downloadJSON(json, `study-gang-progress-${Date.now()}.json`);
  }

  function handleReset() {
    if (
      window.confirm(
        'Reset all progress? This will clear all task completions, day marks, notes, badges, and study dates. This cannot be undone.'
      )
    ) {
      resetProgress();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 grid place-items-center backdrop-blur-sm"
      style={{ zIndex: zIndex.modal }}
      onClick={closeSettings}
      role="presentation"
    >
      <div
        className="bg-panel border border-border rounded-xl p-6 max-w-[600px] w-[90%] max-h-[80vh] overflow-y-auto shadow-panel fade-in"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2 id="settings-title" className="text-xl font-bold">Settings</h2>
            <p className="text-xs text-ink-2 mt-1">Your study data stays in this browser.</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeSettings}
            className="w-8 h-8 grid place-items-center rounded-md text-ink-2 hover:text-ink hover:bg-panel-2 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
            aria-label="Close settings"
          >
            ×
          </button>
        </div>

        {/* Section: Study stats */}
        <section aria-labelledby="settings-stats-heading" className="mb-5">
          <h3
            id="settings-stats-heading"
            className="text-[11px] uppercase tracking-wider text-ink-3 font-bold mb-2"
          >
            Study stats
          </h3>
          <div className="surface overflow-hidden">
            <StatRow label="Tasks completed" value={metrics.doneTasks} suffix={`/ ${metrics.totalTasks}`} />
            <StatRow label="Days completed" value={metrics.doneDays} suffix={`/ ${metrics.totalDays}`} />
            <StatRow
              label="Minutes studied"
              value={`${Math.floor(metrics.totalMinutes / 60)}h ${metrics.totalMinutes % 60}m`}
            />
            <StatRow
              label="Current streak"
              value={`${metrics.currentStreak} day${metrics.currentStreak === 1 ? '' : 's'}`}
              iconName="fireStreak"
              accent
              isLast
            />
          </div>
        </section>

        {/* Section: Achievements */}
        <section aria-labelledby="settings-achievements-heading" className="mb-5">
          <h3
            id="settings-achievements-heading"
            className="text-[11px] uppercase tracking-wider text-ink-3 font-bold mb-2"
          >
            Achievements
          </h3>
          <div className="surface p-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-ink inline-flex items-center gap-1.5">
                <Icon name="medalStar" size="sm" className="text-accent" />
                {achievements.length} badges unlocked
              </div>
              <div className="text-xs text-ink-2 mt-0.5">
                Longest streak: {metrics.longestStreak} day{metrics.longestStreak === 1 ? '' : 's'} · Level {level.level}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-ink-3 font-bold">Level</div>
              <div className="text-xl font-extrabold text-accent inline-flex items-center gap-1.5">
                <Icon name="trophy" size="sm" />
                {level.level}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Data */}
        <section aria-labelledby="settings-data-heading" className="mb-5">
          <h3
            id="settings-data-heading"
            className="text-[11px] uppercase tracking-wider text-ink-3 font-bold mb-2"
          >
            Data
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={handleExport} className="btn btn-secondary">
              Export progress
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-ghost text-danger border-danger/50 hover:bg-danger/10"
            >
              Reset all
            </button>
          </div>
        </section>

        {/* Section: About */}
        <section aria-labelledby="settings-about-heading">
          <h3
            id="settings-about-heading"
            className="text-[11px] uppercase tracking-wider text-ink-3 font-bold mb-2"
          >
            About
          </h3>
          <div className="rounded-lg bg-bg-2 border border-border p-3 text-xs text-ink-2 leading-relaxed">
            <span className="text-accent font-semibold">A quiet design choice:</span> celebrations are
            visual and optional to dismiss, sound is off by default, and
            <code className="mx-1">prefers-reduced-motion</code>
            is respected automatically.
          </div>
        </section>

        <div className="flex flex-wrap gap-2.5 mt-6 justify-end">
          <button type="button" onClick={closeSettings} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string | number;
  suffix?: string;
  accent?: boolean;
  isLast?: boolean;
  iconName?: string;
}

function StatRow({ label, value, suffix, accent, isLast, iconName }: StatRowProps & { iconName?: string }) {
  return (
    <div
      className={`flex justify-between items-center px-4 py-2.5 text-sm ${
        isLast ? '' : 'border-b border-border'
      }`}
    >
      <span className="text-ink-2">{label}</span>
      <span className={`font-semibold inline-flex items-center gap-1.5 ${accent ? 'text-accent' : 'text-ink'}`}>
        {iconName && <Icon name={iconName} size="sm" />}
        {value}
        {suffix && <small className="text-ink-3 ml-1">{suffix}</small>}
      </span>
    </div>
  );
}