import { Timer } from './Timer';
import { CourseTabs } from './CourseTabs';
import { Icon, ICON_SET_VERSION } from './Icon';
import { useStore } from '../store/useStore';

export function Header() {
  const openSettings = useStore((s) => s.openSettings);
  const goHome = useStore((s) => s.goHome);

  return (
    <header className="bg-bg-2 border-b border-border flex items-center px-4 gap-4 relative z-10">
      <button
        type="button"
        onClick={goHome}
        className="flex items-center gap-2.5 font-display text-h3 tracking-tight hover:opacity-80 transition-opacity duration-fast group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2 rounded-md"
      >
        <span
          className="w-8 h-8 rounded-lg grid place-items-center text-accent shadow-glow group-hover:rotate-[-4deg] transition-transform duration-normal ease-spring"
          style={{ background: 'linear-gradient(to bottom right, #f89820, #ed1c24)' }}
          aria-hidden="true"
        >
          <Icon name="books" size="md" weight="Filled" className="text-[#1a0f00]" />
        </span>
        <span>Study Gang</span>
        <span
          className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider text-ink-3 border border-border bg-bg/40"
          aria-label={`Icon system ${ICON_SET_VERSION}`}
          title="Reicon-react icon system"
        >
          <Icon name="sparkle" size="xs" className="text-accent" />
          <span>{ICON_SET_VERSION}</span>
        </span>
      </button>

      <CourseTabs />

      <div className="flex items-center gap-2.5 ml-auto">
        <Timer />
        <button
          type="button"
          onClick={openSettings}
          className="w-9 h-9 grid place-items-center rounded-lg border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
          title="Settings"
          aria-label="Open settings"
        >
          <Icon name="settings" size="md" className="transition-transform duration-fast hover:rotate-45" />
        </button>
      </div>
    </header>
  );
}