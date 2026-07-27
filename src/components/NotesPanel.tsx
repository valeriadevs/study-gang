import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Icon } from './Icon';

interface NotesPanelProps {
  courseId: string;
  dayId: string;
  topics?: string[];
}

export function NotesPanel({ courseId, dayId, topics }: NotesPanelProps) {
  const progress = useStore((state) => state.progress[courseId]);
  const setNote = useStore((state) => state.setNote);
  const initial = progress?.notes?.[dayId] ?? '';
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(true);
  const timerRef = useRef<number | null>(null);
  const promptTopic = topics?.[0] ?? 'today’s idea';

  useEffect(() => {
    setValue(progress?.notes?.[dayId] ?? '');
    setSaved(true);
  }, [courseId, dayId, progress?.notes, progress?.notes?.[dayId]]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value;
    setValue(nextValue);
    setSaved(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setNote(courseId, dayId, nextValue);
      setSaved(true);
    }, 400);
  }

  return (
    <div>
      <label htmlFor={`notes-${dayId}`} className="sr-only">
        Notes about {promptTopic}
      </label>
      <textarea
        id={`notes-${dayId}`}
        value={value}
        onChange={handleChange}
        placeholder={`What clicked about ${promptTopic}? Leave one useful breadcrumb for tomorrow-you…`}
        className="w-full min-h-[140px] bg-bg-2 border border-border rounded-lg px-3.5 py-3 text-ink font-sans text-body-md leading-relaxed resize-y outline-none transition-colors duration-fast placeholder:text-ink-3 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0"
      />
      <div className="flex items-center justify-between gap-3 mt-1.5 min-h-[18px]">
        <div
          className={`text-body-sm inline-flex items-center gap-1.5 ${saved ? 'text-success' : 'text-ink-2'}`}
          aria-live="polite"
        >
          {saved ? (
            <>
              <Icon name="check" size="xs" weight="Filled" />
              Saved locally
            </>
          ) : (
            'Saving your breadcrumb…'
          )}
        </div>
        <div className="text-body-sm text-ink-3 tabular-nums">{value.length} characters</div>
      </div>
    </div>
  );
}