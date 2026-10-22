import React from 'react';
import { segmentFurigana } from '../utils/furigana';

interface RubyTextProps {
  text: string;
  showFurigana: boolean;
  highlightQuery?: string;
  className?: string;
}

function highlightMatch(content: string, query?: string): React.ReactNode {
  if (!query || !query.trim()) return content;
  const q = query.trim();
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = content.split(new RegExp(`(${escaped})`, 'gi'));
  if (parts.length === 1) return content;

  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark
        key={i}
        className="bg-amber-200/90 dark:bg-amber-500/40 text-slate-900 dark:text-amber-100 rounded px-0.5"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export const RubyText: React.FC<RubyTextProps> = ({
  text,
  showFurigana,
  highlightQuery,
  className = ''
}) => {
  const tokens = React.useMemo(() => segmentFurigana(text), [text]);

  return (
    <span className={`${!showFurigana ? 'hide-furigana' : ''} ${className}`}>
      {tokens.map((tok, idx) => {
        if (tok.reading) {
          return (
            <ruby key={idx} className="mx-[0.5px]">
              {highlightMatch(tok.text, highlightQuery)}
              {showFurigana && (
                <rt className="text-sky-700 dark:text-sky-300 font-normal select-none">
                  {tok.reading}
                </rt>
              )}
            </ruby>
          );
        }
        return (
          <React.Fragment key={idx}>
            {highlightMatch(tok.text, highlightQuery)}
          </React.Fragment>
        );
      })}
    </span>
  );
};
