// Lightweight regex-based syntax highlighter for Java, SQL, Python, Bash.
// Not perfect — intentionally simple, no dependencies.

type Token = { type: string; value: string };

const TOKEN_COLORS: Record<string, string> = {
  keyword: '#ff7b72',
  string: '#a5d6ff',
  number: '#79c0ff',
  comment: '#8b949e',
  class: '#ffa657',
  function: '#d2a8ff',
  operator: '#ff7b72',
  type: '#7ee787',
  variable: '#e6e8ec',
  punctuation: '#9aa3b2',
  builtin: '#79c0ff',
};

const JAVA_KEYWORDS = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
  'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
  'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
  'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
  'package', 'private', 'protected', 'public', 'return', 'short', 'static',
  'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null',
  'var', 'yield', 'record', 'sealed',
]);

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE',
  'IS', 'NULL', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
  'CREATE', 'TABLE', 'DATABASE', 'DROP', 'ALTER', 'ADD', 'COLUMN',
  'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE', 'DEFAULT',
  'INDEX', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'ON',
  'GROUP', 'BY', 'ORDER', 'ASC', 'DESC', 'HAVING', 'LIMIT', 'OFFSET',
  'DISTINCT', 'AS', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'INT', 'INTEGER', 'VARCHAR', 'CHAR', 'TEXT', 'DATE', 'DATETIME',
  'TIMESTAMP', 'BOOLEAN', 'FLOAT', 'DOUBLE', 'DECIMAL', 'BLOB',
  'AUTO_INCREMENT', 'NOT', 'USE', 'SHOW', 'DATABASES', 'DESCRIBE',
  'EXPLAIN', 'TIMESTAMPDIFF', 'CURDATE', 'NOW', 'CONCAT', 'SUBSTRING',
  'LENGTH', 'UPPER', 'LOWER', 'LOAD', 'DATA', 'LOCAL', 'INFILE',
]);

const PYTHON_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
  'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
  'True', 'False', 'None', 'self',
]);

const BASH_KEYWORDS = new Set([
  'if', 'then', 'else', 'elif', 'fi', 'case', 'esac', 'for', 'while',
  'until', 'do', 'done', 'function', 'return', 'in', 'echo', 'cd', 'ls',
  'cp', 'mv', 'rm', 'mkdir', 'rmdir', 'cat', 'grep', 'awk', 'sed',
  'export', 'source', 'alias', 'unset', 'set',
]);

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for',
  'while', 'do', 'switch', 'case', 'break', 'continue', 'default',
  'class', 'extends', 'new', 'this', 'super', 'import', 'export',
  'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw',
  'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null',
  'undefined', 'yield', 'static',
]);

export function tokenize(code: string, lang: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = code.length;

  const keywordsByLang: Record<string, Set<string>> = {
    java: JAVA_KEYWORDS,
    sql: SQL_KEYWORDS,
    python: PYTHON_KEYWORDS,
    bash: BASH_KEYWORDS,
    javascript: JS_KEYWORDS,
    json: new Set(),
  };

  const commentsByLang: Record<string, [string, string]> = {
    java: ['//', '\n'],
    sql: ['--', '\n'],
    python: ['#', '\n'],
    bash: ['#', '\n'],
    javascript: ['//', '\n'],
    json: ['', ''],
  };

  const blockCommentsByLang: Record<string, [string, string]> = {
    java: ['/*', '*/'],
    sql: ['/*', '*/'],
    python: ['"""', '"""'],
    bash: ['', ''],
    javascript: ['/*', '*/'],
    json: ['', ''],
  };

  const kw = keywordsByLang[lang] ?? new Set();
  const lineComment = commentsByLang[lang] ?? ['', ''];
  const blockComment = blockCommentsByLang[lang] ?? ['', ''];

  while (i < len) {
    const ch = code[i];

    // Block comment
    if (
      blockComment[0] &&
      code.startsWith(blockComment[0], i)
    ) {
      const end = code.indexOf(blockComment[1], i + blockComment[0].length);
      const stop = end === -1 ? len : end + blockComment[1].length;
      tokens.push({ type: 'comment', value: code.slice(i, stop) });
      i = stop;
      continue;
    }

    // Line comment
    if (
      lineComment[0] &&
      code.startsWith(lineComment[0], i)
    ) {
      const nl = code.indexOf('\n', i);
      const stop = nl === -1 ? len : nl;
      tokens.push({ type: 'comment', value: code.slice(i, stop) });
      i = stop;
      continue;
    }

    // Strings
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      let j = i + 1;
      while (j < len) {
        if (code[j] === '\\' && j + 1 < len) {
          j += 2;
          continue;
        }
        if (code[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ type: 'string', value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < len && /[0-9._a-fA-FxX]/.test(code[j])) j++;
      tokens.push({ type: 'number', value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < len && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const lower = lang === 'sql' ? word.toUpperCase() : word;
      const isKw = kw.has(lower);

      // Look ahead for paren to mark function
      let k = j;
      while (k < len && code[k] === ' ') k++;
      const isFn = !isKw && code[k] === '(';

      if (isKw) {
        tokens.push({ type: 'keyword', value: word });
      } else if (isFn) {
        tokens.push({ type: 'function', value: word });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ type: 'class', value: word });
      } else {
        tokens.push({ type: 'variable', value: word });
      }
      i = j;
      continue;
    }

    // Operators
    if (/[+\-*/%=<>!&|^~?:]/.test(ch)) {
      let j = i;
      while (j < len && /[+\-*/%=<>!&|^~?:]/.test(code[j])) j++;
      tokens.push({ type: 'operator', value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Punctuation
    if (/[(){}\[\];,.]/.test(ch)) {
      tokens.push({ type: 'punctuation', value: ch });
      i++;
      continue;
    }

    // Whitespace / other
    tokens.push({ type: 'variable', value: ch });
    i++;
  }

  return tokens;
}

export function highlight(code: string, lang: string): string {
  const tokens = tokenize(code, lang);
  return tokens
    .map((t) => {
      const color = TOKEN_COLORS[t.type] ?? TOKEN_COLORS.variable;
      // Don't highlight whitespace
      if (/^\s+$/.test(t.value)) {
        return escapeHtml(t.value);
      }
      return `<span style="color:${color}">${escapeHtml(t.value)}</span>`;
    })
    .join('');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function langLabel(lang: string): string {
  const map: Record<string, string> = {
    java: 'java',
    sql: 'sql',
    python: 'python',
    bash: 'bash',
    json: 'json',
    javascript: 'javascript',
    text: 'text',
  };
  return map[lang] ?? lang;
}
