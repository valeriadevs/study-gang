import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { highlight, langLabel } from '../utils/syntax';
import { getSuggestions } from '../utils/suggestions';
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

/** Insert `str` into `code` at `start`, returning the new code and cursor position. */
function insertAt(code: string, start: number, str: string): { code: string; cursor: number } {
  const next = code.slice(0, start) + str + code.slice(start);
  return { code: next, cursor: start + str.length };
}

/** Match a closing bracket against the previous non-whitespace char. */
function isClosingPair(code: string, caret: number, open: string, close: string): boolean {
  let i = caret - 1;
  while (i >= 0 && /\s/.test(code[i])) i -= 1;
  return code[i] === open;
}

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
  // Autocomplete: whether the dropdown is open + the index of the highlighted item.
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestIndex, setSuggestIndex] = useState(0);
  // Caret position (relative to the editor wrapper) for the dropdown.
  const [caretPos, setCaretPos] = useState<{ top: number; left: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  // Live mirror of `suggestOpen` so keydown handlers can read the true
  // open state without depending on React's render timing.
  const suggestOpenRef = useRef(false);
  // Last prefix the dropdown filtered on — only reset the highlight when
  // this changes, not on every keystroke.
  const lastSuggestPrefixRef = useRef<string | null>(null);
  const selectionStartRef = useRef<number | null>(null);

  const lineCount = code.split('\n').length;
  const lineNumbers = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => i + 1),
    [lineCount]
  );

  const highlighted = useMemo(() => highlight(code, lang), [code, lang]);

  // Live word at the caret — always current, unlike state.
  const liveWord = textareaRef.current
    ? currentWord(code, textareaRef.current.selectionStart)
    : null;

  const suggestions = useMemo(
    () => (suggestOpen && liveWord !== null ? getSuggestions(code, lang, liveWord) : []),
    [code, lang, suggestOpen, liveWord]
  );

  // Keep the live ref in sync with the open state (for keydown handlers).
  useEffect(() => {
    suggestOpenRef.current = suggestOpen;
  }, [suggestOpen]);

  function updateCode(next: string) {
    setCode(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // ignore quota errors
    }
  }

  // Keep the line-number gutter and the highlight overlay in sync with
  // the textarea scroll, so the visible text and the caret never drift.
  const syncGutter = useCallback(() => {
    const ta = textareaRef.current;
    const gutter = gutterRef.current;
    const pre = preRef.current;
    if (ta && gutter) {
      gutter.scrollTop = ta.scrollTop;
    }
    if (ta && pre) {
      pre.scrollTop = ta.scrollTop;
      pre.scrollLeft = ta.scrollLeft;
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    selectionStartRef.current = e.target.selectionStart;
    updateCode(e.target.value);
    // Re-measure the caret AFTER the keystroke lands, so the dropdown
    // tracks the actual caret instead of lagging one char behind.
    const ta = textareaRef.current;
    if (ta) setCaretPos(measureCaret(ta, e.target.value));
  }

  /** Word immediately before the caret (or null if caret is not inside a word). */
  function currentWord(code: string, pos: number): string | null {
    let i = pos - 1;
    while (i >= 0 && /[A-Za-z0-9_.]/.test(code[i])) i -= 1;
    const word = code.slice(i + 1, pos);
    // Only suggest after a word char or a dot (e.g. "Sys", "System.").
    return word && /[A-Za-z0-9_.]/.test(word) ? word : null;
  }

  /** Measure the caret's pixel position inside the editor, using a hidden mirror. */
  function measureCaret(ta: HTMLTextAreaElement, value: string): { top: number; left: number } | null {
    const wrapper = ta.parentElement;
    if (!wrapper) return null;
    const pos = ta.selectionStart;
    const mirror = document.createElement('div');
    const style = window.getComputedStyle(ta);
    mirror.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      visibility: hidden;
      white-space: pre-wrap;
      word-break: break-all;
      font-family: ${style.fontFamily};
      font-size: ${style.fontSize};
      line-height: ${style.lineHeight};
      letter-spacing: ${style.letterSpacing};
      padding: ${style.padding};
      width: ${ta.clientWidth}px;
    `;
    // Text before the caret, with a marker at the end.
    mirror.textContent = value.slice(0, pos);
    const marker = document.createElement('span');
    marker.textContent = '\u200b'; // zero-width space
    mirror.appendChild(marker);
    wrapper.appendChild(mirror);
    const markerRect = marker.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const top = markerRect.top - wrapperRect.top + 2;
    const left = markerRect.left - wrapperRect.left;
    wrapper.removeChild(mirror);
    return { top, left };
  }

  function acceptSuggestion(label: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    // Read the LIVE DOM value + caret — never the (stale) `code` closure.
    const start = ta.selectionStart;
    const live = ta.value;
    // Measure the word at the caret directly from the live text.
    let i = start - 1;
    while (i >= 0 && /[A-Za-z0-9_.]/.test(live[i])) i -= 1;
    const prefixLen = start - (i + 1);
    const next = live.slice(0, start - prefixLen) + label + live.slice(start);
    updateCode(next);
    const cursor = start - prefixLen + label.length;
    requestAnimationFrame(() => {
      ta.selectionStart = cursor;
      ta.selectionEnd = cursor;
    });
    setSuggestOpen(false);
    setSuggestIndex(0);
    setCaretPos(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const ta = e.currentTarget;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    // Read the LIVE value — `code` closure is one render behind.
    const live = ta.value;

    // Ctrl/Cmd + Enter runs the code.
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
      return;
    }

    // --- Autocomplete handling (always reads live DOM, never stale state) ---
    const liveWord = currentWord(live, start);
    const wasOpen = suggestOpenRef.current;

    // Open when typing a word char (letter/digit/dot) — NOT on arrow keys,
    // so arrows only ever navigate an already-open dropdown.
    const isTypingChar = !e.ctrlKey && !e.metaKey && !e.altKey &&
      !e.shiftKey && liveWord &&
      (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete');
    if (isTypingChar) {
      setSuggestOpen(true);
      // Reset the highlight ONLY when the prefix changed — not on every
      // keystroke — so arrow navigation isn't undone mid-stream.
      if (lastSuggestPrefixRef.current !== liveWord) {
        setSuggestIndex(0);
        lastSuggestPrefixRef.current = liveWord;
      }
    } else if (liveWord) {
      lastSuggestPrefixRef.current = liveWord;
    }

    // Escape closes the dropdown.
    if (e.key === 'Escape') {
      setSuggestOpen(false);
      setSuggestIndex(0);
      setCaretPos(null);
      lastSuggestPrefixRef.current = null;
    }

    // Compute the live filtered list for THIS keystroke, so Tab/Enter/arrows
    // work even on the keypress that just opened the dropdown.
    const liveSuggestions = liveWord
      ? getSuggestions(live, lang, liveWord)
      : [];

    if (liveSuggestions.length > 0 && (wasOpen || e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      // Clamp the highlight to the live list (it may have shrunk).
      const idx = Math.min(suggestIndex, liveSuggestions.length - 1);
      // Tab accepts the highlighted suggestion.
      if (e.key === 'Tab') {
        e.preventDefault();
        acceptSuggestion(liveSuggestions[idx].label);
        return;
      }
      // Enter accepts when the dropdown is open.
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        acceptSuggestion(liveSuggestions[idx].label);
        return;
      }
      // ArrowUp / ArrowDown navigate the list.
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSuggestIndex((i) => (i + 1) % liveSuggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSuggestIndex((i) => (i - 1 + liveSuggestions.length) % liveSuggestions.length);
        return;
      }
    }

    // Close suggestions when the caret moves off a word (e.g. a space or newline).
    if (!liveWord && suggestOpenRef.current) {
      setSuggestOpen(false);
      setSuggestIndex(0);
      setCaretPos(null);
      lastSuggestPrefixRef.current = null;
    }

    // Tab / Shift+Tab: insert or remove an indentation level.
    if (e.key === 'Tab') {
      e.preventDefault();
      const selStart = ta.selectionStart;
      const selEnd = ta.selectionEnd;
      let next: string;
      let cursor: number;

      if (e.shiftKey) {
        // Remove up to 2 leading spaces from the current line.
        const lineStart = code.lastIndexOf('\n', selStart - 1) + 1;
        const before = code.slice(lineStart, selStart);
        const remove = before.startsWith('  ')
          ? 2
          : before.startsWith(' ') ? 1 : 0;
        next = code.slice(0, lineStart) + before.slice(remove) + code.slice(selStart);
        cursor = selStart - remove;
      } else {
        next = code.slice(0, selStart) + '  ' + code.slice(selEnd);
        cursor = selStart + 2;
      }

      updateCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = cursor;
        ta.selectionEnd = cursor;
      });
      return;
    }

    // Enter: auto-indent the new line to match the current line's leading whitespace.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const lineEnd = code.indexOf('\n', start);
      const line = code.slice(lineStart, lineEnd === -1 ? code.length : lineEnd);
      const indent = line.match(/^[\t ]*/)?.[0] ?? '';
      const { code: next, cursor } = insertAt(code, start, '\n' + indent);
      updateCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = cursor;
        ta.selectionEnd = cursor;
      });
      return;
    }

    // Smart bracket closing: typing an opening bracket inserts the matching close.
    const openers: Record<string, string> = {
      '(': ')', '[': ']', '{': '}',
    };
    if (openers[e.key]) {
      e.preventDefault();
      const close = openers[e.key];
      const { code: next, cursor } = insertAt(code, start, e.key + close);
      updateCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = cursor - 1;
        ta.selectionEnd = cursor - 1;
      });
      return;
    }

    // Smart delete: backspace on an empty bracket pair removes both.
    const pairs: Record<string, string> = {
      ')': '(', ']': '[', '}': '{',
    };
    if (e.key === 'Backspace' && start === end && start > 0) {
      const close = code[start];
      const open = pairs[close];
      if (open && code[start - 1] === open) {
        e.preventDefault();
        const next = code.slice(0, start - 1) + code.slice(start + 1);
        updateCode(next);
        requestAnimationFrame(() => {
          ta.selectionStart = start - 1;
          ta.selectionEnd = start - 1;
        });
        return;
      }
    }

    // Auto-skip: typing a closing bracket when one already exists just moves the caret.
    if ([')', ']', '}'].includes(e.key) && start === end) {
      if (code[start] === e.key) {
        e.preventDefault();
        ta.selectionStart = start + 1;
        ta.selectionEnd = start + 1;
        return;
      }
    }

    // Typing a quote over an existing quote auto-skips it.
    if ((e.key === '"' || e.key === "'" || e.key === '`') && start === end) {
      if (code[start] === e.key) {
        e.preventDefault();
        ta.selectionStart = start + 1;
        ta.selectionEnd = start + 1;
        return;
      }
    }

    selectionStartRef.current = start;
  }

  function handleReset() {
    updateCode(starter);
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

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setOutput('📋 Code copied to clipboard!\n\nPaste it into your IDE or online compiler.');
      setOutputType('success');
    }).catch(() => {
      setOutput('⚠️ Could not copy. Select all text (Ctrl+A) and copy manually.');
      setOutputType('error');
    });
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
            onClick={handleCopy}
            className="px-2.5 py-0.5 rounded text-xs border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors"
            title="Copy code to clipboard"
          >
            <Icon name="copy" size="xs" className="inline-block align-text-bottom mr-1" />
            Copy
          </button>
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

      {/* Editable code area with highlight overlay + line-number gutter */}
      <div className="relative flex">
        {/* gutter */}
        <div
          ref={gutterRef}
          aria-hidden
          className="select-none overflow-hidden bg-panel-2/60 border-r border-border text-right font-mono text-sm leading-relaxed px-2 py-3.5 text-ink-3/70"
          style={{ minWidth: '3ch', width: `${Math.max(3, String(lineCount).length + 1)}ch` }}
        >
          {lineNumbers.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>

        <div className="relative flex-1">
          <pre
            ref={preRef}
            className="m-0 px-4 py-3.5 font-mono text-sm leading-relaxed pointer-events-none whitespace-pre-wrap break-all overflow-hidden"
            aria-hidden
          >
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={syncGutter}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            aria-label={`${title ?? 'Practice'} code editor`}
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-accent font-mono text-sm leading-relaxed px-4 py-3.5 border-0 resize-none outline-none whitespace-pre-wrap break-all focus-visible:ring-2 focus-visible:ring-accent"
          />

          {/* Autocomplete dropdown — positioned at the caret */}
          {suggestOpen && suggestions.length > 0 && (
            <div
              className="absolute z-20 min-w-[200px] max-h-56 overflow-y-auto bg-panel-2 border border-border rounded-lg shadow-lg shadow-black/30"
              style={{
                top: caretPos ? caretPos.top : 16,
                left: caretPos ? caretPos.left : 16,
              }}
            >
              {suggestions.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => acceptSuggestion(s.label)}
                  onMouseEnter={() => setSuggestIndex(i)}
                  className={cn(
                    'w-full text-left px-3 py-1.5 font-mono text-sm flex items-center justify-between gap-3',
                    i === suggestIndex ? 'bg-accent/15 text-ink' : 'text-ink-2'
                  )}
                >
                  <span className="flex items-baseline gap-2 min-w-0">
                    <span className="truncate">{s.label}</span>
                    {s.params && (
                      <span className="text-xs text-ink-3 truncate">({s.params})</span>
                    )}
                  </span>
                  {s.detail && (
                    <span className="text-[10px] uppercase tracking-wide text-ink-3 flex-shrink-0">
                      {s.detail}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
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
