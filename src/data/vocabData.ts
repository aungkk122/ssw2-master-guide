export interface VocabEntry {
  id: number;
  kanji: string;
  furigana: string;
  meaningMm: string;
  relatedTerm: string;
  deptKey: string;
}

export const VOCAB_DATA: VocabEntry[] = [
  {
    "id": 1,
    "kanji": "預り金",
    "furigana": "あずかりきん",
    "meaningMm": "စပေါ်ငွေ / အာမခံငွေ",
    "relatedTerm": "預り金（あずかりきん）",
    "deptKey": "front_office"
  },
  {
    "id": 2,
    "kanji": "保証",
    "furigana": "ほしょう",
    "meaningMm": "အာမခံခြင်း",
    "relatedTerm": "預り金（あずかりきん）",
    "deptKey": "front_office"
  },
  {
    "id": 3,
    "kanji": "支払われる",
    "furigana": "しはらわれる",
    "meaningMm": "ပေးချေရသော",
    "relatedTerm": "預り金（あずかりきん）",
    "deptKey": "front_office"
  },
  {
    "id": 4,
    "kanji": "既存",
    "furigana": "きそん",
    "meaningMm": "လက်ရှိရှိပြီးသား",
    "relatedTerm": "アップセル戦略（せんりゃく）",
    "deptKey": "management"
  },
  {
    "id": 5,
    "kanji": "顧客",
    "furigana": "こきゃく",
    "meaningMm": "ဖောက်သည် / ဧည့်သည်",
    "relatedTerm": "アップセル戦略（せんりゃく）",
    "deptKey": "management"
  },
  {
    "id": 6,
    "kanji": "高価",
    "furigana": "こうか",
    "meaningMm": "တန်ဖိုးကြီးသော / ဈေးကြီးသော",
    "relatedTerm": "アップセル戦略（せんりゃく）",
    "deptKey": "management"
  },
  {
    "id": 7,
    "kanji": "手法",
    "furigana": "しゅほう",
    "meaningMm": "နည်းလမ်း / နည်းစနစ်",
    "relatedTerm": "アップセル戦略（せんりゃく）",
    "deptKey": "management"
  },
  {
    "id": 8,
    "kanji": "個々",
    "furigana": "ここ",
    "meaningMm": "တစ်ခုချင်းစီ",
    "relatedTerm": "アラカルト",
    "deptKey": "fb"
  },
  {
    "id": 9,
    "kanji": "選ぶ",
    "furigana": "えらぶ",
    "meaningMm": "ရွေးချယ်သည်",
    "relatedTerm": "アラカルト",
    "deptKey": "fb"
  },
  {
    "id": 10,
    "kanji": "注文",
    "furigana": "ちゅうもん",
    "meaningMm": "မှာယူခြင်း",
    "relatedTerm": "アラカルト",
    "deptKey": "fb"
  },
  {
    "id": 11,
    "kanji": "宿泊料金",
    "furigana": "しゅくはくりょうきん",
    "meaningMm": "တည်းခိုခ",
    "relatedTerm": "1泊2食（いっぱくにしょく）",
    "deptKey": "front_office"
  },
  {
    "id": 12,
    "kanji": "夕食",
    "furigana": "ゆうしょく",
    "meaningMm": "ညစာ",
    "relatedTerm": "1泊2食（いっぱくにしょく）",
    "deptKey": "front_office"
  },
  {
    "id": 13,
    "kanji": "朝食",
    "furigana": "ちょうしょく",
    "meaningMm": "မနက်စာ",
    "relatedTerm": "1泊2食（いっぱくにしょく）",
    "deptKey": "front_office"
  },
  {
    "id": 14,
    "kanji": "含まれる",
    "furigana": "ふくまれる",
    "meaningMm": "ပါဝင်သည်",
    "relatedTerm": "1泊2食（いっぱくにしょく）",
    "deptKey": "front_office"
  },
  {
    "id": 15,
    "kanji": "汁",
    "furigana": "しる",
    "meaningMm": "ဟင်းရည် / စွပ်ပြုတ်",
    "relatedTerm": "一汁三菜（いちじゅうさんさい）",
    "deptKey": "fb"
  },
  {
    "id": 16,
    "kanji": "菜（おかず）",
    "furigana": "さい / おかず",
    "meaningMm": "ဟင်းလျာ",
    "relatedTerm": "一汁三菜（いちじゅうさんさい）",
    "deptKey": "fb"
  },
  {
    "id": 17,
    "kanji": "組み合わせる",
    "furigana": "くみあわせる",
    "meaningMm": "တွဲစပ်သည် / ပေါင်းစပ်သည်",
    "relatedTerm": "一汁三菜（いちじゅうさんさい）",
    "deptKey": "fb"
  },
  {
    "id": 18,
    "kanji": "収益",
    "furigana": "しゅうえき",
    "meaningMm": "ဝင်ငွေ / အမြတ်အစွန်း",
    "relatedTerm": "イールドマネジメント",
    "deptKey": "management"
  },
  {
    "id": 19,
    "kanji": "最大化",
    "furigana": "さいだいか",
    "meaningMm": "အမြင့်မားဆုံးဖြစ်အောင် လုပ်ခြင်း",
    "relatedTerm": "イールドマネジメント",
    "deptKey": "management"
  },
  {
    "id": 20,
    "kanji": "販売戦略",
    "furigana": "はんばいせんりゃく",
    "meaningMm": "အရောင်းမဟာဗျူဟာ",
    "relatedTerm": "イールドマネジメント",
    "deptKey": "management"
  },
  {
    "id": 21,
    "kanji": "訪れる",
    "furigana": "おとずれる",
    "meaningMm": "လာရောက်လည်ပတ်သည်",
    "relatedTerm": "インバウンド",
    "deptKey": "management"
  },
  {
    "id": 22,
    "kanji": "訪日",
    "furigana": "ほうにち",
    "meaningMm": "ဂျပန်သို့ လာရောက်ခြင်း",
    "relatedTerm": "インバウンド",
    "deptKey": "management"
  },
  {
    "id": 23,
    "kanji": "観光客",
    "furigana": "かんこうきゃく",
    "meaningMm": "ခရီးသွားဧည့်သည်",
    "relatedTerm": "インバウンド",
    "deptKey": "management"
  },
  {
    "id": 24,
    "kanji": "対象",
    "furigana": "たいしょう",
    "meaningMm": "ပစ်မှတ် / ရည်ရွယ်ချက်",
    "relatedTerm": "インバウンド",
    "deptKey": "management"
  },
  {
    "id": 25,
    "kanji": "卵製品",
    "furigana": "たまごせいひん",
    "meaningMm": "ဥထွက်ပစ္စည်းများ",
    "relatedTerm": "ヴィーガン",
    "deptKey": "fb"
  },
  {
    "id": 26,
    "kanji": "乳製品",
    "furigana": "にゅうせいひん",
    "meaningMm": "နို့ထွက်ပစ္စည်းများ",
    "relatedTerm": "ヴィーガン",
    "deptKey": "fb"
  },
  {
    "id": 27,
    "kanji": "一切",
    "furigana": "いっさい",
    "meaningMm": "လုံးဝ / အားလုံး",
    "relatedTerm": "ヴィーガン",
    "deptKey": "fb"
  },
  {
    "id": 28,
    "kanji": "動物性食品",
    "furigana": "どうぶつせいしょくひん",
    "meaningMm": "တိရစ္ဆာန်ထွက် အစားအစာ",
    "relatedTerm": "ヴィーガン",
    "deptKey": "fb"
  },
  {
    "id": 29,
    "kanji": "提供",
    "furigana": "ていきょう",
    "meaningMm": "ပေးအပ်ခြင်း / တည်ခင်းခြင်း",
    "relatedTerm": "ウェルカムドリンク",
    "deptKey": "hospitality"
  },
  {
    "id": 30,
    "kanji": "歓迎",
    "furigana": "かんげい",
    "meaningMm": "ကြိုဆိုခြင်း",
    "relatedTerm": "ウェルカムドリンク",
    "deptKey": "hospitality"
  },
  {
    "id": 31,
    "kanji": "意を示す",
    "furigana": "いをしめす",
    "meaningMm": "သဘောထားဖော်ပြသည်",
    "relatedTerm": "ウェルカムドリンク",
    "deptKey": "hospitality"
  },
  {
    "id": 32,
    "kanji": "事前",
    "furigana": "じぜん",
    "meaningMm": "ကြိုတင်၍",
    "relatedTerm": "ウォークイン",
    "deptKey": "front_office"
  },
  {
    "id": 33,
    "kanji": "予約なし",
    "furigana": "よやくなし",
    "meaningMm": "ဘိုကင်မပါဘဲ",
    "relatedTerm": "ウォークイン",
    "deptKey": "front_office"
  },
  {
    "id": 34,
    "kanji": "直接",
    "furigana": "ちょくせつ",
    "meaningMm": "တိုက်ရိုက်",
    "relatedTerm": "ウォークイン",
    "deptKey": "front_office"
  },
  {
    "id": 35,
    "kanji": "旅館業法",
    "furigana": "りょかんぎょうほう",
    "meaningMm": "ရိုကန်လုပ်ငန်းဥပဒေ",
    "relatedTerm": "営業許可（えいぎょうきょか）",
    "deptKey": "legal"
  },
  {
    "id": 36,
    "kanji": "基づき",
    "furigana": "もとづき",
    "meaningMm": "အခြေခံ၍",
    "relatedTerm": "営業許可（えいぎょうきょか）",
    "deptKey": "legal"
  },
  {
    "id": 37,
    "kanji": "避難経路",
    "furigana": "ひなんけいろ",
    "meaningMm": "အရေးပေါ်ထွက်ပေါက်လမ်းကြောင်း",
    "relatedTerm": "営業許可（えいぎょうきょか）",
    "deptKey": "legal"
  },
  {
    "id": 38,
    "kanji": "保健所",
    "furigana": "ほけんじょ",
    "meaningMm": "ပြည်သူ့ကျန်းမာရေးဌာန",
    "relatedTerm": "営業許可（えいぎょうきょか）",
    "deptKey": "legal"
  },
  {
    "id": 39,
    "kanji": "清潔",
    "furigana": "せいけつ",
    "meaningMm": "သန့်ရှင်းစင်ကြယ်ခြင်း",
    "relatedTerm": "衛生（えいせい）",
    "deptKey": "facility"
  },
  {
    "id": 40,
    "kanji": "保つ",
    "furigana": "たもつ",
    "meaningMm": "ထိန်းသိမ်းသည်",
    "relatedTerm": "衛生（えいせい）",
    "deptKey": "facility"
  },
  {
    "id": 41,
    "kanji": "一定程度",
    "furigana": "いっていていど",
    "meaningMm": "အတိုင်းအတာတစ်ခုအထိ",
    "relatedTerm": "オーバーブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 42,
    "kanji": "生じる",
    "furigana": "しょうじる",
    "meaningMm": "ဖြစ်ပေါ်သည်",
    "relatedTerm": "オーバーブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 43,
    "kanji": "総客室",
    "furigana": "そうきゃくしつ",
    "meaningMm": "စုစုပေါင်းအခန်းများ",
    "relatedTerm": "オーバーブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 44,
    "kanji": "心をこめて",
    "furigana": "こころをこめて",
    "meaningMm": "စိတ်နှလုံးအကြွင်းမဲ့ / စေတနာပါပါဖြင့်",
    "relatedTerm": "おもてなし",
    "deptKey": "hospitality"
  },
  {
    "id": 45,
    "kanji": "対して",
    "furigana": "たいして",
    "meaningMm": "အပေါ်တွင်",
    "relatedTerm": "おもてなし",
    "deptKey": "hospitality"
  },
  {
    "id": 46,
    "kanji": "全て",
    "furigana": "すべて",
    "meaningMm": "အားလုံး",
    "relatedTerm": "オールインクルーシブ",
    "deptKey": "front_office"
  },
  {
    "id": 47,
    "kanji": "費用",
    "furigana": "ひよう",
    "meaningMm": "ကုန်ကျစရိတ်",
    "relatedTerm": "オールインクルーシブ",
    "deptKey": "front_office"
  },
  {
    "id": 48,
    "kanji": "有害",
    "furigana": "ゆうがい",
    "meaningMm": "အန္တရာယ်ရှိသော",
    "relatedTerm": "害虫駆除（がいちゅうくじょ）",
    "deptKey": "facility"
  },
  {
    "id": 49,
    "kanji": "防除",
    "furigana": "ぼうじょ",
    "meaningMm": "ကာကွယ်ဖယ်ရှားခြင်း",
    "relatedTerm": "害虫駆除（がいちゅうくじょ）",
    "deptKey": "facility"
  },
  {
    "id": 50,
    "kanji": "取りのぞく",
    "furigana": "とりのぞく",
    "meaningMm": "ဖယ်ရှားရှင်းလင်းသည်",
    "relatedTerm": "害虫駆除（がいちゅうくじょ）",
    "deptKey": "facility"
  },
  {
    "id": 51,
    "kanji": "調味料",
    "furigana": "ちょうみりょう",
    "meaningMm": "ဟင်းခတ်အမွှေးအကြိုင် / အရသာမှုန့်/ဆော့စ်",
    "relatedTerm": "カスターセット",
    "deptKey": "fb"
  },
  {
    "id": 52,
    "kanji": "維持",
    "furigana": "いじ",
    "meaningMm": "ထိန်းသိမ်းခြင်း",
    "relatedTerm": "換気（かんき）",
    "deptKey": "facility"
  },
  {
    "id": 53,
    "kanji": "改善",
    "furigana": "かいぜん",
    "meaningMm": "တိုးတက်ကောင်းမွန်စေခြင်း",
    "relatedTerm": "換気（かんき）",
    "deptKey": "facility"
  },
  {
    "id": 54,
    "kanji": "入れかえる",
    "furigana": "いれかえる",
    "meaningMm": "လဲလှယ်သွင်းထုတ်သည်",
    "relatedTerm": "換気（かんき）",
    "deptKey": "facility"
  },
  {
    "id": 55,
    "kanji": "振興",
    "furigana": "しんこう",
    "meaningMm": "ဖွံ့ဖြိုးတိုးတက်စေခြင်း",
    "relatedTerm": "観光協会（かんこうきょうかい）",
    "deptKey": "legal"
  },
  {
    "id": 56,
    "kanji": "公的",
    "furigana": "こうてき",
    "meaningMm": "အများပိုင် / အစိုးရဆိုင်ရာ",
    "relatedTerm": "観光協会（かんこうきょうかい）",
    "deptKey": "legal"
  },
  {
    "id": 57,
    "kanji": "組織",
    "furigana": "そしき",
    "meaningMm": "အဖွဲ့အစည်း",
    "relatedTerm": "観光協会（かんこうきょうかい）",
    "deptKey": "legal"
  },
  {
    "id": 58,
    "kanji": "施設内",
    "furigana": "しせつない",
    "meaningMm": "အဆောက်အအုံအတွင်းပိုင်း",
    "relatedTerm": "館内（かんない）",
    "deptKey": "front_office"
  },
  {
    "id": 59,
    "kanji": "ルームサービス",
    "furigana": "ルームサービス",
    "meaningMm": "အခန်းတွင်း အစားအသောက်ပို့ ဝန်ဆောင်မှု",
    "relatedTerm": "館内利用（かんないりよう）",
    "deptKey": "front_office"
  },
  {
    "id": 60,
    "kanji": "マッサージ",
    "furigana": "マッサージ",
    "meaningMm": "အနှိပ်ဝန်ဆောင်မှု",
    "relatedTerm": "館内利用（かんないりよう）",
    "deptKey": "front_office"
  },
  {
    "id": 61,
    "kanji": "一時的",
    "furigana": "いちじてき",
    "meaningMm": "ယာယီအားဖြင့်",
    "relatedTerm": "休憩（きゅうけい）",
    "deptKey": "hospitality"
  },
  {
    "id": 62,
    "kanji": "休む",
    "furigana": "やすむ",
    "meaningMm": "အနားယူသည်",
    "relatedTerm": "休憩（きゅうけい）",
    "deptKey": "hospitality"
  },
  {
    "id": 63,
    "kanji": "空いている",
    "furigana": "あいている",
    "meaningMm": "လွတ်နေသော",
    "relatedTerm": "空室（くうしつ）",
    "deptKey": "front_office"
  },
  {
    "id": 64,
    "kanji": "状態",
    "furigana": "じょうたい",
    "meaningMm": "အခြေအနေ",
    "relatedTerm": "空室（くうしつ）",
    "deptKey": "front_office"
  },
  {
    "id": 65,
    "kanji": "評価サイト",
    "furigana": "ひょうかサイト",
    "meaningMm": "Review ဆိုက်များ",
    "relatedTerm": "口コミ（くちこみ）",
    "deptKey": "management"
  },
  {
    "id": 66,
    "kanji": "共有",
    "furigana": "きょうゆう",
    "meaningMm": "မျှဝေခြင်း",
    "relatedTerm": "口コミ（くちこみ）",
    "deptKey": "management"
  },
  {
    "id": 67,
    "kanji": "形成される",
    "furigana": "けいせいされる",
    "meaningMm": "ဖြစ်ပေါ်လာသည်",
    "relatedTerm": "口コミ（くちこみ）",
    "deptKey": "management"
  },
  {
    "id": 68,
    "kanji": "尊敬",
    "furigana": "そんけい",
    "meaningMm": "လေးစားခြင်း",
    "relatedTerm": "敬意（けいい）",
    "deptKey": "hospitality"
  },
  {
    "id": 69,
    "kanji": "気持ち",
    "furigana": "きもち",
    "meaningMm": "စိတ်ခံယူချက် / စိတ်ထား",
    "relatedTerm": "敬意（けいい）",
    "deptKey": "hospitality"
  },
  {
    "id": 70,
    "kanji": "立場",
    "furigana": "たちば",
    "meaningMm": "ရပ်တည်ချက် / အဆင့်အတန်း",
    "relatedTerm": "敬語（けいご）",
    "deptKey": "hospitality"
  },
  {
    "id": 71,
    "kanji": "使い分ける",
    "furigana": "つかいわける",
    "meaningMm": "ခွဲခြားသုံးစွဲသည်",
    "relatedTerm": "敬語（けいご）",
    "deptKey": "hospitality"
  },
  {
    "id": 72,
    "kanji": "言語表現",
    "furigana": "げんごひょうげん",
    "meaningMm": "ဘာသာစကားအသုံးအနှုန်း",
    "relatedTerm": "敬語（けいご）",
    "deptKey": "hospitality"
  },
  {
    "id": 73,
    "kanji": "定時の食事",
    "furigana": "ていじのしょくじ",
    "meaningMm": "ပုံမှန်သတ်မှတ်ချိန် အစားအစာ",
    "relatedTerm": "軽食（けいしょく）",
    "deptKey": "fb"
  },
  {
    "id": 74,
    "kanji": "軽い食事",
    "furigana": "かるいしょくじ",
    "meaningMm": "ပေါ့ပေါ့ပါးပါး အစားအစာ",
    "relatedTerm": "軽食（けいしょく）",
    "deptKey": "fb"
  },
  {
    "id": 75,
    "kanji": "生年月日",
    "furigana": "せいねんがっぴ",
    "meaningMm": "မွေးသက္ကရာဇ်",
    "relatedTerm": "個人情報（こじんじょうほう）",
    "deptKey": "legal"
  },
  {
    "id": 76,
    "kanji": "銀行口座",
    "furigana": "ぎんこうこうざ",
    "meaningMm": "ဘဏ်အကောင့်",
    "relatedTerm": "個人情報（こじんじょうほう）",
    "deptKey": "legal"
  },
  {
    "id": 77,
    "kanji": "あらゆる情報",
    "furigana": "あらゆるじょうほう",
    "meaningMm": "အချက်အလက်အားလုံး",
    "relatedTerm": "個人情報（こじんじょうほう）",
    "deptKey": "legal"
  },
  {
    "id": 78,
    "kanji": "調整",
    "furigana": "ちょうせい",
    "meaningMm": "ချိန်ညှိခြင်း",
    "relatedTerm": "採光（さいこう）",
    "deptKey": "facility"
  },
  {
    "id": 79,
    "kanji": "太陽の光",
    "furigana": "たいようのひかり",
    "meaningMm": "နေရောင်ခြည်",
    "relatedTerm": "採光（さいこう）",
    "deptKey": "facility"
  },
  {
    "id": 80,
    "kanji": "取り入れる",
    "furigana": "とりいれる",
    "meaningMm": "အတွင်းသို့ သွင်းယူသည်",
    "relatedTerm": "採光（さいこう）",
    "deptKey": "facility"
  },
  {
    "id": 81,
    "kanji": "暴風",
    "furigana": "ぼうふう",
    "meaningMm": "လေပြင်းမုန်တိုင်း",
    "relatedTerm": "自然災害（しぜんさいがい）",
    "deptKey": "facility"
  },
  {
    "id": 82,
    "kanji": "豪雨",
    "furigana": "ごうう",
    "meaningMm": "မိုးသည်းထန်စွာရွာခြင်း",
    "relatedTerm": "自然災害（しぜんさいがい）",
    "deptKey": "facility"
  },
  {
    "id": 83,
    "kanji": "洪水",
    "furigana": "こうずい",
    "meaningMm": "ရေကြီးခြင်း",
    "relatedTerm": "自然災害（しぜんさいがい）",
    "deptKey": "facility"
  },
  {
    "id": 84,
    "kanji": "被害",
    "furigana": "ひがい",
    "meaningMm": "ပျက်စီးဆုံးရှုံးမှု",
    "relatedTerm": "自然災害（しぜんさいがい）",
    "deptKey": "facility"
  },
  {
    "id": 85,
    "kanji": "都道府県",
    "furigana": "とどうふけん",
    "meaningMm": "ခရိုင်/ပြည်နယ် ၄၇ ခု",
    "relatedTerm": "自治体（じちたい）",
    "deptKey": "legal"
  },
  {
    "id": 86,
    "kanji": "市町村",
    "furigana": "しちょうそん",
    "meaningMm": "မြို့/ကျေးရွာ အုပ်ချုပ်ရေးနယ်မြေများ",
    "relatedTerm": "自治体（じちたい）",
    "deptKey": "legal"
  },
  {
    "id": 87,
    "kanji": "市",
    "furigana": "し",
    "meaningMm": "မြို့ကြီး",
    "relatedTerm": "市町村（しちょうそん）",
    "deptKey": "legal"
  },
  {
    "id": 88,
    "kanji": "町",
    "furigana": "まち / ちょう",
    "meaningMm": "မြို့နယ်ငယ်",
    "relatedTerm": "市町村（しちょうそん）",
    "deptKey": "legal"
  },
  {
    "id": 89,
    "kanji": "村",
    "furigana": "むら / そん",
    "meaningMm": "ကျေးရွာ",
    "relatedTerm": "市町村（しちょうそん）",
    "deptKey": "legal"
  },
  {
    "id": 90,
    "kanji": "煙",
    "furigana": "けむり",
    "meaningMm": "မီးခိုး",
    "relatedTerm": "自動火災報知設備（じどうかさいほうちせつび）",
    "deptKey": "facility"
  },
  {
    "id": 91,
    "kanji": "熱",
    "furigana": "ねつ",
    "meaningMm": "အပူရှိန်",
    "relatedTerm": "自動火災報知設備（じどうかさいほうちせつび）",
    "deptKey": "facility"
  },
  {
    "id": 92,
    "kanji": "感知器",
    "furigana": "かんちき",
    "meaningMm": "အာရုံခံကိရိယာ",
    "relatedTerm": "自動火災報知設備（じどうかさいほうちせつび）",
    "deptKey": "facility"
  },
  {
    "id": 93,
    "kanji": "警報ベル",
    "furigana": "けいほうベル",
    "meaningMm": "အရေးပေါ် အချက်ပေးဘဲလ်",
    "relatedTerm": "自動火災報知設備（じどうかさいほうちせつび）",
    "deptKey": "facility"
  },
  {
    "id": 94,
    "kanji": "働く",
    "furigana": "はたらく",
    "meaningMm": "အလုပ်လုပ်သည်",
    "relatedTerm": "従業員（じゅうぎょういん）",
    "deptKey": "hospitality"
  },
  {
    "id": 95,
    "kanji": "旅館",
    "furigana": "りょかん",
    "meaningMm": "ဂျပန်ရိုးရာတည်းခိုခန်း",
    "relatedTerm": "宿泊施設（しゅくはくしせつ）",
    "deptKey": "legal"
  },
  {
    "id": 96,
    "kanji": "施設",
    "furigana": "しせつ",
    "meaningMm": "အဆောက်အအုံ / အသုံးအဆောင်",
    "relatedTerm": "宿泊施設（しゅくはくしせつ）",
    "deptKey": "legal"
  },
  {
    "id": 97,
    "kanji": "義務づけられている",
    "furigana": "ぎむづけられている",
    "meaningMm": "မဖြစ်မနေ တာဝန်ပေးထားသည်",
    "relatedTerm": "宿泊者名簿（しゅくはくしゃめいぼ）",
    "deptKey": "legal"
  },
  {
    "id": 98,
    "kanji": "宿帳",
    "furigana": "やどちょう",
    "meaningMm": "ဧည့်သည်မှတ်တမ်းစာအုပ်",
    "relatedTerm": "宿泊者名簿（しゅくはくしゃめいぼ）",
    "deptKey": "legal"
  },
  {
    "id": 99,
    "kanji": "保管",
    "furigana": "ほかん",
    "meaningMm": "သိမ်းဆည်းထိန်းသိမ်းခြင်း",
    "relatedTerm": "宿泊者名簿（しゅくはくしゃめいぼ）",
    "deptKey": "legal"
  },
  {
    "id": 100,
    "kanji": "課す",
    "furigana": "かす",
    "meaningMm": "စည်းကြပ်သည် / ကောက်ခံသည်",
    "relatedTerm": "宿泊税（しゅくはくぜい）",
    "deptKey": "legal"
  },
  {
    "id": 101,
    "kanji": "導入",
    "furigana": "どうにゅう",
    "meaningMm": "စတင်ကျင့်သုံးခြင်း",
    "relatedTerm": "宿泊税（しゅくはくぜい）",
    "deptKey": "legal"
  },
  {
    "id": 102,
    "kanji": "税金",
    "furigana": "ぜいきん",
    "meaningMm": "အခွန်",
    "relatedTerm": "宿泊税（しゅくはくぜい）",
    "deptKey": "legal"
  },
  {
    "id": 103,
    "kanji": "締結",
    "furigana": "ていけつ",
    "meaningMm": "စာချုပ်ချုပ်ဆိုခြင်း",
    "relatedTerm": "宿泊約款（しゅくはくやっかん）",
    "deptKey": "legal"
  },
  {
    "id": 104,
    "kanji": "宿泊契約",
    "furigana": "しゅくはくけいやく",
    "meaningMm": "တည်းခိုမှုစာချုပ်",
    "relatedTerm": "宿泊約款（しゅくはくやっかん）",
    "deptKey": "legal"
  },
  {
    "id": 105,
    "kanji": "定めたもの",
    "furigana": "さだめたもの",
    "meaningMm": "သတ်မှတ်ပြဋ္ဌာန်းထားသောအရာ",
    "relatedTerm": "宿泊約款（しゅくはくやっかん）",
    "deptKey": "legal"
  },
  {
    "id": 106,
    "kanji": "仕事場",
    "furigana": "しごとば",
    "meaningMm": "လုပ်ငန်းခွင်",
    "relatedTerm": "出勤（しゅっきん）",
    "deptKey": "hospitality"
  },
  {
    "id": 107,
    "kanji": "出かける",
    "furigana": "でかける",
    "meaningMm": "အပြင်သို့ထွက်သည် / သွားသည်",
    "relatedTerm": "出勤（しゅっきん）",
    "deptKey": "hospitality"
  },
  {
    "id": 108,
    "kanji": "不自由",
    "furigana": "ふじゆう",
    "meaningMm": "မသန်စွမ်းသော / မလွတ်လပ်သော",
    "relatedTerm": "手話（しゅわ）",
    "deptKey": "hospitality"
  },
  {
    "id": 109,
    "kanji": "手を用いる",
    "furigana": "てをもちいる",
    "meaningMm": "လက်ကိုအသုံးပြုသည်",
    "relatedTerm": "手話（しゅわ）",
    "deptKey": "hospitality"
  },
  {
    "id": 110,
    "kanji": "伝え方",
    "furigana": "つたえかた",
    "meaningMm": "ဖော်ပြဆက်သွယ်ပုံ",
    "relatedTerm": "手話（しゅわ）",
    "deptKey": "hospitality"
  },
  {
    "id": 111,
    "kanji": "旬",
    "furigana": "しゅん",
    "meaningMm": "ရာသီပေါ် / အကောင်းဆုံးရာသီ",
    "relatedTerm": "旬の食材（しゅんのしょくざい）",
    "deptKey": "fb"
  },
  {
    "id": 112,
    "kanji": "新鮮",
    "furigana": "しんせん",
    "meaningMm": "လတ်ဆတ်သော",
    "relatedTerm": "旬の食材（しゅんのしょくざい）",
    "deptKey": "fb"
  },
  {
    "id": 113,
    "kanji": "季節ごと",
    "furigana": "きせつごと",
    "meaningMm": "ရာသီအလိုက်",
    "relatedTerm": "旬の食材（しゅんのしょくざい）",
    "deptKey": "fb"
  },
  {
    "id": 114,
    "kanji": "役職",
    "furigana": "やくしょく",
    "meaningMm": "ရာထူး / တာဝန်",
    "relatedTerm": "上司（じょうし）",
    "deptKey": "hospitality"
  },
  {
    "id": 115,
    "kanji": "上の人",
    "furigana": "うえのひと",
    "meaningMm": "အထက်လူကြီး",
    "relatedTerm": "上司（じょうし）",
    "deptKey": "hospitality"
  },
  {
    "id": 116,
    "kanji": "人体",
    "furigana": "じんたい",
    "meaningMm": "လူ့ခန္ဓာကိုယ်",
    "relatedTerm": "消毒（しょうどく）",
    "deptKey": "facility"
  },
  {
    "id": 117,
    "kanji": "取り除く",
    "furigana": "とりのぞく",
    "meaningMm": "ဖယ်ရှားသည်",
    "relatedTerm": "消毒（しょうどく）",
    "deptKey": "facility"
  },
  {
    "id": 118,
    "kanji": "無害",
    "furigana": "むがい",
    "meaningMm": "အန္တရာယ်မရှိသော",
    "relatedTerm": "消毒（しょうどく）",
    "deptKey": "facility"
  },
  {
    "id": 119,
    "kanji": "洗剤",
    "furigana": "せんざい",
    "meaningMm": "ဆပ်ပြာမှုန့် / သန့်စင်ဆေးရည်",
    "relatedTerm": "消耗品費（しょうもうひんぴ）",
    "deptKey": "hospitality"
  },
  {
    "id": 120,
    "kanji": "使い捨て",
    "furigana": "つかいすて",
    "meaningMm": "တစ်ခါသုံး",
    "relatedTerm": "消耗品費（しょうもうひんぴ）",
    "deptKey": "hospitality"
  },
  {
    "id": 121,
    "kanji": "前提",
    "furigana": "ぜんてい",
    "meaningMm": "ကြိုတင်သတ်မှတ်ချက်",
    "relatedTerm": "消耗品費（しょうもうひんぴ）",
    "deptKey": "hospitality"
  },
  {
    "id": 122,
    "kanji": "原材料",
    "furigana": "げんざいりょう",
    "meaningMm": "ကုန်ကြမ်းပစ္စည်းများ",
    "relatedTerm": "食材原価（しょくざいげんか）",
    "deptKey": "fb"
  },
  {
    "id": 123,
    "kanji": "原価",
    "furigana": "げんか",
    "meaningMm": "မူရင်းကုန်ကျစရိတ်",
    "relatedTerm": "食材原価（しょくざいげんか）",
    "deptKey": "fb"
  },
  {
    "id": 124,
    "kanji": "売上高",
    "furigana": "うりあげだか",
    "meaningMm": "စုစုပေါင်းရောင်းရငွေ",
    "relatedTerm": "食材原価率（しょくざいげんかりつ）",
    "deptKey": "fb"
  },
  {
    "id": 125,
    "kanji": "占める",
    "furigana": "しめる",
    "meaningMm": "ပါဝင်နေရာယူသည်",
    "relatedTerm": "食材原価率（しょくざいげんかりつ）",
    "deptKey": "fb"
  },
  {
    "id": 126,
    "kanji": "割合",
    "furigana": "わりあい",
    "meaningMm": "အချိုးအစား / ရာခိုင်နှုန်း",
    "relatedTerm": "食材原価率（しょくざいげんかりつ）",
    "deptKey": "fb"
  },
  {
    "id": 127,
    "kanji": "発熱",
    "furigana": "はつねつ",
    "meaningMm": "အဖျားတက်ခြင်း",
    "relatedTerm": "食中毒（しょくちゅうどく）",
    "deptKey": "fb"
  },
  {
    "id": 128,
    "kanji": "腹痛",
    "furigana": "ふくつう",
    "meaningMm": "ဗိုက်အောင့်ခြင်း",
    "relatedTerm": "食中毒（しょくちゅうどく）",
    "deptKey": "fb"
  },
  {
    "id": 129,
    "kanji": "下痢",
    "furigana": "げり",
    "meaningMm": "ဝမ်းလျှောခြင်း",
    "relatedTerm": "食中毒（しょくちゅうどく）",
    "deptKey": "fb"
  },
  {
    "id": 130,
    "kanji": "嘔吐",
    "furigana": "おうと",
    "meaningMm": "အန်ခြင်း",
    "relatedTerm": "食中毒（しょくちゅうどく）",
    "deptKey": "fb"
  },
  {
    "id": 131,
    "kanji": "ナイフ",
    "furigana": "ナイフ",
    "meaningMm": "ဓား",
    "relatedTerm": "シルバー",
    "deptKey": "fb"
  },
  {
    "id": 132,
    "kanji": "フォーク",
    "furigana": "フォーク",
    "meaningMm": "ခက်ရင်း",
    "relatedTerm": "シルバー",
    "deptKey": "fb"
  },
  {
    "id": 133,
    "kanji": "給与",
    "furigana": "きゅうよ",
    "meaningMm": "လစာ",
    "relatedTerm": "人件費（じんけんひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 134,
    "kanji": "通勤手当",
    "furigana": "つうきんてあて",
    "meaningMm": "အလုပ်သွားလာစရိတ်ထောက်ပံ့ငွေ",
    "relatedTerm": "人件費（じんけんひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 135,
    "kanji": "福利厚生費",
    "furigana": "ふくりこうせいひ",
    "meaningMm": "သက်သာချောင်ချိရေးစရိတ်",
    "relatedTerm": "人件費（じんけんひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 136,
    "kanji": "社会保険料",
    "furigana": "しゃかいほけんりょう",
    "meaningMm": "လူမှုဖူလုံရေးအာမခံကြေး",
    "relatedTerm": "人件費（じんけんひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 137,
    "kanji": "照明",
    "furigana": "しょうめい",
    "meaningMm": "မီးအလင်းရောင်",
    "relatedTerm": "水道光熱費（すいどうこうねつひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 138,
    "kanji": "冷暖房",
    "furigana": "れいだんぼう",
    "meaningMm": "အအေး/အပူပေးစနစ် (အဲကွန်း)",
    "relatedTerm": "水道光熱費（すいどうこうねつひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 139,
    "kanji": "給湯",
    "furigana": "きゅうとう",
    "meaningMm": "ရေနွေးထောက်ပံ့စနစ်",
    "relatedTerm": "水道光熱費（すいどうこうねつひ）",
    "deptKey": "hospitality"
  },
  {
    "id": 140,
    "kanji": "よごれ",
    "furigana": "よごれ",
    "meaningMm": "အညစ်အကြေး",
    "relatedTerm": "清潔（せいけつ）",
    "deptKey": "facility"
  },
  {
    "id": 141,
    "kanji": "きれい",
    "furigana": "きれい",
    "meaningMm": "သန့်ရှင်းသော / လှပသော",
    "relatedTerm": "清潔（せいけつ）",
    "deptKey": "facility"
  },
  {
    "id": 142,
    "kanji": "掃く",
    "furigana": "はく",
    "meaningMm": "တံမြက်စည်းလှည်းသည်",
    "relatedTerm": "清掃（せいそう）",
    "deptKey": "facility"
  },
  {
    "id": 143,
    "kanji": "拭く",
    "furigana": "ふく",
    "meaningMm": "အဝတ်ဖြင့်သုတ်သည်",
    "relatedTerm": "清掃（せいそう）",
    "deptKey": "facility"
  },
  {
    "id": 144,
    "kanji": "シミ",
    "furigana": "シミ",
    "meaningMm": "အစွန်းအထင်း",
    "relatedTerm": "清掃（せいそう）",
    "deptKey": "facility"
  },
  {
    "id": 145,
    "kanji": "細分化",
    "furigana": "さいぶんか",
    "meaningMm": "အသေးစိတ်ခွဲခြမ်းခြင်း",
    "relatedTerm": "セグメンテーション",
    "deptKey": "management"
  },
  {
    "id": 146,
    "kanji": "ニーズ",
    "furigana": "ニーズ",
    "meaningMm": "လိုအပ်ချက်များ",
    "relatedTerm": "セグメンテーション",
    "deptKey": "management"
  },
  {
    "id": 147,
    "kanji": "特性",
    "furigana": "とくせい",
    "meaningMm": "ဝိသေသလက္ခဏာ",
    "relatedTerm": "セグメンテーション",
    "deptKey": "management"
  },
  {
    "id": 148,
    "kanji": "おもてなし",
    "furigana": "おもてなし",
    "meaningMm": "နွေးထွေးလှိုက်လှဲစွာဧည့်ခံခြင်း",
    "relatedTerm": "接客（せっきゃく）",
    "deptKey": "hospitality"
  },
  {
    "id": 149,
    "kanji": "不快",
    "furigana": "ふかい",
    "meaningMm": "မသက်မသာဖြစ်သော / စိတ်မချမ်းမြေ့ဖွယ်",
    "relatedTerm": "騒音（そうおん）",
    "deptKey": "facility"
  },
  {
    "id": 150,
    "kanji": "かざり",
    "furigana": "かざり",
    "meaningMm": "အလှဆင်ခြင်း",
    "relatedTerm": "装飾品（そうしょくひん）",
    "deptKey": "hospitality"
  },
  {
    "id": 151,
    "kanji": "身体",
    "furigana": "しんたい / からだ",
    "meaningMm": "ခန္ဓာကိုယ်",
    "relatedTerm": "装飾品（そうしょくひん）",
    "deptKey": "hospitality"
  },
  {
    "id": 152,
    "kanji": "衣服",
    "furigana": "いふく",
    "meaningMm": "အဝတ်အစား",
    "relatedTerm": "装飾品（そうしょくひん）",
    "deptKey": "hospitality"
  },
  {
    "id": 153,
    "kanji": "専門的知識",
    "furigana": "せんもんてきちしき",
    "meaningMm": "ကျွမ်းကျင်မှုဗဟုသုတ",
    "relatedTerm": "ソムリエ",
    "deptKey": "fb"
  },
  {
    "id": 154,
    "kanji": "最適",
    "furigana": "さいてき",
    "meaningMm": "အသင့်တော်ဆုံး",
    "relatedTerm": "ソムリエ",
    "deptKey": "fb"
  },
  {
    "id": 155,
    "kanji": "提案",
    "furigana": "ていあん",
    "meaningMm": "အကြံပြုတင်ပြခြင်း",
    "relatedTerm": "ソムリエ",
    "deptKey": "fb"
  },
  {
    "id": 156,
    "kanji": "帰る",
    "furigana": "かえる",
    "meaningMm": "ပြန်သည်",
    "relatedTerm": "退勤（たいきん）",
    "deptKey": "hospitality"
  },
  {
    "id": 157,
    "kanji": "応じて",
    "furigana": "おうじて",
    "meaningMm": "လိုက်လျောညီထွေစွာ / အပေါ်မူတည်၍",
    "relatedTerm": "ダイナミックプライシング",
    "deptKey": "management"
  },
  {
    "id": 158,
    "kanji": "価格戦略",
    "furigana": "かかくせんりゃく",
    "meaningMm": "ဈေးနှုန်းမဟာဗျူဟာ",
    "relatedTerm": "ダイナミックプライシング",
    "deptKey": "management"
  },
  {
    "id": 159,
    "kanji": "代行会社",
    "furigana": "だいこうがいしゃ",
    "meaningMm": "ကိုယ်စားလှယ်အေဂျင်စီ",
    "relatedTerm": "ダイレクトブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 160,
    "kanji": "直接交渉",
    "furigana": "ちょくせつこうしょう",
    "meaningMm": "တိုက်ရိုက်ညှိနှိုင်းဆွေးနွေးခြင်း",
    "relatedTerm": "ダイレクトブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 161,
    "kanji": "魅力的",
    "furigana": "みりょくてき",
    "meaningMm": "ဆွဲဆောင်မှုရှိသော",
    "relatedTerm": "ターゲティング",
    "deptKey": "management"
  },
  {
    "id": 162,
    "kanji": "利益を見込める",
    "furigana": "りえきをみこめる",
    "meaningMm": "အမြတ်အစွန်းမျှော်မှန်းနိုင်သော",
    "relatedTerm": "ターゲティング",
    "deptKey": "management"
  },
  {
    "id": 163,
    "kanji": "焦点を当てる",
    "furigana": "しょうてんをあてる",
    "meaningMm": "အာရုံစိုက် ဦးတည်သည်",
    "relatedTerm": "ターゲティング",
    "deptKey": "management"
  },
  {
    "id": 164,
    "kanji": "複数",
    "furigana": "ふくすう",
    "meaningMm": "တစ်ခုထက်မက / အများအပြား",
    "relatedTerm": "ダブルブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 165,
    "kanji": "エラー",
    "furigana": "エラー",
    "meaningMm": "အမှားအယွင်း",
    "relatedTerm": "ダブルブッキング",
    "deptKey": "front_office"
  },
  {
    "id": 166,
    "kanji": "農作物",
    "furigana": "のうさくぶつ",
    "meaningMm": "စိုက်ပျိုးရေးထွက်ကုန်များ",
    "relatedTerm": "地産地消（ちさんちしょう）",
    "deptKey": "fb"
  },
  {
    "id": 167,
    "kanji": "水産物",
    "furigana": "すいさんぶつ",
    "meaningMm": "ရေထွက်ပစ္စည်းများ",
    "relatedTerm": "地産地消（ちさんちしょう）",
    "deptKey": "fb"
  },
  {
    "id": 168,
    "kanji": "四季",
    "furigana": "しき",
    "meaningMm": "ရာသီဥတု ၄ မျိုး",
    "relatedTerm": "地産地消（ちさんちしょう）",
    "deptKey": "fb"
  },
  {
    "id": 169,
    "kanji": "長",
    "furigana": "ちょう / おさ",
    "meaningMm": "ခေါင်းဆောင် / အကြီးအကဲ",
    "relatedTerm": "知事（ちじ）",
    "deptKey": "legal"
  },
  {
    "id": 170,
    "kanji": "住民",
    "furigana": "じゅうみん",
    "meaningMm": "ဒေသခံပြည်သူ",
    "relatedTerm": "知事（ちじ）",
    "deptKey": "legal"
  },
  {
    "id": 171,
    "kanji": "選挙",
    "furigana": "せんきょ",
    "meaningMm": "ရွေးကောက်ပွဲ",
    "relatedTerm": "知事（ちじ）",
    "deptKey": "legal"
  },
  {
    "id": 172,
    "kanji": "持ち帰る",
    "furigana": "もちかえる",
    "meaningMm": "အိမ်သို့ သယ်ဆောင်ပြန်သွားသည်",
    "relatedTerm": "テイクアウト",
    "deptKey": "fb"
  },
  {
    "id": 173,
    "kanji": "日帰り",
    "furigana": "ひがえり",
    "meaningMm": "တစ်နေ့တာခရီး / နေ့ချင်းပြန်",
    "relatedTerm": "デイユース",
    "deptKey": "front_office"
  },
  {
    "id": 174,
    "kanji": "東京都",
    "furigana": "とうきょうと",
    "meaningMm": "တိုကျိုမြို့တော်",
    "relatedTerm": "都道府県（とどうふけん）",
    "deptKey": "legal"
  },
  {
    "id": 175,
    "kanji": "北海道",
    "furigana": "ほっかいどう",
    "meaningMm": "ဟော့ကိုင်းဒိုး",
    "relatedTerm": "都道府県（とどうふけん）",
    "deptKey": "legal"
  },
  {
    "id": 176,
    "kanji": "大阪府・京都府",
    "furigana": "おおさかふ・きょうとふ",
    "meaningMm": "အိုဆာကာနှင့် ကျိုတို",
    "relatedTerm": "都道府県（とどうふけん）",
    "deptKey": "legal"
  },
  {
    "id": 177,
    "kanji": "女性",
    "furigana": "じょせい",
    "meaningMm": "အမျိုးသမီး",
    "relatedTerm": "仲居（なかい）",
    "deptKey": "hospitality"
  },
  {
    "id": 178,
    "kanji": "接客",
    "furigana": "せっきゃく",
    "meaningMm": "ဧည့်ခံဝန်ဆောင်မှု",
    "relatedTerm": "仲居（なかい）",
    "deptKey": "hospitality"
  },
  {
    "id": 179,
    "kanji": "温泉",
    "furigana": "おんせん",
    "meaningMm": "ရေပူစမ်း",
    "relatedTerm": "入湯税（にゅうとうぜい）",
    "deptKey": "legal"
  },
  {
    "id": 180,
    "kanji": "お風呂",
    "furigana": "おふろ",
    "meaningMm": "ရေချိုးကန်",
    "relatedTerm": "入湯税（にゅうとうぜい）",
    "deptKey": "legal"
  },
  {
    "id": 181,
    "kanji": "逆に",
    "furigana": "ぎゃくに",
    "meaningMm": "ဆန့်ကျင်ဘက်အားဖြင့်",
    "relatedTerm": "入湯税（にゅうとうぜい）",
    "deptKey": "legal"
  },
  {
    "id": 182,
    "kanji": "〜にもかかわらず",
    "furigana": "〜にもかかわらず",
    "meaningMm": "သော်လည်း / ပေမယ့်လည်း",
    "relatedTerm": "ノーショー",
    "deptKey": "front_office"
  },
  {
    "id": 183,
    "kanji": "運ぶ",
    "furigana": "はこぶ",
    "meaningMm": "သယ်ဆောင်သည်",
    "relatedTerm": "配膳（はいぜん）",
    "deptKey": "fb"
  },
  {
    "id": 184,
    "kanji": "適切",
    "furigana": "てきせつ",
    "meaningMm": "သင့်လျော်မှန်ကန်သော",
    "relatedTerm": "配膳（はいぜん）",
    "deptKey": "fb"
  },
  {
    "id": 185,
    "kanji": "戒律",
    "furigana": "かいりつ",
    "meaningMm": "ဘာသာရေးစည်းမျဉ်း/ဥပဒေ",
    "relatedTerm": "ハラール",
    "deptKey": "fb"
  },
  {
    "id": 186,
    "kanji": "許されたもの",
    "furigana": "ゆるされたもの",
    "meaningMm": "ခွင့်ပြုထားသောအရာ",
    "relatedTerm": "ハラール",
    "deptKey": "fb"
  },
  {
    "id": 187,
    "kanji": "安心",
    "furigana": "あんしん",
    "meaningMm": "စိတ်အေးချမ်းသာစွာ",
    "relatedTerm": "ハラール",
    "deptKey": "fb"
  },
  {
    "id": 188,
    "kanji": "宴会",
    "furigana": "えんかい",
    "meaningMm": "ဧည့်ခံပွဲ / ပါတီ",
    "relatedTerm": "販売管理費（はんばいかんりひ）",
    "deptKey": "management"
  },
  {
    "id": 189,
    "kanji": "広告・宣伝",
    "furigana": "こうこく・せんでん",
    "meaningMm": "ကြော်ငြာနှင့် အရောင်းမြှင့်တင်ရေး",
    "relatedTerm": "販売管理費（はんばいかんりひ）",
    "deptKey": "management"
  },
  {
    "id": 190,
    "kanji": "事務作業",
    "furigana": "じむさぎょう",
    "meaningMm": "ရုံးစာရွက်စာတမ်းလုပ်ငန်း",
    "relatedTerm": "販売管理費（はんばいかんりひ）",
    "deptKey": "management"
  },
  {
    "id": 191,
    "kanji": "旅行代理店",
    "furigana": "りょこうだいりてん",
    "meaningMm": "ခရီးသွားအေဂျင်စီ",
    "relatedTerm": "販売手数料（はんばいてすうりょう）",
    "deptKey": "management"
  },
  {
    "id": 192,
    "kanji": "手数料",
    "furigana": "てすうりょう",
    "meaningMm": "ဝန်ဆောင်ခ / ကော်မရှင်",
    "relatedTerm": "販売手数料（はんばいてすうりょう）",
    "deptKey": "management"
  },
  {
    "id": 193,
    "kanji": "非常事態",
    "furigana": "ひじょうじたい",
    "meaningMm": "အရေးပေါ်အခြေအနေ",
    "relatedTerm": "非常口（ひじょうぐち）",
    "deptKey": "facility"
  },
  {
    "id": 194,
    "kanji": "備えて",
    "furigana": "そなえて",
    "meaningMm": "ကြိုတင်ပြင်ဆင်၍",
    "relatedTerm": "非常口（ひじょうぐち）",
    "deptKey": "facility"
  },
  {
    "id": 195,
    "kanji": "設置",
    "furigana": "せっち",
    "meaningMm": "တပ်ဆင်ထားရှိခြင်း",
    "relatedTerm": "非常口（ひじょうぐち）",
    "deptKey": "facility"
  },
  {
    "id": 196,
    "kanji": "代わりに",
    "furigana": "かわりに",
    "meaningMm": "အစား",
    "relatedTerm": "筆談（ひつだん）",
    "deptKey": "hospitality"
  },
  {
    "id": 197,
    "kanji": "人同士",
    "furigana": "ひとどうし",
    "meaningMm": "လူအချင်းချင်း",
    "relatedTerm": "筆談（ひつだん）",
    "deptKey": "hospitality"
  },
  {
    "id": 198,
    "kanji": "逃れる",
    "furigana": "のがれる",
    "meaningMm": "လွတ်မြောက်သည်",
    "relatedTerm": "避難（ひなん）",
    "deptKey": "facility"
  },
  {
    "id": 199,
    "kanji": "立ちのく",
    "furigana": "たちのく",
    "meaningMm": "တိမ်းရှောင်ထွက်ခွာသည်",
    "relatedTerm": "避難（ひなん）",
    "deptKey": "facility"
  },
  {
    "id": 200,
    "kanji": "〜に際して",
    "furigana": "〜にさいして",
    "meaningMm": "ချိန်တွင် / အခါ၌",
    "relatedTerm": "避難経路（ひなんけいろ）",
    "deptKey": "facility"
  },
  {
    "id": 201,
    "kanji": "道すじ",
    "furigana": "みちすじ",
    "meaningMm": "လမ်းကြောင်း / လမ်းခရီး",
    "relatedTerm": "避難経路（ひなんけいろ）",
    "deptKey": "facility"
  },
  {
    "id": 202,
    "kanji": "自社",
    "furigana": "じしゃ",
    "meaningMm": "မိမိကုမ္ပဏီ / ကိုယ်ပိုင်",
    "relatedTerm": "ブッキングエンジン",
    "deptKey": "front_office"
  },
  {
    "id": 203,
    "kanji": "受け付ける",
    "furigana": "うけつける",
    "meaningMm": "လက်ခံသည်",
    "relatedTerm": "ブッキングエンジン",
    "deptKey": "front_office"
  },
  {
    "id": 204,
    "kanji": "多種多様",
    "furigana": "たしゅたよう",
    "meaningMm": "စုံလင်ကွဲပြားသော",
    "relatedTerm": "ブッフェ料理",
    "deptKey": "fb"
  },
  {
    "id": 205,
    "kanji": "並ぶ",
    "furigana": "ならぶ",
    "meaningMm": "စီတန်းခင်းကျင်းထားသည်",
    "relatedTerm": "ブッフェ料理",
    "deptKey": "fb"
  },
  {
    "id": 206,
    "kanji": "取り分ける",
    "furigana": "とりわける",
    "meaningMm": "ခွဲဝေထည့်ယူသည်",
    "relatedTerm": "ブッフェ料理",
    "deptKey": "fb"
  },
  {
    "id": 207,
    "kanji": "定義",
    "furigana": "ていぎ",
    "meaningMm": "အဓိပ္ပာယ်ဖွင့်ဆိုချက်",
    "relatedTerm": "富裕層（ふゆうそう）",
    "deptKey": "management"
  },
  {
    "id": 208,
    "kanji": "一般的",
    "furigana": "いっぱんてき",
    "meaningMm": "ယေဘုယျအားဖြင့်",
    "relatedTerm": "富裕層（ふゆうそう）",
    "deptKey": "management"
  },
  {
    "id": 209,
    "kanji": "独自",
    "furigana": "どくじ",
    "meaningMm": "သီးသန့်ကိုယ်ပိုင်",
    "relatedTerm": "ブランディング",
    "deptKey": "management"
  },
  {
    "id": 210,
    "kanji": "強調",
    "furigana": "きょうちょう",
    "meaningMm": "အလေးပေးဖော်ပြခြင်း",
    "relatedTerm": "ブランディング",
    "deptKey": "management"
  },
  {
    "id": 211,
    "kanji": "一貫した",
    "furigana": "いっかんした",
    "meaningMm": "တသမတ်တည်းဖြစ်သော",
    "relatedTerm": "ブランディング",
    "deptKey": "management"
  },
  {
    "id": 212,
    "kanji": "メディア",
    "furigana": "メディア",
    "meaningMm": "သတင်းမီဒီယာ",
    "relatedTerm": "プレスリリース",
    "deptKey": "management"
  },
  {
    "id": 213,
    "kanji": "発信",
    "furigana": "はっしん",
    "meaningMm": "သတင်းထုတ်လွှင့်ဖြန့်ဝေခြင်း",
    "relatedTerm": "プレスリリース",
    "deptKey": "management"
  },
  {
    "id": 214,
    "kanji": "公式声明文",
    "furigana": "こうしきせいめいぶん",
    "meaningMm": "တရားဝင်ကြေညာချက်စာလွှာ",
    "relatedTerm": "プレスリリース",
    "deptKey": "management"
  },
  {
    "id": 215,
    "kanji": "朝食のみ",
    "furigana": "ちょうしょくのみ",
    "meaningMm": "မနက်စာသာလျှင်",
    "relatedTerm": "ベッド＆ブレックファースト（B&B）",
    "deptKey": "front_office"
  },
  {
    "id": 216,
    "kanji": "さける（避ける）",
    "furigana": "さける",
    "meaningMm": "ရှောင်ကြဉ်သည်",
    "relatedTerm": "ベジタリアン",
    "deptKey": "fb"
  },
  {
    "id": 217,
    "kanji": "穀物",
    "furigana": "こくもつ",
    "meaningMm": "ကောက်ပဲသီးနှံ",
    "relatedTerm": "ベジタリアン",
    "deptKey": "fb"
  },
  {
    "id": 218,
    "kanji": "豆類",
    "furigana": "まめるい",
    "meaningMm": "ပဲမျိုးစုံ",
    "relatedTerm": "ベジタリアン",
    "deptKey": "fb"
  },
  {
    "id": 219,
    "kanji": "植物性食品",
    "furigana": "しょくぶつせいしょくひん",
    "meaningMm": "အပင်ထွက် အစားအစာ",
    "relatedTerm": "ベジタリアン",
    "deptKey": "fb"
  },
  {
    "id": 220,
    "kanji": "火災",
    "furigana": "かさい",
    "meaningMm": "မီးဘေး / မီးလောင်မှု",
    "relatedTerm": "防火（ぼうか）",
    "deptKey": "facility"
  },
  {
    "id": 221,
    "kanji": "防ぐ",
    "furigana": "ふせぐ",
    "meaningMm": "ကာကွယ်သည်",
    "relatedTerm": "防火（ぼうか）",
    "deptKey": "facility"
  },
  {
    "id": 222,
    "kanji": "地域住民",
    "furigana": "ちいきじゅうみん",
    "meaningMm": "ဒေသခံပြည်သူများ",
    "relatedTerm": "保健所（ほけんじょ）",
    "deptKey": "legal"
  },
  {
    "id": 223,
    "kanji": "支える",
    "furigana": "ささえる",
    "meaningMm": "ထောက်ပံ့ကူညီသည်",
    "relatedTerm": "保健所（ほけんじょ）",
    "deptKey": "legal"
  },
  {
    "id": 224,
    "kanji": "空いていない",
    "furigana": "あいていない",
    "meaningMm": "မလွတ်တော့သော",
    "relatedTerm": "満室（まんしつ）",
    "deptKey": "front_office"
  },
  {
    "id": 225,
    "kanji": "言葉づかい",
    "furigana": "ことばづかい",
    "meaningMm": "အပြောအဆို အသုံးအနှုန်း",
    "relatedTerm": "身だしなみ（みだしなみ）",
    "deptKey": "hospitality"
  },
  {
    "id": 226,
    "kanji": "整える",
    "furigana": "ととのえる",
    "meaningMm": "သပ်ရပ်အောင် ပြင်ဆင်ထိန်းသိမ်းသည်",
    "relatedTerm": "身だしなみ（みだしなみ）",
    "deptKey": "hospitality"
  },
  {
    "id": 227,
    "kanji": "主要",
    "furigana": "しゅよう",
    "meaningMm": "အဓိကကျသော / ပဓာနဖြစ်သော",
    "relatedTerm": "メインディッシュ",
    "deptKey": "fb"
  },
  {
    "id": 228,
    "kanji": "国籍",
    "furigana": "こくせき",
    "meaningMm": "နိုင်ငံသား",
    "relatedTerm": "ユニバーサルデザイン",
    "deptKey": "hospitality"
  },
  {
    "id": 229,
    "kanji": "障害の有無",
    "furigana": "しょうがいのうむ",
    "meaningMm": "မသန်စွမ်းမှု ရှိ/မရှိ",
    "relatedTerm": "ユニバーサルデザイン",
    "deptKey": "hospitality"
  },
  {
    "id": 230,
    "kanji": "建築",
    "furigana": "けんちく",
    "meaningMm": "ဗိသုကာလက်ရာ / အဆောက်အအုံ",
    "relatedTerm": "ユニバーサルデザイン",
    "deptKey": "hospitality"
  },
  {
    "id": 231,
    "kanji": "設計",
    "furigana": "せっけい",
    "meaningMm": "ဒီဇိုင်းရေးဆွဲခြင်း",
    "relatedTerm": "ユニバーサルデザイン",
    "deptKey": "hospitality"
  },
  {
    "id": 232,
    "kanji": "シーツ",
    "furigana": "シーツ",
    "meaningMm": "အိပ်ရာခင်း",
    "relatedTerm": "リネン",
    "deptKey": "facility"
  },
  {
    "id": 233,
    "kanji": "タオル",
    "furigana": "タオル",
    "meaningMm": "သုတ်ပဝါ / တဘက်",
    "relatedTerm": "リネン",
    "deptKey": "facility"
  },
  {
    "id": 234,
    "kanji": "過去",
    "furigana": "かこ",
    "meaningMm": "အတိတ် / ယခင်က",
    "relatedTerm": "リピーター",
    "deptKey": "management"
  },
  {
    "id": 235,
    "kanji": "繰り返し",
    "furigana": "くりかえし",
    "meaningMm": "ထပ်ခါတလဲလဲ / အကြိမ်ကြိမ်",
    "relatedTerm": "リピーター",
    "deptKey": "management"
  },
  {
    "id": 236,
    "kanji": "場面",
    "furigana": "ばめん",
    "meaningMm": "အခြေအနေ / အခင်းအကျင်း",
    "relatedTerm": "礼儀作法（れいぎさほう）",
    "deptKey": "hospitality"
  },
  {
    "id": 237,
    "kanji": "作法",
    "furigana": "さほう",
    "meaningMm": "ကျင့်ဝတ် / နည်းလမ်း",
    "relatedTerm": "礼儀作法（れいぎさほう）",
    "deptKey": "hospitality"
  },
  {
    "id": 238,
    "kanji": "効率的",
    "furigana": "こうりつてき",
    "meaningMm": "ထိရောက်သော",
    "relatedTerm": "レベニューマネジメント",
    "deptKey": "management"
  },
  {
    "id": 239,
    "kanji": "確保する",
    "furigana": "かくほする",
    "meaningMm": "ရရှိသေချာစေသည်",
    "relatedTerm": "レベニューマネジメント",
    "deptKey": "management"
  },
  {
    "id": 240,
    "kanji": "コントロール",
    "furigana": "コントロール",
    "meaningMm": "ထိန်းချုပ်စီမံသည်",
    "relatedTerm": "レベニューマネジメント",
    "deptKey": "management"
  },
  {
    "id": 241,
    "kanji": "連続",
    "furigana": "れんぞく",
    "meaningMm": "ဆက်တိုက်ဖြစ်သော",
    "relatedTerm": "連泊（れんぱく）",
    "deptKey": "front_office"
  },
  {
    "id": 242,
    "kanji": "宿泊",
    "furigana": "しゅくはく",
    "meaningMm": "တည်းခိုခြင်း",
    "relatedTerm": "連泊（れんぱく）",
    "deptKey": "front_office"
  },
  {
    "id": 243,
    "kanji": "利益率",
    "furigana": "りえきりつ",
    "meaningMm": "အမြတ်အစွန်းရာခိုင်နှုန်း",
    "relatedTerm": "ABC分析（えーびーしーぶんせき）",
    "deptKey": "fb"
  },
  {
    "id": 244,
    "kanji": "ランク分け",
    "furigana": "ランクわけ",
    "meaningMm": "အဆင့်ခွဲခြားခြင်း",
    "relatedTerm": "ABC分析（えーびーしーぶんせき）",
    "deptKey": "fb"
  },
  {
    "id": 245,
    "kanji": "明確にし",
    "furigana": "めいかくにし",
    "meaningMm": "ရှင်းလင်းထင်ရှားစေပြီး",
    "relatedTerm": "ABC分析（えーびーしーぶんせき）",
    "deptKey": "fb"
  },
  {
    "id": 246,
    "kanji": "略語",
    "furigana": "りゃくご",
    "meaningMm": "အတိုကောက်စကားလုံး",
    "relatedTerm": "ADR",
    "deptKey": "management"
  },
  {
    "id": 247,
    "kanji": "平均販売単価",
    "furigana": "へいきんはんばいたんか",
    "meaningMm": "ပျမ်းမျှရောင်းဈေးနှုန်း",
    "relatedTerm": "ADR",
    "deptKey": "management"
  },
  {
    "id": 248,
    "kanji": "算出",
    "furigana": "さんしゅつ",
    "meaningMm": "တွက်ချက်ထုတ်ယူခြင်း",
    "relatedTerm": "ADR",
    "deptKey": "management"
  },
  {
    "id": 249,
    "kanji": "仕入れ",
    "furigana": "しいれ",
    "meaningMm": "ပစ္စည်းဝယ်ယူတင်သွင်းခြင်း",
    "relatedTerm": "F&Bコントロール",
    "deptKey": "fb"
  },
  {
    "id": 250,
    "kanji": "在庫",
    "furigana": "ざいこ",
    "meaningMm": "ပစ္စည်းလက်ကျန် / စတော့ခ်",
    "relatedTerm": "F&Bコントロール",
    "deptKey": "fb"
  },
  {
    "id": 251,
    "kanji": "食品ロス",
    "furigana": "しょくひんロス",
    "meaningMm": "အစားအစာအလေအလွင့်",
    "relatedTerm": "F&Bコントロール",
    "deptKey": "fb"
  },
  {
    "id": 252,
    "kanji": "自由",
    "furigana": "じゆう",
    "meaningMm": "လွတ်လပ်သော",
    "relatedTerm": "FIT",
    "deptKey": "management"
  },
  {
    "id": 253,
    "kanji": "個人旅行者",
    "furigana": "こじんりょこうしゃ",
    "meaningMm": "တစ်ဦးချင်းခရီးသွား",
    "relatedTerm": "FIT",
    "deptKey": "management"
  },
  {
    "id": 254,
    "kanji": "食材費",
    "furigana": "しょくざいひ",
    "meaningMm": "အစားအစာကုန်ကြမ်းစရိတ်",
    "relatedTerm": "FL率（えふえるりつ）",
    "deptKey": "management"
  },
  {
    "id": 255,
    "kanji": "人件費",
    "furigana": "じんけんひ",
    "meaningMm": "လူအင်အားစရိတ်",
    "relatedTerm": "FL率（えふえるりつ）",
    "deptKey": "management"
  },
  {
    "id": 256,
    "kanji": "占める割合",
    "furigana": "しめるわりあい",
    "meaningMm": "ပါဝင်နေသော အချိုးအစား",
    "relatedTerm": "FL率（えふえるりつ）",
    "deptKey": "management"
  },
  {
    "id": 257,
    "kanji": "危害",
    "furigana": "きがい",
    "meaningMm": "ဘေးအန္တရာယ် / ထိခိုက်မှု",
    "relatedTerm": "HACCP（はさっぷ）",
    "deptKey": "fb"
  },
  {
    "id": 258,
    "kanji": "予防",
    "furigana": "よぼう",
    "meaningMm": "ကြိုတင်ကာကွယ်ခြင်း",
    "relatedTerm": "HACCP（はさっぷ）",
    "deptKey": "fb"
  },
  {
    "id": 259,
    "kanji": "監視",
    "furigana": "かんし",
    "meaningMm": "စောင့်ကြည့်စစ်ဆေးခြင်း",
    "relatedTerm": "HACCP（はさっぷ）",
    "deptKey": "fb"
  },
  {
    "id": 260,
    "kanji": "目標達成",
    "furigana": "もくひょうたっせい",
    "meaningMm": "ပန်းတိုင်အောင်မြင်မှု",
    "relatedTerm": "KPI",
    "deptKey": "management"
  },
  {
    "id": 261,
    "kanji": "業績評価",
    "furigana": "ぎょうせきひょうか",
    "meaningMm": "စွမ်းဆောင်ရည်အကဲဖြတ်မှု",
    "relatedTerm": "KPI",
    "deptKey": "management"
  },
  {
    "id": 262,
    "kanji": "指標",
    "furigana": "しひょう",
    "meaningMm": "ညွှန်းကိန်း",
    "relatedTerm": "KPI",
    "deptKey": "management"
  },
  {
    "id": 263,
    "kanji": "稼働状況",
    "furigana": "かどうじょうきょう",
    "meaningMm": "အလုပ်လုပ်နေမှု/ငှားရမ်းမှု အခြေအနေ",
    "relatedTerm": "OCC",
    "deptKey": "management"
  },
  {
    "id": 264,
    "kanji": "予約室数",
    "furigana": "よやくしつすう",
    "meaningMm": "ဘိုကင်ရသောအခန်းအရေအတွက်",
    "relatedTerm": "OCC",
    "deptKey": "management"
  },
  {
    "id": 265,
    "kanji": "総室数",
    "furigana": "そうしつすう",
    "meaningMm": "စုစုပေါင်းအခန်းအရေအတွက်",
    "relatedTerm": "OCC",
    "deptKey": "management"
  },
  {
    "id": 266,
    "kanji": "インターネットを介して",
    "furigana": "インターネットをかいして",
    "meaningMm": "အင်တာနက်မှတစ်ဆင့်",
    "relatedTerm": "OTA",
    "deptKey": "front_office"
  },
  {
    "id": 267,
    "kanji": "旅行商品",
    "furigana": "りょこうしょうひん",
    "meaningMm": "ခရီးသွားကုန်ပစ္စည်း/ပက်ကေ့ချ်",
    "relatedTerm": "OTA",
    "deptKey": "front_office"
  },
  {
    "id": 268,
    "kanji": "予約管理",
    "furigana": "よやくかんり",
    "meaningMm": "ဘိုကင်စီမံခန့်ခွဲမှု",
    "relatedTerm": "PMS",
    "deptKey": "front_office"
  },
  {
    "id": 269,
    "kanji": "客室管理",
    "furigana": "きゃくしつかんり",
    "meaningMm": "အခန်းစီမံခန့်ခွဲမှု",
    "relatedTerm": "PMS",
    "deptKey": "front_office"
  },
  {
    "id": 270,
    "kanji": "会計管理",
    "furigana": "かいけいかんり",
    "meaningMm": "စာရင်းအင်းငွေကြေးစီမံခန့်ခွဲမှု",
    "relatedTerm": "PMS",
    "deptKey": "front_office"
  },
  {
    "id": 271,
    "kanji": "販売可能",
    "furigana": "はんばいかのう",
    "meaningMm": "ရောင်းချနိုင်သော",
    "relatedTerm": "RevPAR（れぶぱー）",
    "deptKey": "management"
  },
  {
    "id": 272,
    "kanji": "客室稼働率",
    "furigana": "きゃくしつかどうりつ",
    "meaningMm": "အခန်းငှားရမ်းမှုရာခိုင်နှုန်း (OCC)",
    "relatedTerm": "RevPAR（れぶぱー）",
    "deptKey": "management"
  },
  {
    "id": 273,
    "kanji": "客室平均単価",
    "furigana": "きゃくしつへいきんたんか",
    "meaningMm": "အခန်းပျမ်းမျှရောင်းဈေး (ADR)",
    "relatedTerm": "RevPAR（れぶぱー）",
    "deptKey": "management"
  },
  {
    "id": 274,
    "kanji": "検索エンジン",
    "furigana": "けんさくエンジン",
    "meaningMm": "ရှာဖွေရေးအင်ဂျင်",
    "relatedTerm": "SEO",
    "deptKey": "management"
  },
  {
    "id": 275,
    "kanji": "上位に表示",
    "furigana": "じょういにひょうじ",
    "meaningMm": "ထိပ်ဆုံးတွင်ဖော်ပြခြင်း",
    "relatedTerm": "SEO",
    "deptKey": "management"
  },
  {
    "id": 276,
    "kanji": "構成",
    "furigana": "こうせい",
    "meaningMm": "ဖွဲ့စည်းပုံ",
    "relatedTerm": "SEO",
    "deptKey": "management"
  },
  {
    "id": 277,
    "kanji": "記述",
    "furigana": "きじゅつ",
    "meaningMm": "ရေးသားဖော်ပြချက်",
    "relatedTerm": "SEO",
    "deptKey": "management"
  },
  {
    "id": 278,
    "kanji": "重要人物",
    "furigana": "じゅうようじんぶつ",
    "meaningMm": "အရေးပါသောပုဂ္ဂိုလ်",
    "relatedTerm": "VIP",
    "deptKey": "hospitality"
  },
  {
    "id": 279,
    "kanji": "特別",
    "furigana": "とくべつ",
    "meaningMm": "အထူးဖြစ်သော",
    "relatedTerm": "VIP",
    "deptKey": "hospitality"
  }
];
