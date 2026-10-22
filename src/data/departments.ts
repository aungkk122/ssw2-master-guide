export interface DepartmentInfo {
  key: string;
  num: number;
  nameJp: string;
  nameEn: string;
  nameMm: string;
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    "key": "front_office",
    "num": 1,
    "nameJp": "予約・フロント業務",
    "nameEn": "Front Office & Reservations",
    "nameMm": "၁။ အခန်းကြိုတင်ဘိုကင်နှင့် ဖရွန့်ကောင်တာ လုပ်ငန်းဆိုင်ရာ"
  },
  {
    "key": "fb",
    "num": 2,
    "nameJp": "料飲・食品安全",
    "nameEn": "F&B & Food Safety",
    "nameMm": "၂။ စားသောက်ဆိုင်၊ ဟင်းလျာနှင့် အစားအသောက် ဘေးကင်းလုံခြုံရေးဆိုင်ရာ"
  },
  {
    "key": "management",
    "num": 3,
    "nameJp": "経営・収益・マーケティング",
    "nameEn": "Management & Marketing",
    "nameMm": "၃။ ဟိုတယ်စီမံခန့်ခွဲမှု၊ ဝင်ငွေထိန်းချုပ်မှုနှင့် ဈေးကွက်ရှာဖွေရေးဆိုင်ရာ"
  },
  {
    "key": "facility",
    "num": 4,
    "nameJp": "施設・清掃・防災安全",
    "nameEn": "Facility & Safety",
    "nameMm": "၄။ အဆောက်အအုံ၊ သန့်ရှင်းရေး၊ မီးဘေးနှင့် သဘာဝဘေးအန္တရာယ် ကာကွယ်ရေးဆိုင်ရာ"
  },
  {
    "key": "legal",
    "num": 5,
    "nameJp": "法令・行政・税務",
    "nameEn": "Legal & Regulations",
    "nameMm": "၅။ ဥပဒေ၊ စည်းမျဉ်းစည်းကမ်းနှင့် အစိုးရအဖွဲ့အစည်းများဆိုင်ရာ"
  },
  {
    "key": "hospitality",
    "num": 6,
    "nameJp": "接客・マナー・労務管理",
    "nameEn": "Hospitality & Staff",
    "nameMm": "၆။ ဧည့်ခံဝန်ဆောင်မှု၊ ကျင့်ဝတ်နှင့် ဝန်ထမ်းစီမံခန့်ခွဲမှုဆိုင်ရာ"
  }
];
