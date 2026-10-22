import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakJapanese, SpeechRate } from '../utils/tts';

interface SpeakerButtonProps {
  text: string;
  rate: SpeechRate;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
  text,
  rate,
  label,
  size = 'sm',
  className = ''
}) => {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakJapanese(
      text,
      rate,
      () => setSpeaking(true),
      () => setSpeaking(false)
    );
  };

  const sizeClasses =
    size === 'md'
      ? 'min-h-[40px] min-w-[40px] px-2.5 py-1.5 text-xs gap-1.5'
      : 'min-h-[32px] min-w-[32px] p-1.5 text-xs';

  return (
    <button
      type="button"
      onClick={handleSpeak}
      aria-label={label || `Play Japanese audio for ${text.slice(0, 24)}`}
      title={`日本語音声を再生 (${rate}x)`}
      className={`inline-flex items-center justify-center rounded-lg border transition-colors shrink-0 cursor-pointer ${sizeClasses} ${
        speaking
          ? 'bg-sky-600 text-white border-sky-600 dark:bg-sky-500 dark:border-sky-400'
          : 'bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700'
      } ${className}`}
    >
      <Volume2 className={size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      {size === 'md' && <span className="font-medium whitespace-nowrap">発音</span>}
    </button>
  );
};
