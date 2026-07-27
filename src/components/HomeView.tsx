import { useStore } from '../store/useStore';
import { CourseCard } from './CourseCard';
import { StatsBar } from './StatsBar';
import { EmptyState } from './EmptyState';
import { AchievementShelf } from './AchievementShelf';
import { Icon } from './Icon';
import { useKeyBuffer } from '../hooks/useKeyBuffer';
import { sideBurst, starburst } from '../utils/confetti';
import {
  getGlobalMetrics,
  getLevelInfo,
  calculateXp,
  getNextStudyTarget,
} from '../utils/progress';
import { layout } from '../styles/tokens';

const STUDY_TIPS = [
  'Explain one idea out loud before you move on. If it sounds fuzzy, your notes found the next thing to fix.',
  'A tiny example beats a perfect definition. Make the concept do something.',
  'When a bug appears, shrink the problem until it has nowhere left to hide.',
  'Your notes are a message to tomorrow-you. Leave them a useful breadcrumb.',
  'Mix recall with reading: close the page and name three things you remember.',
  'Progress does not need to be dramatic. One honest focused block counts.',
  'If a topic feels tangled, draw it. Boxes and arrows are underrated debugging tools.',
];

function getMoodGreeting(): { title: string; iconName: string } {
  const hour = new Date().getHours();
  if (hour < 5) return { title: 'Midnight mode', iconName: 'moodMidnight' };
  if (hour < 12) return { title: 'Morning grind', iconName: 'moodMorning' };
  if (hour < 17) return { title: 'Afternoon focus', iconName: 'moodAfternoon' };
  if (hour < 21) return { title: 'Evening quest', iconName: 'moodEvening' };
  return { title: 'Late-night lab', iconName: 'moodLateNight' };
}

function getBuddy(completionPercent: number): { iconName: string; label: string } {
  if (completionPercent >= 100) return { iconName: 'buddySage', label: 'Semester sage' };
  if (completionPercent >= 70) return { iconName: 'buddyLaunch', label: 'Launch sequence' };
  if (completionPercent >= 35) return { iconName: 'buddyCurious', label: 'Curious and cooking' };
  if (completionPercent > 0) return { iconName: 'buddyWarm', label: 'Warming up' };
  return { iconName: 'buddyIdle', label: 'Desk buddy on standby' };
}

function getBuddyMessage(
  buddyLabel: string,
  completionPercent: number,
  streak: number,
  hour: number
): string {
  if (completionPercent >= 100) {
    return 'Crossing the whole plan in one go is its own kind of super-power. Proud of you.';
  }
  if (streak >= 3) {
    return `Streak lit at ${streak} days. Momentum is the compound interest of studying.`;
  }
  if (completionPercent >= 50) {
    return 'The halfway mark is a real checkpoint. Future-you is already thanking you for it.';
  }
  if (hour < 5) return "Past midnight and still here. That's a different kind of dedication.";
  if (hour < 12) return 'Morning brain, fresh focus. The day is yours to claim.';
  if (completionPercent > 0) {
    return 'Small steps loud enough to wake up the rest of the day.';
  }
  return `Hi, I'm your ${buddyLabel.toLowerCase()}. Pick one small thing and we'll get it done.`;
}

