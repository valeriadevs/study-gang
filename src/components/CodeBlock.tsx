import { useEffect, useMemo, useRef, useState } from 'react';
import { highlight, langLabel } from '../utils/syntax';
import { cn } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { Icon } from './Icon';

interface CodeBlockProps {
  code: string;
  lang: string;
  title?: string;
  /** When true, the code block starts hidden and types character-by-character. */
  typewriter?: boolean;
}

const TYPEWRITER_SPEED_MS = 12;
const TYPEWRITER_MAX_MS = 1200;

export function CodeBlock({ code, lang, title, typewriter = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const recordInteraction = useStore((state) => state.recordInteraction);
  const html = useMemo(() => highlight(code, lang), [code, lang]);
  const lineCount = code.split('\n').length;

  const [revealedLength, setRevealedLength] = useState<number>(typewriter ? 0 : code.length);
  const [typewriterActive, setTypewriterActive] = useState<boolean>(typewriter);
  const typewriterTimerRef = useRef<number | null>(null);

  // Pick a tick speed that scales with code length so very long snippets don't
  // take minutes. Cap the total reveal time at TYPEWRITER_MAX_MS.
  useEffect(() => {
    if (!typewriterActive) return;
    setRevealedLength(0);
    const targetTime = Math.min(TYPEWRITER_MAX_MS, code.length * TYPEWRITER_SPEED_MS);
    const stepMs = Math.max(2, Math.round(targetTime / Math.max(1, code.length)));
    typewriterTimerRef.current = window.setInterval(() => {
      setRevealedLength((previous) => {
        if (previous >= code.length) {
          if (typewriterTimerRef.current !== null) {
            window.clearInterval(typewriterTimerRef.current);
            typewriterTimerRef.current = null;
          }
          return previous;
        }
        return previous + 1;
      });
    }, stepMs);
    return () => {
      if (typewriterTimerRef.current !== null) {
        window.clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
    };
  }, [typewriterActive, code]);

  // Reset state when the code prop changes.
  useEffect(() => {
    setRevealedLength(typewriter ? 0 : code.length);
    setTypewriterActive(typewriter);
    return () => {
      if (typewriterTimerRef.current !== null) {
        window.clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
    };
  }, [code, typewriter]);

  function startTypewriter() {
    setTypewriterActive(true);
  }

  function skipTypewriter() {
    if (typewriterTimerRef.current !== null) {
      window.clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
    setRevealedLength(code.length);
    setTypewriterActive(false);
  }

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const helper = document.createElement('textarea');
        helper.value = code;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
      setCopied(true);
      recordInteraction('codeCopies');
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  const visibleCode = typewriterActive ? code.slice(0, revealedLength) : code;
  const visibleHtml = useMemo(() => highlight(visibleCode, lang), [visibleCode, lang]);
  const caretVisible = typewriterActive && revealedLength < code.length;
  const caretPosition = visibleCode.length;

  return (
    <div className="bg-code border border-border rounded-lg overflow-hidden code-block group">
      <div className="flex justify-between items-center px-3.5 py-2 bg-panel-2 border-b border-border text-xs">
        <span className="font-mono text-accent-2 text-body-sm flex items-center gap-2 min-w-0">
          <Icon name="documentText" size="sm" className="text-ink-3" />
          <span className="truncate">{title ?? langLabel(lang)}</span>
          <span className="text-xs text-ink-3 font-normal hidden sm:inline">{lineCount} lines</span>
        </span>
        <div className="flex items-center gap-1.5">
          {typewriterActive ? (
            <button
              type="button"
              onClick={skipTypewriter}
              className="px-2.5 py-0.5 rounded text-xs border border-border text-ink-2 hover:text-ink hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Skip typewriter animation"
            >
              Skip
            </button>
          ) : (
            <button
              type="button"
              onClick={startTypewriter}
              className="px-2.5 py-0.5 rounded text-xs border border-border text-ink-2 hover:text-ink hover:border-accent inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Type the code out"
              title="Watch the code animate"
            >
              <Icon name="play" size="xs" className="text-accent" />
              Type it
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            className={cn(
              'px-2.5 py-0.5 rounded text-xs border transition-all flex-shrink-0 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              copied
                ? 'border-success text-success bg-success/10'
                : 'border-border text-ink-2 hover:text-ink hover:border-ink'
            )}
            aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          >
            {copied ? (
              <>
                <Icon name="check" size="xs" weight="Filled" />
                Snagged
              </>
            ) : (
              <>
                <Icon name="copy" size="xs" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={() => {
              try { navigator.clipboard.writeText(code); } catch {}
            }}
            className="px-2.5 py-0.5 rounded text-xs border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors ml-1"
          >
            type it
          </button>
        </div>
      </div>
      <pre className="m-0 px-4 py-3.5 overflow-x-auto font-mono text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: visibleHtml }} />
        {caretVisible && (
          <span
            className="inline-block w-2 h-4 align-middle ml-0.5 bg-accent animate-pulse"
            style={{ verticalAlign: 'text-bottom' }}
            aria-hidden="true"
          />
        )}
      </pre>
      {copied && (
        <div className="px-4 py-1.5 bg-success/5 border-t border-success/20 text-xs text-success fade-in" aria-live="polite">
          Code secured. Now make it yours.
        </div>
      )}
    </div>
  );
}

