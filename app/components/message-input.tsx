import { useState, useRef, KeyboardEvent } from 'react';
import { useVoiceInput } from '../hooks/use-voice-input';
import WaveformVisualizer from './waveform-visualizer';

interface MessageInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSubmit, disabled = false }: MessageInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);
  const [voiceDisabled, setVoiceDisabled] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Voice input hook
  const { isSupported, state, start, stop } = useVoiceInput({
    onTranscript: (text) => {
      setValue(text);
      setVoiceError(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
      }
    },
    onAutoStop: (finalText) => {
      if (finalText.trim()) {
        onSubmit(finalText.trim());
        setValue('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
      setFrequencyData(null);
    },
    onFrequencyData: (data) => {
      setFrequencyData(data);
    },
    onError: (error) => {
      setFrequencyData(null);
      if (error.includes('internet connection')) {
        setVoiceDisabled(true);
        setVoiceError('Voice unavailable — no connection to speech service');
        setTimeout(() => setVoiceError(null), 4000);
      }
    }
  });

  // Auto-expand textarea based on content
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    setValue(textarea.value);
  };

  // Handle Enter key (submit) vs Shift+Enter (newline)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSubmit(trimmed);
      setValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const isRecording = state === 'recording';
  const showMicButton = isSupported && !voiceDisabled && value.trim() === '' && !isRecording;
  const showSendButton = value.trim() !== '' && !isRecording;

  return (
    <div className="flex flex-col">
      {voiceError && (
        <div className="px-4 py-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          {voiceError}
        </div>
      )}
    <div className="flex items-end gap-2 px-4 py-3">
      <div className="flex-1 flex flex-col gap-1">
        <textarea
          ref={textareaRef}
          placeholder="Reply..."
          rows={1}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled || isRecording}
          maxLength={2000}
          className="flex-1 bg-transparent border-none text-[16px] resize-none"
          style={{
            color: 'var(--foreground)',
            caretColor: 'var(--blue)',
            outline: 'none',
            minHeight: '44px',
            maxHeight: '160px',
            overflowY: 'auto'
          }}
          autoComplete="off"
        />
        <div className="text-xs text-right" style={{ color: 'var(--text-tertiary)' }}>
          {value.length}/2000
        </div>
      </div>

      {/* Recording state - stop button + waveform + red indicator */}
      {isRecording && (
        <div className="flex items-center gap-2">
          <div className="recording-indicator" />
          <WaveformVisualizer frequencyData={frequencyData} width={180} height={24} />
          <button
            onClick={stop}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer hover:opacity-70 animate-btn-in"
            aria-label="Stop recording"
            style={{ color: '#ef4444' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
              <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}

      {/* Microphone button - shown when input is empty AND speech is supported */}
      {showMicButton && (
        <div className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center">
          <button
            onClick={start}
            className="absolute inset-0 flex items-center justify-center bg-transparent border-none cursor-pointer hover:opacity-70 disabled:opacity-30 animate-btn-in"
            style={{ color: 'var(--text-tertiary)' }}
            aria-label="Start voice input"
            disabled={disabled}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>
      )}

      {/* Send button - shown when input has text */}
      {showSendButton && (
        <div className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="absolute inset-0 flex items-center justify-center bg-transparent border-none cursor-pointer hover:opacity-70 disabled:opacity-30 animate-btn-in"
            style={{ color: 'var(--blue)' }}
            aria-label="Send message"
            disabled={disabled}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
