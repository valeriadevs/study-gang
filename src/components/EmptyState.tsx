import { Icon } from './Icon';

interface EmptyStateProps {
  /** Either a reicon camelCase name or a single emoji glyph. */
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-5 text-ink-2 empty-state">
      <div className="mx-auto mb-4 w-16 h-16 grid place-items-center rounded-2xl border border-border bg-panel/60 text-accent opacity-80 transition-all duration-normal ease-standard">
        <Icon name={icon} size="xl" weight="Outline" />
      </div>
      <h3 className="text-h3 font-display text-ink mb-2">{title}</h3>
      <p className="text-body-md max-w-md mx-auto mb-6 leading-relaxed">{description}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="btn btn-primary btn-whimsy"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
