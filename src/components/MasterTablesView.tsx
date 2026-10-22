import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Filter } from 'lucide-react';
import { TERMS_DATA } from '../data/termsData';
import { VOCAB_DATA } from '../data/vocabData';
import { DEPARTMENTS } from '../data/departments';
import { RubyText } from './RubyText';
import { SpeakerButton } from './SpeakerButton';
import { SpeechRate } from '../utils/tts';

interface MasterTablesViewProps {
  showFurigana: boolean;
  speechRate: SpeechRate;
  searchQuery: string;
}

const HIRAGANA_GROUPS: { key: string; label: string; chars: string }[] = [
  { key: 'all', label: 'すべて (279)', chars: '' },
  { key: 'a', label: 'あ行', chars: 'あいうえおアイウエオヴ' },
  { key: 'ka', label: 'か行', chars: 'かきくけこがぎぐげごカキクケコガギグゲゴ' },
  { key: 'sa', label: 'さ行', chars: 'さしすせそざじずぜぞサシスセソザジズゼゾ' },
  { key: 'ta', label: 'た行', chars: 'たちつてとだぢづでどタチツテトダヂヅデド' },
  { key: 'na', label: 'な行', chars: 'なにぬねのナニヌネノ' },
  { key: 'ha', label: 'は行', chars: 'はひふへほばびぶべぼぱぴぷぺぽハヒフヘホバビブベボパピプペポ' },
  { key: 'ma', label: 'ま行', chars: 'まみむめもマミムメモ' },
  { key: 'ya', label: 'や行', chars: 'やゆよヤユヨ' },
  { key: 'ra', label: 'ら行', chars: 'らりるれろラリルレロ' },
  { key: 'wa', label: 'わ・他', chars: 'わをんワヲン〜' }
];

