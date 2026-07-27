import { useStore } from '../store/useStore';
import type { Task } from '../types';
import { cn } from '../utils/helpers';
import { Icon } from './Icon';

interface TaskListProps {
  courseId: string;
  tasks: Task[];
}

const TAG_STYLES: Record<string, string> = {
  lab: 'bg-accent/15 text-accent',
  bonus: 'bg-purple/15 text-purple',
  mcq: 'bg-info/15 text-info',
  review: 'bg-green/15 text-green',
  drill: 'bg-pink/15 text-pink',
};

export function TaskList({ courseId, tasks }: TaskListProps) {
  const progress = useStore((state) => state.progress[courseId]);
  const toggleTask = useStore((state) => state.toggleTask);
  const doneCount = tasks.filter((task) => Boolean(progress?.tasks?.[task.id])).length;
  const allDone = tasks.length > 0 && doneCount === tasks.length;

  return (
    <>
      <div className="flex items-center gap-2 mb-2.5" aria-live="polite">
        <div
          className="flex-1 h-1.5 bg-bg-2 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tasks progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-success to-green transition-[width] duration-slow ease-standard"
            style={{ width: `${tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0}%` }}
          />
        </div>
        <span className="text-[11px] text-ink-2 tabular-nums">{doneCount}/{tasks.length}</span>
      </div>
      <p className={cn('text-xs mb-3', allDone ? 'text-success' : 'text-ink-3')}>
        {allDone
          ? 'All clear. Your future self just sent a high five.'
          : doneCount > 0
            ? `${tasks.length - doneCount} more to go — pleasantly bite-sized.`
            : 'Start with the smallest task. Momentum likes an easy entrance.'}
      </p>
      <ul className="space-y-2">
        {tasks.map((task) => {
          const done = Boolean(progress?.tasks?.[task.id]);
          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => toggleTask(courseId, task.id)}
                aria-pressed={done}
                aria-label={`${done ? 'Uncomplete' : 'Complete'} task: ${task.text}`}
                className={cn(
                  'w-full flex items-start gap-3 px-3.5 py-3 bg-panel-2 border border-border rounded-lg cursor-pointer text-left transition-colors duration-fast',
                  'hover:border-accent hover:bg-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                  done && 'opacity-60 border-success/30'
                )}
              >
                <span
                  className={cn(
                    'w-5 h-5 rounded border-2 flex-shrink-0 grid place-items-center mt-0.5 transition-colors duration-fast',
                    done
                      ? 'bg-success border-success text-bg task-check-pop'
                      : 'border-border'
                  )}
                  aria-hidden="true"
                >
                  {done && <Icon name="check" size="xs" weight="Filled" />}
                </span>
                <span className={cn('flex-1 leading-relaxed text-sm', done && 'line-through')}>
                  {task.text}
                </span>
                {task.tag && (
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold flex-shrink-0',
                      TAG_STYLES[task.tag] ?? 'bg-panel text-ink-2'
                    )}
                  >
                    {task.tag}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}