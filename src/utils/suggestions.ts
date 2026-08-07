// Lightweight autocomplete suggestions for the practice editor.
// Curated per-language keywords + identifiers already present in the code.

type Suggestion = { label: string; detail?: string; params?: string };

const COMMON_JAVA: Suggestion[] = [
  { label: 'public', detail: 'keyword' },
  { label: 'private', detail: 'keyword' },
  { label: 'protected', detail: 'keyword' },
  { label: 'static', detail: 'keyword' },
  { label: 'void', detail: 'keyword' },
  { label: 'class', detail: 'keyword' },
  { label: 'new', detail: 'keyword' },
  { label: 'return', detail: 'keyword' },
  { label: 'if', detail: 'keyword' },
  { label: 'else', detail: 'keyword' },
  { label: 'for', detail: 'keyword' },
  { label: 'while', detail: 'keyword' },
  { label: 'switch', detail: 'keyword' },
  { label: 'case', detail: 'keyword' },
  { label: 'break', detail: 'keyword' },
  { label: 'continue', detail: 'keyword' },
  { label: 'int', detail: 'keyword' },
  { label: 'double', detail: 'keyword' },
  { label: 'boolean', detail: 'keyword' },
  { label: 'String', detail: 'keyword' },
  { label: 'true', detail: 'keyword' },
  { label: 'false', detail: 'keyword' },
  { label: 'null', detail: 'keyword' },
  { label: 'System.out.println', detail: 'print line', params: 'String x' },
  { label: 'System.out.print', detail: 'print', params: 'String x' },
  { label: 'main', detail: 'method', params: 'String[] args' },
  { label: 'String[] args', detail: 'param' },
];

const COMMON_SQL: Suggestion[] = [
  { label: 'SELECT', detail: 'keyword' },
  { label: 'FROM', detail: 'keyword' },
  { label: 'WHERE', detail: 'keyword' },
  { label: 'INSERT', detail: 'keyword' },
  { label: 'INTO', detail: 'keyword' },
  { label: 'VALUES', detail: 'keyword' },
  { label: 'UPDATE', detail: 'keyword' },
  { label: 'SET', detail: 'keyword' },
  { label: 'DELETE', detail: 'keyword' },
  { label: 'CREATE', detail: 'keyword' },
  { label: 'TABLE', detail: 'keyword' },
  { label: 'JOIN', detail: 'keyword' },
  { label: 'ON', detail: 'keyword' },
  { label: 'GROUP BY', detail: 'keyword' },
  { label: 'ORDER BY', detail: 'keyword' },
  { label: 'HAVING', detail: 'keyword' },
  { label: 'LIMIT', detail: 'keyword' },
  { label: 'AND', detail: 'keyword' },
  { label: 'OR', detail: 'keyword' },
  { label: 'AS', detail: 'keyword' },
  { label: 'COUNT', detail: 'keyword' },
  { label: 'SUM', detail: 'keyword' },
  { label: 'AVG', detail: 'keyword' },
  { label: 'MIN', detail: 'keyword' },
  { label: 'MAX', detail: 'keyword' },
  { label: 'DISTINCT', detail: 'keyword' },
];

const COMMON_PYTHON: Suggestion[] = [
  { label: 'def', detail: 'keyword' },
  { label: 'return', detail: 'keyword' },
  { label: 'if', detail: 'keyword' },
  { label: 'elif', detail: 'keyword' },
  { label: 'else', detail: 'keyword' },
  { label: 'for', detail: 'keyword' },
  { label: 'while', detail: 'keyword' },
  { label: 'import', detail: 'keyword' },
  { label: 'from', detail: 'keyword' },
  { label: 'class', detail: 'keyword' },
  { label: 'self', detail: 'keyword' },
  { label: 'None', detail: 'keyword' },
  { label: 'True', detail: 'keyword' },
  { label: 'False', detail: 'keyword' },
  { label: 'print', detail: 'builtin' },
  { label: 'len', detail: 'builtin' },
  { label: 'range', detail: 'builtin' },
  { label: 'int', detail: 'builtin' },
  { label: 'str', detail: 'builtin' },
  { label: 'float', detail: 'builtin' },
  { label: 'list', detail: 'builtin' },
  { label: 'dict', detail: 'builtin' },
  { label: 'input', detail: 'builtin' },
];

const COMMON_JS: Suggestion[] = [
  { label: 'const', detail: 'keyword' },
  { label: 'let', detail: 'keyword' },
  { label: 'var', detail: 'keyword' },
  { label: 'function', detail: 'keyword' },
  { label: 'return', detail: 'keyword' },
  { label: 'if', detail: 'keyword' },
  { label: 'else', detail: 'keyword' },
  { label: 'for', detail: 'keyword' },
  { label: 'while', detail: 'keyword' },
  { label: 'new', detail: 'keyword' },
  { label: 'console.log', detail: 'builtin', params: '...args' },
  { label: 'console.error', detail: 'builtin', params: '...args' },
  { label: 'Math.max', detail: 'builtin', params: 'a, b' },
  { label: 'Math.min', detail: 'builtin', params: 'a, b' },
  { label: 'Math.random', detail: 'builtin', params: '()' },
  { label: 'Number', detail: 'builtin' },
  { label: 'String', detail: 'builtin' },
  { label: 'Array', detail: 'builtin' },
  { label: 'Object', detail: 'builtin' },
  { label: 'JSON.stringify', detail: 'builtin', params: 'obj' },
  { label: 'JSON.parse', detail: 'builtin', params: 'text' },
];

const CURATED: Record<string, Suggestion[]> = {
  java: COMMON_JAVA,
  sql: COMMON_SQL,
  python: COMMON_PYTHON,
  javascript: COMMON_JS,
};

/** Extract identifiers (words) already present in the code, most frequent first. */
function codeIdentifiers(code: string): Suggestion[] {
  const counts = new Map<string, number>();
  const re = /[A-Za-z_][A-Za-z0-9_]*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const w = m[0];
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label]) => ({ label, detail: 'from code' }));
}

/**
 * Return suggestions matching `prefix`, for the given language and code.
 * Curated list first (popular keywords), then identifiers from the code.
 */
export function getSuggestions(code: string, lang: string, prefix: string): Suggestion[] {
  const curated = CURATED[lang] ?? [];
  const fromCode = codeIdentifiers(code);
  const lower = prefix.toLowerCase();
  const all = [...curated, ...fromCode];

  // Deduplicate by label, keep the first (curated) occurrence.
  const seen = new Set<string>();
  const unique = all.filter((s) => {
    if (seen.has(s.label)) return false;
    seen.add(s.label);
    return true;
  });

  if (!prefix) return unique.slice(0, 8);

  return unique
    .filter((s) => s.label.toLowerCase().startsWith(lower))
    .slice(0, 8);
}
