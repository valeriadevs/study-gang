import type { Course, Reference } from '../types';
import { java14Course } from './java/index';
import { dbms8Course } from './dbms/index';
import { sde8Course } from './sde/index';
import { javaAdvCourse } from './java-adv/index';
import { javaTests } from './tests/java-tests';
import { javaCheatsheet } from './tests/java-cheatsheet';
import { dbmsTests } from './tests/dbms-tests';
import { sdeTests } from './tests/sde-tests';
import { javaAdvTests } from './tests/java-adv-tests';

export const courses: Course[] = [
  java14Course,
  dbms8Course,
  sde8Course,
  javaAdvCourse,
];

export const references: Reference[] = [
  javaCheatsheet,
  ...javaTests,
  ...dbmsTests,
  ...sdeTests,
  ...javaAdvTests,
];

export function getDayById(courseId: string, dayId: string) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return undefined;
  for (const phase of course.phases ?? []) {
    const day = phase.days.find((d) => d.id === dayId);
    if (day) return { course, phase, day };
  }
  return undefined;
}
