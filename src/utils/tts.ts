/**
 * High-Accuracy Japanese Text-to-Speech (TTS) Engine
 * Uses Web Speech API (window.speechSynthesis) with platform voice detection for iOS Safari, Android Chrome, and Desktop.
 */

export type SpeechRate = 1.0 | 0.8;

let cachedJaVoice: SpeechSynthesisVoice | null = null;

function findBestJapaneseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  if (cachedJaVoice) return cachedJaVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const jaVoices = voices.filter(
    v => v.lang.toLowerCase().startsWith('ja') || v.lang.toLowerCase().includes('jp')
  );
  if (jaVoices.length === 0) return null;

  // Prefer high-quality native voices on iOS/macOS (Kyoko, Otoya, Hattori) and Chrome/Android (Google 日本語)
  const preferredNames = ['Google 日本語', 'Kyoko', 'Otoya', 'Haruka', 'Ichiro', 'Sayaka', 'Siri'];
  for (const name of preferredNames) {
    const found = jaVoices.find(v => v.name.includes(name));
    if (found) {
      cachedJaVoice = found;
      return found;
    }
  }

  cachedJaVoice = jaVoices[0];
  return cachedJaVoice;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedJaVoice = null;
    findBestJapaneseVoice();
  };
}

/**
 * Cleans text for natural Japanese speech:
 * - Removes duplicate parenthesized readings e.g. 預り金（あずかりきん） -> 預り金
 * - Replaces math symbols with spoken Japanese equivalents
 */
export function cleanJapaneseForSpeech(rawText: string): string {
  return rawText
    .replace(/（[\u3040-\u309F\u30FC・\s\/]+）/g, '')
    .replace(/\([\u3040-\u309F\u30FC・\s\/]+\)/g, '')
    .replace(/÷/g, ' わる ')
    .replace(/×/g, ' かける ')
    .replace(/＋/g, ' たす ')
    .replace(/\+/g, ' たす ')
    .replace(/＝/g, ' は ')
    .replace(/=/g, ' は ')
    .replace(/※/g, '')
    .trim();
}

export function speakJapanese(
  text: string,
  rate: SpeechRate = 1.0,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const cleaned = cleanJapaneseForSpeech(text);
    if (!cleaned) {
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voice = findBestJapaneseVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    window.speechSynthesis.speak(utterance);
  } catch {
    onEnd?.();
  }
}
