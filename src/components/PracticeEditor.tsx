import { useState, useMemo, useRef } from 'react';
import { highlight, langLabel } from '../utils/syntax';
import { cn } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { Icon } from './Icon';

interface PracticeEditorProps {
  dayId: string;
  blockId: string;
  lang: string;
  starter: string;
  hint?: string;
  title?: string;
}

const STORAGE_KEY = 'practice-editor';

export function PracticeEditor({
  dayId,
  blockId,
  lang,
  starter,
  hint,
  title,
}: PracticeEditorProps) {
  const recordInteraction = useStore((state) => state.recordInteraction);
  const storageKey = `${STORAGE_KEY}:${dayId}:${blockId}`;
  const [code, setCode] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) ?? starter;
    } catch {
      return starter;
    }
  });
  const [output, setOutput] = useState<string>('');
  const [outputType, setOutputType] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const highlighted = useMemo(() => highlight(code, lang), [code, lang]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newVal = e.target.value;
    setCode(newVal);
    try {
      localStorage.setItem(storageKey, newVal);
    } catch {
      // ignore quota errors
    }
  }

  function handleReset() {
    setCode(starter);
    setOutput('');
    setOutputType('idle');
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }

  // Lightweight in-browser execution. Java/SQL are not actually executed —
  // we provide a friendly hint instead. JavaScript runs natively.
  function run() {
    recordInteraction('practiceRuns');
    if (lang === 'javascript') {
      try {
        const logs: string[] = [];
        const console = {
          log: (...args: unknown[]) => logs.push(args.map(formatVal).join(' ')),
          error: (...args: unknown[]) => logs.push('[ERROR] ' + args.map(formatVal).join(' ')),
          warn: (...args: unknown[]) => logs.push('[WARN] ' + args.map(formatVal).join(' ')),
        };
        // eslint-disable-next-line no-new-func
        const fn = new Function('console', code);
        fn(console);
        setOutput(logs.join('\n') || '✓ Code ran successfully (no output)');
        setOutputType('success');
      } catch (err) {
        setOutput(`Error: ${(err as Error).message}`);
        setOutputType('error');
      }
    } else if (lang === 'java') {
      setOutput(
        `Java execution requires a JDK.\n\n` +
          `Copy this code into IntelliJ IDEA / Eclipse / NetBeans,\n` +
          `or run from terminal:\n\n` +
          `  javac MyClass.java\n` +
          `  java MyClass\n\n` +
          `Edit your code above, then run it in your IDE.`
      );
      setOutputType('idle');
    } else if (lang === 'sql') {
      setOutput(
        `SQL execution requires a database server.\n\n` +
          `Run this in MySQL monitor or phpMyAdmin:\n\n` +
          `  mysql -u root -p < script.sql\n\n` +
          `Your practice is automatically saved.`
      );
      setOutputType('idle');
    } else if (lang === 'python') {
      setOutput(
        `Python execution requires a Python interpreter.\n\n` +
          `Run from terminal:\n\n` +
          `  python3 script.py\n\n` +
          `Your practice is automatically saved.`
      );
      setOutputType('idle');
    } else {
      setOutput('No execution available for this language.');
      setOutputType('idle');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  }

  return (
    <div className="bg-code border border-border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-3.5 py-2 bg-panel-2 border-b border-border text-xs">
        <span className="font-mono text-accent-2 text-body-sm flex items-center gap-2">
          <Icon name="play" size="sm" className="text-accent" />
          <span>{title ?? `Practice · ${langLabel(lang)}`}</span>
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-0.5 rounded text-xs border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={run}
            className="px-3 py-0.5 rounded text-xs bg-accent text-[#1a0f00] font-semibold hover:bg-accent-2 transition-colors inline-flex items-center gap-1"
            title="Run practice (Ctrl or Cmd + Enter)"
          >
            <Icon name="play" size="xs" weight="Filled" />
            Run it
          </button>
        </div>
      </div>

      {/* Editable code area with highlight overlay */}
      <div className="relative">
        <pre
          className="m-0 px-4 py-3.5 font-mono text-sm leading-relaxed pointer-events-none whitespace-pre-wrap break-all"
          aria-hidden
        >
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label={`${title ?? 'Practice'} code editor`}
          className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-accent font-mono text-sm leading-relaxed p-4 resize-none outline-none whitespace-pre-wrap break-all focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      {hint && (
        <div className="px-4 py-2.5 bg-panel-2 border-t border-border text-body-sm text-ink-2 flex items-start gap-2">
          <Icon name="bulb" size="sm" className="text-accent flex-shrink-0 mt-0.5" />
          <span className="text-ink">{hint}</span>
        </div>
      )}

      {output && (
        <div
          className={cn(
            'px-4 py-3 border-t border-border font-mono text-body-sm leading-relaxed max-h-[280px] overflow-y-auto',
            outputType === 'success' && 'text-success',
            outputType === 'error' && 'text-danger',
            outputType === 'idle' && 'text-ink-2'
          )}
        >
          <pre className="m-0 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}

function formatVal(v: unknown): string {
  if (typeof v === 'string') return v;
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}
