import { useEffect, useState } from 'react';
import type { Course, Day, Phase } from '../types';
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

export function DayContent({ course, phase, day }: DayContentProps) {
  const progress = useStore((state) => state.progress[course.id]);
  const selectDay = useStore((state) => state.selectDay);
  const toggleDay = useStore((state) => state.toggleDay);
  const celebrateCourse = useStore((state) => state.celebrateCourse);
  const goHome = useStore((state) => state.goHome);
  const [readProgress, setReadProgress] = useState(0);

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
  }, [day.id]);

  return (
    <div
      className="p-8 mx-auto fade-in"
      style={{ maxWidth: layout.readingMaxWidth }}
    >
      <p className="sr-only" aria-live="polite">Now studying Day {day.number}: {day.title}</p>

      {/* Reading progress bar (sticky) */}
      <div className="sticky top-0 z-20 -mx-8 px-8 pt-1 pb-3 bg-bg/90 backdrop-blur-sm">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-ink-3 font-bold mb-1.5">
          <span>Day {day.number} · reading trail</span>
          <span>{readProgress}% skimmed</span>
        </div>
        <div
          className="h-1 rounded-full bg-panel-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={readProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Reading progress for Day ${day.number}`}
        >
          <div
            className="h-full rounded-full transition-[width] duration-normal ease-standard"
            style={{ width: `${readProgress}%`, background: course.color }}
          />
        </div>
      </div>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-body-sm text-ink-2 mb-3 mt-3 flex items-center gap-1.5 flex-wrap"
      >
        <span>{course.name}</span>
        <span aria-hidden="true">›</span>
        <span>{phase.name}</span>
        <span aria-hidden="true">›</span>
        <span className="font-semibold" style={{ color: course.color }}>Day {day.number}</span>
      </nav>

      {/* Title row */}
      <header className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-h1 font-display">{day.title}</h1>
        <div
          className="hidden sm:grid place-items-center w-12 h-12 rounded-2xl bg-panel border border-border"
          style={{ color: course.color }}
          aria-hidden="true"
        >
          <Icon name={course.icon} size="lg" weight="Filled" />
        </div>
      </header>
      {day.subtitle && (
        <p className="font-sub italic text-accent mb-4">{day.subtitle}</p>
      )}

      {/* Meta chips */}
      <div className="flex gap-2.5 text-[13px] text-ink-2 mb-7 flex-wrap">
        <span className="chip">
          <Icon name="calendar" size="sm" />
          Day {day.number} of {course.duration}
        </span>
        <span className="chip">
          <Icon name="watch" size="sm" />
          {day.duration ?? course.dailyMinutes} min plan
        </span>
        <span className="chip">
          <Icon name="book" size="sm" />
          ~{readingMinutes} min read
        </span>
        {tasks.length > 0 && (
          <span className="chip">
            <Icon name="checkSquare" size="sm" />
            {doneTaskCount}/{tasks.length} tasks
          </span>
        )}
        {dayDone && (
          <span className="chip border-success/40 text-success">
            <Icon name="check" size="sm" weight="Filled" />
            Completed
          </span>
        )}
      </div>

      {/* Topics (Today's targets) */}
      {day.topics && day.topics.length > 0 && (
        <section className="surface p-5 mb-4" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-body-lg font-bold mb-2.5 flex items-center gap-2">
            <Icon name="target" size="sm" className="text-accent" />
            <span>Today&rsquo;s targets</span>
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {day.topics.map((topic, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-1 rounded-full bg-panel-2 border border-border text-ink"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Aligned resources */}
      {day.alignment && day.alignment.length > 0 && (
        <section className="surface p-5 mb-4" aria-labelledby="alignment-heading">
          <h2 id="alignment-heading" className="text-base font-bold mb-2.5 flex items-center gap-2">
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

      {/* Content blocks */}
      {blocks.length > 0 ? (
        <div className="space-y-4 mb-4">
          {blocks.map((block, index) => (
            <ContentRenderer key={block.id ?? index} block={block} dayId={day.id} />
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <EmptyState
            icon="notepad"
            title="No content yet"
            description="Add blocks to this day in src/data/courses.ts to populate study content here."
          />
        </div>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <section className="surface p-6 mb-4" aria-labelledby="tasks-heading">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3.5">
            <h2 id="tasks-heading" className="text-body-lg font-bold flex items-center gap-2">
              <Icon name="checkSquare" size="sm" className="text-accent" />
              <span>Tasks</span>
            </h2>
            <span className="text-xs text-ink-2">{doneTaskCount} of {tasks.length} cleared</span>
          </div>
          <TaskList courseId={course.id} tasks={tasks} />
        </section>
      )}

      {/* Notes */}
      <section className="surface p-6 mb-4" aria-labelledby="notes-heading">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3.5">
          <h2 id="notes-heading" className="text-body-lg font-bold flex items-center gap-2">
            <Icon name="notepad" size="sm" className="text-accent" />
            <span>Your Notes</span>
          </h2>
          <span className="text-[11px] text-ink-3">A breadcrumb for tomorrow-you</span>
        </div>
        <NotesPanel courseId={course.id} dayId={day.id} topics={day.topics} />
      </section>

      {/* Day check-in */}
      <section className="surface p-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

      {/* Course finale (last day) */}
      {!nextDay && (
        <section
          className="course-finale surface p-6 mb-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, rgba(248,152,32,0.15), #161a23 50%, rgba(34,197,94,0.10))' }}
        >
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div
                className="w-12 h-12 mb-2 grid place-items-center rounded-xl"
                style={{
                  background: courseMetric.complete ? 'rgba(34,197,94,0.12)' : 'rgba(248,152,32,0.12)',
                  color: courseMetric.complete ? '#22c55e' : course.color,
                }}
                aria-hidden="true"
              >
                <Icon
                  name={courseMetric.complete ? 'trophy' : 'rocketLaunch'}
                  size="lg"
                  weight="Filled"
                />
              </div>
              <h2 className="text-lg font-bold">
                {courseMetric.complete ? 'Course conquered!' : 'Final day reached'}
              </h2>
              <p className="text-xs text-ink-2 mt-1 max-w-xl">
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

      {/* Pager */}
      <nav
        aria-label="Day navigation"
        className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 pt-5 border-t border-border"
      >
        {prevDay ? (
          <button
            type="button"
            onClick={() => selectDay(course.id, prevDay.id)}
            className="btn btn-secondary text-left group"
          >
            <span aria-hidden="true" className="transition-transform duration-fast group-hover:-translate-x-0.5">←</span> Day {prevDay.number}: {prevDay.title}
          </button>
        ) : (
          <span />
        )}
        {nextDay ? (
          <button
            type="button"
            onClick={() => selectDay(course.id, nextDay.id)}
            className="btn btn-secondary text-left sm:text-right group"
          >
            Day {nextDay.number}: {nextDay.title}
            <span aria-hidden="true" className="transition-transform duration-fast group-hover:translate-x-0.5">→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={goHome}
            className="btn btn-primary"
          >
            Back to dashboard
          </button>
        )}
      </nav>
    </div>
  );
}
