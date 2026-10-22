import React, { useState } from 'react';
import { Calculator, Scale, CheckCircle2, AlertTriangle } from 'lucide-react';
import { THEORIES_DATA, TheoryPattern } from '../data/theoriesData';
import {
  calculateADR,
  calculateOCC,
  calculateRevPAR,
  calculateFLRatio,
  analyzeABCPortfolio,
  calculateHotelTaxes,
  MenuItemInput
} from '../utils/calculations';
import { RubyText } from './RubyText';
import { SpeakerButton } from './SpeakerButton';
import { SpeechRate } from '../utils/tts';

interface TheoriesViewProps {
  showFurigana: boolean;
  speechRate: SpeechRate;
}

export const TheoriesView: React.FC<TheoriesViewProps> = ({ showFurigana, speechRate }) => {
  const [filterPart, setFilterPart] = useState<'all' | 'part5' | 'part6'>('all');

  // 5.1 ADR Interactive Calculator State
  const [adrRevenue, setAdrRevenue] = useState<number>(1200000);
  const [adrRoomsSold, setAdrRoomsSold] = useState<number>(80);

  // 5.2 OCC Interactive Calculator State
  const [occSold, setOccSold] = useState<number>(80);
  const [occTotal, setOccTotal] = useState<number>(100);

  // 5.3 RevPAR Interactive Calculator State
  const [revparRevenue, setRevparRevenue] = useState<number>(1200000);
  const [revparSold, setRevparSold] = useState<number>(80);
  const [revparTotal, setRevparTotal] = useState<number>(100);

  // 5.4 FL Ratio Interactive Calculator State
  const [flFoodCost, setFlFoodCost] = useState<number>(1200000);
  const [flLaborCost, setFlLaborCost] = useState<number>(1000000);
  const [flTotalSales, setFlTotalSales] = useState<number>(4000000);

  // 5.5 ABC Analysis Interactive Portfolio State
  const [abcItems, setAbcItems] = useState<MenuItemInput[]>([
    { id: '1', nameJp: '黒毛和牛ステーキ御膳', nameMm: 'ဝါဂျူးစတိခ်ဟင်းပွဲ', price: 5000, cost: 1800, qtySold: 140 },
    { id: '2', nameJp: '海鮮懐石コース', nameMm: 'ပင်လယ်စာခိုင်ဆဲကိကုတ်စ်', price: 4000, cost: 1400, qtySold: 65 },
    { id: '3', nameJp: '季節の天ぷら膳', nameMm: 'ရာသီပေါ်တန်ပူရာဟင်းပွဲ', price: 2200, cost: 700, qtySold: 85 },
    { id: '4', nameJp: '特製ラムチョップ', nameMm: 'သိုးသားဟင်းလျာ', price: 2500, cost: 1200, qtySold: 25 }
  ]);

  // 6.1 Ryokan Business Act Interactive Compliance Simulator State
  const [ryokanRooms, setRyokanRooms] = useState<number>(50);
  const [ryokanVentilationPerHour, setRyokanVentilationPerHour] = useState<number>(2);
  const [ryokanWindowRatio, setRyokanWindowRatio] = useState<number>(15);

  // 6.2 Guest Register Interactive Simulator State
  const [guestType, setGuestType] = useState<'inbound' | 'resident_foreigner' | 'japanese'>('inbound');
  const [retentionYears, setRetentionYears] = useState<number>(3);

  // 6.3 Accommodation Tax vs Bathing Tax Calculator State
  const [taxGuests, setTaxGuests] = useState<number>(2);
  const [taxNights, setTaxNights] = useState<number>(2);
  const [taxRatePerPerson, setTaxRatePerPerson] = useState<number>(16000);
  const [taxHasOnsen, setTaxHasOnsen] = useState<boolean>(true);
  const [taxMunicipalityIntro, setTaxMunicipalityIntro] = useState<boolean>(true);

  // 6.4 HACCP Temperature & Time Simulator State
  const [haccpCoreTemp, setHaccpCoreTemp] = useState<number>(75);
  const [haccpCookSeconds, setHaccpCookSeconds] = useState<number>(60);
  const [haccpFridgeTemp, setHaccpFridgeTemp] = useState<number>(4);

  const visibleTheories = THEORIES_DATA.filter(
    (t) => filterPart === 'all' || t.part === filterPart
  );

  const renderInteractiveSandbox = (theory: TheoryPattern) => {
    switch (theory.id) {
      case 'adr': {
        const res = calculateADR(adrRevenue, adrRoomsSold);
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>ADR တွက်ချက်မှု စမ်းသပ်စက် (Interactive ADR Calculator)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => { setAdrRevenue(1200000); setAdrRoomsSold(80); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၁ (¥1.2M / 80室)
                </button>
                <button
                  type="button"
                  onClick={() => { setAdrRevenue(1350000); setAdrRoomsSold(45); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၂ (¥1.35M / 45室)
                </button>
                <button
                  type="button"
                  onClick={() => { setAdrRevenue(1440000); setAdrRoomsSold(160); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၃ (¥1.44M / 160室)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="adr-rev-slider" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  宿泊売上合計額 (အခန်းရောင်းရငွေ စုစုပေါင်း): <strong className="font-mono tabular-nums">¥{adrRevenue.toLocaleString()}</strong>
                </label>
                <input
                  id="adr-rev-slider"
                  type="range"
                  min={200000}
                  max={3000000}
                  step={50000}
                  value={adrRevenue}
                  onChange={(e) => setAdrRevenue(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="adr-rooms-slider" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  稼働客室数 (ငှားရမ်းရသော အခန်းအရေအတွက်): <strong className="font-mono tabular-nums">{adrRoomsSold} 室</strong>
                </label>
                <input
                  id="adr-rooms-slider"
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={adrRoomsSold}
                  onChange={(e) => setAdrRoomsSold(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                計算式: {res.stepByStep}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-sky-700 dark:text-sky-400 tabular-nums">
                ADR = ¥{res.adr.toLocaleString()}
              </div>
            </div>
          </div>
        );
      }

      case 'occ': {
        const res = calculateOCC(occSold, occTotal);
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>OCC တွက်ချက်မှု စမ်းသပ်စက် (Interactive OCC Calculator)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => { setOccSold(80); setOccTotal(100); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၁ (80 / 100室)
                </button>
                <button
                  type="button"
                  onClick={() => { setOccSold(96); setOccTotal(120); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၂ (96 / 120室)
                </button>
                <button
                  type="button"
                  onClick={() => { setOccSold(225); setOccTotal(250); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၃ (225 / 250室)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="occ-sold-slider" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  予約・稼働客室数 (ငှားရမ်းရသောအခန်း): <strong className="font-mono tabular-nums">{Math.min(occSold, occTotal)} 室</strong>
                </label>
                <input
                  id="occ-sold-slider"
                  type="range"
                  min={0}
                  max={occTotal}
                  step={1}
                  value={Math.min(occSold, occTotal)}
                  onChange={(e) => setOccSold(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="occ-total-slider" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  総客室数 (စုစုပေါင်းအခန်း): <strong className="font-mono tabular-nums">{occTotal} 室</strong>
                </label>
                <input
                  id="occ-total-slider"
                  type="range"
                  min={20}
                  max={300}
                  step={10}
                  value={occTotal}
                  onChange={(e) => {
                    const nextTotal = Number(e.target.value);
                    setOccTotal(nextTotal);
                    if (occSold > nextTotal) setOccSold(nextTotal);
                  }}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                計算式: {res.stepByStep} （空室: {occTotal - Math.min(occSold, occTotal)}室）
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-sky-700 dark:text-sky-400 tabular-nums">
                OCC = {res.occPercent}%
              </div>
            </div>
          </div>
        );
      }

      case 'revpar': {
        const res = calculateRevPAR(revparRevenue, revparSold, revparTotal);
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>RevPAR တွက်ချက်မှု စမ်းသပ်စက် (Dual-Method RevPAR Calculator)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => { setRevparRevenue(1200000); setRevparSold(80); setRevparTotal(100); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၁ (OCC 80% × ¥15,000)
                </button>
                <button
                  type="button"
                  onClick={() => { setRevparRevenue(1250000); setRevparSold(50); setRevparTotal(100); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၂ (OCC 50% × ¥25,000)
                </button>
                <button
                  type="button"
                  onClick={() => { setRevparRevenue(1620000); setRevparSold(90); setRevparTotal(100); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၃ (OCC 90% × ¥18,000)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="revpar-rev" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  宿泊売上合計: <strong className="font-mono tabular-nums">¥{revparRevenue.toLocaleString()}</strong>
                </label>
                <input
                  id="revpar-rev"
                  type="range"
                  min={300000}
                  max={2500000}
                  step={10000}
                  value={revparRevenue}
                  onChange={(e) => setRevparRevenue(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="revpar-sold" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  稼働客室数: <strong className="font-mono tabular-nums">{Math.min(revparSold, revparTotal)} 室</strong>
                </label>
                <input
                  id="revpar-sold"
                  type="range"
                  min={10}
                  max={revparTotal}
                  step={5}
                  value={Math.min(revparSold, revparTotal)}
                  onChange={(e) => setRevparSold(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="revpar-total" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  総客室数: <strong className="font-mono tabular-nums">{revparTotal} 室</strong>
                </label>
                <input
                  id="revpar-total"
                  type="range"
                  min={50}
                  max={200}
                  step={10}
                  value={revparTotal}
                  onChange={(e) => setRevparTotal(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1 tabular-nums">
                <div>方法① (OCC × ADR): {res.method1Step}</div>
                <div>方法② (売上 ÷ 総室数): {res.method2Step}</div>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-sky-700 dark:text-sky-400 tabular-nums">
                RevPAR = ¥{res.revpar.toLocaleString()}
              </div>
            </div>
          </div>
        );
      }

      case 'fl_ratio': {
        const res = calculateFLRatio(flFoodCost, flLaborCost, flTotalSales);
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>FL率 တွက်ချက်မှု စမ်းသပ်စက် (FL Ratio Simulator)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => { setFlFoodCost(1200000); setFlLaborCost(1000000); setFlTotalSales(4000000); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၁ (55% 健全)
                </button>
                <button
                  type="button"
                  onClick={() => { setFlFoodCost(950000); setFlLaborCost(750000); setFlTotalSales(2500000); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၂ (68% 要改善)
                </button>
                <button
                  type="button"
                  onClick={() => { setFlFoodCost(1800000); setFlLaborCost(1200000); setFlTotalSales(6000000); }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-500 cursor-pointer"
                >
                  ဥပမာ ၃ (50% 優良)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fl-food" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  食材費 (Food Cost): <strong className="font-mono tabular-nums">¥{flFoodCost.toLocaleString()} ({res.foodRatio}%)</strong>
                </label>
                <input
                  id="fl-food"
                  type="range"
                  min={200000}
                  max={2500000}
                  step={50000}
                  value={flFoodCost}
                  onChange={(e) => setFlFoodCost(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="fl-labor" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  人件費 (Labor Cost): <strong className="font-mono tabular-nums">¥{flLaborCost.toLocaleString()} ({res.laborRatio}%)</strong>
                </label>
                <input
                  id="fl-labor"
                  type="range"
                  min={200000}
                  max={2500000}
                  step={50000}
                  value={flLaborCost}
                  onChange={(e) => setFlLaborCost(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="fl-sales" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  売上高 (Total Sales): <strong className="font-mono tabular-nums">¥{flTotalSales.toLocaleString()}</strong>
                </label>
                <input
                  id="fl-sales"
                  type="range"
                  min={1500000}
                  max={8000000}
                  step={100000}
                  value={flTotalSales}
                  onChange={(e) => setFlTotalSales(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1 tabular-nums">
                <div>{res.stepByStep}</div>
                <div className="font-sans text-slate-600 dark:text-slate-400">
                  {res.statusLabelJp} · {res.statusLabelMm}
                </div>
              </div>
              <div
                className={`text-base sm:text-lg font-bold font-mono tabular-nums flex items-center gap-1.5 ${
                  res.status === 'healthy'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : res.status === 'warning'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {res.status === 'healthy' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>FL率 = {res.flRatio}%</span>
              </div>
            </div>
          </div>
        );
      }

      case 'abc_analysis': {
        const ranked = analyzeABCPortfolio(abcItems);
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>ABC分析 မီနူးအဆင့်ခွဲ စမ်းသပ်စက် (Adjust Qty Sold to See Dynamic Rank A / B / C Shift)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {abcItems.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <label htmlFor={`abc-qty-${item.id}`} className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {item.nameJp} ({item.nameMm}) · 単価 ¥{item.price.toLocaleString()}: <strong className="font-mono">{item.qtySold} 食</strong>
                  </label>
                  <input
                    id={`abc-qty-${item.id}`}
                    type="range"
                    min={5}
                    max={250}
                    step={5}
                    value={item.qtySold}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAbcItems((prev) =>
                        prev.map((it, i) => (i === idx ? { ...it, qtySold: val } : it))
                      );
                    }}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2 px-3">メニュー名</th>
                    <th className="py-2 px-3 text-right">売上高</th>
                    <th className="py-2 px-3 text-right">粗利益</th>
                    <th className="py-2 px-3 text-right">累計構成比</th>
                    <th className="py-2 px-3 text-center">ABC判定</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {ranked.map((r) => (
                    <tr key={r.id}>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-100">
                        {r.nameJp} <span className="text-slate-400">({r.nameMm})</span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums">
                        ¥{r.sales.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums">
                        ¥{r.profit.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums">
                        {r.cumulativeShare}%
                      </td>
                      <td className="py-2 px-3 text-center font-mono font-bold">
                        <span
                          className={
                            r.rank === 'A'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : r.rank === 'B'
                              ? 'text-sky-600 dark:text-sky-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }
                        >
                          Rank {r.rank}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case 'ryokan_act': {
        const meetsStandards = ryokanVentilationPerHour >= 2 && ryokanWindowRatio >= 10;
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>旅館業法・保健所 営業許可 基準シミュレーター (Facility Compliance Checker)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="ryokan-rooms" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  計画客室数 (အခန်းအရေအတွက်): <strong className="font-mono tabular-nums">{ryokanRooms} 室</strong>
                </label>
                <input
                  id="ryokan-rooms"
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={ryokanRooms}
                  onChange={(e) => setRyokanRooms(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="ryokan-vent" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  換気回数 (1時間あたり換気): <strong className="font-mono tabular-nums">{ryokanVentilationPerHour} 回/h</strong>
                </label>
                <input
                  id="ryokan-vent"
                  type="range"
                  min={0}
                  max={6}
                  step={1}
                  value={ryokanVentilationPerHour}
                  onChange={(e) => setRyokanVentilationPerHour(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="ryokan-light" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  採光窓面積比率 (နေရောင်ခြည်ပြတင်းပေါက်အချိုး): <strong className="font-mono tabular-nums">{ryokanWindowRatio}%</strong>
                </label>
                <input
                  id="ryokan-light"
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={ryokanWindowRatio}
                  onChange={(e) => setRyokanWindowRatio(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs sm:text-sm">
              <div>
                申請先: <strong>管轄の保健所（ほけんじょ）</strong> · 自動火災報知設備＆避難経路: <strong>設置済（{ryokanRooms}室対応）</strong>
              </div>
              <div className={`font-bold ${meetsStandards ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {meetsStandards ? '✓ 営業許可基準 適合 (လိုင်စင်စံချိန်မီသည်)' : '✗ 換気・採光基準 不足 (လေဝင်/အလင်းရောင် မပြည့်မီပါ)'}
              </div>
            </div>
          </div>
        );
      }

      case 'guest_register': {
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>宿泊者名簿（レジストレーションカード）フロント判定シミュレーター</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  宿泊客の区分 (ဧည့်သည်အမျိုးအစား ရွေးချယ်ရန်):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { key: 'inbound', label: '訪日外国人観光客 (日本に住所なし)' },
                    { key: 'resident_foreigner', label: '在日外国人 (日本国内に住所あり)' },
                    { key: 'japanese', label: '日本人宿泊客 (国内住所あり)' }
                  ].map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setGuestType(g.key as typeof guestType)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        guestType === g.key
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="reg-years-slider" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  名簿保管期間設定 (သိမ်းဆည်းမည့်နှစ်): <strong className="font-mono tabular-nums">{retentionYears} 年間</strong>
                </label>
                <input
                  id="reg-years-slider"
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={retentionYears}
                  onChange={(e) => setRetentionYears(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-slate-900 dark:text-slate-100">
                フロント必須対応 (ဖရွန့်ကောင်တာ လုပ်ဆောင်ရမည့်တာဝန်):
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {guestType === 'inbound'
                  ? '✓ 氏名・職業に加え「国籍」「旅券番号」を記入させ、パスポートの写し（コピー）を必ず保管する（日本に住所を持たない外国人のため必須）。'
                  : '✓ 氏名・日本国内の住所・職業・連絡先を記入してもらう（日本国内に住所があるためパスポートコピーは不要）。'}
              </p>
              <p className={`font-semibold ${retentionYears >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {retentionYears >= 3
                  ? `✓ 保管期間 ${retentionYears}年：旅館業法の「3年間保管義務」を満たしています。`
                  : `✗ 保管期間 ${retentionYears}年：法令違反です！最低「3年間」保管しなければなりません。`}
              </p>
            </div>
          </div>
        );
      }

      case 'hotel_taxes': {
        const res = calculateHotelTaxes({
          guests: taxGuests,
          nights: taxNights,
          roomRatePerPerson: taxRatePerPerson,
          hasOnsen: taxHasOnsen,
          municipalityHasAccommodationTax: taxMunicipalityIntro
        });
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>宿泊税・入湯税 自動計算シミュレーター (Accommodation vs. Bathing Tax Calculator)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tax-guests" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  宿泊人数 (ဧည့်သည်ဦးရေ): <strong className="font-mono tabular-nums">{taxGuests} 名</strong>
                </label>
                <input
                  id="tax-guests"
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={taxGuests}
                  onChange={(e) => setTaxGuests(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="tax-nights" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  宿泊数 (ညအရေအတွက်): <strong className="font-mono tabular-nums">{taxNights} 泊</strong>
                </label>
                <input
                  id="tax-nights"
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={taxNights}
                  onChange={(e) => setTaxNights(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="tax-rate" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  1人1泊料金: <strong className="font-mono tabular-nums">¥{taxRatePerPerson.toLocaleString()}</strong>
                </label>
                <input
                  id="tax-rate"
                  type="range"
                  min={6000}
                  max={30000}
                  step={1000}
                  value={taxRatePerPerson}
                  onChange={(e) => setTaxRatePerPerson(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={taxMunicipalityIntro}
                  onChange={(e) => setTaxMunicipalityIntro(e.target.checked)}
                  className="rounded accent-sky-600"
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  宿泊税導入自治体（東京都・大阪府・京都市など）
                </span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={taxHasOnsen}
                  onChange={(e) => setTaxHasOnsen(e.target.checked)}
                  className="rounded accent-sky-600"
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  天然温泉あり（入湯税 150円/人泊 課税対象）
                </span>
              </label>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <div>{res.explanationMm}</div>
                <div className="text-slate-500">
                  宿泊税: ¥{res.accommodationTaxPerPersonNight}×{taxGuests}名×{taxNights}泊 ／ 入湯税: ¥{res.bathingTaxPerPersonNight}×{taxGuests}名×{taxNights}泊
                </div>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-sky-700 dark:text-sky-400 tabular-nums">
                合計税額 = ¥{res.grandTotalTax.toLocaleString()}
              </div>
            </div>
          </div>
        );
      }

      case 'haccp': {
        const cookSafe = haccpCoreTemp >= 75 && haccpCookSeconds >= 60;
        const fridgeSafe = haccpFridgeTemp <= 10;
        return (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>HACCP 重要管理点（CCP）温度・時間 監視シミュレーター</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="haccp-temp" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  加熱調理の中心温度 (ဗဟိုအပူချိန်): <strong className="font-mono tabular-nums">{haccpCoreTemp}℃</strong>
                </label>
                <input
                  id="haccp-temp"
                  type="range"
                  min={55}
                  max={95}
                  step={1}
                  value={haccpCoreTemp}
                  onChange={(e) => setHaccpCoreTemp(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="haccp-sec" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  加熱継続時間 (အပူပေးချိန်): <strong className="font-mono tabular-nums">{haccpCookSeconds} 秒</strong>
                </label>
                <input
                  id="haccp-sec"
                  type="range"
                  min={15}
                  max={120}
                  step={15}
                  value={haccpCookSeconds}
                  onChange={(e) => setHaccpCookSeconds(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="haccp-fridge" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  冷蔵庫保管温度 (ရေခဲသေတ္တာအပူချိန်): <strong className="font-mono tabular-nums">{haccpFridgeTemp}℃</strong>
                </label>
                <input
                  id="haccp-fridge"
                  type="range"
                  min={0}
                  max={18}
                  step={1}
                  value={haccpFridgeTemp}
                  onChange={(e) => setHaccpFridgeTemp(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
              <div>
                加熱基準（75℃・60秒以上）: <strong className={cookSafe ? 'text-emerald-600' : 'text-rose-600'}>{cookSafe ? '合格' : '加熱不足'}</strong> · 冷蔵基準（10℃以下）: <strong className={fridgeSafe ? 'text-emerald-600' : 'text-rose-600'}>{fridgeSafe ? '合格' : '温度超過'}</strong>
              </div>
              <div className={`font-bold ${cookSafe && fridgeSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {cookSafe && fridgeSafe
                  ? '✓ HACCP 安全基準クリア（食中毒予防OK）'
                  : '✗ 危害要因あり！再加熱・温度調整が必要'}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
            Menu 3 · Theories, Mathematical Formulas & Legal Frameworks
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            ပုံသေနည်းနှင့် ဥပဒေများ · 9 Core Theories & 27 Worked Examples
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            ပုံသေနည်းနှင့် ဥပဒေတစ်ခုချင်းစီအတွက် လက်တွေ့တွက်ချက်မှု စမ်းသပ်စက် (Interactive Calculator) နှင့် လက်တွေ့ပုစ္ဆာ ဥပမာ ၃ ခုစီ အပြည့်အစုံ ပါဝင်ပါသည်။
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shrink-0">
          <button
            type="button"
            onClick={() => setFilterPart('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterPart === 'all'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            All (9)
          </button>
          <button
            type="button"
            onClick={() => setFilterPart('part5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterPart === 'part5'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Part 5: တွက်ချက်မှု ပုံသေနည်းများ (5)
          </button>
          <button
            type="button"
            onClick={() => setFilterPart('part6')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterPart === 'part6'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Part 6: ဥပဒေနှင့် အခွန်စည်းမျဉ်းများ (4)
          </button>
        </div>
      </section>

      {/* Theory Cards */}
      <div className="space-y-6">
        {visibleTheories.map((theory) => (
          <section
            key={theory.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-5"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                  Section {theory.code} · {theory.part === 'part5' ? 'Revenue & Cost Formula' : 'Legal & Safety Compliance'}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  <RubyText text={theory.titleJp} showFurigana={showFurigana} /> · {theory.titleEn}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {theory.titleMm}
                </p>
              </div>
              <SpeakerButton
                text={`${theory.titleJp}。${theory.summaryJp}`}
                rate={speechRate}
                size="md"
              />
            </div>

            {/* Formula / Rule Banner */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                公式・基本ルール (Core Formula / Statutory Rule):
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-slate-100">
                <RubyText text={theory.formulaOrRuleJp} showFurigana={showFurigana} />
              </div>
              <div className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                {theory.formulaOrRuleMm}
              </div>
            </div>

            {/* Summary & Exam Point */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  🇯🇵 日本語解説
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <RubyText text={theory.summaryJp} showFurigana={showFurigana} />
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  🇲🇲 မြန်မာလို ရှင်းလင်းချက်နှင့် စာမေးပွဲအချက်
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {theory.summaryMm}
                </p>
                <p className="text-amber-700 dark:text-amber-300 font-medium pt-1">
                  {theory.examPointMm}
                </p>
              </div>
            </div>

            {/* Interactive Calculator / Simulator */}
            {renderInteractiveSandbox(theory)}

            {/* 3 Concrete Worked Examples */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                実践例題・ケーススタディ 3選 (လက်တွေ့ပုစ္ဆာနှင့် ဖြစ်ရပ်မှန် ဥပမာ ၃ ခု)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {theory.examples.map((ex, idx) => (
                  <div
                    key={ex.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                          Example 0{idx + 1}
                        </span>
                        <SpeakerButton text={`${ex.titleJp}。${ex.scenarioJp}`} rate={speechRate} />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                        <RubyText text={ex.titleJp} showFurigana={showFurigana} />
                      </h4>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {ex.titleMm}
                      </p>

                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-700 dark:text-slate-200 space-y-1">
                        <div>
                          <RubyText text={ex.scenarioJp} showFurigana={showFurigana} />
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                          {ex.scenarioMm}
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="text-[11px] font-semibold text-slate-400">
                          計算・確認ステップ (တွက်ချက်ပုံ အဆင့်ဆင့်):
                        </div>
                        <ul className="space-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                          {ex.calculationSteps.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">
                              {sIdx + 1}. <RubyText text={step} showFurigana={showFurigana} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400">
                        <RubyText text={ex.resultHighlight} showFurigana={showFurigana} />
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {ex.takeawayMm}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
