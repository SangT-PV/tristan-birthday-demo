'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import MessageList, { Message } from './message-list';
import MessageInput from './message-input';
import { matchFaq, suggestionPills } from '../config/assistant';

const PROVIDER_LABELS: Record<string, string> = {
  'faq': 'FAQ (instant)',
};

export default function ChatWidget() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const streamingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCollapsed(true);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSubmit = (content: string) => {
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
      streamingTimeoutRef.current = null;
    }

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const answer = matchFaq(content);

    setIsTyping(true);
    streamingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      const assistantId = nanoid();
      const words = answer.split(/(\s+)/);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isStreaming: true,
          provider: 'faq',
        },
      ]);
      let accumulated = '';
      words.forEach((word, i) => {
        streamingTimeoutRef.current = setTimeout(() => {
          accumulated += word;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: accumulated, isStreaming: i < words.length - 1 }
                : m
            )
          );
        }, i * 30);
      });
    }, 600);
  };

  return (
    <div data-chat-widget="true">
      <div
        className={clsx(
          'fixed bottom-6 right-6 z-[9999] overflow-hidden flex flex-col transition-all duration-200',
          isCollapsed && 'hidden'
        )}
        style={{
          width: 'min(400px, calc(100vw - 48px))',
          height: 'min(560px, calc(100vh - 96px))',
          borderRadius: 16,
          background: 'var(--chat-panel-bg)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex flex-col h-full">
          <div
            className="flex items-center justify-between gap-2 px-4 py-3"
            style={{
              background: 'var(--fill-secondary)',
              borderBottom: '1px solid var(--separator)',
            }}
          >
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Site Assistant
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                aria-label="Close Site Assistant"
                className="flex items-center justify-center rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                style={{
                  width: 28,
                  height: 28,
                  color: 'var(--text-tertiary)',
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          </div>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {suggestionPills.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSubmit(suggestion)}
                  className="text-[10px] px-2.5 py-1.5 rounded-full cursor-pointer transition-colors hover:opacity-80"
                  style={{
                    background: 'var(--fill-secondary)',
                    color: 'var(--foreground)',
                    border: '0.33px solid var(--separator)',
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div
            className="flex-1 min-h-0 p-4 overflow-y-auto"
            style={{ background: 'var(--chat-panel-bg)' }}
          >
            <MessageList messages={messages} isTyping={isTyping} providerLabels={PROVIDER_LABELS} />
          </div>

          <div
            style={{
              background: 'var(--chat-panel-bg)',
              borderTop: '1px solid var(--separator)',
            }}
          >
            <MessageInput onSubmit={handleSubmit} disabled={false} />
          </div>
        </div>
      </div>

      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          aria-label="Open Site Assistant"
          className="pointer-events-auto fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg hover:scale-[1.08] transition-transform"
          style={{
            background: 'var(--blue)',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