export function HomeView() {
  const courses = useStore((state) => state.courses);
  const references = useStore((state) => state.references);
  const progress = useStore((state) => state.progress);
  const selectCourse = useStore((state) => state.selectCourse);
  const selectDay = useStore((state) => state.selectDay);
  const openReference = useStore((state) => state.openReference);
  const celebrateNoReason = useStore((state) => state.celebrateNoReason);
  const celebrateEasterEgg = useStore((state) => state.celebrateEasterEgg);

  const metrics = getGlobalMetrics(courses, progress);
  const level = getLevelInfo(calculateXp(metrics));
  const target = getNextStudyTarget(courses, progress);
  const greeting = getMoodGreeting();
  const tip = STUDY_TIPS[(new Date().getDate() + new Date().getMonth()) % STUDY_TIPS.length];
  const completionPercent = metrics.totalTasks > 0
    ? Math.round((metrics.doneTasks / metrics.totalTasks) * 100)
    : 0;
  const buddy = getBuddy(completionPercent);
  const hour = new Date().getHours();
  const buddyMessage = getBuddyMessage(buddy.label, completionPercent, metrics.currentStreak, hour);

  // Easter egg: typing "gang" anywhere on the home screen fires a small celebration.
  useKeyBuffer(['gang'], () => {
    celebrateEasterEgg();
    void starburst(3);
  });

  function handleCelebrate() {
    celebrateNoReason();
    void sideBurst();
  }

  if (courses.length === 0) {
    return (
      <div className="p-8">
        <div
          className="border border-border rounded-xl p-8 mb-6"
          style={{ background: 'linear-gradient(to bottom right, rgba(248,152,32,0.15), rgba(237,28,36,0.05))' }}
        >
          <h1 className="text-h1 font-display mb-2">
            Welcome to Study Gang
          </h1>
          <p className="text-body-lg text-ink-2 max-w-2xl">
            Your unified study hub. Pick a course below to dive into a day-by-day
            plan, track tasks, take notes, and run code — all without leaving
            this app.
          </p>
        </div>
        <EmptyState
          icon="book"
          title="No courses yet"
          description="Add study plans to src/data/courses.ts to populate this dashboard. The framework is ready — supports day-by-day content, code examples, tasks, notes, and progress tracking."
        />
      </div>
    );
  }

  return (
    <div
      className="p-8 mx-auto fade-in"
      style={{ maxWidth: layout.contentMaxWidth }}
    >
      <section
        className="home-hero surface p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, rgba(248,152,32,0.15), #161a23 40%, rgba(237,28,36,0.05))' }}
        aria-labelledby="home-hero-title"
      >
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-7 justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-[0.16em] text-accent mb-3">
              <Icon name={greeting.iconName} size="sm" weight="Filled" />
              <span>{greeting.title}</span>
            </div>
            <h1
              id="home-hero-title"
              className="text-h1 font-display mb-2"
            >
              Welcome back, Vinay
            </h1>
            <p className="text-body-lg text-ink-2 max-w-2xl leading-relaxed">
              {metrics.doneTasks === 0
                ? 'Your study desk is ready. Pick a course, take one small step, and let momentum do the introducing.'
                : metrics.completedCourses === metrics.totalCourses
                  ? 'The whole semester is glowing. You built this one focused session at a time.'
                  : `You have ${metrics.doneTasks} task${metrics.doneTasks === 1 ? '' : 's'} in the bag. Keep the next win pleasantly small.`}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-5">
              {target ? (
                <button
                  type="button"
                  onClick={() => selectDay(target.course.id, target.day.id)}
                  className="btn btn-primary btn-whimsy"
                >
                  Continue: Day {target.day.number}
                  <Icon name="arrowRight" size="sm" className="ml-0.5" weight="Filled" />
                </button>
              ) : (
                <span className="chip border-success/40 text-success">
                  <Icon name="confetti" size="sm" />
                  All course plans complete
                </span>
              )}
              <span className="chip font-mono">
                <Icon name="trophy" size="sm" className="text-accent" />
                Level {level.level} · {level.currentXp} XP
              </span>
              <button
                type="button"
                onClick={handleCelebrate}
                className="btn btn-ghost btn-whimsy"
                title="Trigger a celebration for no reason"
                aria-label="Trigger a celebration"
              >
                <Icon name="confetti" size="sm" className="text-accent" />
                Celebrate
              </button>
            </div>
          </div>

          <div
            className="buddy-card flex flex-col gap-3 self-start lg:self-center max-w-xs"
            role="group"
            aria-label={`${buddy.label}. ${completionPercent}% of tasks complete.`}
          >
            <div className="flex items-center gap-3">
              <div className="buddy-face" aria-hidden="true">
                <Icon name={buddy.iconName} size="xl" weight="Filled" className="text-accent-2" />
              </div>
              <div>
                <div className="text-body-md font-bold text-ink">{buddy.label}</div>
                <div className="text-body-sm text-ink-2 mt-0.5">{completionPercent}% of task trail explored</div>
                <div
                  className="w-40 h-1.5 bg-bg-2 rounded-full overflow-hidden mt-2"
                  role="progressbar"
                  aria-valuenow={completionPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Task trail progress"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-page ease-standard"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="relative pl-3 pr-2 py-2 rounded-lg bg-white/[0.04] border border-white/10">
              <span
                className="absolute -left-1.5 top-3 w-3 h-3 rotate-45 bg-white/[0.04] border-l border-b border-white/10"
                aria-hidden="true"
              />
              <p className="text-body-sm text-ink-2 leading-snug italic">
                &ldquo;{buddyMessage}&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 pt-4 border-t border-white/10 flex items-start gap-2.5">
          <span className="text-lg text-accent animate-pulse-slow" aria-hidden="true">
            <Icon name="bulb" size="md" weight="Filled" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-wider text-accent font-bold flex items-center gap-2">
              <span>Today&rsquo;s tiny nudge</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" aria-hidden="true" />
            </div>
            <p className="text-body-sm text-ink-2 leading-relaxed mt-0.5 max-w-3xl">{tip}</p>
          </div>
        </div>
      </section>

      <StatsBar
        totalTasks={metrics.totalTasks}
        doneTasks={metrics.doneTasks}
        totalMinutes={metrics.totalMinutes}
        daysCompleted={metrics.doneDays}
        streak={metrics.currentStreak}
        xp={level.currentXp}
        level={level.level}
      />

      <h2 className="text-lg font-bold mb-3 mt-7">Choose your next mission</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 mb-8">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => selectCourse(course.id)}
          />
        ))}
      </div>

      <AchievementShelf />

      {references.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Icon name="clipboard" size="sm" className="text-accent" />
            Quick Reference
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
            {references.map((reference) => (
              <button
                key={reference.id}
                type="button"
                onClick={() => openReference(reference.id)}
                className="surface p-4 text-left hover:border-accent hover:-translate-y-0.5 hover:shadow-panel transition-all duration-normal ease-standard group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <div className="w-9 h-9 mb-3 rounded-lg grid place-items-center bg-accent/10 text-accent" aria-hidden="true">
                  <Icon name="clipboard" size="md" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold mb-1">{reference.title}</h3>
                  <span className="text-ink-3 group-hover:text-accent transition-colors duration-fast" aria-hidden="true">
                    <Icon name="arrowRight" size="sm" />
                  </span>
                </div>
                <p className="text-xs text-ink-2">{reference.description ?? reference.category}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
