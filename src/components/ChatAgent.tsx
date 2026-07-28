import { useState, useRef, useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { getDayById } from '../data/courses';
import { Icon } from './Icon';
import { cn } from '../utils/helpers';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // drag state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number }>({ startX: 0, startY: 0, origX: 0, origY: 0 });

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

  useEffect(() => {
    if (open) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPos({ x: vw - 480 - 20, y: vh - 560 - 20 });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
  }, [pos]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const x = Math.max(0, Math.min(dragRef.current.origX + dx, window.innerWidth - 480));
      const y = Math.max(0, Math.min(dragRef.current.origY + dy, window.innerHeight - 60));
      setPos({ x, y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

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
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: 'assistant', content: `Something went wrong: ${data.error}` }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Could not reach the AI. Make sure the dev server is running (`npm run dev`).' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-accent text-[oklch(12%_.014_220)] shadow-panel hover:brightness-110 hover:scale-105 transition-all duration-normal ease-spring z-50 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
        title="Ask the AI assistant"
        aria-label="Open AI assistant"
      >
        <Icon name="sparkle" size="lg" weight="Filled" />
      </button>
    );
  }

  return (
    <div
      style={{ left: pos.x, top: pos.y }}
      className={cn(
        'fixed w-[480px] z-50',
        dragging ? 'cursor-grabbing' : '',
        'bg-bg-2 border border-border rounded-xl shadow-panel',
        'flex flex-col overflow-hidden',
        'animate-toast-in'
      )}
    >
      {/* draggable header */}
      <div
        onMouseDown={onMouseDown}
        className={cn(
          'flex items-center justify-between px-4 py-3 border-b border-border bg-bg/50 select-none',
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-lg bg-accent/15 text-accent grid place-items-center flex-shrink-0">
            <Icon name="sparkle" size="md" weight="Filled" />
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
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setOpen(false)}
          className="w-7 h-7 grid place-items-center rounded-md text-ink-3 hover:text-ink hover:bg-panel transition-colors duration-fast flex-shrink-0 ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close assistant"
        >
          <Icon name="close" size="sm" />
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 bg-bg/40" style={{ maxHeight: '400px' }}>
        {messages.length === 0 && (
          <div className="text-center py-10 px-2">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent grid place-items-center mx-auto mb-4">
              <Icon name="sparkle" size="lg" weight="Filled" />
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
              'max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
              m.role === 'user'
                ? 'bg-accent text-[oklch(12%_.014_220)] rounded-br-md font-medium'
                : 'bg-panel border border-border/60 text-ink rounded-bl-md'
            )}>
              {m.content}
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
      <div className="px-3 py-3 border-t border-border bg-bg/50 flex gap-2 items-end">
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
    </div>
  );
}
