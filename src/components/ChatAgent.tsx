import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { getDayById } from '../data/courses';
import { Icon } from './Icon';
import { cn } from '../utils/helpers';
import { renderMarkdown } from '../utils/markdown';
import { layout } from '../styles/tokens';
import type { ContentBlock } from '../types';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SIDEBAR_WIDTH = 400;
const SIDEBAR_MIN = 280;
const SIDEBAR_MAX = 900;
const SIDEBAR_WIDTH_KEY = 'study-gang:chat-sidebar-width';
const CHAT_HISTORY_KEY = 'study-gang:chat-history';
const CHAT_HISTORY_MAX = 200;

function loadSidebarWidth(): number {
  try {
    const raw = window.localStorage.getItem(SIDEBAR_WIDTH_KEY);
    if (!raw) return SIDEBAR_WIDTH;
    const n = Number(raw);
    if (Number.isFinite(n) && n >= SIDEBAR_MIN && n <= SIDEBAR_MAX) return n;
  } catch { /* ignore */ }
  return SIDEBAR_WIDTH;
}

function loadChatHistory(): Message[] {
  try {
    const raw = window.localStorage.getItem(CHAT_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is Message =>
        m && typeof m === 'object' &&
        typeof m.content === 'string' &&
        (m.role === 'user' || m.role === 'assistant' || m.role === 'system')
    ).slice(-CHAT_HISTORY_MAX);
  } catch { /* ignore */ }
  return [];
}

