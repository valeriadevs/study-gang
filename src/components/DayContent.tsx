import { useEffect, useMemo, useState } from 'react';
import type { ContentBlock, Course, Day, Phase } from '../types';
import { useStore } from '../store/useStore';
import { ContentRenderer } from './ContentRenderer';
import { TaskList } from './TaskList';
import { NotesPanel } from './NotesPanel';
import { EmptyState } from './EmptyState';
import { Icon } from './Icon';
import { estimateDayReadingMinutes, getCourseMetrics } from '../utils/progress';
import { layout } from '../styles/tokens';

interface DayContentProps {
  course: Course;
  phase: Phase;
  day: Day;
}

function slugify(text: string, fallback: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return slug || fallback;
}

function useReadingProgress(deps: unknown) {
  const [readProgress, setReadProgress] = useState(0);
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    if (!main) return;
    const updateProgress = () => {
      const scrollable = main.scrollHeight - main.clientHeight;
      setReadProgress(
        scrollable <= 0
          ? 100
          : Math.min(100, Math.max(0, Math.round((main.scrollTop / scrollable) * 100)))
      );
    };
    main.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    updateProgress();
    main.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      main.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [deps]);
  return readProgress;
}

function buildSectionToc(blocks: ContentBlock[]) {
  const items: { id: string; label: string; level: number }[] = [];
  blocks.forEach((block, index) => {
    if (block.type !== 'heading') return;
    const level = block.level ?? 3;
    if (level > 3) return;
    const text = (block.content ?? '').trim();
    if (!text) return;
    const id = block.id ? `b-${block.id}` : `bx-${index}`;
    items.push({ id, label: text, level });
  });
  return items;
}

