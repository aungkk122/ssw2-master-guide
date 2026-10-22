import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Layers,
  CheckCircle2,
  XCircle,
  BookOpen,
  Sparkles,
  Calculator,
  Award
} from 'lucide-react';
import { TERMS_DATA } from '../data/termsData';
import { VOCAB_DATA } from '../data/vocabData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { DEPARTMENTS } from '../data/departments';
import { THEORIES_DATA } from '../data/theoriesData';
import { RubyText } from './RubyText';
import { SpeakerButton } from './SpeakerButton';
import { SpeechRate } from '../utils/tts';

interface OriginalDocsViewProps {
  showFurigana: boolean;
  speechRate: SpeechRate;
  searchQuery: string;
  focusedItem: { type: 'term' | 'vocab' | 'question'; id: number } | null;
  onClearFocusedItem: () => void;
  onOpenUtility: (util: 'flashcards' | 'exam') => void;
  onJumpToTheories: () => void;
}

export const OriginalDocsView: React.FC<OriginalDocsViewProps> = ({
  showFurigana,
  speechRate,
  searchQuery,
  focusedItem,
  onClearFocusedItem,
  onOpenUtility,
  onJumpToTheories
}) => {
  const [openParts, setOpenParts] = useState<Record<string, boolean>>({
    part1: true,
    part2: true,
    part3: false,
    part4: false,
    part5: true,
    part6: true,
    part7: false
  });

  const [termRange, setTermRange] = useState<'all' | '1-30' | '31-60' | '61-90' | '91-109'>('all');
  const [expandedTerms, setExpandedTerms] = useState<Record<number, boolean>>({});
  const [allTermsExpanded, setAllTermsExpanded] = useState<boolean>(true);

  const [vocabRange, setVocabRange] = useState<'1-70' | '71-140' | '141-210' | '211-279' | 'all'>('1-70');
  const [questionRange, setQuestionRange] = useState<'1-30' | '31-60' | '61-90' | '91-109' | 'all'>('1-30');
  const [inlineAnswers, setInlineAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});

  useEffect(() => {
    if (!focusedItem) return;
    if (focusedItem.type === 'term') {
      setOpenParts((p) => ({ ...p, part2: true }));
      setTermRange('all');
      setExpandedTerms((prev) => ({ ...prev, [focusedItem.id]: true }));
      setTimeout(() => {
        document.getElementById(`doc-term-${focusedItem.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        onClearFocusedItem();
      }, 120);
    } else if (focusedItem.type === 'vocab') {
      setOpenParts((p) => ({ ...p, part4: true }));
      setVocabRange('all');
      setTimeout(() => {
        document.getElementById(`doc-vocab-${focusedItem.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        onClearFocusedItem();
      }, 120);
    } else if (focusedItem.type === 'question') {
      setOpenParts((p) => ({ ...p, part7: true }));
      setQuestionRange('all');
      setTimeout(() => {
        document.getElementById(`doc-question-${focusedItem.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        onClearFocusedItem();
      }, 120);
    }
  }, [focusedItem, onClearFocusedItem]);

  const togglePart = (partKey: string) => {
    setOpenParts((prev) => ({ ...prev, [partKey]: !prev[partKey] }));
  };

  const expandAllParts = (expand: boolean) => {
    setOpenParts({
      part1: expand,
      part2: expand,
      part3: expand,
      part4: expand,
      part5: expand,
      part6: expand,
      part7: expand
    });
  };

  const filteredTerms = TERMS_DATA.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        t.termJp.toLowerCase().includes(q) ||
        t.furigana.toLowerCase().includes(q) ||
        t.english.toLowerCase().includes(q) ||
        t.definitionJp.toLowerCase().includes(q) ||
        t.explanationMm.toLowerCase().includes(q) ||
        String(t.id) === q
      );
    }
    if (termRange === '1-30') return t.id >= 1 && t.id <= 30;
    if (termRange === '31-60') return t.id >= 31 && t.id <= 60;
    if (termRange === '61-90') return t.id >= 61 && t.id <= 90;
    if (termRange === '91-109') return t.id >= 91 && t.id <= 109;
    return true;
  });

  const filteredVocab = VOCAB_DATA.filter((v) => {
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        v.kanji.toLowerCase().includes(q) ||
        v.furigana.toLowerCase().includes(q) ||
        v.meaningMm.toLowerCase().includes(q) ||
        v.relatedTerm.toLowerCase().includes(q)
      );
    }
    if (vocabRange === '1-70') return v.id >= 1 && v.id <= 70;
    if (vocabRange === '71-140') return v.id >= 71 && v.id <= 140;
    if (vocabRange === '141-210') return v.id >= 141 && v.id <= 210;
    if (vocabRange === '211-279') return v.id >= 211 && v.id <= 279;
    return true;
  });

  const filteredQuestions = QUESTIONS_DATA.filter((qn) => {
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        qn.termTitle.toLowerCase().includes(q) ||
        qn.questionJp.toLowerCase().includes(q) ||
        qn.questionMm.toLowerCase().includes(q) ||
        qn.explanationMm.toLowerCase().includes(q) ||
        String(qn.id) === q
      );
    }
    if (questionRange === '1-30') return qn.id >= 1 && qn.id <= 30;
    if (questionRange === '31-60') return qn.id >= 31 && qn.id <= 60;
    if (questionRange === '61-90') return qn.id >= 61 && qn.id <= 90;
    if (questionRange === '91-109') return qn.id >= 91 && qn.id <= 109;
    return true;
  });

  const isTermOpen = (id: number) => {
    if (expandedTerms[id] !== undefined) return expandedTerms[id];
    return allTermsExpanded;
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner & Quick Outline Bar */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-medium text-sky-700 dark:text-sky-400">
              Specified Skilled Worker No.2 (Accommodation Industry) · Master Study Guide & Myanmar Translation
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.9] pt-1">
              <RubyText
                text="【特定技能2号 宿泊業】専門用語集・完全攻略学習ガイド"
                showFurigana={showFurigana}
              />
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ဤသင်ထောက်ကူပြု စာအုပ်အထူးထုတ်သည် 特定技能2号 (宿泊業 - ဟိုတယ်နှင့် ရိုကန်လုပ်ငန်း) စာမေးပွဲ ဖြေဆိုရန်နှင့် မန်နေဂျာအဆင့် လုပ်ငန်းခွင်ကျွမ်းကျင်ရန်အတွက် အပိုင်း (၁) မှ အပိုင်း (၇) အထိ အပြည့်အစုံ စုစည်းထားသော မူရင်းစာအုပ်ကြီး ဖြစ်ပါသည်။
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>အသုံးအနှုန်း <strong className="text-slate-900 dark:text-white tabular-nums">109</strong> ခု</span>
              <span aria-hidden="true">·</span>
              <span>ဟိုတယ်ဌာန <strong className="text-slate-900 dark:text-white tabular-nums">6</strong> ခု</span>
              <span aria-hidden="true">·</span>
              <span>ခန်းဂျီးနှင့် ဝေါဟာရ <strong className="text-slate-900 dark:text-white tabular-nums">279</strong> လုံး</span>
              <span aria-hidden="true">·</span>
              <span>လေ့ကျင့်ခန်းမေးခွန်း <strong className="text-slate-900 dark:text-white tabular-nums">109</strong> ပုဒ်</span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onOpenUtility('flashcards')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-sky-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>388 Flashcards လေ့ကျင့်ရန်</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenUtility('exam')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>109 Mock Exam ဖြေဆိုရန်</span>
            </button>
          </div>
        </div>

        {/* Document Outline Quick-Jump Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: 'part1', label: 'အပိုင်း (၁) လမ်းညွှန်' },
              { key: 'part2', label: 'အပိုင်း (၂) ဝေါဟာရ ၁၀၉ ခု' },
              { key: 'part3', label: 'အပိုင်း (၃) ဌာန ၆ ခုဇယား' },
              { key: 'part4', label: 'အပိုင်း (၄) ခန်းဂျီး ၂၇၉ လုံး' },
              { key: 'part5', label: 'အပိုင်း (၅) ပုံသေနည်းများ' },
              { key: 'part6', label: 'အပိုင်း (၆) ဥပဒေနှင့်အခွန်' },
              { key: 'part7', label: 'အပိုင်း (၇) မေးခွန်း ၁၀၉ ပုဒ်' }
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setOpenParts((p) => ({ ...p, [item.key]: true }));
                  document.getElementById(`section-${item.key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  openParts[item.key]
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/70 dark:border-sky-800/70'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => expandAllParts(true)}
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium cursor-pointer"
            >
              အားလုံးဖွင့်မည်
            </button>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              type="button"
              onClick={() => expandAllParts(false)}
              className="text-slate-500 dark:text-slate-400 hover:underline font-medium cursor-pointer"
            >
              အားလုံးပိတ်မည်
            </button>
          </div>
        </div>
      </section>

      {/* PART 1: Exam Overview & 4-Step Strategy */}
      <section
        id="section-part1"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part1')}
          aria-expanded={openParts.part1}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 1 · 試験概要と4ステップ学習戦略
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၁) - <RubyText text="特定技能2号（宿泊業）" showFurigana={showFurigana} /> စာမေးပွဲ အောင်မြင်ရေး အသေးစိတ် လေ့လာမှု လမ်းညွှန်
            </h2>
          </div>
          {openParts.part1 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part1 && (
          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6">
            {/* 1.1 */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                ၁.၁ <RubyText text="特定技能2号（宿泊業）" showFurigana={showFurigana} /> စာမေးပွဲ အဆင့်သတ်မှတ်ချက်နှင့် သဘောသဘာဝ
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <RubyText text="特定技能1号" showFurigana={showFurigana} /> သည် လက်တွေ့လုပ်ငန်းခွင်တွင် ညွှန်ကြားချက်အတိုင်း အခြေခံလုပ်ငန်းများကို ကျွမ်းကျင်စွာ ဆောင်ရွက်နိုင်မှုကို စစ်ဆေးခြင်းဖြစ်သော်လည်း <RubyText text="特定技能2号" showFurigana={showFurigana} /> သည် <strong>Supervisory Level (ကြီးကြပ်ကွပ်ကဲသူ / မန်နေဂျာအဆင့်)</strong> စွမ်းဆောင်ရည်ကို စစ်ဆေးခြင်း ဖြစ်သည်။
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    01. ဦးဆောင်မှုနှင့် စီမံခန့်ခွဲမှု (Management & Leadership)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    ဝန်ထမ်းများ (<RubyText text="従業員" showFurigana={showFurigana} />) အား ကြီးကြပ်ကွပ်ကဲခြင်း၊ အဆိုင်းချထားခြင်း၊ လုပ်ငန်းခွင်လုံခြုံရေးနှင့် သန့်ရှင်းရေး (<RubyText text="衛生・清掃" showFurigana={showFurigana} />) ထိန်းချုပ်ခြင်း။
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    02. ဟိုတယ်ဝင်ငွေနှင့် စရိတ်စီမံခန့်ခွဲမှု (Revenue & Cost Management)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    ADR, OCC, RevPAR, <RubyText text="FL率" showFurigana={showFurigana} />, F&B Control, Yield Management တို့ကို သဘောပေါက်နားလည်ပြီး တွက်ချက်စီမံနိုင်ရမည်။
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    03. ဥပဒေနှင့် ဘေးကင်းလုံခြုံရေး (Legal & Compliance)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    <RubyText text="旅館業法" showFurigana={showFurigana} /> (ရိုကန်လုပ်ငန်းဥပဒေ)၊ <RubyText text="宿泊者名簿" showFurigana={showFurigana} /> ထိန်းသိမ်းခြင်း၊ <RubyText text="宿泊約款" showFurigana={showFurigana} />၊ အခွန်စနစ်များ (<RubyText text="宿泊税・入湯税" showFurigana={showFurigana} />)၊ မီးဘေးနှင့် HACCP စံနှုန်းများကို တိကျစွာ လိုက်နာနိုင်ရမည်။
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    04. အဆင့်မြင့် ဂျပန်ဘာသာစကားနှင့် ဧည့်ခံမှု (High-level Japanese & Keigo)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    ဂျပန်လူမျိုး အထက်လူကြီးများ (<RubyText text="上司" showFurigana={showFurigana} />)၊ ဧည့်သည်တော်များနှင့် ရှုပ်ထွေးသော ပြဿနာများကို ညှိနှိုင်းဖြေရှင်းနိုင်သည့် <RubyText text="敬語・おもてなし" showFurigana={showFurigana} /> စွမ်းရည် လိုအပ်ပါသည်။
                  </p>
                </div>
              </div>
            </div>

            {/* 1.2 */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                ၁.၂ စနစ်တကျ လေ့လာရန် အဆင့် ၄ ဆင့် ဗျူဟာ (4-Step Study Roadmap)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    step: 'Step 01',
                    title: 'ဝေါဟာရ ၁၀၉ ခု နားလည်ခြင်း',
                    desc: 'အသုံးအနှုန်း ၁၀၉ ခု၏ ခန်းဂျီး၊ ဖတ်နည်း (Furigana) နှင့် မြန်မာလို အဓိပ္ပာယ်ကို စာကြောင်းအလိုက် အလွတ်ကျက်မှတ်ခြင်း။'
                  },
                  {
                    step: 'Step 02',
                    title: 'ဌာန ၆ ခုအလိုက် ဆက်စပ်လေ့လာခြင်း',
                    desc: 'Front Office, F&B, Housekeeping, Revenue Management စသည့် ကဏ္ဍအလိုက် ချိတ်ဆက်ပုံကို ဇယားများဖြင့် လေ့လာခြင်း။'
                  },
                  {
                    step: 'Step 03',
                    title: 'ပုံသေနည်းများ တွက်ချက်လေ့ကျင့်ခြင်း',
                    desc: 'ADR, OCC, RevPAR, FL Ratio ပုံသေနည်းများကို ဂဏန်းအမျိုးမျိုး ထည့်သွင်း၍ ကိုယ်တိုင်တွက်ချက်လေ့ကျင့်ခြင်း။'
                  },
                  {
                    step: 'Step 04',
                    title: 'မေးခွန်း ၁၀၉ ပုဒ် လက်တွေ့ဖြေဆိုခြင်း',
                    desc: 'ဂျပန်လို ပေးထားသော စာမေးပွဲမေးခွန်း ၁၀၉ ခုလုံးကို အချိန်သတ်မှတ်၍ ဖြေဆိုခြင်းဖြင့် စာမေးပွဲအတွေ့အကြုံ ယူခြင်း။'
                  }
                ].map((s) => (
                  <div
                    key={s.step}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-sky-600 dark:text-sky-400">
                        {s.step}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PART 2: Complete 109 Term Glossary */}
      <section
        id="section-part2"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part2')}
          aria-expanded={openParts.part2}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 2 · 専門用語全109語の詳細解説（日緬対訳）
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၂) - အသုံးအနှုန်း ၁၀၉ ခုလုံးကို စာကြောင်းတိုင်း အသေးစိတ် ဂျပန်-မြန်မာ ပြန်ဆိုချက် ({filteredTerms.length} / 109)
            </h2>
          </div>
          {openParts.part2 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part2 && (
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            {/* Controls bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(
                  [
                    { key: 'all', label: '全109語 (All 109)' },
                    { key: '1-30', label: '1〜30' },
                    { key: '31-60', label: '31〜60' },
                    { key: '61-90', label: '61〜90' },
                    { key: '91-109', label: '91〜109' }
                  ] as const
                ).map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setTermRange(r.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      termRange === r.key
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  const nextState = !allTermsExpanded;
                  setAllTermsExpanded(nextState);
                  setExpandedTerms({});
                }}
                className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
              >
                {allTermsExpanded ? 'ကတ်အားလုံး ခေါက်သိမ်းမည်' : 'ကတ်အားလုံး ဖြန့်ကြည့်မည်'}
              </button>
            </div>

            {/* 109 Terms List */}
            <div className="grid grid-cols-1 gap-3">
              {filteredTerms.map((term) => {
                const open = isTermOpen(term.id);
                return (
                  <article
                    key={term.id}
                    id={`doc-term-${term.id}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden transition-colors"
                  >
                    <div
                      onClick={() => setExpandedTerms((prev) => ({ ...prev, [term.id]: !open }))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedTerms((prev) => ({ ...prev, [term.id]: !open }));
                        }
                      }}
                      className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                          {String(term.id).padStart(3, '0')}.
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                          <RubyText
                            text={term.rawTitle}
                            showFurigana={showFurigana}
                            highlightQuery={searchQuery}
                          />
                        </h3>
                        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                          {term.english}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          · {term.subCatEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <SpeakerButton
                          text={term.termJp}
                          rate={speechRate}
                          label={`Pronounce ${term.termJp}`}
                        />
                        {open ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {open && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                              🇯🇵 မူရင်း ဂျပန်စာကြောင်း (Japanese Definition)
                            </div>
                            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed">
                              <RubyText
                                text={term.definitionJp}
                                showFurigana={showFurigana}
                                highlightQuery={searchQuery}
                              />
                            </p>
                          </div>
                          <SpeakerButton
                            text={term.definitionJp}
                            rate={speechRate}
                            size="md"
                            label={`Read Japanese definition for ${term.termJp}`}
                          />
                        </div>

                        <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            🇲🇲 မြန်မာပြန်ဆိုရှင်းလင်းချက် (Myanmar Translation)
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            {term.explanationMm}
                          </p>
                        </div>

                        {term.keyVocabRaw && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 mr-1.5">
                              အဓိက ဝေါဟာရများ:
                            </span>
                            <RubyText
                              text={term.keyVocabRaw}
                              showFurigana={showFurigana}
                              highlightQuery={searchQuery}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* PART 3: Categorized Departmental Tables (6 Departments) */}
      <section
        id="section-part3"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part3')}
          aria-expanded={openParts.part3}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 3 · 部門別6カテゴリー体系表
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၃) - ကဏ္ဍအလိုက် စနစ်တကျ ဖွဲ့စည်းထားသော လေ့လာမှု ဇယားကွက်ကြီးများ (၆ ဌာနခွဲ)
            </h2>
          </div>
          {openParts.part3 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part3 && (
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-6">
            {DEPARTMENTS.map((dept) => {
              const deptTerms = TERMS_DATA.filter((t) => t.deptKey === dept.key);
              return (
                <div key={dept.key} className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                      {dept.nameMm} · <RubyText text={dept.nameJp} showFurigana={showFurigana} />
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      စုစုပေါင်း {deptTerms.length} ခု
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                          <th className="py-2.5 px-3 font-semibold w-14">စဉ်</th>
                          <th className="py-2.5 px-3 font-semibold min-w-[180px]">ဂျပန်အသုံးအနှုန်း (English)</th>
                          <th className="py-2.5 px-3 font-semibold min-w-[260px]">ဂျပန်မူရင်း အဓိပ္ပာယ်ဖွင့်ဆိုချက်</th>
                          <th className="py-2.5 px-3 font-semibold min-w-[260px]">မြန်မာလို ရှင်းလင်းချက်</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {deptTerms.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                            <td className="py-3 px-3 font-mono text-xs text-slate-500 tabular-nums align-top">
                              {t.id}
                            </td>
                            <td className="py-3 px-3 align-top">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-slate-100">
                                    <RubyText text={t.rawTitle} showFurigana={showFurigana} />
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {t.english}
                                  </div>
                                </div>
                                <SpeakerButton text={t.termJp} rate={speechRate} />
                              </div>
                            </td>
                            <td className="py-3 px-3 align-top text-slate-800 dark:text-slate-200 leading-relaxed">
                              <div className="flex items-start justify-between gap-2">
                                <RubyText text={t.definitionJp} showFurigana={showFurigana} />
                                <SpeakerButton text={t.definitionJp} rate={speechRate} />
                              </div>
                            </td>
                            <td className="py-3 px-3 align-top text-slate-700 dark:text-slate-300 leading-relaxed">
                              {t.explanationMm}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PART 4: Vocabulary Breakdown List (279 Vocab & Kanji) */}
      <section
        id="section-part4"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part4')}
          aria-expanded={openParts.part4}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 4 · 重要漢字・語彙分解リスト（全279語）
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၄) - ဝေါဟာရ တစ်လုံးချင်းစီ သီးသန့် ဇယားကွက် (ခန်းဂျီးနှင့် ဝေါဟာရ ၂၇၉ လုံး)
            </h2>
          </div>
          {openParts.part4 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part4 && (
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(
                  [
                    { key: '1-70', label: '1〜70' },
                    { key: '71-140', label: '71〜140' },
                    { key: '141-210', label: '141〜210' },
                    { key: '211-279', label: '211〜279' },
                    { key: 'all', label: '全279語 (All 279)' }
                  ] as const
                ).map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setVocabRange(r.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      vocabRange === r.key
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                ပြသထားသည်: {filteredVocab.length} / 279 လုံး
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2.5 px-3 font-semibold w-14">စဉ်</th>
                    <th className="py-2.5 px-3 font-semibold">Kanji (漢字)</th>
                    <th className="py-2.5 px-3 font-semibold">Furigana (ふりがな)</th>
                    <th className="py-2.5 px-3 font-semibold">မြန်မာအဓိပ္ပာယ်</th>
                    <th className="py-2.5 px-3 font-semibold">ဆက်စပ်အသုံးအနှုန်း</th>
                    <th className="py-2.5 px-3 font-semibold w-14 text-center">音声</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredVocab.map((v) => (
                    <tr
                      key={v.id}
                      id={`doc-vocab-${v.id}`}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                    >
                      <td className="py-2.5 px-3 font-mono text-xs text-slate-500 tabular-nums">
                        {v.id}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                        <RubyText
                          text={v.kanji}
                          showFurigana={showFurigana}
                          highlightQuery={searchQuery}
                        />
                      </td>
                      <td className="py-2.5 px-3 text-sky-700 dark:text-sky-300">
                        {v.furigana}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-200">
                        {v.meaningMm}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                        <RubyText text={v.relatedTerm} showFurigana={showFurigana} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <SpeakerButton text={v.kanji} rate={speechRate} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* PART 5: Revenue Management Formulas & Math */}
      <section
        id="section-part5"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part5')}
          aria-expanded={openParts.part5}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 5 · 重要計算公式（ADR / OCC / RevPAR / FL率 / ABC分析）
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၅) - ဟိုတယ်စီမံခန့်ခွဲမှု အဓိက တွက်ချက်မှု ပုံသေနည်းများနှင့် လက်တွေ့တွက်နည်းများ (၅.၁ မှ ၅.၅)
            </h2>
          </div>
          {openParts.part5 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part5 && (
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                特定技能2号 (宿泊業) စာမေးပွဲတွင် အခန်းရောင်းချမှုနှင့် ကုန်ကျစရိတ် စီမံခန့်ခွဲမှု စွမ်းရည်ကို တိုင်းတာရန် မဖြစ်မနေ မေးလေ့ရှိသော ပုံသေနည်း ၅ ခု ဖြစ်ပါသည်။
              </p>
              <button
                type="button"
                onClick={onJumpToTheories}
                className="px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Calculator ဖြင့် တွက်ကြည့်ရန်</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {THEORIES_DATA.filter((th) => th.part === 'part5').map((th) => (
                <div
                  key={th.id}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                        {th.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        <RubyText text={th.titleJp} showFurigana={showFurigana} /> · {th.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{th.titleMm}</p>
                    </div>
                    <SpeakerButton text={`${th.titleJp}。${th.formulaOrRuleJp}`} rate={speechRate} />
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    <div>
                      <RubyText text={th.formulaOrRuleJp} showFurigana={showFurigana} />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
                      {th.formulaOrRuleMm}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {th.summaryMm}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* PART 6: Laws, Taxes, and Safety Regulations */}
      <section
        id="section-part6"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part6')}
          aria-expanded={openParts.part6}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 6 · 旅館業法・宿泊者名簿・税金・HACCP衛生基準
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၆) - ဂျပန်ဟိုတယ်ဥပဒေ၊ အခွန်များနှင့် ဘေးအန္တရာယ် ကာကွယ်ရေး စည်းမျဉ်းများ အနှစ်ချုပ် (၆.၁ မှ ၆.၄)
            </h2>
          </div>
          {openParts.part6 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part6 && (
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {THEORIES_DATA.filter((th) => th.part === 'part6').map((th) => (
                <div
                  key={th.id}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                        {th.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        <RubyText text={th.titleJp} showFurigana={showFurigana} /> · {th.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{th.titleMm}</p>
                    </div>
                    <SpeakerButton text={th.summaryJp} rate={speechRate} />
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    <RubyText text={th.summaryJp} showFurigana={showFurigana} />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {th.summaryMm}
                  </p>
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                    {th.examPointMm}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* PART 7: Complete 109 Mock Exam Questions & Detailed Answers */}
      <section
        id="section-part7"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => togglePart('part7')}
          aria-expanded={openParts.part7}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Part 7 · 実践模擬試験問題（全109問・解答解説付き）
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              အပိုင်း (၇) - စာမေးပွဲပုံစံ လေ့ကျင့်ခန်း မေးခွန်း ၁၀၉ ခုနှင့် အဖြေများ (၇.၁ မှ ၇.၁၀၉ အထိ)
            </h2>
          </div>
          {openParts.part7 ? (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {openParts.part7 && (
          <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(
                  [
                    { key: '1-30', label: 'Q1〜Q30' },
                    { key: '31-60', label: 'Q31〜Q60' },
                    { key: '61-90', label: 'Q61〜Q90' },
                    { key: '91-109', label: 'Q91〜Q109' },
                    { key: 'all', label: '全109問 (All 109)' }
                  ] as const
                ).map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setQuestionRange(r.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      questionRange === r.key
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onOpenUtility('exam')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-sky-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors cursor-pointer"
              >
                Full Mock Exam Simulator ဖွင့်ရန်
              </button>
            </div>

            <div className="space-y-4">
              {filteredQuestions.map((qn) => {
                const selected = inlineAnswers[qn.id];
                const isCorrect = selected === qn.correctKey;

                return (
                  <article
                    key={qn.id}
                    id={`doc-question-${qn.id}`}
                    className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                          မေးခွန်း ({qn.id})
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          【<RubyText text={qn.termTitle} showFurigana={showFurigana} highlightQuery={searchQuery} />】
                        </h3>
                      </div>
                      <SpeakerButton text={qn.questionJp} rate={speechRate} size="md" />
                    </div>

                    <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line">
                      <RubyText text={qn.questionJp} showFurigana={showFurigana} highlightQuery={searchQuery} />
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {qn.questionMm}
                    </p>

                    {/* 4 Multiple Choice Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {qn.options.map((opt) => {
                        const isPicked = selected === opt.key;
                        const isOptionCorrect = opt.key === qn.correctKey;

                        let btnStyle =
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-sky-400';
                        if (selected) {
                          if (isOptionCorrect) {
                            btnStyle =
                              'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                          } else if (isPicked) {
                            btnStyle =
                              'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setInlineAnswers((prev) => ({ ...prev, [qn.id]: opt.key }))}
                            className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <div>
                              <span className="font-mono font-bold mr-2">{opt.key}.</span>
                              <RubyText text={opt.text} showFurigana={showFurigana} />
                            </div>
                            {selected && isOptionCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            {selected && isPicked && !isOptionCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer & Explanation */}
                    {selected && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                          isCorrect
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80'
                            : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                          <span>
                            {isCorrect ? '✓ 正解 (အဖြေမှန်ပါသည်)' : '✗ 不正解 (အဖြေမှားနေပါသည်)'}
                          </span>
                          <span>·</span>
                          <span>
                            အဖြေမှန်: {qn.correctKey}. <RubyText text={qn.correctText} showFurigana={showFurigana} />
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                          <strong>ရှင်းလင်းချက်:</strong>{' '}
                          <RubyText text={qn.explanationMm} showFurigana={showFurigana} />
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