export const MasterTablesView: React.FC<MasterTablesViewProps> = ({
  showFurigana,
  speechRate,
  searchQuery
}) => {
  const [activeTable, setActiveTable] = useState<'tableA' | 'tableB'>('tableA');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [hiraganaFilter, setHiraganaFilter] = useState<string>('all');

  const [sortAField, setSortAField] = useState<'id' | 'termJp' | 'english'>('id');
  const [sortADir, setSortADir] = useState<'asc' | 'desc'>('asc');

  const [sortBField, setSortBField] = useState<'id' | 'kanji' | 'furigana' | 'relatedTerm'>('id');
  const [sortBDir, setSortBDir] = useState<'asc' | 'desc'>('asc');

  const handleSortA = (field: 'id' | 'termJp' | 'english') => {
    if (sortAField === field) {
      setSortADir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortAField(field);
      setSortADir('asc');
    }
  };

  const handleSortB = (field: 'id' | 'kanji' | 'furigana' | 'relatedTerm') => {
    if (sortBField === field) {
      setSortBDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBField(field);
      setSortBDir('asc');
    }
  };

  const filteredTableA = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TERMS_DATA.filter((t) => {
      if (deptFilter !== 'all' && t.deptKey !== deptFilter) return false;
      if (!q) return true;
      return (
        t.termJp.toLowerCase().includes(q) ||
        t.furigana.toLowerCase().includes(q) ||
        t.english.toLowerCase().includes(q) ||
        t.definitionJp.toLowerCase().includes(q) ||
        t.explanationMm.toLowerCase().includes(q) ||
        String(t.id) === q
      );
    }).sort((a, b) => {
      let cmp = 0;
      if (sortAField === 'id') cmp = a.id - b.id;
      else if (sortAField === 'termJp') cmp = a.furigana.localeCompare(b.furigana, 'ja');
      else cmp = a.english.localeCompare(b.english);
      return sortADir === 'asc' ? cmp : -cmp;
    });
  }, [deptFilter, searchQuery, sortAField, sortADir]);

  const filteredTableB = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const hGroup = HIRAGANA_GROUPS.find((g) => g.key === hiraganaFilter);

    return VOCAB_DATA.filter((v) => {
      if (deptFilter !== 'all' && v.deptKey !== deptFilter) return false;
      if (hGroup && hGroup.key !== 'all') {
        const firstChar = v.furigana.replace(/^〜/, '').charAt(0);
        if (!hGroup.chars.includes(firstChar)) return false;
      }
      if (!q) return true;
      return (
        v.kanji.toLowerCase().includes(q) ||
        v.furigana.toLowerCase().includes(q) ||
        v.meaningMm.toLowerCase().includes(q) ||
        v.relatedTerm.toLowerCase().includes(q) ||
        String(v.id) === q
      );
    }).sort((a, b) => {
      let cmp = 0;
      if (sortBField === 'id') cmp = a.id - b.id;
      else if (sortBField === 'kanji') cmp = a.kanji.localeCompare(b.kanji, 'ja');
      else if (sortBField === 'furigana') cmp = a.furigana.localeCompare(b.furigana, 'ja');
      else cmp = a.relatedTerm.localeCompare(b.relatedTerm, 'ja');
      return sortBDir === 'asc' ? cmp : -cmp;
    });
  }, [deptFilter, hiraganaFilter, searchQuery, sortBField, sortBDir]);

  const getDeptLabel = (key: string) => {
    const d = DEPARTMENTS.find((dept) => dept.key === key);
    return d ? d.nameEn : key;
  };

  return (
    <div className="space-y-5">
      {/* Header & Dual Table Switcher */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Menu 2 · Dual Master Table Explorer
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              Master Tables · ဇယားကွက်ကြီးများ (Table A: 109 Terms & Table B: 279 Vocab)
            </h1>
          </div>

          {/* Dual Table Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTable('tableA')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeTable === 'tableA'
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Table A: ဌာန ၆ ခု အသုံးအနှုန်း (109)
            </button>
            <button
              type="button"
              onClick={() => setActiveTable('tableB')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeTable === 'tableB'
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Table B: ခန်းဂျီးနှင့် ဝေါဟာရ (279)
            </button>
          </div>
        </div>

        {/* Department Filter Buttons (Shared for both Table A and Table B) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>ဟိုတယ်ဌာနအလိုက် စစ်ထုတ်ရန် (Department Filter):</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDeptFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                deptFilter === 'all'
                  ? 'bg-slate-900 dark:bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Departments ({activeTable === 'tableA' ? TERMS_DATA.length : VOCAB_DATA.length})
            </button>
            {DEPARTMENTS.map((dept) => {
              const count =
                activeTable === 'tableA'
                  ? TERMS_DATA.filter((t) => t.deptKey === dept.key).length
                  : VOCAB_DATA.filter((v) => v.deptKey === dept.key).length;
              return (
                <button
                  key={dept.key}
                  type="button"
                  onClick={() => setDeptFilter(dept.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    deptFilter === dept.key
                      ? 'bg-slate-900 dark:bg-sky-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {dept.nameEn} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Hiragana Filter for Table B */}
        {activeTable === 'tableB' && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">五十音順:</span>
            {HIRAGANA_GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setHiraganaFilter(g.key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  hiraganaFilter === g.key
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* TABLE A: Part 3 Master Table (109 Specialized Terms) */}
      {activeTable === 'tableA' && (
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>
              <strong>Table A (Part 3 Master Table):</strong> ပြသထားသည် <strong className="tabular-nums">{filteredTableA.length}</strong> / 109 ခု
            </span>
            <span>ကော်လံခေါင်းစဉ်ကို နှိပ်၍ စီစဉ်နိုင်သည် (Click column header to sort)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4 font-semibold w-16">
                    <button
                      type="button"
                      onClick={() => handleSortA('id')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>No.</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[210px]">
                    <button
                      type="button"
                      onClick={() => handleSortA('termJp')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>専門用語 (Furigana)</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[160px]">
                    <button
                      type="button"
                      onClick={() => handleSortA('english')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>English / Department</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[290px]">
                    日本語の定義（原文）
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[290px]">
                    မြန်မာလို အသေးစိတ်ရှင်းလင်းချက်
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTableA.map((term) => (
                  <tr
                    key={term.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-500 tabular-nums align-top">
                      {String(term.id).padStart(3, '0')}
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                            <RubyText
                              text={term.rawTitle}
                              showFurigana={showFurigana}
                              highlightQuery={searchQuery}
                            />
                          </div>
                          <div className="text-xs text-sky-700 dark:text-sky-400 mt-0.5">
                            {term.furigana}
                          </div>
                        </div>
                        <SpeakerButton text={term.termJp} rate={speechRate} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {term.english}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {getDeptLabel(term.deptKey)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-800 dark:text-slate-200 leading-relaxed">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <RubyText
                            text={term.definitionJp}
                            showFurigana={showFurigana}
                            highlightQuery={searchQuery}
                          />
                        </div>
                        <SpeakerButton text={term.definitionJp} rate={speechRate} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-top text-slate-700 dark:text-slate-300 leading-relaxed">
                      {term.explanationMm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TABLE B: Part 4 Master Table (All 279 Vocabulary Breakdown Rows) */}
      {activeTable === 'tableB' && (
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>
              <strong>Table B (Part 4 Vocabulary Breakdown):</strong> ပြသထားသည် <strong className="tabular-nums">{filteredTableB.length}</strong> / 279 လုံး
            </span>
            <span>ကော်လံခေါင်းစဉ်ကို နှိပ်၍ စီစဉ်နိုင်သည်</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4 font-semibold w-16">
                    <button
                      type="button"
                      onClick={() => handleSortB('id')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>စဉ်</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[160px]">
                    <button
                      type="button"
                      onClick={() => handleSortB('kanji')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>Kanji (漢字)</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[160px]">
                    <button
                      type="button"
                      onClick={() => handleSortB('furigana')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>Furigana (ふりがな)</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[240px]">
                    မြန်မာအဓိပ္ပာယ် (Myanmar Meaning)
                  </th>
                  <th className="py-3 px-4 font-semibold min-w-[200px]">
                    <button
                      type="button"
                      onClick={() => handleSortB('relatedTerm')}
                      className="inline-flex items-center gap-1 hover:text-sky-600 cursor-pointer"
                    >
                      <span>ဆက်စပ်အသုံးအနှုန်း (Related Term)</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold w-16 text-center">発音</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTableB.map((v) => (
                  <tr
                    key={v.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-500 tabular-nums">
                      {String(v.id).padStart(3, '0')}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                      <RubyText
                        text={v.kanji}
                        showFurigana={showFurigana}
                        highlightQuery={searchQuery}
                      />
                    </td>
                    <td className="py-3 px-4 text-sky-700 dark:text-sky-300 font-medium">
                      {v.furigana}
                    </td>
                    <td className="py-3 px-4 text-slate-800 dark:text-slate-200">
                      {v.meaningMm}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      <RubyText
                        text={v.relatedTerm}
                        showFurigana={showFurigana}
                        highlightQuery={searchQuery}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <SpeakerButton text={v.kanji} rate={speechRate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
