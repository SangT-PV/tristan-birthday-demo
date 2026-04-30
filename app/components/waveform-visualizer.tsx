import { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
  frequencyData: Uint8Array | null;
  width?: number;
  height?: number;
}

export default function WaveformVisualizer({
  frequencyData,
  width = 180,
  height = 24
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frequencyData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate bar width and gap
    const barCount = 32;
    const barWidth = 2;
    const barGap = (width - barCount * barWidth) / (barCount - 1);

    // Draw waveform bars
    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * frequencyData.length);
      const value = frequencyData[dataIndex] || 0;

      // Normalize to bar height (0-24px)
      const barHeight = (value / 255) * height;

      // Position bar vertically centered
      const x = i * (barWidth + barGap);
      const y = (height - barHeight) / 2;

      // Draw bar with blue color
      ctx.fillStyle = 'var(--blue)';
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }, [frequencyData, width, height]);

  if (!frequencyData) return null;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
}
