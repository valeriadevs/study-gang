import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Icon } from './Icon';
import { layout } from '../styles/tokens';
import { cn } from '../utils/helpers';
import type { QuizQuestion, Reference } from '../types';

interface TestViewProps {
  reference: Reference;
}

export function TestView({ reference }: TestViewProps) {
  const questions = (reference.blocks?.[0]?.questions ?? []) as QuizQuestion[];
  const timeLimit = (reference as any).timeLimit ?? 30; // minutes
  const passingScore = (reference as any).passingScore ?? 70; // percent

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(timeLimit * 60);
  const [started, setStarted] = useState(false);

  const openReference = useStore((s) => s.openReference);
  const recordInteraction = useStore((s) => s.recordInteraction);

  // Timer
  useEffect(() => {
    if (!started || submitted || timeUp) return;
    if (remainingSeconds <= 0) {
      setTimeUp(true);
      setSubmitted(true);
      return;
    }
    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, submitted, timeUp, remainingSeconds]);

  const formatTimer = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }, []);

  const answeredCount = Object.keys(answers).length;
  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const scorePercent = Math.round((score / questions.length) * 100);
  const passed = scorePercent >= passingScore;
  const allAnswered = answeredCount === questions.length;

  function handleAnswer(questionId: string, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);
    // Record correct answers for XP
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) recordInteraction('quizCorrect');
    });
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setTimeUp(false);
    setRemainingSeconds(timeLimit * 60);
    setStarted(false);
  }

  if (!started) {
    return (
      <div className="p-8 mx-auto fade-in" style={{ maxWidth: layout.readingMaxWidth }}>
        <nav className="text-sm text-ink-2 mb-2 flex items-center gap-1.5">
          <button type="button" onClick={() => openReference('')} className="hover:text-ink transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Reference
          </button>
          <span>›</span>
          <span className="text-accent">{reference.title}</span>
        </nav>

        <div className="surface p-8 mt-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
            <Icon name="clipboard" size="lg" className="text-accent" />
          </div>
          <h1 className="text-[28px] font-bold mb-2">{reference.title}</h1>
          <p className="text-ink-2 mb-2">{reference.description}</p>

          <div className="flex items-center justify-center gap-8 my-6 text-sm">
            <div className="flex items-center gap-2 text-ink-2">
              <Icon name="helpCircle" size="sm" />
              <span><strong>{questions.length}</strong> questions</span>
            </div>
            <div className="flex items-center gap-2 text-ink-2">
              <Icon name="timer" size="sm" />
              <span><strong>{timeLimit} minutes</strong></span>
            </div>
            <div className="flex items-center gap-2 text-ink-2">
              <Icon name="target" size="sm" />
              <span>Pass: <strong>{passingScore}%</strong></span>
            </div>
          </div>

          <div className="surface p-4 my-6 text-sm text-ink-2 mx-auto max-w-md text-left space-y-2">
            <p className="font-bold text-ink">Test Rules:</p>
            <p>• Timer starts when you click Start.</p>
            <p>• Answers are locked — you can change them before submitting.</p>
            <p>• Explanations and scores are visible only after submission.</p>
            <p>• The test auto-submits when time runs out.</p>
          </div>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="px-8 py-3 rounded-lg bg-accent text-[oklch(12%_.014_220)] font-bold hover:brightness-110 transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-8 mx-auto fade-in" style={{ maxWidth: layout.readingMaxWidth }}>
        <nav className="text-sm text-ink-2 mb-2 flex items-center gap-1.5">
          <button type="button" onClick={() => openReference('')} className="hover:text-ink transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Reference
          </button>
          <span>›</span>
          <span className="text-accent">{reference.title}</span>
        </nav>

        {/* Results Header */}
        <div className={cn('surface p-8 text-center mb-6', passed ? 'border-success' : 'border-danger')}>
          <div className={cn('w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center', passed ? 'bg-success/10' : 'bg-danger/10')}>
            <Icon name={passed ? 'crown' : 'helpCircle'} size="lg" className={passed ? 'text-success' : 'text-danger'} />
          </div>
          <h1 className={cn('text-[32px] font-bold mb-1', passed ? 'text-success' : 'text-danger')}>
            {passed ? 'Passed!' : 'Keep Practicing'}
          </h1>
          <p className="text-ink-2 mb-4">
            {timeUp ? 'Time is up! ' : ''}You scored <strong className="text-ink">{score}/{questions.length}</strong> ({scorePercent}%)
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Icon name="check" size="sm" className="text-success" />
              <span>{score} correct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="close" size="sm" className="text-danger" />
              <span>{questions.length - score} incorrect</span>
            </div>
            {!allAnswered && (
              <div className="flex items-center gap-1.5">
                <Icon name="helpCircle" size="sm" className="text-ink-2" />
                <span>{questions.length - answeredCount} unanswered</span>
              </div>
            )}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="button" onClick={handleRetry} className="px-5 py-2 rounded-lg border border-border text-ink hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Retry Test
            </button>
            <button type="button" onClick={() => { setStarted(false); handleRetry(); }} className="px-5 py-2 rounded-lg border border-border text-ink hover:border-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Back to Tests
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const selected = answers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correctIndex;
            return (
              <div key={q.id} className="surface p-5">
                <div className="flex items-start gap-3">
                  <span className={cn('font-bold text-sm mt-0.5 flex-shrink-0', isAnswered ? (isCorrect ? 'text-success' : 'text-danger') : 'text-ink-2')}>
                    Q{idx + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md text-ink font-medium mb-3">{q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const isCorrectOption = oi === q.correctIndex;
                        const isSelected = selected === oi;
                        return (
                          <div
                            key={oi}
                            className={cn(
                              'px-3 py-2 rounded-lg text-sm border',
                              isCorrectOption && 'bg-success/15 border-success text-success font-medium',
                              !isCorrectOption && isSelected && 'bg-danger/15 border-danger text-danger',
                              !isCorrectOption && !isSelected && 'bg-panel-2 border-border text-ink-2'
                            )}
                          >
                            <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + oi)})</span>
                            {opt}
                            {isCorrectOption && <Icon name="check" size="sm" weight="Filled" className="text-success inline ml-2" />}
                            {!isCorrectOption && isSelected && <Icon name="close" size="sm" weight="Filled" className="text-danger inline ml-2" />}
                          </div>
                        );
                      })}
                    </div>
                    {!isAnswered && (
                      <div className="mt-3 p-3 rounded-lg text-xs bg-danger/10 border border-danger/30 text-red-300">
                        <strong>Unanswered</strong> — the correct answer was option {String.fromCharCode(65 + q.correctIndex)}.
                      </div>
                    )}
                    <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed bg-accent/5 border border-border text-ink-2">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 mb-4">
          <button type="button" onClick={handleRetry} className="px-6 py-2.5 rounded-lg bg-accent text-[oklch(12%_.014_220)] font-bold hover:brightness-110 transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
            Retry Test
          </button>
        </div>
      </div>
    );
  }

  // Active test
  const timerColor = remainingSeconds < 60 ? 'text-danger' : remainingSeconds < 300 ? 'text-amber' : 'text-accent';
  const progressPercent = (answeredCount / questions.length) * 100;

  return (
    <div className="p-8 mx-auto fade-in" style={{ maxWidth: layout.readingMaxWidth }}>
      {/* Test Header */}
      <div className="surface p-4 mb-6 sticky top-0 z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn('flex items-center gap-2 font-mono font-bold text-lg', timerColor)}>
            <Icon name="timer" size="sm" />
            {formatTimer(remainingSeconds)}
          </div>
          <div className="text-sm text-ink-2">
            <span className="font-bold text-ink">{answeredCount}</span>/{questions.length} answered
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-1.5 bg-panel-2 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className={cn(
              'px-5 py-2 rounded-lg font-bold transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              answeredCount > 0
                ? 'bg-accent text-[oklch(12%_.014_220)] hover:brightness-110'
                : 'bg-panel-2 text-ink-2 cursor-not-allowed'
            )}
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full h-1.5 bg-panel-2 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {questions.map((q, idx) => {
          const selected = answers[q.id];
          const isAnswered = selected !== undefined;
          return (
            <div key={q.id} className={cn('surface p-5', isAnswered && 'border-l-2 border-l-accent')}>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold text-sm mt-0.5 flex-shrink-0">
                  Q{idx + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md text-ink font-medium mb-3">{q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => {
                      const isSelected = selected === oi;
                      return (
                        <button
                          key={oi}
                          type="button"
                          onClick={() => handleAnswer(q.id, oi)}
                          className={cn(
                            'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors duration-fast border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                            isSelected
                              ? 'bg-accent/15 border-accent text-ink font-medium'
                              : 'bg-panel-2 border-border text-ink hover:border-ink/30 cursor-pointer'
                          )}
                        >
                          <span className="font-mono text-xs mr-2 text-ink-2">{String.fromCharCode(65 + oi)})</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom submit */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={answeredCount === 0}
          className={cn(
            'px-8 py-3 rounded-lg font-bold text-lg transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
            answeredCount > 0
              ? 'bg-accent text-[oklch(12%_.014_220)] hover:brightness-110'
              : 'bg-panel-2 text-ink-2 cursor-not-allowed'
          )}
        >
          Submit Test ({answeredCount}/{questions.length} answered)
        </button>
        {answeredCount < questions.length && (
          <p className="text-xs text-ink-2 mt-2">
            You can change answers anytime before submitting. Unanswered questions count as incorrect.
          </p>
        )}
      </div>
    </div>
  );
}