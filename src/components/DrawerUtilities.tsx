import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Sun,
  Moon,
  Sparkles,
  Award,
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Volume2,
  BookmarkCheck,
  AlertCircle
} from 'lucide-react';
import { TERMS_DATA } from '../data/termsData';
import { VOCAB_DATA } from '../data/vocabData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { DEPARTMENTS } from '../data/departments';
import { RubyText } from './RubyText';
import { SpeakerButton } from './SpeakerButton';
import { SpeechRate } from '../utils/tts';

export type ActiveDrawerModal = 'none' | 'flashcards' | 'exam';

interface FlashcardItem {
  uid: string;
  sourceType: 'term' | 'vocab';
  numericId: number;
  deptKey: string;
  frontMainJp: string;
  frontSubText: string;
  backJp: string;
  backMm: string;
  extraTip: string;
}

interface DrawerUtilitiesProps {
  drawerOpen: boolean;
  onCloseDrawer: () => void;
  activeModal: ActiveDrawerModal;
  onSelectModal: (modal: ActiveDrawerModal) => void;
  darkMode: boolean;
  onToggleDarkMode: (dark: boolean) => void;
  showFurigana: boolean;
  onToggleFurigana: () => void;
  speechRate: SpeechRate;
  onChangeSpeechRate: (rate: SpeechRate) => void;
}

