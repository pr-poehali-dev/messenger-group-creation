import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onSend: (duration: number) => void;
  onCancel: () => void;
}

export default function VoiceRecorder({ onSend, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startRecording = () => {
    setIsRecording(true);
    setDuration(0);
    intervalRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onSend(duration);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDuration(0);
    onCancel();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording && duration === 0) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={startRecording}
      >
        <Icon name="Mic" size={20} />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-xl border border-border animate-scale-in">
      <div className="flex items-center gap-2">
        {isRecording && (
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        )}
        <span className="font-mono text-sm font-semibold">{formatDuration(duration)}</span>
      </div>

      <div className="flex-1 flex items-center gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full animate-pulse"
            style={{
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${i * 50}ms`
            }}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600"
          onClick={cancelRecording}
        >
          <Icon name="X" size={20} />
        </Button>

        {isRecording ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 gradient-purple text-white hover:opacity-90"
            onClick={stopRecording}
          >
            <Icon name="Square" size={16} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 gradient-purple text-white hover:opacity-90"
            onClick={() => onSend(duration)}
          >
            <Icon name="Send" size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
