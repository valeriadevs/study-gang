import { useStore } from '../store/useStore';
import type { Course } from '../types';
import { getCourseMetrics } from '../utils/progress';
import { Icon } from './Icon';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const progress = useStore((state) => state.progress[course.id]);
  const metrics = getCourseMetrics(course, progress);
  const status = metrics.complete
    ? 'Course conquered — lovely work.'
    : metrics.doneTasks === 0
      ? 'Ready when you are.'
      : `${metrics.totalTasks - metrics.doneTasks} task${metrics.totalTasks - metrics.doneTasks === 1 ? '' : 's'} waiting in the wings.`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${course.name}. ${metrics.taskPercent}% complete.`}
      className="course-card surface p-5 text-left hover:border-accent hover:-translate-y-0.5 hover:shadow-panel transition-all duration-normal ease-standard relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-normal ease-standard group-hover:h-1"
        style={{ background: course.color }}
      />
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl grid place-items-center course-icon"
          style={{ background: `${course.color}1f`, color: course.color }}
          aria-hidden="true"
        >
          <Icon name={course.icon} size="lg" weight="Filled" />
        </div>
        <span className="text-ink-3 group-hover:text-accent transition-all duration-fast text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
      </div>
      <h3 className="text-base font-bold mb-1">{course.name}</h3>
      <p className="text-xs text-ink-2 mb-3 line-clamp-2">{course.subtitle}</p>
      <div className="flex gap-3 text-[11px] text-ink-2 mb-3">
        <span>
          <b className="text-ink font-semibold">{course.duration}</b> days
        </span>
        <span>
          <b className="text-ink font-semibold">{course.dailyMinutes}</b> min/day
        </span>
      </div>
      <div
        className="h-1.5 bg-panel-2 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={metrics.taskPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${course.name} progress`}
      >
        <div
          className="h-full transition-[width] duration-slow ease-standard"
          style={{ width: `${metrics.taskPercent}%`, background: course.color }}
        />
      </div>
      <div className="text-[11px] text-ink-2 mt-1.5 flex justify-between gap-2">
        <span>
          {metrics.doneDays} / {metrics.totalDays} days · {metrics.doneTasks} / {metrics.totalTasks} tasks
        </span>
        <span className="font-semibold" style={{ color: course.color }}>{metrics.taskPercent}%</span>
      </div>
      <p className="text-[11px] text-ink-3 mt-2 truncate group-hover:text-ink-2 transition-colors duration-fast">{status}</p>
    </button>
  );
}