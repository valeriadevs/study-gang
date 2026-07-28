import { useStore } from '../store/useStore';
import { DayList } from './DayList';
import { Icon } from './Icon';

export function Sidebar() {
  const view = useStore((s) => s.view);
  const selectedCourseId = useStore((s) => s.selectedCourseId);
  const references = useStore((s) => s.references);
  const openReference = useStore((s) => s.openReference);
  const openTests = useStore((s) => s.openTests);
  const goHome = useStore((s) => s.goHome);

  if (view === 'reference') {
    return (
      <aside className="bg-bg-2 border-r border-border overflow-y-auto p-4">
        <div className="px-2 py-2 border-b border-border mb-3">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Icon name="clipboard" size="sm" className="text-accent" />
            <span>Quick Reference</span>
          </h2>
          <p className="text-xs text-ink-2 mt-1">Cheat sheets &amp; lookup tables</p>
        </div>
        <div className="space-y-1">
          {references.length === 0 ? (
            <p className="text-xs text-ink-3 px-3 py-4">No references yet.</p>
          ) : (
            references.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => openReference(r.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-panel transition-colors duration-fast text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
              >
                {r.title}
              </button>
            ))
          )}
        </div>
        <button
          type="button"
          onClick={openTests}
          className="w-full mt-3 text-left px-3 py-2.5 rounded-lg border border-accent/40 bg-accent/10 text-sm font-medium text-accent hover:bg-accent/15 hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
        >
          <Icon name="checklist" size="xs" className="inline-block align-text-bottom mr-1.5" />
          All Tests
        </button>
        <button
          type="button"
          onClick={goHome}
          className="w-full mt-2 text-left px-3 py-2.5 rounded-lg border border-border bg-panel text-sm font-medium hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
        >
          <span aria-hidden="true">←</span> Back to home
        </button>
      </aside>
    );
  }

  if (view === 'tests') {
    return (
      <aside className="bg-bg-2 border-r border-border overflow-y-auto p-4">
        <div className="px-2 py-2 border-b border-border mb-3">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Icon name="checklist" size="sm" className="text-accent" />
            <span>All Tests</span>
          </h2>
          <p className="text-xs text-ink-2 mt-1">Every timed test in one place</p>
        </div>
        <button
          type="button"
          onClick={goHome}
          className="w-full text-left px-3 py-2.5 rounded-lg border border-border bg-panel text-sm font-medium hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
        >
          <span aria-hidden="true">←</span> Back to home
        </button>
      </aside>
    );
  }

  if (view === 'course' && selectedCourseId) {
    return <DayList courseId={selectedCourseId} />;
  }

  // Home view sidebar - just shows a hint + quick links
  return (
    <aside className="bg-bg-2 border-r border-border overflow-y-auto p-4">
      <div className="px-2 py-2">
        <h2 className="text-base font-bold mb-1 flex items-center gap-2">
          <Icon name="home" size="sm" className="text-accent" />
          <span>Welcome</span>
        </h2>
        <p className="text-xs text-ink-2">Pick a course to begin studying.</p>
      </div>
      <button
        type="button"
        onClick={openTests}
        className="mt-4 w-full text-left px-3 py-2.5 rounded-lg border border-accent/40 bg-accent/10 text-sm font-medium text-accent hover:bg-accent/15 hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-2"
      >
        <Icon name="checklist" size="xs" className="inline-block align-text-bottom mr-1.5" />
        All Tests
      </button>
    </aside>
  );
}