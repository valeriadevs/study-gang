import { useStore } from '../store/useStore';
import { ContentRenderer } from './ContentRenderer';
import { EmptyState } from './EmptyState';
import { TestView } from './TestView';
import { layout } from '../styles/tokens';

export function ReferenceView() {
  const referenceId = useStore((s) => s.referenceId);
  const references = useStore((s) => s.references);
  const openReference = useStore((s) => s.openReference);
  const goHome = useStore((s) => s.goHome);

  if (references.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          icon="clipboard"
          title="No references yet"
          description="Add reference cards to src/data/courses.ts (e.g., JUnit cheat sheet, SQL operators, OOP comparison tables)."
        />
      </div>
    );
  }

  // Group by category
  const byCategory = references.reduce<Record<string, typeof references>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  // If a specific reference is open, show it; else show landing
  if (referenceId) {
    const ref = references.find((r) => r.id === referenceId);
    if (!ref) {
      return (
        <div className="p-8">
          <EmptyState
            icon="search"
            title="Reference not found"
            description="That reference doesn't exist."
          />
        </div>
      );
    }
    // Route tests to TestView
    if (ref.blocks && ref.blocks.length > 0 && ref.timeLimit !== undefined) {
      return <TestView reference={ref} />;
    }

    return (
      <div
        className="p-8 mx-auto fade-in"
        style={{ maxWidth: layout.readingMaxWidth }}
      >
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-ink-2 mb-2 flex items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => openReference('')}
            className="hover:text-ink transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Reference
          </button>
          <span aria-hidden="true">›</span>
          <span className="text-accent">{ref.title}</span>
        </nav>
        <h1 className="text-[32px] font-extrabold tracking-tight mb-2">
          {ref.title}
        </h1>
        {ref.description && (
          <p className="text-ink-2 text-base mb-5">{ref.description}</p>
        )}

        {ref.blocks && ref.blocks.length > 0 ? (
          <div className="space-y-4">
            {ref.blocks.map((block, idx) => (
              <ContentRenderer key={block.id ?? idx} block={block} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="notepad"
            title="No content yet"
            description="Add blocks to this reference in src/data/courses.ts."
          />
        )}
      </div>
    );
  }

  // Reference landing
  return (
    <div
      className="p-8 mx-auto"
      style={{ maxWidth: layout.contentMaxWidth }}
    >
      <button
        type="button"
        onClick={goHome}
        className="text-xs text-ink-2 hover:text-ink transition-colors duration-fast mb-2 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        <span aria-hidden="true">←</span> Home
      </button>
      <h1 className="text-[32px] font-extrabold tracking-tight mb-2">
        Quick Reference
      </h1>
      <p className="text-ink-2 text-base mb-6">
        Cheat sheets, lookup tables, and timed exam tests.
      </p>

      {Object.entries(byCategory).map(([category, refs]) => (
        <div key={category} className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-3 mb-2">
            {category}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
            {refs.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => openReference(r.id)}
                className="surface p-4 text-left hover:border-accent hover:-translate-y-0.5 transition-all duration-normal ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <h3 className="text-sm font-bold mb-1">{r.title}</h3>
                {r.description && (
                  <p className="text-xs text-ink-2">{r.description}</p>
                )}
                {r.timeLimit !== undefined && (
                  <div className="flex items-center gap-3 mt-2 text-xs text-ink-3">
                    <span>⏱ {r.timeLimit} min</span>
                    <span>✓ {r.passingScore}% pass</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}