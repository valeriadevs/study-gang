import { useCallback, useEffect, useRef, useState } from 'react';
import { useTimer, formatTime } from '../hooks/useTimer';
import { useStore } from '../store/useStore';
import { cn } from '../utils/helpers';
import { Icon } from './Icon';

const TIMER_PRESETS = [
  { label: '25 min', value: 25 },
  { label: '50 min', value: 50 },
  { label: '60 min', value: 60 },
  { label: '90 min', value: 90 },
  { label: '120 min', value: 120 },
];

export function Timer() {
  const selectedCourseId = useStore((state) => state.selectedCourseId);
  const addMinutes = useStore((state) => state.addMinutes);
  const celebrateTimer = useStore((state) => state.celebrateTimer);
  const courses = useStore((state) => state.courses);
  const course = courses.find((item) => item.id === selectedCourseId);

  const initialMinutes = course?.dailyMinutes ?? 60;
  const [showPresets, setShowPresets] = useState(false);
  const sessionTotalSecondsRef = useRef(initialMinutes * 60);
  const loggedMinutesRef = useRef(0);
  const previousCourseRef = useRef(selectedCourseId);
  const originalTitleRef = useRef(document.title);

  const logElapsedMinutes = useCallback(
    (remainingSeconds: number) => {
      if (!selectedCourseId) return;
      const elapsed = Math.max(0, sessionTotalSecondsRef.current - remainingSeconds);
      const elapsedMinutes = Math.floor(elapsed / 60);
      const delta = elapsedMinutes - loggedMinutesRef.current;
      if (delta > 0) {
        addMinutes(selectedCourseId, delta, new Date().getHours());
        loggedMinutesRef.current = elapsedMinutes;
      }
    },
    [addMinutes, selectedCourseId]
  );

  const handleComplete = useCallback(() => {
    logElapsedMinutes(0);
    if (selectedCourseId) {
      const minutes = Math.floor(sessionTotalSecondsRef.current / 60);
      celebrateTimer(selectedCourseId, minutes);
    }
  }, [celebrateTimer, logElapsedMinutes, selectedCourseId]);

  const {
    totalSeconds,
    remaining,
    running,
    completed,
    toggle,
    reset,
    setMinutes,
  } = useTimer({
    initialSeconds: initialMinutes * 60,
    onTick: logElapsedMinutes,
    onComplete: handleComplete,
  });

  useEffect(() => {
    if (previousCourseRef.current === selectedCourseId) return;
    sessionTotalSecondsRef.current = initialMinutes * 60;
    loggedMinutesRef.current = 0;
    setMinutes(initialMinutes);
    previousCourseRef.current = selectedCourseId;
    setShowPresets(false);
  }, [initialMinutes, selectedCourseId, setMinutes]);

  useEffect(() => {
    if (running) {
      document.title = `${formatTime(remaining)} · Study Gang`;
    } else {
      document.title = originalTitleRef.current;
    }
  }, [remaining, running]);

  useEffect(() => () => {
    document.title = originalTitleRef.current;
  }, []);

  function handleToggle() {
    if (!running && remaining <= 0) {
      loggedMinutesRef.current = 0;
      sessionTotalSecondsRef.current = totalSeconds;
    }
    toggle();
  }

  function handleReset() {
    loggedMinutesRef.current = 0;
    sessionTotalSecondsRef.current = totalSeconds;
    reset();
  }

  function handleSetMinutes(minutes: number) {
    sessionTotalSecondsRef.current = minutes * 60;
    loggedMinutesRef.current = 0;
    setMinutes(minutes);
    setShowPresets(false);
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  const elapsedMinutes = Math.max(0, Math.floor((totalSeconds - remaining) / 60));
  const progressPercent = totalSeconds > 0
    ? Math.min(100, Math.round(((totalSeconds - remaining) / totalSeconds) * 100))
    : 0;

  return (
    <div className="relative">
      <div
        className={cn(
          'timer-pill flex items-center gap-2.5 bg-panel border rounded-full px-3.5 py-1.5 transition-colors duration-fast relative overflow-hidden',
          running && 'border-success',
          !running && completed && 'border-accent',
          !running && !completed && 'border-border'
        )}
        aria-label={`${running ? 'Focus timer running' : completed ? 'Focus timer complete' : 'Focus timer paused'}: ${formatTime(remaining)} remaining`}
        role="group"
      >
        <div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent to-success transition-[width] duration-slow ease-standard"
          style={{ width: `${progressPercent}%` }}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => setShowPresets((open) => !open)}
          className="text-xs font-mono text-ink-2 hover:text-ink transition-colors duration-fast relative z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          title="Set focus duration"
          aria-label="Set focus duration"
          aria-expanded={showPresets}
          aria-haspopup="menu"
        >
          {totalMinutes}m
        </button>
        <span
          className={cn(
            'font-mono font-semibold text-sm min-w-[60px] text-center tabular-nums relative z-[1]',
            running && 'text-success',
            !running && completed && 'text-accent'
          )}
        >
          {formatTime(remaining)}
        </span>
        <button
          type="button"
          onClick={handleToggle}
          className="w-7 h-7 grid place-items-center rounded-full text-ink-2 hover:bg-panel-2 hover:text-ink transition-colors duration-fast relative z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
          title={running ? 'Pause focus timer' : 'Start focus timer'}
          aria-label={running ? 'Pause focus timer' : 'Start focus timer'}
        >
          {running ? <Icon name="pause" size="sm" /> : <Icon name="play" size="sm" />}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-7 h-7 grid place-items-center rounded-full text-ink-2 hover:bg-panel-2 hover:text-ink transition-colors duration-fast relative z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
          title="Reset focus timer"
          aria-label="Reset focus timer"
        >
          <Icon name="refresh" size="sm" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {running ? `${elapsedMinutes} focused minutes logged.` : completed ? 'Focus session complete.' : ''}
      </span>

      {showPresets && (
        <div
          className="absolute top-full right-0 mt-2 bg-panel border border-border rounded-lg shadow-panel overflow-hidden z-30 min-w-[150px] fade-in"
          role="menu"
        >
          <div className="px-3 pt-2.5 pb-1 text-[10px] uppercase tracking-wider text-ink-3 font-bold">Choose a focus block</div>
          {TIMER_PRESETS.map((preset) => (
            <button
              type="button"
              key={preset.value}
              onClick={() => handleSetMinutes(preset.value)}
              role="menuitem"
              className="block w-full text-left px-3 py-2 text-sm text-ink hover:bg-panel-2 transition-colors duration-fast focus-visible:outline-none focus-visible:bg-panel-2"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}