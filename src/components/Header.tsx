import { Timer } from './Timer';
import { CourseTabs } from './CourseTabs';
import { Icon } from './Icon';
import { useStore } from '../store/useStore';
import { cn } from '../utils/helpers';

export function Header() {
  const openSettings = useStore((s) => s.openSettings);
  const goHome = useStore((s) => s.goHome);
  const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const chatOpen = useStore((s) => s.chatOpen);
  const setChatOpen = useStore((s) => s.setChatOpen);

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
      </button>

      <button
        type="button"
        onClick={toggleSidebar}
        className="w-9 h-9 grid place-items-center rounded-lg border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2 flex-shrink-0"
        title={sidebarCollapsed ? 'Show day navigation' : 'Hide day navigation'}
        aria-label={sidebarCollapsed ? 'Show day navigation' : 'Hide day navigation'}
        aria-pressed={!sidebarCollapsed}
      >
        <Icon name="menu" size="md" />
      </button>

      <CourseTabs />

      <div className="flex items-center gap-2.5 ml-auto">
        <Timer />
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className={cn(
            'w-9 h-9 grid place-items-center rounded-lg transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2',
            chatOpen
              ? 'bg-accent text-[#1a0f00] shadow-glow'
              : 'border border-border text-ink-2 hover:text-ink hover:border-ink'
          )}
          title={chatOpen ? 'Close AI assistant' : 'Ask the AI assistant'}
          aria-label={chatOpen ? 'Close AI assistant' : 'Ask the AI assistant'}
          aria-expanded={chatOpen}
        >
          <Icon name="messageDots" size="md" weight={chatOpen ? 'Filled' : 'Outline'} />
        </button>
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