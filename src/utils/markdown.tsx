import { highlight } from './syntax';

/**
 * Tiny, safe markdown renderer for AI chat output.
 *
 * Supports: headings, paragraphs, fenced code blocks (syntax-highlighted),
 * inline code, bold, italic, bullet/numbered lists, blockquotes, and
 * horizontal rules. Everything is HTML-escaped before rendering, so AI
 * output is never injected as raw HTML.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Render inline markdown (code, bold, italic) into an escaped HTML string. */
function renderInline(text: string): string {
  let out = '';
  let remaining = text;

  // Split on code spans first so we don't touch markdown inside them.
  const codeRe = /(`+)([\s\S]*?)\1/;
  while (remaining.length > 0) {
    const match = remaining.match(codeRe);
    if (!match || match.index === undefined) {
      out += inlineStyles(remaining);
      break;
    }
    if (match.index > 0) out += inlineStyles(remaining.slice(0, match.index));
    out += `<code class="markdown-code">${escapeHtml(match[2])}</code>`;
    remaining = remaining.slice(match.index + match[0].length);
  }
  return out;
}

function inlineStyles(text: string): string {
  let out = '';
  let remaining = text;
  const patterns: Array<{ re: RegExp; wrap: (inner: string) => string }> = [
    { re: /\*\*([^*]+)\*\*/, wrap: (i) => `<strong>${i}</strong>` },
    { re: /__([^_]+)__/, wrap: (i) => `<strong>${i}</strong>` },
    { re: /\*([^*]+)\*/, wrap: (i) => `<em>${i}</em>` },
    { re: /_([^_]+)_/, wrap: (i) => `<em>${i}</em>` },
  ];

  while (remaining.length > 0) {
    let earliest: { idx: number; len: number; html: string } | null = null;
    for (const p of patterns) {
      const m = remaining.match(p.re);
      if (m && m.index !== undefined) {
        if (earliest === null || m.index < earliest.idx) {
          earliest = { idx: m.index, len: m[0].length, html: p.wrap(escapeHtml(m[1])) };
        }
      }
    }
    if (!earliest) {
      out += escapeHtml(remaining);
      break;
    }
    if (earliest.idx > 0) out += escapeHtml(remaining.slice(0, earliest.idx));
    out += earliest.html;
    remaining = remaining.slice(earliest.idx + earliest.len);
  }
  return out;
}

function renderListBlock(lines: string[], start: number): { html: string; nextIndex: number } {
  const items: string[] = [];
  const ordered = /^\s*\d+[.)]\s+/.test(lines[start]);
  let i = start;
  while (i < lines.length && /^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[i])) {
    items.push(`<li>${renderInline(lines[i].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, ''))}</li>`);
    i += 1;
  }
  const tag = ordered ? 'ol' : 'ul';
  return { html: `<${tag} class="markdown-list">${items.join('')}</${tag}>`, nextIndex: i };
}

/** Render a full markdown string to an HTML string. */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1] || 'text';
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1; // skip closing fence
      const codeText = buf.join('\n');
      out.push(
        `<div class="markdown-codeblock" data-code-block><div class="markdown-codeblock-header"><span class="markdown-codeblock-lang">${escapeHtml(lang)}</span><button type="button" class="markdown-copy-btn" data-copy-code="${escapeHtml(codeText)}" aria-label="Copy code"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg><span class="markdown-copy-btn-label">Copy</span></button></div><pre><code>${highlight(codeText, lang)}</code></pre></div>`
      );
      continue;
    }

    // Headings
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = Math.min(heading[1].length, 6);
      out.push(`<h${level} class="markdown-heading">${renderInline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^\s*([-*_])\s*\1\s*\1\s*$/.test(line)) {
      out.push('<hr class="markdown-hr" />');
      i += 1;
      continue;
    }

    // Blockquote
    if (/^\s*>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''));
        i += 1;
      }
      out.push(`<blockquote class="markdown-quote">${renderInline(buf.join('\n'))}</blockquote>`);
      continue;
    }

    // Lists
    if (/^\s*(?:[-*+]|\d+[.)])\s+/.test(line)) {
      const list = renderListBlock(lines, i);
      out.push(list.html);
      i = list.nextIndex;
      continue;
    }

    // Table — pipe-delimited rows with a `| --- | --- |` separator
    if (/\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const tableLines: string[][] = [];
      const headerCells = line.split('|').map((c) => c.trim()).filter((c, idx, arr) => !(idx === 0 && c === '' || idx === arr.length - 1 && c === ''));
      tableLines.push(headerCells);
      i += 2; // skip header + separator
      while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim() !== '') {
        const cells = lines[i].split('|').map((c) => c.trim()).filter((c, idx, arr) => !(idx === 0 && c === '' || idx === arr.length - 1 && c === ''));
        tableLines.push(cells);
        i += 1;
      }
      const colCount = Math.max(...tableLines.map((r) => r.length));
      const head = `<tr>${tableLines[0].map((c) => `<th>${renderInline(c)}</th>`).join('')}${'<th></th>'.repeat(Math.max(0, colCount - tableLines[0].length))}</tr>`;
      const body = tableLines.slice(1).map((r) =>
        `<tr>${r.map((c) => `<td>${renderInline(c)}</td>`).join('')}${'<td></td>'.repeat(Math.max(0, colCount - r.length))}</tr>`
      ).join('');
      out.push(`<div class="markdown-table-wrap"><table class="markdown-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>`);
      continue;
    }

    // Paragraph — collect consecutive non-blank, non-block lines
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^```/.test(lines[i]) &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*([-*_])\s*\1\s*\1\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i += 1;
    }
    if (buf.length > 0) {
      out.push(`<p class="markdown-paragraph">${renderInline(buf.join(' '))}</p>`);
      continue;
    }

    i += 1;
  }

  return out.join('');
}
