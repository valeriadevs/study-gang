import { useEffect, useRef } from 'react';

/**
 * Detects a sequence of typed keys anywhere in the document — perfect for
 * subtle easter eggs. The matcher is case-insensitive, ignores non-character
 * key events (Shift, Meta, etc.), and resets after the configured idle window.
 *
 * The hook does NOT call preventDefault so search/inputs still work normally.
 * It only fires when the user types the full sequence at default speed.
 */
export function useKeyBuffer(
  sequences: string[],
  onMatch: (matched: string) => void,
  options: { idleMs?: number; maxBuffer?: number } = {}
): void {
  const { idleMs = 1200, maxBuffer = 64 } = options;
  const bufferRef = useRef<string>('');
  const idleTimerRef = useRef<number | null>(null);
  const sequencesRef = useRef(sequences);
  const onMatchRef = useRef(onMatch);

  useEffect(() => {
    sequencesRef.current = sequences;
    onMatchRef.current = onMatch;
  }, [sequences, onMatch]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Ignore modified keys and non-character keys.
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.length !== 1) return;
      // Ignore when typing in an editable field — the user is doing real work.
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      const char = event.key.toLowerCase();
      bufferRef.current = (bufferRef.current + char).slice(-maxBuffer);

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(() => {
        bufferRef.current = '';
      }, idleMs);

      const lower = sequencesRef.current.map((sequence) => sequence.toLowerCase());
      for (const sequence of lower) {
        if (bufferRef.current.endsWith(sequence)) {
          bufferRef.current = '';
          onMatchRef.current(sequence);
          return;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [idleMs, maxBuffer]);
}