export function ChatAgent() {
  const open = useStore((s) => s.chatOpen);
  const setOpen = useStore((s) => s.setChatOpen);
  const [messages, setMessages] = useState<Message[]>(loadChatHistory);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState<number>(SIDEBAR_WIDTH);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (open) setWidth(loadSidebarWidth());
  }, [open]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-CHAT_HISTORY_MAX)));
    } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    const root = messagesRef.current;
    if (!root) return;
    async function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest<HTMLButtonElement>('[data-copy-code]');
      if (!btn) return;
      const code = btn.getAttribute('data-copy-code') ?? '';
      const label = btn.querySelector<HTMLElement>('.markdown-copy-btn-label');
      const original = label?.textContent ?? 'Copy';
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
        btn.classList.add('is-copied');
        if (label) label.textContent = 'Copied';
        window.setTimeout(() => {
          btn.classList.remove('is-copied');
          if (label) label.textContent = original;
        }, 1500);
      } catch {
        if (label) label.textContent = 'Failed';
        window.setTimeout(() => { if (label) label.textContent = original; }, 1500);
      }
    }
    root.addEventListener('click', handleClick);
    return () => root.removeEventListener('click', handleClick);
  }, [messages.length]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, window.innerWidth - e.clientX));
      setWidth(next);
    }
    function onUp() {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      try { window.localStorage.setItem(SIDEBAR_WIDTH_KEY, String(width)); } catch { /* ignore */ }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [width]);

  const selectedCourseId = useStore((s) => s.selectedCourseId);
  const selectedDayId = useStore((s) => s.selectedDayId);
  const courses = useStore((s) => s.courses);
  const view = useStore((s) => s.view);

  const course = courses.find((c) => c.id === selectedCourseId);
  const dayInfo = selectedCourseId && selectedDayId
    ? getDayById(selectedCourseId, selectedDayId)
    : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the input when the panel mounts (open).
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Close with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  function buildContext(): string {
    const parts: string[] = [];
    parts.push('You are a friendly, patient teaching assistant for the Study Gang learning app.');
    parts.push('The student is learning programming and database concepts for their B.E. (AIML) degree.');
    parts.push('Explain things simply. Assume they are a beginner unless they show otherwise.');
    parts.push('Keep answers focused on what they are currently studying.');
    parts.push('Use short paragraphs, bullet points when listing things, and avoid walls of text.');
    parts.push('');
    if (course) {
      parts.push(`Current course: ${course.name} — ${course.subtitle}`);
      if (dayInfo) {
        const d = dayInfo.day;
        parts.push(`Currently on Day ${d.number}: ${d.title}`);
        if (d.topics?.length) parts.push(`Topics: ${d.topics.join(', ')}`);
        if (d.subtitle) parts.push(`Day subtitle: ${d.subtitle}`);
        const pageDigest = digestDay(d);
        if (pageDigest) {
          parts.push('');
          parts.push('--- Page content the student is reading ---');
          parts.push(pageDigest);
          parts.push('--- End of page content ---');
          parts.push('Answer the student\'s question using the page content above when relevant. Quote the exact wording of examples you reference. If the page does not cover their question, say so plainly.');
        }
      }
    }
    if (view === 'reference') parts.push('The student is viewing reference/cheatsheet material.');
    if (view === 'tests') parts.push('The student is taking tests.');
    if (view === 'home') {
      parts.push('The student is on the home page. Available courses: ' +
        courses.map((c) => `${c.name} (${c.subtitle})`).join(', '));
    }
    return parts.join('\n');
  }

  function digestDay(d: { blocks?: ContentBlock[]; tasks?: { text: string; tag?: string }[] }): string {
    const out: string[] = [];
    const blocks = d.blocks ?? [];
    let budget = 6000;
    for (const block of blocks) {
      if (budget <= 0) break;
      const chunk = serializeBlock(block);
      if (!chunk) continue;
      if (chunk.length > budget) {
        out.push(chunk.slice(0, budget) + '…');
        budget = 0;
        break;
      }
      out.push(chunk);
      budget -= chunk.length;
    }
    if (d.tasks && d.tasks.length > 0) {
      const taskLines = d.tasks.map((t) => `- ${t.text}${t.tag ? ` (${t.tag})` : ''}`).join('\n');
      if (taskLines.length <= budget) {
        out.push('');
        out.push('Tasks:');
        out.push(taskLines);
      }
    }
    return out.join('\n').trim();
  }

  function serializeBlock(block: ContentBlock): string {
    switch (block.type) {
      case 'heading':
        return block.content?.trim() ? `## ${block.content.trim()}` : '';
      case 'paragraph':
        return block.content?.trim() ?? '';
      case 'callout': {
        const title = block.title ?? '';
        const content = block.content?.trim() ?? '';
        const kind = (block.calloutType ?? 'info').toUpperCase();
        return content
          ? `[${kind}${title ? ` — ${title}` : ''}]\n${content}`
          : '';
      }
      case 'code': {
        const title = block.title ?? 'Code';
        const lang = block.lang ?? 'text';
        const code = block.code?.trim() ?? '';
        return `\`\`\`${lang}\n${code}\n\`\`\`\n(${title})`;
      }
      case 'list': {
        const items = block.items ?? [];
        if (items.length === 0) return '';
        return items.map((it) => `- ${it}`).join('\n');
      }
      case 'table': {
        const headers = block.headers ?? [];
        const rows = block.rows ?? [];
        if (headers.length === 0) return '';
        const head = `| ${headers.join(' | ')} |`;
        const sep = `| ${headers.map(() => '---').join(' | ')} |`;
        const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
        return `${head}\n${sep}\n${body}`;
      }
      case 'quiz': {
        const title = block.title ?? 'Quiz';
        const questions = block.questions ?? [];
        if (questions.length === 0) return `${title}: (no questions)`;
        const lines = [`${title}:`];
        for (const q of questions) {
          if (q.question?.trim()) lines.push(`- Q: ${q.question.trim()}`);
        }
        return lines.join('\n');
      }
      case 'flashcard': {
        const title = block.title ?? 'Flashcards';
        const cards = block.cards ?? [];
        return `${title}: ${cards.length} card(s) (front/back hidden)`;
      }
      case 'practice':
        return `[Practice] ${block.title ?? 'Practice'} (starter code on the page; TODO comments inside)`;
      case 'divider':
        return '---';
      default:
        return '';
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const payload = [
        { role: 'system', content: buildContext() },
        ...updated,
      ];
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: import.meta.env.MINIMAX_MODEL ?? 'MiniMax-M3', messages: payload }),
      });
      const data = await res.json();
      if (data.error) {
        const errText = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
        setMessages((prev) => [...prev, { role: 'assistant', content: `Something went wrong: ${errText}` }]);
      } else {
        const raw = data.choices?.[0]?.message?.content ?? '';
        const reply = raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
        setMessages((prev) => [...prev, { role: 'assistant', content: reply || '(no response)' }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Could not reach the AI service. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  if (!open) return null;

  function startResize(e: React.MouseEvent) {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  return (
    <aside
      role="complementary"
      aria-label="AI study assistant"
      className={cn(
        'fixed right-0 z-40',
        'bg-bg-2 border-l border-border shadow-panel',
        'flex flex-col overflow-hidden',
        'animate-slide-in-right'
      )}
      style={{ width, maxWidth: '85vw', top: layout.headerHeight, bottom: 0 }}
    >
      <div
        onMouseDown={startResize}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize chat panel"
        title="Drag to resize"
        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-accent/30 active:bg-accent/50 transition-colors duration-fast z-10"
      />
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg/50 select-none flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-lg bg-accent/15 text-accent grid place-items-center flex-shrink-0">
            <Icon name="messageDots" size="md" weight="Filled" />
          </span>
          <div className="min-w-0">
            <span className="font-bold text-sm text-ink block truncate">Study Assistant</span>
            {course && (
              <span className="text-[11px] text-ink-3 block truncate" title={course.name}>
                {course.name}{dayInfo ? ` · Day ${dayInfo.day.number}` : ''}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => setMessages([])}
              className="w-7 h-7 grid place-items-center rounded-md text-ink-3 hover:text-danger hover:bg-danger/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Clear chat history"
              title="Clear chat"
            >
              <Icon name="refresh" size="sm" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-7 h-7 grid place-items-center rounded-md text-ink-3 hover:text-ink hover:bg-panel transition-colors duration-fast flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Hide assistant panel"
            title="Hide panel"
          >
            <Icon name="close" size="sm" />
          </button>
        </div>
      </div>

      {/* messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 bg-bg/40">
        {messages.length === 0 && (
          <div className="text-center py-10 px-2">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent grid place-items-center mx-auto mb-4">
              <Icon name="messageDots" size="lg" weight="Filled" />
            </div>
            <p className="text-sm font-semibold text-ink mb-1.5">
              {course ? 'I can see what you\'re studying' : 'Open a course to get started'}
            </p>
            <p className="text-xs text-ink-2 leading-relaxed max-w-[320px] mx-auto">
              {course
                ? `Ask me anything about ${course.name}${dayInfo ? ` — I see you're on Day ${dayInfo.day.number}: ${dayInfo.day.title}` : '.'}`
                : 'Pick a course from the tabs above and I\'ll automatically know what you\'re working on.'}
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={cn(
              'max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
              m.role === 'user'
                ? 'bg-accent text-[oklch(12%_.014_220)] rounded-br-md font-medium whitespace-pre-wrap'
                : 'bg-panel border border-border/60 text-ink rounded-bl-md markdown-body'
            )}>
              {m.role === 'user'
                ? m.content
                : <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-panel border border-border/60 text-ink-2 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-3 animate-pulse-dot" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-3 animate-pulse-dot" style={{ animationDelay: '200ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-3 animate-pulse-dot" style={{ animationDelay: '400ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="px-3 py-3 border-t border-border bg-bg/50 flex gap-2 items-end flex-shrink-0">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={course ? `Ask about ${course.name}...` : 'Ask anything...'}
          rows={1}
          className="flex-1 bg-panel border border-border rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 resize-none outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors duration-fast font-sans"
        />
        <button
          type="button"
          onClick={send}
          disabled={!input.trim() || loading}
          className={cn(
            'w-9 h-9 rounded-lg flex-shrink-0 grid place-items-center transition-all duration-fast',
            input.trim() && !loading
              ? 'bg-accent text-[oklch(12%_.014_220)] hover:brightness-110 cursor-pointer'
              : 'bg-panel text-ink-3 cursor-not-allowed'
          )}
          aria-label="Send message"
        >
          <Icon name="send" size="sm" />
        </button>
      </div>
    </aside>
  );
}
