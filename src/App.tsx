/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { TopBar, MainMenuTab } from './components/TopBar';
import { OriginalDocsView } from './components/OriginalDocsView';
import { MasterTablesView } from './components/MasterTablesView';
import { TheoriesView } from './components/TheoriesView';
import { DrawerUtilities, ActiveDrawerModal } from './components/DrawerUtilities';
import { TERMS_DATA } from './data/termsData';
import { VOCAB_DATA } from './data/vocabData';
import { QUESTIONS_DATA } from './data/questionsData';
import { searchAllContent } from './utils/calculations';
import { SpeechRate } from './utils/tts';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainMenuTab>('docs');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveDrawerModal>('none');
  const [focusedItem, setFocusedItem] = useState<{
    type: 'term' | 'vocab' | 'question';
    id: number;
  } | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ssw2_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [showFurigana, setShowFurigana] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ssw2_furigana');
      return saved ? saved !== 'off' : true;
    } catch {
      return true;
    }
  });

  const [speechRate, setSpeechRate] = useState<SpeechRate>(() => {
    try {
      const saved = localStorage.getItem('ssw2_speech_rate');
      return saved === '0.8' ? 0.8 : 1.0;
    } catch {
      return 1.0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ssw2_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('ssw2_furigana', showFurigana ? 'on' : 'off');
    } catch {
      // ignore storage errors
    }
  }, [showFurigana]);

  useEffect(() => {
    try {
      localStorage.setItem('ssw2_speech_rate', String(speechRate));
    } catch {
      // ignore storage errors
    }
  }, [speechRate]);

  const searchResults = useMemo(
    () => searchAllContent(searchQuery, TERMS_DATA, VOCAB_DATA, QUESTIONS_DATA),
    [searchQuery]
  );

  const handleSelectSearchResult = (type: 'term' | 'vocab' | 'question', id: number) => {
    setActiveTab('docs');
    setFocusedItem({ type, id });
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode
          ? 'dark bg-[#0F172A] text-[#F1F5F9]'
          : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Persistent Sticky Top Bar */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectSearchResult={handleSelectSearchResult}
        showFurigana={showFurigana}
        onToggleFurigana={() => setShowFurigana((f) => !f)}
        speechRate={speechRate}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Main Content Container */}
      <main id="top" className="max-w-7xl mx-auto pt-20 pb-16 px-3 sm:px-6">
        {activeTab === 'docs' && (
          <OriginalDocsView
            showFurigana={showFurigana}
            speechRate={speechRate}
            searchQuery={searchQuery}
            focusedItem={focusedItem}
            onClearFocusedItem={() => setFocusedItem(null)}
            onOpenUtility={(util) => setActiveModal(util)}
            onJumpToTheories={() => {
              setActiveTab('theories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'tables' && (
          <MasterTablesView
            showFurigana={showFurigana}
            speechRate={speechRate}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'theories' && (
          <TheoriesView
            showFurigana={showFurigana}
            speechRate={speechRate}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        特定技能2号（宿泊業）専門用語集・完全攻略学習ガイド · Specified Skilled Worker No.2 (Accommodation Industry) Master Study Platform
      </footer>

      {/* Off-Canvas Drawer & Interactive Modals (Theme, 388 Flashcards, 109 Mock Exam) */}
      <DrawerUtilities
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
        activeModal={activeModal}
        onSelectModal={setActiveModal}
        darkMode={darkMode}
        onToggleDarkMode={setDarkMode}
        showFurigana={showFurigana}
        onToggleFurigana={() => setShowFurigana((f) => !f)}
        speechRate={speechRate}
        onChangeSpeechRate={setSpeechRate}
      />
    </div>
  );
}
