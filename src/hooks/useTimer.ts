import { useEffect, useRef, useState, useCallback } from 'react';

export interface TimerOptions {
  initialSeconds?: number;
  onTick?: (remaining: number) => void;
  onComplete?: () => void;
}

export function useTimer({ initialSeconds = 0, onTick, onComplete }: TimerOptions = {}) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const onTickRef = useRef(onTick);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onTickRef.current = onTick;
    onCompleteRef.current = onComplete;
  }, [onTick, onComplete]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setCompleted(true);
          onCompleteRef.current?.();
          return 0;
        }
        const next = prev - 1;
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  const start = useCallback(() => {
    if (remaining <= 0) setRemaining(totalSeconds);
    setCompleted(false);
    setRunning(true);
  }, [remaining, totalSeconds]);

  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(totalSeconds);
    setCompleted(false);
  }, [totalSeconds]);

  const setMinutes = useCallback((minutes: number) => {
    const seconds = Math.max(0, Math.floor(minutes * 60));
    setTotalSeconds(seconds);
    setRemaining(seconds);
    setRunning(false);
    setCompleted(false);
  }, []);

  const toggle = useCallback(() => {
    if (running) {
      pause();
    } else {
      start();
    }
  }, [running, pause, start]);

  return {
    totalSeconds,
    remaining,
    running,
    completed,
    start,
    pause,
    reset,
    toggle,
    setMinutes,
  };
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}
