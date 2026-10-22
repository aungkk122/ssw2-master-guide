import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateADR,
  calculateOCC,
  calculateRevPAR,
  calculateFLRatio,
  analyzeABCPortfolio,
  calculateHotelTaxes,
  searchAllContent
} from './calculations';
import { segmentFurigana } from './furigana';
import { TERMS_DATA } from '../data/termsData';
import { VOCAB_DATA } from '../data/vocabData';
import { QUESTIONS_DATA } from '../data/questionsData';

test('dataset completeness verification: 109 terms, 279 vocab, 109 questions', () => {
  assert.equal(TERMS_DATA.length, 109, 'Must have all 109 specialized terms');
  assert.equal(VOCAB_DATA.length, 279, 'Must have all 279 vocabulary breakdown items');
  assert.equal(QUESTIONS_DATA.length, 109, 'Must have all 109 mock exam questions');
});

test('ADR calculation matches Part 5.1 textbook example', () => {
  const res = calculateADR(1200000, 80);
  assert.equal(res.adr, 15000);
});

test('OCC calculation matches Part 5.2 and Question 104 examples', () => {
  const res1 = calculateOCC(80, 100);
  assert.equal(res1.occPercent, 80);

  const res2 = calculateOCC(96, 120);
  assert.equal(res2.occPercent, 80);
});

test('RevPAR calculation matches Part 5.3 and Question 107 example', () => {
  const res = calculateRevPAR(1200000, 80, 100);
  assert.equal(res.revpar, 12000);
  assert.equal(res.adr, 15000);
  assert.equal(res.occPercent, 80);
});

test('FL Ratio calculation and threshold classification', () => {
  const healthy = calculateFLRatio(900000, 900000, 3200000); // 1.8M / 3.2M = 56.3%
  assert.equal(healthy.flRatio, 56.3);
  assert.equal(healthy.status, 'healthy');

  const critical = calculateFLRatio(1200000, 1000000, 3000000); // 2.2M / 3.0M = 73.3%
  assert.equal(critical.flRatio, 73.3);
  assert.equal(critical.status, 'critical');
});

test('ABC Analysis ranks menu items into A, B, and C tiers', () => {
  const items = [
    { id: '1', nameJp: '和牛ステーキ御膳', nameMm: 'ဝါဂျူးစတိခ်ဟင်းပွဲ', price: 5000, cost: 1800, qtySold: 150 },
    { id: '2', nameJp: '海鮮刺身盛り合わせ', nameMm: 'ပင်လယ်စာဆာရှီမီ', price: 3000, cost: 1000, qtySold: 70 },
    { id: '3', nameJp: '季節の天ぷら定食', nameMm: 'တန်ပူရာထမင်းပွဲ', price: 1500, cost: 450, qtySold: 30 }
  ];
  const ranked = analyzeABCPortfolio(items);
  assert.equal(ranked[0].rank, 'A');
  assert.equal(ranked[1].rank, 'B');
  assert.equal(ranked[2].rank, 'C');
});

test('Hotel Taxes (Accommodation Tax vs Bathing Tax)', () => {
  const withOnsen = calculateHotelTaxes({
    guests: 2,
    nights: 2,
    roomRatePerPerson: 16000,
    hasOnsen: true,
    municipalityHasAccommodationTax: true
  });
  assert.equal(withOnsen.accommodationTaxPerPersonNight, 200);
  assert.equal(withOnsen.bathingTaxPerPersonNight, 150);
  assert.equal(withOnsen.totalAccommodationTax, 800);
  assert.equal(withOnsen.totalBathingTax, 600);
  assert.equal(withOnsen.grandTotalTax, 1400);

  const withoutOnsen = calculateHotelTaxes({
    guests: 2,
    nights: 1,
    roomRatePerPerson: 12000,
    hasOnsen: false,
    municipalityHasAccommodationTax: true
  });
  assert.equal(withoutOnsen.totalBathingTax, 0);
  assert.equal(withoutOnsen.totalAccommodationTax, 200);
});

test('Universal Furigana tokenizer annotates Kanji accurately', () => {
  const tokens = segmentFurigana('預り金（あずかりきん）は宿泊施設の保証です。');
  const rubyTokens = tokens.filter(t => Boolean(t.reading));
  assert.ok(rubyTokens.length >= 3);
  assert.equal(rubyTokens[0].text, '預り金');
  assert.equal(rubyTokens[0].reading, 'あずかりきん');
});

test('Multi-lingual search finds Japanese, English, and Myanmar queries', () => {
  const jpRes = searchAllContent('預り金', TERMS_DATA, VOCAB_DATA, QUESTIONS_DATA);
  assert.ok(jpRes.terms.length >= 1);

  const enRes = searchAllContent('Deposit', TERMS_DATA, VOCAB_DATA, QUESTIONS_DATA);
  assert.ok(enRes.terms.length >= 1);

  const mmRes = searchAllContent('စပေါ်ငွေ', TERMS_DATA, VOCAB_DATA, QUESTIONS_DATA);
  assert.ok(mmRes.terms.length >= 1);
  assert.ok(mmRes.vocab.length >= 1);
});
