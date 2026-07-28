import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { Icon } from './Icon';
import { layout } from '../styles/tokens';
import { cn } from '../utils/helpers';
import type { Course, Reference } from '../types';

interface TestCard {
  courseId: string;
  courseName: string;
  courseIcon: string;
  courseColor: string;
  test: Reference;
  questionCount: number;
}

function isTest(reference: Reference): boolean {
  return reference.timeLimit !== undefined;
}

function resolveCourse(reference: Reference, courses: Course[]): Course | null {
  if (reference.courseId) {
    return courses.find((c) => c.id === reference.courseId) ?? null;
  }
  const firstWord = (s: string) => s.split(/\s+/)[0].toLowerCase();
  const wanted = firstWord(reference.category);
  return courses.find((course) => firstWord(course.name) === wanted) ?? null;
}

export function TestsView() {
  const courses = useStore((s) => s.courses);
  const references = useStore((s) => s.references);
  const openReference = useStore((s) => s.openReference);
  const goHome = useStore((s) => s.goHome);

  const grouped = useMemo(() => {
    const byCourse: Record<string, TestCard[]> = {};
    for (const course of courses) {
      byCourse[course.id] = [];
    }
    for (const ref of references) {
      if (!isTest(ref)) continue;
      const course = resolveCourse(ref, courses);
      if (!course) continue;
      const questionCount = ref.blocks?.[0]?.questions?.length ?? 0;
      byCourse[course.id].push({
        courseId: course.id,
        courseName: course.name,
        courseIcon: course.icon,
        courseColor: course.color,
        test: ref,
        questionCount,
      });
    }
    for (const list of Object.values(byCourse)) {
      list.sort((a, b) => a.test.title.localeCompare(b.test.title, undefined, { numeric: true }));
    }
    return byCourse;
  }, [courses, references]);

  const totalTests = Object.values(grouped).reduce((sum, list) => sum + list.length, 0);

  if (totalTests === 0) {
    return (
      <div className="p-8 mx-auto fade-in" style={{ maxWidth: layout.contentMaxWidth }}>
        <button
          type="button"
          onClick={goHome}
          className="text-xs text-ink-2 hover:text-ink transition-colors duration-fast mb-2 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <span aria-hidden="true">←</span> Home
        </button>
        <h1 className="text-[32px] font-extrabold tracking-tight mb-2">All Tests</h1>
        <p className="text-ink-2 text-base">
          No tests yet. Add some to <code className="text-accent">src/data/tests/</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto fade-in" style={{ maxWidth: layout.contentMaxWidth }}>
      <button
        type="button"
        onClick={goHome}
        className="text-xs text-ink-2 hover:text-ink transition-colors duration-fast mb-2 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        <span aria-hidden="true">←</span> Home
      </button>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg grid place-items-center bg-accent/10 text-accent">
          <Icon name="checklist" size="md" weight="Filled" />
        </div>
        <h1 className="text-[32px] font-extrabold tracking-tight">All Tests</h1>
        <span className="chip font-mono">
          {totalTests} {totalTests === 1 ? 'test' : 'tests'}
        </span>
      </div>
      <p className="text-ink-2 text-base mb-6 max-w-2xl">
        Every timed quiz across every course, in one place. Each card lists the
        topics you should be comfortable with before you start — no surprises on
        question one.
      </p>

      <div className="space-y-8">
        {courses.map((course) => {
          const cards = grouped[course.id];
          if (!cards || cards.length === 0) return null;
          return (
            <section key={course.id} aria-labelledby={`tests-course-${course.id}`}>
              <div className="flex items-center gap-2.5 mb-3">
                <Icon
                  name={course.icon}
                  size="sm"
                  weight="Filled"
                  style={{ color: course.color }}
                  title={`${course.name} icon`}
                />
                <h2
                  id={`tests-course-${course.id}`}
                  className="text-sm font-bold uppercase tracking-wider text-ink-2"
                >
                  {course.name}
                </h2>
                <span className="text-xs text-ink-3 font-mono">
                  {cards.length} {cards.length === 1 ? 'test' : 'tests'}
                </span>
                <div className="flex-1 h-px bg-border ml-1" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3">
                {cards.map(({ test, questionCount }) => {
                  const hint = test.attemptAfter;
                  return (
                    <button
                      type="button"
                      key={test.id}
                      onClick={() => openReference(test.id)}
                      className={cn(
                        'surface p-4 text-left group',
                        'hover:border-accent hover:-translate-y-0.5 hover:shadow-panel',
                        'transition-all duration-normal ease-standard',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-sm font-bold leading-snug">{test.title}</h3>
                        <span
                          className="text-ink-3 group-hover:text-accent transition-colors duration-fast flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Icon name="arrowRight" size="sm" />
                        </span>
                      </div>
                      {test.description && (
                        <p className="text-xs text-ink-2 leading-relaxed mb-3">
                          {test.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-3 mb-3">
                        {hint?.days && (
                          <span className="chip">
                            <Icon name="calendarDays" size="xs" />
                            {hint.days}
                          </span>
                        )}
                        <span className="chip">
                          <Icon name="helpCircle" size="xs" />
                          {questionCount} Q
                        </span>
                        {test.timeLimit !== undefined && (
                          <span className="chip">
                            <Icon name="timer" size="xs" />
                            {test.timeLimit} min
                          </span>
                        )}
                        {test.passingScore !== undefined && (
                          <span className="chip">
                            <Icon name="target" size="xs" />
                            {test.passingScore}% pass
                          </span>
                        )}
                      </div>

                      {hint && (
                        <div className="rounded-lg bg-bg-2/60 border border-border p-2.5">
                          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-accent mb-1.5">
                            <Icon name="sparkle" size="xs" weight="Filled" />
                            <span>Attempt after</span>
                          </div>
                          {hint.level && (
                            <p className="text-xs text-ink-2 mb-1.5 italic">{hint.level}</p>
                          )}
                          <ul className="text-xs text-ink-2 space-y-1 list-disc pl-4 marker:text-ink-3">
                            {hint.topics.slice(0, 4).map((topic) => (
                              <li key={topic} className="leading-snug">
                                {topic}
                              </li>
                            ))}
                            {hint.topics.length > 4 && (
                              <li className="text-ink-3 italic">
                                + {hint.topics.length - 4} more
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
