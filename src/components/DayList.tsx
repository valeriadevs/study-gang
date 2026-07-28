import { useStore } from '../store/useStore';
import { cn, pluralize } from '../utils/helpers';
import { getCourseMetrics } from '../utils/progress';
import { Icon } from './Icon';

interface DayListProps {
  courseId: string;
}

export function DayList({ courseId }: DayListProps) {
  const courses = useStore((state) => state.courses);
  const progress = useStore((state) => state.progress);
  const references = useStore((state) => state.references);
  const selectedDayId = useStore((state) => state.selectedDayId);
  const selectDay = useStore((state) => state.selectDay);
  const openReference = useStore((state) => state.openReference);
  const openTests = useStore((state) => state.openTests);
  const goHome = useStore((state) => state.goHome);

  const course = courses.find((item) => item.id === courseId);
  if (!course) return null;

  const courseRefs = references.filter((r) => r.courseId === courseId);
  const courseTests = courseRefs.filter((r) => r.timeLimit !== undefined);
  const courseCheatsheets = courseRefs.filter((r) => r.timeLimit === undefined);

  const cp = progress[courseId];
  const metrics = getCourseMetrics(course, cp);

  return (
    <aside className="bg-bg-2 border-r border-border overflow-y-auto p-4" aria-label="Course day list">
      <div className="px-2 py-2 border-b border-border mb-3">
        <button
          type="button"
          onClick={goHome}
          className="text-body-sm text-ink-2 hover:text-ink transition-colors duration-fast mb-2 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2 rounded"
        >
          <span aria-hidden="true">←</span> All courses
        </button>
        <h2 className="text-base font-bold flex items-center gap-2">
          <Icon
            name={course.icon}
            size="md"
            weight="Filled"
            className="flex-shrink-0"
            style={{ color: course.color }}
            title={`${course.name} icon`}
          />
          <span>{course.name}</span>
        </h2>
        <p className="text-body-sm text-ink-2 mt-1">{course.subtitle}</p>
        <div className="flex gap-3 text-xs text-ink-2 mt-3">
          <span><b className="text-ink">{course.duration}</b> days</span>
          <span><b className="text-ink">{course.dailyMinutes}</b> min/day</span>
        </div>
        <div
          className="h-1.5 bg-panel-2 rounded-full overflow-hidden mt-3"
          role="progressbar"
          aria-valuenow={metrics.taskPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Course progress: ${metrics.taskPercent}%`}
        >
          <div
            className="h-full transition-[width] duration-slow ease-standard"
            style={{ width: `${metrics.taskPercent}%`, background: course.color }}
          />
        </div>
        <div className="text-body-sm text-ink-2 mt-1.5 flex justify-between">
          <span>{metrics.doneTasks} / {metrics.totalTasks} tasks</span>
          <span style={{ color: course.color }}>{metrics.taskPercent}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {(course.phases ?? []).map((phase, phaseIndex) => {
          const phaseDone = phase.days.filter((day) => Boolean(cp?.days?.[day.id])).length;
          return (
            <div key={`${phase.name}-${phaseIndex}`}>
              <div className="flex items-center justify-between px-2 mb-1.5">
                <div className="text-body-sm font-mono uppercase tracking-wider text-ink-3 font-bold">
                  {phase.name}
                </div>
                <span className="text-xs text-ink-3 tabular-nums">{phaseDone}/{phase.days.length}</span>
              </div>
              <div className="space-y-0.5">
                {phase.days.map((day) => {
                  const isDone = Boolean(cp?.days?.[day.id]);
                  const isActive = selectedDayId === day.id;
                  const dayTasks = day.tasks ?? [];
                  const dayDoneTasks = dayTasks.filter((task) => Boolean(cp?.tasks?.[task.id])).length;
                  return (
                    <button
                      type="button"
                      key={day.id}
                      onClick={() => selectDay(courseId, day.id)}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`Day ${day.number}: ${day.title}${isDone ? ' (completed)' : isActive ? ' (currently viewing)' : ''}`}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-left border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2',
                        'transition-colors duration-fast',
                        isActive
                          ? 'bg-panel border-border shadow-sm'
                          : 'border-transparent hover:bg-panel',
                        isDone && !isActive && 'hover:border-success/30'
                      )}
                    >
                      <div className={cn(
                        'day-item__dot w-2 h-2 rounded-full flex-shrink-0 transition-colors',
                        isDone && 'bg-success',
                        !isDone && isActive && 'bg-accent',
                        !isDone && !isActive && 'bg-border'
                      )} />
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            'text-body-md font-medium truncate',
                            isDone ? 'text-ink-2 line-through decoration-success/50' : 'text-ink'
                          )}
                        >
                          {day.title}
                        </div>
                        <div className="text-body-sm text-ink-2 mt-0.5 truncate">
                          {day.duration ?? course.dailyMinutes} min
                          {dayTasks.length > 0 && <> · {pluralize(dayTasks.length, 'task')}</>}
                        </div>
                      </div>
                      {dayTasks.length > 0 && !isDone && (
                        <span className="text-xs text-ink-3 tabular-nums flex-shrink-0">{dayDoneTasks}/{dayTasks.length}</span>
                      )}
                      <div
                        className={cn(
                          'w-4 h-4 rounded border-[1.5px] flex-shrink-0 grid place-items-center transition-colors duration-fast',
                          isDone ? 'bg-success border-success text-bg' : 'border-border'
                        )}
                        aria-hidden="true"
                      >
                        {isDone && <Icon name="check" size="xs" weight="Filled" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {courseCheatsheets.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-body-sm font-mono uppercase tracking-wider text-ink-3 font-bold px-2 mb-2">Cheat Sheet</div>
          <div className="space-y-0.5">
            {courseCheatsheets.map((ref) => (
              <button
                type="button"
                key={ref.id}
                onClick={() => openReference(ref.id)}
                className="group w-full text-left px-2.5 py-2 rounded-lg text-xs text-ink-2 hover:text-ink hover:bg-panel transition-colors duration-fast truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
              >
                <Icon name="clipboard" size="xs" className="inline-block align-text-bottom mr-1 transition-colors duration-fast group-hover:text-accent" />
                {ref.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {courseTests.length > 0 && (
        <button
          type="button"
          onClick={() => openReference(courseTests[0].id)}
          className="mt-3 w-full text-left px-3 py-2.5 rounded-lg border border-accent/40 bg-accent/10 text-sm font-medium text-accent hover:bg-accent/15 hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
        >
          <Icon name="checklist" size="xs" className="inline-block align-text-bottom mr-1.5" />
          {courseTests.length === 1 ? 'Test' : `Tests (${courseTests.length})`}
        </button>
      )}
    </aside>
  );
}