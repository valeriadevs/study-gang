import { useStore } from '../store/useStore';
import { cn } from '../utils/helpers';
import { Icon } from './Icon';

export function CourseTabs() {
  const courses = useStore((s) => s.courses);
  const selectedCourseId = useStore((s) => s.selectedCourseId);
  const view = useStore((s) => s.view);
  const selectCourse = useStore((s) => s.selectCourse);

  if (courses.length === 0) return null;

  return (
    <nav className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1">
      {courses.map((course) => {
        const active =
          selectedCourseId === course.id && view === 'course';
        return (
          <button
            type="button"
            key={course.id}
            onClick={() => selectCourse(course.id)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'px-3.5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap',
              'border transition-all flex items-center gap-2',
              active
                ? 'bg-panel text-ink border-accent shadow-[0_0_0_1px_#f89820]'
                : 'border-border text-ink-2 hover:text-ink hover:border-ink'
            )}
          >
            <Icon
              name={course.icon}
              size="sm"
              weight={active ? 'Filled' : 'Outline'}
              className="transition-transform duration-fast"
              style={{ color: active ? course.color : 'currentColor' }}
              title={`${course.name} icon`}
            />
            <span>{course.name}</span>
          </button>
        );
      })}
    </nav>
  );
}