import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { PracticeEditor } from './PracticeEditor';
import { Icon } from './Icon';
import type { ContentBlock } from '../types';
import { cn } from '../utils/helpers';
import { useStore } from '../store/useStore';

interface ContentRendererProps {
  block: ContentBlock;
  dayId?: string;
}


export function ContentRenderer({ block, dayId }: ContentRendererProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="bg-panel border border-border rounded-xl p-5 leading-relaxed text-body-lg text-ink block-hover">
          {renderInline(block.content ?? '')}
        </p>
      );

    case 'heading': {
      const level = block.level ?? 3;
      const Tag = (`h${level}` as 'h2' | 'h3' | 'h4');
      return (
        <Tag
          className={cn(
            'font-bold tracking-tight',
            level === 2 && 'text-2xl mt-6 font-display',
            level === 3 && 'text-h3 font-sub italic text-accent mt-5',
            level === 4 && 'text-body-md text-accent-2 font-mono uppercase tracking-wider mt-4'
          )}
        >
          {block.content}
        </Tag>
      );
    }

    case 'code':
      return (
        <CodeBlock
          code={block.code ?? ''}
          lang={block.lang ?? 'text'}
          title={block.title}
          typewriter={block.typewriter ?? false}
        />
      );

    case 'practice':
      return (
        <PracticeEditor
          dayId={dayId ?? 'unknown'}
          blockId={block.id ?? 'practice'}
          lang={block.lang ?? 'java'}
          starter={block.starter ?? ''}
          hint={block.hint}
          title={block.title}
        />
      );

    case 'list': {
      const items = block.items ?? [];
      const isOrdered = block.listStyle === 'number';
      const isCheck = block.listStyle === 'check';
      const Wrap = isOrdered ? 'ol' : 'ul';
      return (
        <div className="bg-panel border border-border rounded-xl p-5 block-hover">
          <Wrap
            className={cn(
              'pl-5 space-y-1.5 leading-relaxed',
              isOrdered && 'list-decimal',
              !isOrdered && !isCheck && 'list-disc',
              '[&>li]:marker:text-accent'
            )}
          >
            {items.map((item, i) => (
              <li key={i} className="text-ink">
                {renderInline(item)}
              </li>
            ))}
          </Wrap>
        </div>
      );
    }

    case 'table': {
      const headers = block.headers ?? [];
      const rows = block.rows ?? [];
      return (
        <div className="bg-panel border border-border rounded-xl overflow-hidden block-hover">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              {headers.length > 0 && (
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className="text-left px-3 py-2.5 bg-panel-2 font-semibold text-accent-2 text-body-sm border-b border-border"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={cn(i % 2 === 1 && 'bg-white/[0.02]')}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-3 py-2.5 border-t border-border align-top"
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case 'callout': {
      const ctype = block.calloutType ?? 'info';
      // Map to design system: warn→warn style, everything else→tip style
      const severity = ctype === 'warn' || ctype === 'exam'
        ? 'warn' : 'tip';
      const isWarn = severity === 'warn';
      return (
        <div className={`callout callout--${severity} flex gap-3 p-4 rounded-lg ${isWarn ? 'bg-danger/10 border border-danger/20' : 'bg-accent/10 border border-accent/20'}`}>
          <div className={`callout__badge flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${isWarn ? 'bg-danger text-white' : 'bg-accent text-[oklch(12%_.014_220)]'}`}>
            {isWarn ? '!' : '▷'}
          </div>
          <div className="callout__body min-w-0">
            {block.title && (
              <div className="font-bold mb-1.5 text-body-md text-ink">{block.title}</div>
            )}
            <div className="text-body-md text-ink whitespace-pre-line">{renderInline(block.content ?? '')}</div>
          </div>
        </div>
      );
    }

    case 'divider':
      return <hr className="border-border my-2" />;

    case 'quiz':
      return <QuizBlock questions={block.questions ?? []} title={block.title} />;

    case 'flashcard':
      return <FlashcardBlock cards={block.cards ?? []} title={block.title} />;

    default:
      return null;
  }
}

// ─── Interactive Quiz Block ────────────────────────────────────────

function QuizBlock({ questions, title }: { questions: NonNullable<ContentBlock['questions']>; title?: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const recordInteraction = useStore((state) => state.recordInteraction);

  if (questions.length === 0) return null;

  const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;
  const score = questions.filter((question) => answers[question.id] === question.correctIndex).length;
  const allRevealed = questions.every(
    (question) => revealed[question.id] || answers[question.id] !== undefined
  );

  function answerQuestion(questionId: string, optionIndex: number) {
    if (answers[questionId] !== undefined) return;
    const question = questions.find((item) => item.id === questionId);
    setAnswers((previous) => ({ ...previous, [questionId]: optionIndex }));
    setRevealed((previous) => ({ ...previous, [questionId]: true }));
    if (question && optionIndex === question.correctIndex) {
      recordInteraction('quizCorrect');
    }
  }

  function revealAll() {
    const all: Record<string, boolean> = {};
    questions.forEach((question) => { all[question.id] = true; });
    setRevealed(all);
  }

  function resetAll() {
    setAnswers({});
    setRevealed({});
  }

  return (
    <div className="bg-panel border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-panel-2 border-b border-border flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold flex items-center gap-2">
          <Icon name="checklist" size="sm" className="text-accent" />
          <span>{title ?? 'Check Your Understanding'}</span>
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-ink-2 tabular-nums">{answeredCount}/{questions.length} · {score} correct</span>
          <button
            type="button"
            onClick={allRevealed ? resetAll : revealAll}
            className="text-xs px-2.5 py-1 rounded border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors"
          >
            {allRevealed ? 'Try again' : 'Reveal all'}
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {questions.map((question, index) => {
          const selectedIndex = answers[question.id];
          const isAnswered = selectedIndex !== undefined;
          const isRevealed = revealed[question.id] || isAnswered;
          const isCorrectAnswer = selectedIndex === question.correctIndex;
          return (
            <div key={question.id} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold text-sm mt-0.5 flex-shrink-0">
                  Q{index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md text-ink font-medium mb-2.5">{renderInline(question.question)}</p>
                  <div className="space-y-1.5">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === question.correctIndex;
                      const isSelected = selectedIndex === optionIndex;
                      return (
                        <button
                          type="button"
                          key={optionIndex}
                          onClick={() => answerQuestion(question.id, optionIndex)}
                          disabled={isAnswered}
                          aria-pressed={isSelected}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-fast border',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel',
                            !isRevealed && 'bg-panel-2 border-border text-ink hover:border-accent cursor-pointer',
                            isRevealed && isCorrect && 'bg-success/15 border-success text-success font-medium',
                            isRevealed && !isCorrect && isSelected && 'bg-danger/15 border-danger text-danger',
                            isRevealed && !isCorrect && !isSelected && 'bg-panel-2 border-border text-ink-2',
                            isAnswered && 'cursor-default'
                          )}
                        >
                          <span className="font-mono text-xs mr-2 text-ink-2">
                            {String.fromCharCode(65 + optionIndex)})
                          </span>
                          {renderInline(option)}
                          {isRevealed && isCorrect && <span className="float-right" aria-label="correct"><Icon name="check" size="sm" weight="Filled" className="text-success inline" /></span>}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <div className={cn(
                      'mt-3 p-3 rounded-lg text-xs leading-relaxed border',
                      isCorrectAnswer
                        ? 'bg-success/10 border-success/30 text-success'
                        : 'bg-danger/10 border-danger/30 text-red-300'
                    )}>
                      <strong>{isCorrectAnswer ? 'Correct — lovely recall.' : 'Not quite — now you know where the trap lives.'}</strong>{' '}
                      {renderInline(question.explanation)}
                    </div>
                  )}
                  {isRevealed && !isAnswered && (
                    <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed bg-green-500/10 border border-green-500/30 text-green-300">
                      <strong>Answer revealed:</strong> {renderInline(question.explanation)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-2.5 bg-panel-2 border-t border-border text-xs text-ink-2" aria-live="polite">
        {answeredCount === questions.length
          ? `You scored ${score}/${questions.length}. Reset and try to beat your own score.`
          : `${questions.length - answeredCount} question${questions.length - answeredCount === 1 ? '' : 's'} left — choose an option to get instant feedback.`}
      </div>
    </div>
  );
}

// ─── Interactive Flashcard Block ───────────────────────────────────

function FlashcardBlock({ cards, title }: { cards: NonNullable<ContentBlock['cards']>; title?: string }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [order, setOrder] = useState<string[]>(() => cards.map((card) => card.id));
  const recordInteraction = useStore((state) => state.recordInteraction);

  if (cards.length === 0) return null;

  const orderedCards = order
    .map((id) => cards.find((card) => card.id === id))
    .filter(Boolean) as typeof cards;
  const flippedCount = cards.filter((card) => flipped[card.id]).length;

  function toggleFlip(id: string) {
    const wasFlipped = Boolean(flipped[id]);
    setFlipped((previous) => ({ ...previous, [id]: !previous[id] }));
    if (!wasFlipped) recordInteraction('flashcardsFlipped');
  }

  function shuffleCards() {
    const next = [...cards].map((card) => card.id);
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    }
    setOrder(next);
    setFlipped({});
  }

  function resetCards() {
    setOrder(cards.map((card) => card.id));
    setFlipped({});
  }

  return (
    <div className="bg-panel border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-panel-2 border-b border-border flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="cardsIcon" size="sm" className="text-accent" />
          <h3 className="text-base font-bold">{title ?? 'Flashcards'}</h3>
          <span className="text-xs text-ink-2 ml-1">{flippedCount}/{cards.length} revealed</span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={shuffleCards}
            className="text-xs px-2.5 py-1 rounded border border-border text-ink-2 hover:text-ink hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Shuffle
          </button>
          <button
            type="button"
            onClick={resetCards}
            className="text-xs px-2.5 py-1 rounded border border-border text-ink-2 hover:text-ink hover:border-ink transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
          {orderedCards.map((card) => {
            const isFlipped = Boolean(flipped[card.id]);
            return (
              <button
                type="button"
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                aria-pressed={isFlipped}
                aria-label={`${isFlipped ? 'Hide answer for' : 'Reveal'} flashcard: ${card.front}`}
                className={cn(
                  'min-h-[120px] rounded-lg border p-4 text-left transition-colors duration-fast cursor-pointer hover:border-accent hover:shadow-lg hover:shadow-accent/5 flashcard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                  isFlipped
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-panel-2'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-body-sm font-mono uppercase tracking-wider font-bold text-ink-2">
                    {isFlipped ? 'Answer' : 'Question'}
                  </span>
                  <span className="text-xs text-ink-2 inline-flex items-center gap-1">
                    {isFlipped ? <><Icon name="eye" size="xs" /> Shown</> : <><Icon name="eyeOff" size="xs" /> Tap to reveal</>}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink">
                  {renderInline(isFlipped ? card.back : card.front)}
                </p>
                {!isFlipped && card.hint && (
                  <p className="text-xs text-ink-2 mt-2 italic inline-flex items-center gap-1">
                    <Icon name="bulb" size="xs" className="text-accent" />
                    {card.hint}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Render inline markdown: **bold**, *italic*, `code`
function renderInline(text: string): React.ReactNode {
  if (!text) return null;
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns: Array<{ regex: RegExp; render: (m: string) => React.ReactNode }> = [
    {
      regex: /\*\*([^*]+)\*\*/,
      render: (m) => <strong key={key++} className="text-accent-2 font-semibold">{m.slice(2, -2)}</strong>,
    },
    {
      regex: /`([^`]+)`/,
      render: (m) => <code key={key++}>{m.slice(1, -1)}</code>,
    },
    {
      regex: /\*([^*]+)\*/,
      render: (m) => <em key={key++} className="text-ink-2 not-italic">{m.slice(1, -1)}</em>,
    },
  ];

  while (remaining.length > 0) {
    let earliest: { idx: number; len: number; node: React.ReactNode } | null = null;
    for (const p of patterns) {
      const match = remaining.match(p.regex);
      if (match && match.index !== undefined) {
        if (earliest === null || match.index < earliest.idx) {
          earliest = {
            idx: match.index,
            len: match[0].length,
            node: p.render(match[0]),
          };
        }
      }
    }
    if (!earliest) {
      parts.push(remaining);
      break;
    }
    if (earliest.idx > 0) {
      parts.push(remaining.slice(0, earliest.idx));
    }
    parts.push(earliest.node);
    remaining = remaining.slice(earliest.idx + earliest.len);
  }

  return <>{parts}</>;
}
