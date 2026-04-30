import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { parseMarkdown } from '../lib/markdown';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  provider?: string;
}

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
  providerLabels?: Record<string, string>;
}

const DEFAULT_LABELS: Record<string, string> = {
  'ollama': 'Gemma (local)',
  'bedrock': 'Haiku (Bedrock)',
  'bedrock-haiku-fallback': 'Haiku (Bedrock fallback)',
  'faq': 'FAQ (instant)',
  'error': 'Error',
};

function providerBadgeColor(provider: string | undefined): { bg: string; fg: string; border: string } {
  if (provider?.startsWith('ollama')) {
    return { bg: 'rgba(34,197,94,0.12)', fg: '#86efac', border: 'rgba(34,197,94,0.35)' };
  }
  switch (provider) {
    case 'bedrock':
    case 'bedrock-haiku-fallback':
      return { bg: 'rgba(99,102,241,0.14)', fg: '#a5b4fc', border: 'rgba(99,102,241,0.35)' };
    case 'faq':
      return { bg: 'rgba(59,130,246,0.12)', fg: '#93c5fd', border: 'rgba(59,130,246,0.35)' };
    case 'error':
      return { bg: 'rgba(239,68,68,0.12)', fg: '#fca5a5', border: 'rgba(239,68,68,0.35)' };
    case 'notice':
      return { bg: 'rgba(250,204,21,0.10)', fg: '#fde68a', border: 'rgba(250,204,21,0.35)' };
    default:
      return { bg: 'rgba(100,116,139,0.15)', fg: '#94a3b8', border: 'rgba(100,116,139,0.35)' };
  }
}

function providerLabel(provider: string | undefined, labels: Record<string, string>): string {
  if (!provider) return '';
  if (provider.startsWith('ollama:')) {
    const modelName = provider.slice('ollama:'.length);
    return `Local (${modelName})`;
  }
  return labels[provider] ?? provider;
}

const SHOW_PROVIDER_BADGES = process.env.NEXT_PUBLIC_SHOW_BRAIN_SELECTOR === 'true';

export default function MessageList({ messages, isTyping = false, providerLabels }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const labels = { ...DEFAULT_LABELS, ...(providerLabels ?? {}) };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => {
        const isAssistant = message.role === 'assistant';
        const isNotice = message.provider === 'notice';

        if (isNotice) {
          const noticeColors = providerBadgeColor('notice');
          return (
            <div key={message.id} className="flex justify-center my-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: noticeColors.bg,
                  color: noticeColors.fg,
                  border: `1px solid ${noticeColors.border}`,
                }}
              >
                <span>!</span>
                <span>{message.content}</span>
              </div>
            </div>
          );
        }

        const showBadge = SHOW_PROVIDER_BADGES && isAssistant && !!message.provider && !message.isStreaming;
        const colors = providerBadgeColor(message.provider);
        const label = providerLabel(message.provider, labels);

        return (
          <div
            key={message.id}
            className={clsx(
              'flex flex-col',
              message.role === 'user' ? 'items-end' : 'items-start'
            )}
          >
            <div
              className={clsx(
                'max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed',
                message.role === 'user' && 'rounded-br-sm',
                isAssistant && 'rounded-bl-sm'
              )}
              style={{
                background: message.role === 'user' ? 'var(--blue)' : 'var(--fill-secondary)',
                color: message.role === 'user' ? 'white' : 'var(--foreground)',
              }}
            >
              {isAssistant ? (
                <div className="space-y-2">
                  {parseMarkdown(message.content)}
                  {message.isStreaming && <span className="streaming-cursor" />}
                </div>
              ) : (
                message.content
              )}
            </div>
            {showBadge && (
              <div
                className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide"
                style={{
                  background: colors.bg,
                  color: colors.fg,
                  border: `1px solid ${colors.border}`,
                }}
                title={`This response was served by: ${label}`}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: colors.fg }} />
                via {label}
              </div>
            )}
          </div>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div
            className="rounded-2xl rounded-bl-sm px-4 py-2.5"
            style={{ background: 'var(--fill-secondary)' }}
          >
            <div className="typing-indicator">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
