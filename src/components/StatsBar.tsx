import { Icon } from './Icon';

interface StatsBarProps {
  totalTasks: number;
  doneTasks: number;
  totalMinutes: number;
  daysCompleted: number;
  streak: number;
  xp: number;
  level: number;
}

export function StatsBar({
  totalTasks,
  doneTasks,
  totalMinutes,
  daysCompleted,
  streak,
  xp,
  level,
}: StatsBarProps) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 mb-2">
      <StatCard
        icon="checkSquare"
        label="Tasks Done"
        value={`${doneTasks}`}
        subtitle={`of ${totalTasks}`}
      />
      <StatCard
        icon="calendarDays"
        label="Days Completed"
        value={`${daysCompleted}`}
        subtitle="study days"
      />
      <StatCard
        icon="timer"
        label="Time Studied"
        value={`${hours}h ${mins}m`}
        subtitle="total focus"
      />
      <StatCard
        icon="fireStreak"
        label="Streak"
        value={`${streak}`}
        subtitle={streak === 0 ? 'start today' : streak === 1 ? 'day alive' : 'days alive'}
        highlight={streak > 0}
      />
      <StatCard
        icon="star"
        label="Study XP"
        value={`${xp}`}
        subtitle={`level ${level}`}
        highlight
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtitle,
  highlight = false,
}: {
  icon: string;
  label: string;
  value: string;
  subtitle?: string;
  highlight?: boolean;
}) {
  return (
    <div className="surface p-4 hover:border-accent/50 transition-colors duration-fast group">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink-3 font-bold mb-1.5">
        <Icon
          name={icon}
          size="sm"
          className="text-ink-2 transition-colors duration-fast group-hover:text-accent"
        />
        <span>{label}</span>
      </div>
      <div className={highlight ? 'text-2xl font-bold text-accent' : 'text-2xl font-bold text-ink'}>
        {value}
        {subtitle && (
          <small className="text-xs text-ink-2 font-medium ml-2">{subtitle}</small>
        )}
      </div>
    </div>
  );
}
