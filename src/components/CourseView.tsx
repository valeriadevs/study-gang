import { useStore } from '../store/useStore';
import { getDayById } from '../data/courses';
import { DayContent } from './DayContent';
import { EmptyState } from './EmptyState';

export function CourseView() {
  const courseId = useStore((s) => s.selectedCourseId);
  const dayId = useStore((s) => s.selectedDayId);
  const courses = useStore((s) => s.courses);
  const selectCourse = useStore((s) => s.selectCourse);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="p-8">
        <EmptyState
          icon="books"
          title="No course selected"
          description="Pick a course from the tabs above to start studying."
          action={{
            label: 'Go home',
            onClick: () => useStore.getState().goHome(),
          }}
        />
      </div>
    );
  }

  if (!dayId) {
    return (
      <div className="p-8">
        <EmptyState
          icon="calendarDays"
          title="No day selected"
          description={`${course.name} has no days yet. Add day content to get started.`}
          action={{
            label: 'Back to all courses',
            onClick: () => useStore.getState().goHome(),
          }}
        />
      </div>
    );
  }

  const result = getDayById(courseId!, dayId);
  if (!result) {
    return (
      <div className="p-8">
        <EmptyState
          icon="search"
          title="Day not found"
          description="That day doesn't exist in this course."
          action={{
            label: 'Back to course',
            onClick: () => selectCourse(courseId!),
          }}
        />
      </div>
    );
  }

  return <DayContent course={course} phase={result.phase} day={result.day} />;
}
