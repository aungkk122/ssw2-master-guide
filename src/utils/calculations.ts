import { StudyTerm } from '../data/termsData';
import { VocabEntry } from '../data/vocabData';
import { ExamQuestion } from '../data/questionsData';

export interface ADRResult {
  adr: number;
  formulaText: string;
  stepByStep: string;
}

export function calculateADR(totalRoomRevenue: number, roomsSold: number): ADRResult {
  if (roomsSold <= 0 || totalRoomRevenue < 0) {
    return {
      adr: 0,
      formulaText: 'ADR = 宿泊売上合計額 ÷ 稼働客室数',
      stepByStep: '稼働客室数が0のため算出不可'
    };
  }
  const adr = Math.round(totalRoomRevenue / roomsSold);
  return {
    adr,
    formulaText: 'ADR = 宿泊売上合計額 ÷ 稼働客室数',
    stepByStep: `${totalRoomRevenue.toLocaleString()}円 ÷ ${roomsSold}室 = ${adr.toLocaleString()}円`
  };
}

export interface OCCResult {
  occPercent: number;
  occDecimal: number;
  formulaText: string;
  stepByStep: string;
}

export function calculateOCC(roomsSold: number, totalAvailableRooms: number): OCCResult {
  if (totalAvailableRooms <= 0 || roomsSold < 0) {
    return {
      occPercent: 0,
      occDecimal: 0,
      formulaText: 'OCC (%) = 予約室数 ÷ 総室数 × 100',
      stepByStep: '総室数が0のため算出不可'
    };
  }
  const clampedSold = Math.min(roomsSold, totalAvailableRooms);
  const occDecimal = clampedSold / totalAvailableRooms;
  const occPercent = Math.round(occDecimal * 1000) / 10;
  return {
    occPercent,
    occDecimal,
    formulaText: 'OCC (%) = 予約室数（稼働客室数） ÷ 総室数 × 100',
    stepByStep: `${clampedSold}室 ÷ ${totalAvailableRooms}室 × 100 = ${occPercent}%`
  };
}

export interface RevPARResult {
  revpar: number;
  adr: number;
  occPercent: number;
  method1Step: string;
  method2Step: string;
}

export function calculateRevPAR(
  totalRoomRevenue: number,
  roomsSold: number,
  totalAvailableRooms: number
): RevPARResult {
  if (totalAvailableRooms <= 0 || roomsSold <= 0 || totalRoomRevenue < 0) {
    return {
      revpar: 0,
      adr: 0,
      occPercent: 0,
      method1Step: '0 × 0 = 0円',
      method2Step: '0円 ÷ 0室 = 0円'
    };
  }
  const adrRes = calculateADR(totalRoomRevenue, roomsSold);
  const occRes = calculateOCC(roomsSold, totalAvailableRooms);
  const revpar = Math.round(totalRoomRevenue / totalAvailableRooms);
  return {
    revpar,
    adr: adrRes.adr,
    occPercent: occRes.occPercent,
    method1Step: `OCC (${occRes.occPercent}%) × ADR (${adrRes.adr.toLocaleString()}円) = ${revpar.toLocaleString()}円`,
    method2Step: `売上合計 ${totalRoomRevenue.toLocaleString()}円 ÷ 総室数 ${totalAvailableRooms}室 = ${revpar.toLocaleString()}円`
  };
}

export interface FLRatioResult {
  foodRatio: number;
  laborRatio: number;
  flRatio: number;
  status: 'healthy' | 'warning' | 'critical';
  statusLabelJp: string;
  statusLabelMm: string;
  stepByStep: string;
}

export function calculateFLRatio(
  foodCost: number,
  laborCost: number,
  totalSales: number
): FLRatioResult {
  if (totalSales <= 0) {
    return {
      foodRatio: 0,
      laborRatio: 0,
      flRatio: 0,
      status: 'critical',
      statusLabelJp: '売上高0円',
      statusLabelMm: 'ရောင်းရငွေ သုညဖြစ်နေပါသည်',
      stepByStep: '0 ÷ 0 = 0%'
    };
  }
  const foodRatio = Math.round((foodCost / totalSales) * 1000) / 10;
  const laborRatio = Math.round((laborCost / totalSales) * 1000) / 10;
  const flRatio = Math.round(((foodCost + laborCost) / totalSales) * 1000) / 10;

  let status: 'healthy' | 'warning' | 'critical' = 'healthy';
  let statusLabelJp = '健全（60%未満・優良水準）';
  let statusLabelMm = 'ကျန်းမာသန်စွမ်းသော စံနှုန်း (60% အောက်)';

  if (flRatio >= 65) {
    status = 'critical';
    statusLabelJp = '要改善（65%以上・利益圧迫）';
    statusLabelMm = 'အမြတ်နည်းနေသော အန္တရာယ်အဆင့် (65% အထက်)';
  } else if (flRatio >= 60) {
    status = 'warning';
    statusLabelJp = '注意（60%〜65%・標準上限）';
    statusLabelMm = 'သတိပြုရမည့် အဆင့် (60% နှင့်အထက်)';
  }

  return {
    foodRatio,
    laborRatio,
    flRatio,
    status,
    statusLabelJp,
    statusLabelMm,
    stepByStep: `(${foodCost.toLocaleString()}円 + ${laborCost.toLocaleString()}円) ÷ ${totalSales.toLocaleString()}円 × 100 = ${flRatio}%`
  };
}