export function DayContent({ course, phase, day }: DayContentProps) {
  const progress = useStore((state) => state.progress[course.id]);
  const selectDay = useStore((state) => state.selectDay);
  const toggleDay = useStore((state) => state.toggleDay);
  const celebrateCourse = useStore((state) => state.celebrateCourse);
  const goHome = useStore((state) => state.goHome);

  const allDays = (course.phases ?? []).flatMap((item) => item.days);
  const dayIdx = allDays.findIndex((item) => item.id === day.id);
  const prevDay = dayIdx > 0 ? allDays[dayIdx - 1] : null;
  const nextDay = dayIdx < allDays.length - 1 ? allDays[dayIdx + 1] : null;
  const dayDone = progress?.days?.[day.id] ?? false;
  const tasks = day.tasks ?? [];
  const blocks = day.blocks ?? [];
  const doneTaskCount = tasks.filter((task) => Boolean(progress?.tasks?.[task.id])).length;
  const readingMinutes = estimateDayReadingMinutes(day);
  const courseMetric = getCourseMetrics(course, progress);

  const readProgress = useReadingProgress(day.id);
  const sectionToc = useMemo(() => buildSectionToc(blocks), [blocks]);

  const topicPills = day.topics ?? [];
  const accent = course.color;

  return (
    <div className="p-6 md:p-8 mx-auto fade-in" style={{ maxWidth: layout.contentMaxWidth }}>
      <p className="sr-only" aria-live="polite">Now studying Day {day.number}: {day.title}</p>

      {/* ── Reading progress (sticky) ── */}
      <div className="sticky top-0 z-20 -mx-6 md:-mx-8 px-6 md:px-8 pt-1 pb-3 bg-bg/85 backdrop-blur">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-3 font-bold mb-1.5">
          <span>Day {day.number} · reading trail</span>
          <span>{readProgress}% skimmed</span>
        </div>
        <div className="h-1 rounded-full bg-panel-2 overflow-hidden" role="progressbar" aria-valuenow={readProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Reading progress for Day ${day.number}`}>
          <div className="h-full rounded-full transition-[width] duration-normal ease-standard" style={{ width: `${readProgress}%`, background: accent }} />
        </div>
      </div>

      {/* ── HERO ── */}
      <header
        className="relative overflow-hidden rounded-2xl border border-border mt-4 mb-6 p-6 md:p-7"
        style={{
          background: `linear-gradient(135deg, ${accent}26, transparent 55%), linear-gradient(180deg, oklch(22% .025 220) 0%, oklch(17% .02 220) 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ background: accent }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 w-44 h-44 rounded-full blur-3xl opacity-25"
          style={{ background: accent }}
        />
        <div className="relative flex items-start gap-5">
          <div
            className="hidden sm:grid place-items-center w-14 h-14 rounded-2xl border border-border flex-shrink-0"
            style={{ background: `${accent}22`, color: accent }}
            aria-hidden="true"
          >
            <Icon name={course.icon} size="lg" weight="Filled" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-bold mb-2" style={{ color: accent }}>
              <span>{course.name}</span>
              <span aria-hidden="true" className="text-ink-3">·</span>
              <span className="text-ink-2">{phase.name}</span>
            </div>
            <h1 className="text-h1 font-display leading-tight text-ink">{day.title}</h1>
            {day.subtitle && (
              <p className="font-sub italic text-ink-2 mt-2 text-body-lg">{day.subtitle}</p>
            )}
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <StatTile icon="calendar" label={`of ${course.duration}`} value={`Day ${day.number}`} accent={accent} />
          <StatTile icon="watch" label="plan" value={`${day.duration ?? course.dailyMinutes} min`} accent={accent} />
          <StatTile icon="book" label="read" value={`~${readingMinutes} min`} accent={accent} />
          <StatTile
            icon="checkSquare"
            label="tasks"
            value={`${doneTaskCount}/${tasks.length}`}
            accent={doneTaskCount === tasks.length && tasks.length > 0 ? '#22c55e' : accent}
          />
        </div>
      </header>

      {/* ── Topic pills (full width, beneath hero) ── */}
      {topicPills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-7">
          {topicPills.map((topic, index) => (
            <span
              key={index}
              className="text-body-sm px-3 py-1 rounded-full bg-panel-2 border border-border text-ink-2"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* ── Two-column main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_18rem] gap-8">
        {/* LEFT: reading column */}
        <div className="min-w-0 space-y-5">
          {day.alignment && day.alignment.length > 0 && (
            <section className="surface p-5" aria-labelledby="alignment-heading">
              <h2 id="alignment-heading" className="text-body-lg font-bold mb-2.5 flex items-center gap-2">
                <Icon name="link" size="sm" className="text-accent" />
                <span>Aligned resources</span>
              </h2>
              <ul className="space-y-1 list-disc pl-5 marker:text-accent">
                {day.alignment.map((alignment, index) => (
                  <li key={index} className="text-body-md text-ink-2">{alignment}</li>
                ))}
              </ul>
            </section>
          )}

          {blocks.length > 0 ? (
            <div className="space-y-4" id="day-blocks">
              {blocks.map((block, index) => {
                const anchorId = block.id ? `b-${block.id}` : `bx-${index}`;
                const isH2 = block.type === 'heading' && (block.level ?? 3) === 2;
                const isH3 = block.type === 'heading' && (block.level ?? 3) === 3;
                if (isH2) {
                  const text = (block.content ?? '').trim();
                  const id = text ? `h-${slugify(text, anchorId)}` : anchorId;
                  return (
                    <div key={block.id ?? index} id={id} className="scroll-mt-24 pt-2">
                      <ContentRenderer block={block} dayId={day.id} />
                    </div>
                  );
                }
                if (isH3) {
                  const text = (block.content ?? '').trim();
                  const id = text ? `h-${slugify(text, anchorId)}` : anchorId;
                  return (
                    <div key={block.id ?? index} id={id} className="scroll-mt-24 pt-1">
                      <ContentRenderer block={block} dayId={day.id} />
                    </div>
                  );
                }
                return (
                  <ContentRenderer key={block.id ?? index} block={block} dayId={day.id} />
                );
              })}
            </div>
          ) : (
            <div className="mb-2">
              <EmptyState
                icon="notepad"
                title="No content yet"
                description="Add blocks to this day in src/data/courses.ts to populate study content here."
              />
            </div>
          )}

          {!nextDay && (
            <section
              className="course-finale surface p-6 relative overflow-hidden"
              style={{ background: `linear-gradient(to bottom right, ${accent}26, #161a23 50%, rgba(34,197,94,0.10))` }}
            >
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div
                    className="w-12 h-12 mb-2 grid place-items-center rounded-xl"
                    style={{
                      background: courseMetric.complete ? 'rgba(34,197,94,0.12)' : `${accent}22`,
                      color: courseMetric.complete ? '#22c55e' : accent,
                    }}
                    aria-hidden="true"
                  >
                    <Icon name={courseMetric.complete ? 'trophy' : 'rocketLaunch'} size="lg" weight="Filled" />
                  </div>
                  <h2 className="text-lg font-bold">{courseMetric.complete ? 'Course conquered!' : 'Final day reached'}</h2>
                  <p className="text-body-sm text-ink-2 mt-1 max-w-xl">
                    {courseMetric.complete
                      ? `${courseMetric.doneDays}/${courseMetric.totalDays} days complete. Let the tiny victory lap happen.`
                      : `You made it to the finish line. ${courseMetric.doneDays}/${courseMetric.totalDays} days are officially marked complete.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => celebrateCourse(course.id)}
                  className="btn btn-primary btn-whimsy flex-shrink-0"
                >
                  <Icon name="confetti" size="sm" />
                  Celebrate this course
                </button>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT: rail (lg+) — scrolls with content, not sticky */}
        <aside className="hidden lg:block">
          <div className="space-y-4">
            {sectionToc.length > 0 && (
              <nav aria-label="On this page" className="surface p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-3 font-bold mb-2 flex items-center gap-1.5">
                  <Icon name="bookmark" size="xs" />
                  On this page
                </p>
                <ul className="space-y-1">
                  {sectionToc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block py-1 text-body-sm leading-snug hover:text-accent transition-colors duration-fast ${
                          item.level === 3 ? 'pl-3 text-ink-3' : 'text-ink-2'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {tasks.length > 0 && (
              <section className="surface p-5" aria-labelledby="rail-tasks-heading">
                <div className="flex items-center justify-between mb-3">
                  <h3 id="rail-tasks-heading" className="text-body-md font-bold flex items-center gap-2">
                    <Icon name="checkSquare" size="sm" className="text-accent" />
                    <span>Tasks</span>
                  </h3>
                  <span className="text-[11px] text-ink-3 tabular-nums">{doneTaskCount}/{tasks.length}</span>
                </div>
                <TaskList courseId={course.id} tasks={tasks} />
              </section>
            )}

            <section className="surface p-5" aria-labelledby="rail-notes-heading">
              <div className="flex items-center justify-between mb-3">
                <h3 id="rail-notes-heading" className="text-body-md font-bold flex items-center gap-2">
                  <Icon name="notepad" size="sm" className="text-accent" />
                  <span>Notes</span>
                </h3>
                <span className="text-[11px] text-ink-3">autosaved</span>
              </div>
              <NotesPanel courseId={course.id} dayId={day.id} topics={day.topics} />
            </section>

            <section className="surface p-5" aria-labelledby="rail-checkin-heading">
              <h3 id="rail-checkin-heading" className="text-body-md font-bold mb-1.5">Day check-in</h3>
              <p className="text-body-sm text-ink-2 mb-3">
                {dayDone
                  ? 'This day is safely in the books. Revisit any time.'
                  : doneTaskCount === tasks.length && tasks.length > 0
                    ? 'All tasks are clear. Stamp it when you are ready.'
                    : 'Mark complete when the key bits feel understood.'}
              </p>
              <button
                type="button"
                onClick={() => toggleDay(course.id, day.id)}
                className={`btn w-full justify-center ${dayDone ? 'btn-secondary' : 'btn-primary'} ${dayDone ? '' : 'btn-whimsy'}`}
                aria-pressed={dayDone}
              >
                {dayDone ? (
                  <>
                    <Icon name="check" size="sm" weight="Filled" /> Completed
                  </>
                ) : (
                  'Mark complete'
                )}
              </button>
            </section>

            <PagerNav
              prevDay={prevDay}
              nextDay={nextDay}
              onPrev={() => prevDay && selectDay(course.id, prevDay.id)}
              onNext={() => nextDay && selectDay(course.id, nextDay.id)}
              onHome={goHome}
            />
          </div>
        </aside>

        {/* Mobile-only inline sections (everything that's in the rail) */}
        <div className="lg:hidden space-y-4">
          {sectionToc.length > 0 && (
            <details className="surface p-4">
              <summary className="cursor-pointer text-body-md font-bold flex items-center gap-2 list-none">
                <Icon name="bookmark" size="sm" className="text-accent" />
                On this page · {sectionToc.length}
              </summary>
              <ul className="mt-2 space-y-1">
                {sectionToc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`block py-1 text-body-sm leading-snug ${
                        item.level === 3 ? 'pl-3 text-ink-3' : 'text-ink-2'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {tasks.length > 0 && (
            <section className="surface p-6" aria-labelledby="m-tasks-heading">
              <div className="flex items-center justify-between mb-3">
                <h2 id="m-tasks-heading" className="text-body-lg font-bold flex items-center gap-2">
                  <Icon name="checkSquare" size="sm" className="text-accent" />
                  <span>Tasks</span>
                </h2>
                <span className="text-body-sm text-ink-2">{doneTaskCount} of {tasks.length} cleared</span>
              </div>
              <TaskList courseId={course.id} tasks={tasks} />
            </section>
          )}

          <section className="surface p-6" aria-labelledby="m-notes-heading">
            <h2 id="m-notes-heading" className="text-body-lg font-bold mb-3 flex items-center gap-2">
              <Icon name="notepad" size="sm" className="text-accent" />
              <span>Your Notes</span>
            </h2>
            <NotesPanel courseId={course.id} dayId={day.id} topics={day.topics} />
          </section>

          <section className="surface p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-body-md font-bold mb-1">Day check-in</h3>
              <p className="text-body-sm text-ink-2">
                {dayDone
                  ? 'This day is safely in the books. You can revisit it whenever you like.'
                  : doneTaskCount === tasks.length && tasks.length > 0
                    ? 'All tasks are clear. Ready to give this day its official stamp?'
                    : 'Mark this day complete when the important bits feel understood.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleDay(course.id, day.id)}
              className={`btn ${dayDone ? 'btn-secondary' : 'btn-primary'} ${dayDone ? '' : 'btn-whimsy'}`}
              aria-pressed={dayDone}
            >
              {dayDone ? (
                <>
                  <Icon name="check" size="sm" weight="Filled" />
                  Completed
                </>
              ) : (
                'Mark complete'
              )}
            </button>
          </section>

          <PagerNav
            prevDay={prevDay}
            nextDay={nextDay}
            onPrev={() => prevDay && selectDay(course.id, prevDay.id)}
            onNext={() => nextDay && selectDay(course.id, nextDay.id)}
            onHome={goHome}
          />
        </div>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl bg-bg-2/70 border border-border px-3 py-2.5 flex items-center gap-2.5">
      <div
        className="w-9 h-9 rounded-lg grid place-items-center flex-shrink-0"
        style={{ background: `${accent}1f`, color: accent }}
        aria-hidden="true"
      >
        <Icon name={icon} size="sm" />
      </div>
      <div className="min-w-0">
        <div className="text-body-md font-bold text-ink leading-tight truncate">{value}</div>
        <div className="text-[11px] uppercase tracking-wider text-ink-3 leading-tight">{label}</div>
      </div>
    </div>
  );
}

function PagerNav({
  prevDay,
  nextDay,
  onPrev,
  onNext,
  onHome,
}: {
  prevDay: Day | null;
  nextDay: Day | null;
  onPrev: () => void;
  onNext: () => void;
  onHome: () => void;
}) {
  return (
    <nav aria-label="Day navigation" className="space-y-2">
      {prevDay ? (
        <button
          type="button"
          onClick={onPrev}
          className="group w-full text-left surface p-3 hover:border-accent transition-colors duration-fast"
        >
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-3 font-bold flex items-center gap-1.5">
            <span aria-hidden="true" className="transition-transform duration-fast group-hover:-translate-x-0.5">←</span>
            Previous · Day {prevDay.number}
          </div>
          <div className="text-body-sm text-ink font-semibold mt-1 truncate">{prevDay.title}</div>
        </button>
      ) : (
        <div className="surface p-3 text-[11px] uppercase tracking-[0.16em] text-ink-3 font-bold">First day · head start</div>
      )}
      {nextDay ? (
        <button
          type="button"
          onClick={onNext}
          className="group w-full text-left surface p-3 hover:border-accent transition-colors duration-fast"
        >
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-3 font-bold flex items-center justify-between">
            <span>Up next · Day {nextDay.number}</span>
            <span aria-hidden="true" className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
          </div>
          <div className="text-body-sm text-ink font-semibold mt-1 truncate">{nextDay.title}</div>
        </button>
      ) : (
        <button
          type="button"
          onClick={onHome}
          className="w-full btn btn-primary justify-center"
        >
          Back to dashboard
        </button>
      )}
    </nav>
  );
}
