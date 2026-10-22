import React, { useRef, useEffect, useState } from 'react';
import { Menu, Search, X, BookOpen, Table2, Calculator } from 'lucide-react';
import { SearchResults } from '../utils/calculations';
import { RubyText } from './RubyText';
import { SpeakerButton } from './SpeakerButton';
import { SpeechRate } from '../utils/tts';

export type MainMenuTab = 'docs' | 'tables' | 'theories';

interface TopBarProps {
  activeTab: MainMenuTab;
  onSelectTab: (tab: MainMenuTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchResults: SearchResults;
  onSelectSearchResult: (type: 'term' | 'vocab' | 'question', id: number) => void;
  showFurigana: boolean;
  onToggleFurigana: () => void;
  speechRate: SpeechRate;
  onOpenDrawer: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectSearchResult,
  showFurigana,
  onToggleFurigana,
  speechRate,
  onOpenDrawer
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-15 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto h-full px-2 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left Zone: Hamburger Menu + Brand Title */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDrawer}
            aria-label="Open Study Utilities Drawer"
            className="min-h-[38px] min-w-[38px] p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('docs');
            }}
            className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 hidden lg:block"
          >
            特定技能2号・宿泊業
          </a>
        </div>

        {/* Center Zone: 3 Main Menus Segmented Tabs */}
        <nav
          aria-label="Primary Study Views"
          className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shrink-0"
        >
          <button
            type="button"
            onClick={() => onSelectTab('docs')}
            className={`px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'docs'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
            <span className="hidden md:inline">Original Docs ·</span>
            <span className="sm:hidden">စာအုပ်</span>
            <span className="hidden sm:inline">စာအုပ်အပြည့်အစုံ</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('tables')}
            className={`px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'tables'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Table2 className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
            <span className="hidden md:inline">Master Tables ·</span>
            <span className="sm:hidden">ဇယား</span>
            <span className="hidden sm:inline">ဇယားကွက်ကြီးများ</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('theories')}
            className={`px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'theories'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
            <span className="hidden md:inline">Theories ·</span>
            <span className="sm:hidden">ပုံသေနည်း</span>
            <span className="hidden sm:inline">ပုံသေနည်းနှင့် ဥပဒေ</span>
          </button>
        </nav>

        {/* Right Zone: Multi-lingual Power Search + Furigana Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 max-w-[155px] sm:max-w-sm justify-end min-w-0">
          <div ref={searchContainerRef} className="relative flex-1 min-w-[75px]">
            <label htmlFor="global-power-search" className="sr-only">
              Search Japanese Kanji, Furigana, English, or Myanmar
            </label>
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
              <input
                id="global-power-search"
                type="search"
                value={searchQuery}
                onFocus={() => setDropdownOpen(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setDropdownOpen(true);
                }}
                placeholder="ရှာရန်..."
                className="w-full h-8 sm:h-9 pl-7 pr-6 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    setDropdownOpen(false);
                  }}
                  aria-label="Clear search query"
                  className="absolute right-1.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Result Preview Dropdown */}
            {dropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute right-0 mt-2 w-[320px] sm:w-[420px] max-h-[75vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    検索結果 · ရှာဖွေတွေ့ရှိချက်: <strong className="text-slate-900 dark:text-white tabular-nums">{searchResults.totalCount}</strong> ခု
                  </span>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(false)}
                    className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    閉じる
                  </button>
                </div>

                {searchResults.totalCount === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center">
                    「{searchQuery}」နှင့် ကိုက်ညီသော ဝေါဟာရ မတွေ့ပါ။
                  </p>
                ) : (
                  <div className="space-y-3">
                    {searchResults.terms.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                          専門用語 (109 Terms) · {searchResults.terms.length} 件
                        </p>
                        <div className="space-y-1">
                          {searchResults.terms.slice(0, 5).map((term) => (
                            <div
                              key={term.id}
                              onClick={() => {
                                onSelectSearchResult('term', term.id);
                                setDropdownOpen(false);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  onSelectSearchResult('term', term.id);
                                  setDropdownOpen(false);
                                }
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-start justify-between gap-2 cursor-pointer"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                  <span className="font-mono text-sky-600 dark:text-sky-400 mr-1.5">#{term.id}</span>
                                  <RubyText text={term.rawTitle} showFurigana={showFurigana} highlightQuery={searchQuery} />
                                  <span className="text-slate-400 font-normal ml-1.5">· {term.english}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                                  {term.explanationMm}
                                </p>
                              </div>
                              <SpeakerButton text={term.termJp} rate={speechRate} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.vocab.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                          重要語彙・漢字 (279 Vocab) · {searchResults.vocab.length} 件
                        </p>
                        <div className="space-y-1">
                          {searchResults.vocab.slice(0, 5).map((v) => (
                            <div
                              key={v.id}
                              onClick={() => {
                                onSelectSearchResult('vocab', v.id);
                                setDropdownOpen(false);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  onSelectSearchResult('vocab', v.id);
                                  setDropdownOpen(false);
                                }
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                            >
                              <div className="min-w-0">
                                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 mr-1.5">V{v.id}</span>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                  <RubyText text={v.kanji} showFurigana={showFurigana} highlightQuery={searchQuery} />
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1.5">({v.furigana})</span>
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">{v.meaningMm}</p>
                              </div>
                              <SpeakerButton text={v.kanji} rate={speechRate} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.questions.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                          模擬試験問題 (109 Questions) · {searchResults.questions.length} 件
                        </p>
                        <div className="space-y-1">
                          {searchResults.questions.slice(0, 3).map((qn) => (
                            <div
                              key={qn.id}
                              onClick={() => {
                                onSelectSearchResult('question', qn.id);
                                setDropdownOpen(false);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  onSelectSearchResult('question', qn.id);
                                  setDropdownOpen(false);
                                }
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                            >
                              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                <span className="font-mono text-amber-600 dark:text-amber-400 mr-1.5">Q{qn.id}</span>
                                <RubyText text={qn.termTitle} showFurigana={showFurigana} highlightQuery={searchQuery} />
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                                {qn.questionJp}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Global Furigana ON/OFF Toggle */}
          <button
            type="button"
            onClick={onToggleFurigana}
            aria-pressed={showFurigana}
            aria-label="Toggle Furigana Ruby Annotations"
            className={`min-h-[36px] px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showFurigana
                ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            ふりがな {showFurigana ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </header>
  );
};