export interface MenuItemInput {
  id: string;
  nameJp: string;
  nameMm: string;
  price: number;
  cost: number;
  qtySold: number;
}

export interface RankedMenuItem extends MenuItemInput {
  sales: number;
  profit: number;
  profitMargin: number;
  cumulativeShare: number;
  rank: 'A' | 'B' | 'C';
}

export function analyzeABCPortfolio(items: MenuItemInput[]): RankedMenuItem[] {
  const withSales = items.map(item => {
    const sales = item.price * item.qtySold;
    const profit = (item.price - item.cost) * item.qtySold;
    const profitMargin = item.price > 0 ? Math.round(((item.price - item.cost) / item.price) * 1000) / 10 : 0;
    return { ...item, sales, profit, profitMargin };
  }).sort((a, b) => b.sales - a.sales);

  const totalSales = withSales.reduce((acc, i) => acc + i.sales, 0);
  let runningSales = 0;

  return withSales.map((item, idx) => {
    const prevShare = totalSales > 0 ? (runningSales / totalSales) * 100 : 0;
    runningSales += item.sales;
    const cumulativeShare = totalSales > 0 ? Math.round((runningSales / totalSales) * 1000) / 10 : 0;

    let rank: 'A' | 'B' | 'C' = 'C';
    if (idx === 0 || prevShare < 70) {
      rank = 'A';
    } else if (prevShare < 90) {
      rank = 'B';
    } else {
      rank = 'C';
    }

    return {
      ...item,
      cumulativeShare,
      rank
    };
  });
}

export interface TaxCalculationInput {
  guests: number;
  nights: number;
  roomRatePerPerson: number;
  hasOnsen: boolean;
  municipalityHasAccommodationTax: boolean;
}

export interface TaxCalculationResult {
  accommodationTaxPerPersonNight: number;
  totalAccommodationTax: number;
  bathingTaxPerPersonNight: number;
  totalBathingTax: number;
  grandTotalTax: number;
  explanationMm: string;
}

export function calculateHotelTaxes(input: TaxCalculationInput): TaxCalculationResult {
  const { guests, nights, roomRatePerPerson, hasOnsen, municipalityHasAccommodationTax } = input;
  let accommodationTaxPerPersonNight = 0;
  if (municipalityHasAccommodationTax) {
    if (roomRatePerPerson < 10000) accommodationTaxPerPersonNight = 0;
    else if (roomRatePerPerson < 15000) accommodationTaxPerPersonNight = 100;
    else accommodationTaxPerPersonNight = 200;
  }

  const bathingTaxPerPersonNight = hasOnsen ? 150 : 0;
  const totalAccommodationTax = accommodationTaxPerPersonNight * guests * nights;
  const totalBathingTax = bathingTaxPerPersonNight * guests * nights;
  const grandTotalTax = totalAccommodationTax + totalBathingTax;

  return {
    accommodationTaxPerPersonNight,
    totalAccommodationTax,
    bathingTaxPerPersonNight,
    totalBathingTax,
    grandTotalTax,
    explanationMm: `တည်းခိုခွန် (宿泊税): ¥${totalAccommodationTax.toLocaleString()} + ရေပူစမ်းခွန် (入湯税): ¥${totalBathingTax.toLocaleString()} = စုစုပေါင်း အခွန် ¥${grandTotalTax.toLocaleString()}`
  };
}

export interface SearchResults {
  terms: StudyTerm[];
  vocab: VocabEntry[];
  questions: ExamQuestion[];
  totalCount: number;
}

export function searchAllContent(
  query: string,
  terms: StudyTerm[],
  vocab: VocabEntry[],
  questions: ExamQuestion[]
): SearchResults {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { terms: [], vocab: [], questions: [], totalCount: 0 };
  }

  const matchedTerms = terms.filter(t =>
    t.termJp.toLowerCase().includes(q) ||
    t.furigana.toLowerCase().includes(q) ||
    t.english.toLowerCase().includes(q) ||
    t.definitionJp.toLowerCase().includes(q) ||
    t.explanationMm.toLowerCase().includes(q) ||
    t.keyVocabRaw.toLowerCase().includes(q) ||
    String(t.id) === q
  );

  const matchedVocab = vocab.filter(v =>
    v.kanji.toLowerCase().includes(q) ||
    v.furigana.toLowerCase().includes(q) ||
    v.meaningMm.toLowerCase().includes(q) ||
    v.relatedTerm.toLowerCase().includes(q)
  );

  const matchedQuestions = questions.filter(qn =>
    qn.termTitle.toLowerCase().includes(q) ||
    qn.questionJp.toLowerCase().includes(q) ||
    qn.questionMm.toLowerCase().includes(q) ||
    qn.explanationMm.toLowerCase().includes(q) ||
    String(qn.id) === q
  );

  return {
    terms: matchedTerms,
    vocab: matchedVocab,
    questions: matchedQuestions,
    totalCount: matchedTerms.length + matchedVocab.length + matchedQuestions.length
  };
}
