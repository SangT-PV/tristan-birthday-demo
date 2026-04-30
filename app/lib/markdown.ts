import React from 'react';

/**
 * Lightweight markdown parser for assistant messages
 * Supports: **bold**, `code`, - bullets, double newline paragraphs
 */
export function parseMarkdown(text: string): React.ReactNode[] {
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((para, paraIndex) => {
    const trimmed = para.trim();
    if (!trimmed) return null;

    // Check if paragraph is a list (lines starting with - or *)
    const lines = trimmed.split('\n');
    const isListPara = lines.every(line => /^\s*[-*]\s/.test(line));

    if (isListPara) {
      // Render as list
      const items = lines.map((line, i) => {
        const content = line.replace(/^\s*[-*]\s+/, '');
        return React.createElement('li', { key: i }, parseInline(content));
      });
      return React.createElement('ul', { key: paraIndex, className: 'list-disc pl-5 space-y-1' }, items);
    }

    // Regular paragraph - parse inline formatting
    const inlineElements = parseInline(trimmed);
    return React.createElement('p', { key: paraIndex }, inlineElements);
  }).filter(Boolean);
}

/**
 * Parse inline markdown: **bold** and `code`
 * Single newlines within paragraphs become <br>
 */
function parseInline(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const remaining = text;
  let key = 0;

  // Pattern: **bold**, `code`, or plain text
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = pattern.exec(remaining)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      const plainText = remaining.slice(lastIndex, match.index);
      elements.push(...splitNewlines(plainText, key++));
    }

    const matched = match[0];
    if (matched.startsWith('**') && matched.endsWith('**')) {
      // Bold
      const content = matched.slice(2, -2);
      elements.push(React.createElement('strong', { key: key++ }, content));
    } else if (matched.startsWith('`') && matched.endsWith('`')) {
      // Code
      const content = matched.slice(1, -1);
      elements.push(React.createElement('code', {
        key: key++,
        className: 'bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-[13px] font-mono'
      }, content));
    }

    lastIndex = match.index + matched.length;
  }

  // Add remaining text
  if (lastIndex < remaining.length) {
    const plainText = remaining.slice(lastIndex);
    elements.push(...splitNewlines(plainText, key++));
  }

  return elements;
}

/**
 * Split text by single newlines and insert <br> elements
 */
function splitNewlines(text: string, baseKey: number): React.ReactNode[] {
  const parts = text.split('\n');
  const result: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part) result.push(part);
    if (i < parts.length - 1) {
      result.push(React.createElement('br', { key: `br-${baseKey}-${i}` }));
    }
  });

  return result;
}
