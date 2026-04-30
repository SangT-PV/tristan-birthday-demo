import { useState, useRef, useEffect, useCallback } from 'react';

// TypeScript declarations for Web Speech API.
// The standard TS DOM lib doesn't ship `SpeechRecognitionEvent` /
// `SpeechRecognitionErrorEvent` — they live in a separate "Web Speech"
// spec and require `@types/dom-speech-recognition` OR manual fallbacks.
// We declare enough to compile without pulling an extra dep.
// (Discovered during SkillForge dry-run dogfood — Phase 3 Task 14a, 2026-04-27.)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionInstance = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionEvent = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionErrorEvent = any;

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export type VoiceState = 'idle' | 'connecting' | 'recording';

interface UseVoiceInputOptions {
  onTranscript: (text: string) => void;
  onAutoStop: (finalText: string) => void;
  onFrequencyData?: (data: Uint8Array) => void;
  onStateChange?: (state: VoiceState) => void;
  onError?: (error: string) => void;
}

export function useVoiceInput({
  onTranscript,
  onAutoStop,
  onFrequencyData,
  onStateChange,
  onError
}: UseVoiceInputOptions) {
  const [isSupported, setIsSupported] = useState(false);
  const [state, setState] = useState<VoiceState>('idle');
  const stateRef = useRef<VoiceState>('idle');
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTranscriptRef = useRef<string>('');
  const networkRetryRef = useRef<boolean>(false);
  const noSpeechCountRef = useRef<number>(0);

  // Check browser support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      setIsSupported(supported);
    }
  }, []);

  // Update state and notify callback
  const updateState = useCallback((newState: VoiceState) => {
    stateRef.current = newState;
    setState(newState);
    onStateChange?.(newState);
  }, [onStateChange]);

  // Setup audio visualization
  const setupAudioVisualization = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Start frequency data updates
      const updateFrequency = () => {
        if (!analyserRef.current || state !== 'recording') return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        onFrequencyData?.(dataArray);

        animationFrameRef.current = requestAnimationFrame(updateFrequency);
      };

      updateFrequency();
    } catch (err) {
      console.error('Audio visualization setup failed:', err);
      onError?.('Microphone access denied');
    }
  }, [state, onFrequencyData, onError]);

  // Cleanup audio resources
  const cleanupAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
  }, []);

  // Start recording
  const start = useCallback(async () => {
    if (!isSupported) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    if (state !== 'idle') return;

    updateState('connecting');
    lastTranscriptRef.current = '';
    networkRetryRef.current = false;
    noSpeechCountRef.current = 0;

    try {
      // Initialize Speech Recognition
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.results.length - 1; i >= 0; i--) {
          const result = event.results[i];
          const transcript = result[0].transcript;

          if (result.isFinal) {
            finalTranscript = transcript;
            lastTranscriptRef.current = finalTranscript;
          } else {
            interimTranscript = transcript;
          }
        }

        // Update textarea with latest transcript (final or interim)
        const currentText = finalTranscript || interimTranscript;
        onTranscript(currentText);

        // Reset silence timer on new speech
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Auto-stop after 2 seconds of silence following final result
        if (finalTranscript) {
          silenceTimerRef.current = setTimeout(() => {
            stop();
            onAutoStop(lastTranscriptRef.current);
          }, 2000);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        // no-speech is normal silence detection — not a real error.
        // Allow up to 3 restarts, then stop gracefully.
        if (event.error === 'no-speech') {
          noSpeechCountRef.current++;
          if (noSpeechCountRef.current >= 3) {
            stop();
          }
          return;
        }

        console.error('Speech recognition error:', event.error);

        if (event.error === 'not-allowed' || (event.error as string) === 'permission-denied') {
          onError?.('Microphone access denied. Please allow microphone access in your browser settings.');
          stop();
        } else if (event.error === 'network') {
          if (!networkRetryRef.current) {
            networkRetryRef.current = true;
            try {
              recognition.stop();
              setTimeout(() => recognition.start(), 500);
            } catch {
              onError?.('Voice input requires an internet connection (Chrome sends audio to Google for processing). Check your connection and try again.');
              stop();
            }
            return;
          }
          onError?.('Voice input requires an internet connection (Chrome sends audio to Google for processing). Check your connection and try again.');
          stop();
        } else {
          onError?.(`Speech recognition error: ${event.error}`);
          stop();
        }
      };

      recognition.onend = () => {
        // Only auto-restart if still recording, no transcript yet, and haven't hit silence limit
        if (stateRef.current === 'recording' && lastTranscriptRef.current === '' && noSpeechCountRef.current < 3) {
          try {
            recognition.start();
          } catch {
            stop();
          }
        }
      };

      // Start recognition
      recognition.start();
      updateState('recording');

      // Setup audio visualization
      await setupAudioVisualization();
    } catch (err) {
      console.error('Failed to start voice input:', err);
      onError?.('Failed to start voice input');
      updateState('idle');
    }
  }, [isSupported, state, onTranscript, onAutoStop, onError, updateState, setupAudioVisualization]);

  // Stop recording
  const stop = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
      recognitionRef.current = null;
    }

    cleanupAudio();
    updateState('idle');
  }, [cleanupAudio, updateState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    isSupported,
    state,
    start,
    stop
  };
}
