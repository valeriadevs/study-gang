import type { Course, Reference } from '../types';
import { java14Course } from './java/index';
import { dbms8Course } from './dbms/index';
import { sde8Course } from './sde/index';
import { javaAdvCourse } from './java-adv/index';

export const courses: Course[] = [
  java14Course,
  dbms8Course,
  sde8Course,
  javaAdvCourse,
];

export const references: Reference[] = [];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getDayById(courseId: string, dayId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  for (const phase of course.phases ?? []) {
    const day = phase.days.find((d) => d.id === dayId);
    if (day) return { course, phase, day };
  }
  return undefined;
}

export function getReferenceById(id: string): Reference | undefined {
  return references.find((r) => r.id === id);
}