export const DrawerUtilities: React.FC<DrawerUtilitiesProps> = ({
  drawerOpen,
  onCloseDrawer,
  activeModal,
  onSelectModal,
  darkMode,
  onToggleDarkMode,
  showFurigana,
  onToggleFurigana,
  speechRate,
  onChangeSpeechRate
}) => {
  // Build unified 388-card dataset (109 Core Terms + 279 Vocabulary/Kanji entries)
  const allFlashcards: FlashcardItem[] = useMemo(() => {
    const termCards: FlashcardItem[] = TERMS_DATA.map((t) => ({
      uid: `term-${t.id}`,
      sourceType: 'term',
      numericId: t.id,
      deptKey: t.deptKey,
      frontMainJp: t.rawTitle,
      frontSubText: t.english,
      backJp: t.definitionJp,
      backMm: t.explanationMm,
      extraTip: t.keyVocabRaw
    }));

    const vocabCards: FlashcardItem[] = VOCAB_DATA.map((v) => ({
      uid: `vocab-${v.id}`,
      sourceType: 'vocab',
      numericId: v.id,
      deptKey: v.deptKey,
      frontMainJp: `${v.kanji}（${v.furigana}）`,
      frontSubText: `ふりがな: ${v.furigana}`,
      backJp: `関連専門用語：${v.relatedTerm}`,
      backMm: v.meaningMm,
      extraTip: `Part 4 重要語彙 #${v.id} · ${v.relatedTerm}`
    }));

    return [...termCards, ...vocabCards];
  }, []);

  // Flashcard state persisted in localStorage
  const [cardStatus, setCardStatus] = useState<Record<string, 'mastered' | 'review'>>(() => {
    try {
      const saved = localStorage.getItem('ssw2_flashcard_status');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ssw2_flashcard_status', JSON.stringify(cardStatus));
    } catch {
      // ignore storage errors
    }
  }, [cardStatus]);

  const [deckFilter, setDeckFilter] = useState<'all' | 'term' | 'vocab'>('all');
  const [cardDeptFilter, setCardDeptFilter] = useState<string>('all');
  const [cardStatusFilter, setCardStatusFilter] = useState<'all' | 'mastered' | 'review'>('all');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffleSeed, setShuffleSeed] = useState<number>(1);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const filteredDeck = useMemo(() => {
    const base = allFlashcards.filter((c) => {
      if (deckFilter !== 'all' && c.sourceType !== deckFilter) return false;
      if (cardDeptFilter !== 'all' && c.deptKey !== cardDeptFilter) return false;
      if (cardStatusFilter !== 'all' && cardStatus[c.uid] !== cardStatusFilter) return false;
      return true;
    });

    if (!isShuffled) return base;
    const copy = [...base];
    let seed = shuffleSeed;
    for (let i = copy.length - 1; i > 0; i--) {
      seed = (seed * 16807) % 2147483647;
      const j = seed % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [allFlashcards, deckFilter, cardDeptFilter, cardStatusFilter, cardStatus, isShuffled, shuffleSeed]);

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [deckFilter, cardDeptFilter, cardStatusFilter, isShuffled, shuffleSeed]);

  // Mock Exam Simulator State (persisted in localStorage)
  const [examAnswers, setExamAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>(() => {
    try {
      const saved = localStorage.getItem('ssw2_exam_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ssw2_exam_answers', JSON.stringify(examAnswers));
    } catch {
      // ignore storage errors
    }
  }, [examAnswers]);

  const [examDeptFilter, setExamDeptFilter] = useState<string>('all');
  const [examWrongOnly, setExamWrongOnly] = useState<boolean>(false);
  const [showMyanmarStem, setShowMyanmarStem] = useState<boolean>(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  const filteredExamQuestions = useMemo(() => {
    return QUESTIONS_DATA.filter((q) => {
      if (examDeptFilter !== 'all' && q.deptKey !== examDeptFilter) return false;
      if (examWrongOnly) {
        const ans = examAnswers[q.id];
        if (!ans || ans === q.correctKey) return false;
      }
      return true;
    });
  }, [examDeptFilter, examWrongOnly, examAnswers]);

  useEffect(() => {
    setCurrentQuestionIdx(0);
  }, [examDeptFilter, examWrongOnly]);

  // Exam Scorecard statistics
  const examStats = useMemo(() => {
    const answeredIds = Object.keys(examAnswers).map(Number);
    const totalAnswered = answeredIds.length;
    let correctCount = 0;
    let wrongCount = 0;
    for (const id of answeredIds) {
      const q = QUESTIONS_DATA.find((item) => item.id === id);
      if (q) {
        if (examAnswers[id] === q.correctKey) correctCount++;
        else wrongCount++;
      }
    }
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return { totalAnswered, correctCount, wrongCount, accuracy };
  }, [examAnswers]);

  const masteredCount = Object.values(cardStatus).filter((v) => v === 'mastered').length;
  const reviewCount = Object.values(cardStatus).filter((v) => v === 'review').length;
  const studiedCardsCount = Object.keys(cardStatus).length;

  const getDeptName = (key: string) => {
    const d = DEPARTMENTS.find((dept) => dept.key === key);
    return d ? d.nameEn : key;
  };

  return (
    <>
      {/* Off-Canvas Sidebar Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={onCloseDrawer}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <aside
            aria-label="Study Utilities & Settings Drawer"
            className="relative w-80 sm:w-96 max-w-[88vw] bg-white dark:bg-slate-900 h-full border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-5"
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                    Study Utilities & Preferences
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    လေ့ကျင့်ရေးနှင့် အပြင်အဆင် မီနူး
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onCloseDrawer}
                  aria-label="Close Drawer"
                  className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Category 1: Color Theme Management & Reading Controls */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  01. မျက်စိသက်သာစေသော အရောင်နှင့် အသံထွက် စနစ် (Theme & Audio)
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleDarkMode(false)}
                    className={`p-3 rounded-xl border text-left transition-colors flex items-center gap-2.5 cursor-pointer ${
                      !darkMode
                        ? 'bg-sky-50 border-sky-500 text-sky-900 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-xs">Eye-Care Light</div>
                      <div className="text-[10px] opacity-75">#F8FAFC နေ့ဘက်</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleDarkMode(true)}
                    className={`p-3 rounded-xl border text-left transition-colors flex items-center gap-2.5 cursor-pointer ${
                      darkMode
                        ? 'bg-sky-950/80 border-sky-400 text-sky-100 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-xs">Eye-Care Dark</div>
                      <div className="text-[10px] opacity-75">#0F172A ညဘက်</div>
                    </div>
                  </button>
                </div>

                {/* TTS Speed & Furigana Toggle */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                      <span>日本語 音声速度 (TTS Speed)</span>
                    </span>
                    <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => onChangeSpeechRate(1.0)}
                        className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                          speechRate === 1.0
                            ? 'bg-sky-600 text-white'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        1.0x 標準
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeSpeechRate(0.8)}
                        className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                          speechRate === 0.8
                            ? 'bg-sky-600 text-white'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        0.8x ゆっくり
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      ふりがな表示 (Ruby Annotation)
                    </span>
                    <button
                      type="button"
                      onClick={onToggleFurigana}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        showFurigana
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {showFurigana ? 'ON (ပြထားသည်)' : 'OFF (ဖျောက်ထားသည်)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Category 2: Complete Interactive Flashcards (388 Words) */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  02. 3D ဖလက်ရှ်ကတ် လေ့ကျင့်ခန်း (All 388 Words)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  အသုံးအနှုန်း ၁၀၉ ခု + ဝေါဟာရ ၂၇၉ လုံး (စုစုပေါင်း ၃၈၈ ကတ်) ကို ရှေ့နောက်လှန်၍ အသံထွက်ဖြင့် ကျက်မှတ်ပါ။
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
                  <span>လေ့လာပြီး: <strong className="text-slate-900 dark:text-white tabular-nums">{studiedCardsCount} / 388</strong></span>
                  <span>·</span>
                  <span>ရပြီး: <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">{masteredCount}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectModal('flashcards');
                    onCloseDrawer();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open 388 Interactive Flashcards</span>
                </button>
              </div>

              {/* Category 3: Interactive 109-Question Mock Exam Simulator */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  03. စာမေးပွဲမေးခွန်း ၁၀၉ ပုဒ် လေ့ကျင့်ခန်း (Mock Exam Simulator)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  အပိုင်း (၇) ပါ စာမေးပွဲမေးခွန်း ၁၀၉ ပုဒ်လုံးကို ဌာနအလိုက် ရွေးချယ်ဖြေဆိုပြီး အမှတ်စာရင်းနှင့် ရှင်းလင်းချက်များကို စစ်ဆေးပါ။
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
                  <span>ဖြေဆိုပြီး: <strong className="text-slate-900 dark:text-white tabular-nums">{examStats.totalAnswered} / 109</strong></span>
                  <span>·</span>
                  <span>မှန်ကန်မှု: <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">{examStats.accuracy}%</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectModal('exam');
                    onCloseDrawer();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Open 109-Question Mock Exam</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
              特定技能2号 (宿泊業) 完全攻略学習ガイド · Complete 109 Terms, 279 Vocab & 109 Exam Questions
            </div>
          </aside>
        </div>
      )}

      {/* MODAL 1: 388-Card Interactive 3D Flashcards */}
      {activeModal === 'flashcards' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive 388 Flashcards"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                  Interactive 3D Flashcards · 全388語（専門用語109＋重要語彙279）
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  ဖလက်ရှ်ကတ် လေ့ကျင့်ခန်း ({studiedCardsCount} / {allFlashcards.length} Cards Studied · Mastered: {masteredCount})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onSelectModal('none')}
                aria-label="Close Flashcards Modal"
                className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Deck & Category Filters */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1">
                  {(
                    [
                      { key: 'all', label: 'All 388 Cards' },
                      { key: 'term', label: '109 Core Terms' },
                      { key: 'vocab', label: '279 Vocabulary' }
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDeckFilter(d.key)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        deckFilter === d.key
                          ? 'bg-sky-600 text-white'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  {(
                    [
                      { key: 'all', label: `All` },
                      { key: 'review', label: `Need Review (${reviewCount})` },
                      { key: 'mastered', label: `Mastered (${masteredCount})` }
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setCardStatusFilter(st.key)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        cardStatusFilter === st.key
                          ? 'bg-slate-900 dark:bg-sky-500 text-white'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCardDeptFilter('all')}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium cursor-pointer ${
                    cardDeptFilter === 'all'
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:underline'
                  }`}
                >
                  全6部門
                </button>
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.key}
                    type="button"
                    onClick={() => setCardDeptFilter(dept.key)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium cursor-pointer ${
                      cardDeptFilter === dept.key
                        ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                        : 'text-slate-600 dark:text-slate-400 hover:underline'
                    }`}
                  >
                    {dept.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Stage */}
            <div className="p-5 sm:p-6 space-y-5">
              {filteredDeck.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    ရွေးချယ်ထားသော စစ်ထုတ်မှုအောက်တွင် ကတ်မရှိသေးပါ။
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDeckFilter('all');
                      setCardDeptFilter('all');
                      setCardStatusFilter('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    ကတ်အားလုံး (388) ပြန်ပြရန်
                  </button>
                </div>
              ) : (
                (() => {
                  const safeIndex = Math.min(currentCardIndex, filteredDeck.length - 1);
                  const currentCard = filteredDeck[safeIndex];
                  const currentBadge = cardStatus[currentCard.uid];

                  return (
                    <>
                      {/* Progress bar & Counter */}
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                          Card {safeIndex + 1} / {filteredDeck.length} ({currentCard.sourceType === 'term' ? `専門用語 #${currentCard.numericId}` : `重要語彙 #${currentCard.numericId}`})
                        </span>
                        <span>
                          {getDeptName(currentCard.deptKey)}
                          {currentBadge === 'mastered' && ' · ✓ Mastered'}
                          {currentBadge === 'review' && ' · ! Need Review'}
                        </span>
                      </div>

                      {/* 3D Flip Card */}
                      <div
                        onClick={() => setIsFlipped((f) => !f)}
                        role="button"
                        tabIndex={0}
                        aria-label="Flip flashcard front and back"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setIsFlipped((f) => !f);
                          }
                        }}
                        className="min-h-[260px] sm:min-h-[290px] rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 p-6 sm:p-8 flex flex-col justify-between cursor-pointer hover:border-sky-400 transition-all select-none"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>
                            {isFlipped ? '裏面 (Back: Definition & Myanmar Meaning)' : '表面 (Front: Tap card to flip)'}
                          </span>
                          <SpeakerButton
                            text={isFlipped ? currentCard.backJp : currentCard.frontMainJp}
                            rate={speechRate}
                            size="md"
                          />
                        </div>

                        {!isFlipped ? (
                          <div className="my-auto text-center space-y-3 py-4">
                            <div className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                              <RubyText text={currentCard.frontMainJp} showFurigana={showFurigana} />
                            </div>
                            <div className="text-sm sm:text-base font-medium text-sky-700 dark:text-sky-400">
                              {currentCard.frontSubText}
                            </div>
                          </div>
                        ) : (
                          <div className="my-auto space-y-3 py-2">
                            <div className="text-xs font-bold text-slate-400">
                              <RubyText text={currentCard.frontMainJp} showFurigana={showFurigana} /> · {currentCard.frontSubText}
                            </div>
                            <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                              <RubyText text={currentCard.backJp} showFurigana={showFurigana} />
                            </p>
                            <p className="text-sm sm:text-base text-emerald-800 dark:text-emerald-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-700">
                              {currentCard.backMm}
                            </p>
                            {currentCard.extraTip && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                                <RubyText text={currentCard.extraTip} showFurigana={showFurigana} />
                              </p>
                            )}
                          </div>
                        )}

                        <div className="text-center text-[11px] text-slate-400">
                          ကတ်ကို တစ်ချက်နှိပ်၍ ရှေ့/နောက် လှန်ကြည့်ပါ (Click card to flip)
                        </div>
                      </div>

                      {/* Controls: Prev, Next, Shuffle, Mark Mastered / Need Review */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsFlipped(false);
                              setCurrentCardIndex((idx) => (idx > 0 ? idx - 1 : filteredDeck.length - 1));
                            }}
                            className="min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Prev</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsFlipped(false);
                              setCurrentCardIndex((idx) => (idx + 1) % filteredDeck.length);
                            }}
                            className="min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsShuffled(true);
                              setShuffleSeed((s) => s + 7);
                            }}
                            className="min-h-[40px] px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-sky-500 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Shuffle className="w-3.5 h-3.5" />
                            <span>Shuffle</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCardStatus((prev) => ({ ...prev, [currentCard.uid]: 'review' }))
                            }
                            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                              currentBadge === 'review'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                            }`}
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Need Review</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setCardStatus((prev) => ({ ...prev, [currentCard.uid]: 'mastered' }))
                            }
                            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                              currentBadge === 'mastered'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            }`}
                          >
                            <BookmarkCheck className="w-3.5 h-3.5" />
                            <span>Mastered</span>
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive 109-Question Mock Exam Simulator */}
      {activeModal === 'exam' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="109-Question Mock Exam Simulator"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto">
            {/* Simulator Header & Scorecard */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                  Interactive 109-Question Mock Exam Simulator · 特定技能2号（宿泊業）
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  <span>ဖြေဆိုပြီး: <strong className="tabular-nums">{examStats.totalAnswered} / 109</strong></span>
                  <span>·</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    အမှတ်: <strong className="tabular-nums">{examStats.correctCount}</strong> မှန် ({examStats.accuracy}%)
                  </span>
                  <span>·</span>
                  <span className="text-rose-600 dark:text-rose-400">
                    အမှား: <strong className="tabular-nums">{examStats.wrongCount}</strong> ပုဒ်
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setExamAnswers({});
                    setExamWrongOnly(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Score</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModal('none')}
                  aria-label="Close Mock Exam Simulator"
                  className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Selector & Myanmar Toggle */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setExamDeptFilter('all');
                    setExamWrongOnly(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    examDeptFilter === 'all' && !examWrongOnly
                      ? 'bg-sky-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  All 109 Questions
                </button>
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.key}
                    type="button"
                    onClick={() => {
                      setExamDeptFilter(dept.key);
                      setExamWrongOnly(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      examDeptFilter === dept.key && !examWrongOnly
                        ? 'bg-sky-600 text-white'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {dept.nameEn}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setExamWrongOnly((w) => !w)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    examWrongOnly
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  မှားထားသော မေးခွန်းများ ({examStats.wrongCount})
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowMyanmarStem((s) => !s)}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
              >
                {showMyanmarStem ? 'မြန်မာပြန် ဖျောက်မည်' : 'မြန်မာပြန် ပြမည်'}
              </button>
            </div>

            {/* Active Question Content */}
            <div className="p-5 sm:p-6 space-y-5">
              {filteredExamQuestions.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    မှားယွင်းထားသော မေးခွန်း မရှိပါ (သို့မဟုတ် မဖြေဆိုရသေးပါ)။
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setExamWrongOnly(false);
                      setExamDeptFilter('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    မေးခွန်း ၁၀၉ ပုဒ်လုံးသို့ ပြန်သွားရန်
                  </button>
                </div>
              ) : (
                (() => {
                  const safeQIdx = Math.min(currentQuestionIdx, filteredExamQuestions.length - 1);
                  const currentQ = filteredExamQuestions[safeQIdx];
                  const pickedOption = examAnswers[currentQ.id];
                  const isCorrect = pickedOption === currentQ.correctKey;

                  return (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                          Question {safeQIdx + 1} of {filteredExamQuestions.length} · (မေးခွန်း အမှတ်စဉ် #{currentQ.id})
                        </div>
                        <SpeakerButton text={currentQ.questionJp} rate={speechRate} size="md" />
                      </div>

                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          【<RubyText text={currentQ.termTitle} showFurigana={showFurigana} />】
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line">
                          <RubyText text={currentQ.questionJp} showFurigana={showFurigana} />
                        </p>
                        {showMyanmarStem && (
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200/70 dark:border-slate-700/70">
                            {currentQ.questionMm}
                          </p>
                        )}
                      </div>

                      {/* 4 Multiple Choice Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentQ.options.map((opt) => {
                          const isPicked = pickedOption === opt.key;
                          const isOptCorrect = opt.key === currentQ.correctKey;

                          let style =
                            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-sky-500';
                          if (pickedOption) {
                            if (isOptCorrect) {
                              style =
                                'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                            } else if (isPicked) {
                              style =
                                'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100';
                            }
                          }

                          return (
                            <div
                              key={opt.key}
                              className={`p-2.5 sm:p-3 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 ${style}`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setExamAnswers((prev) => ({ ...prev, [currentQ.id]: opt.key }))
                                }
                                className="flex-1 text-left py-1 cursor-pointer flex items-center gap-1"
                              >
                                <span className="font-mono font-bold mr-1.5">{opt.key}.</span>
                                <RubyText text={opt.text} showFurigana={showFurigana} />
                              </button>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <SpeakerButton text={opt.text} rate={speechRate} />
                                {pickedOption && isOptCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                )}
                                {pickedOption && isPicked && !isOptCorrect && (
                                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Instant Explanation Unfold */}
                      {pickedOption && (
                        <div
                          className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${
                            isCorrect
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                              : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                          }`}
                        >
                          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <span>
                              {isCorrect ? '✓ 正解 (အဖြေမှန်ပါသည်!)' : '✗ 不正解 (အဖြေမှားနေပါသည်)'}
                            </span>
                            <span>·</span>
                            <span>
                              အဖြေမှန်: {currentQ.correctKey}.{' '}
                              <RubyText text={currentQ.correctText} showFurigana={showFurigana} />
                            </span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                            <strong>ရှင်းလင်းချက်:</strong>{' '}
                            <RubyText text={currentQ.explanationMm} showFurigana={showFurigana} />
                          </p>
                        </div>
                      )}

                      {/* Navigation Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentQuestionIdx((idx) =>
                              idx > 0 ? idx - 1 : filteredExamQuestions.length - 1
                            )
                          }
                          className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>ရှေ့မေးခွန်း (Prev)</span>
                        </button>

                        <select
                          aria-label="Jump to question number"
                          value={safeQIdx}
                          onChange={(e) => setCurrentQuestionIdx(Number(e.target.value))}
                          className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                        >
                          {filteredExamQuestions.map((qItem, i) => (
                            <option key={qItem.id} value={i}>
                              Q{qItem.id}: {qItem.termTitle.slice(0, 18)} {examAnswers[qItem.id] ? (examAnswers[qItem.id] === qItem.correctKey ? '✓' : '✗') : ''}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            setCurrentQuestionIdx((idx) => (idx + 1) % filteredExamQuestions.length)
                          }
                          className="min-h-[40px] px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>နောက်မေးခွန်း (Next)</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
