export type SearchSource = 'google' | 'instagram' | 'facebook' | 'whatsapp' | 'direct' | 'other'

export type IntentCategory =
  | 'bridal_suite'
  | 'makeup'
  | 'hair'
  | 'photography'
  | 'catering'
  | 'general'

export interface SearchIntent {
  keyword: string | null
  source: SearchSource
  category: IntentCategory
}

// מיפוי מילות מפתח → קטגוריה
const KEYWORD_MAP: Array<[string[], IntentCategory]> = [
  [['מאפרת', 'איפור', 'מקאפ', 'makeup', 'make up'], 'makeup'],
  [['שיער', 'תסרוקת', 'מעצבת שיער', 'coiffure', 'hair'], 'hair'],
  [['צלמת', 'צלם', 'צילום', 'photographer', 'photo'], 'photography'],
  [['קייטרינג', 'אוכל', 'ארוחה', 'catering', 'buffet'], 'catering'],
  [[
    'סוויטה', 'סוויטת כלות', 'התארגנות כלה', 'וילה כלות', 'חדר כלה',
    'bridal suite', 'bridal', 'כלה', 'חתונה', 'wedding',
  ], 'bridal_suite'],
]

function classifyKeyword(kw: string): IntentCategory {
  const lower = kw.toLowerCase()
  for (const [terms, category] of KEYWORD_MAP) {
    if (terms.some(t => lower.includes(t.toLowerCase()))) return category
  }
  return 'general'
}

export function detectSearchIntent(): SearchIntent {
  if (typeof window === 'undefined') {
    return { keyword: null, source: 'direct', category: 'general' }
  }

  const params  = new URLSearchParams(window.location.search)
  const utmTerm = params.get('utm_term') || params.get('q') || params.get('keyword') || params.get('kw')
  const utmSrc  = (params.get('utm_source') || '').toLowerCase()
  const referrer = document.referrer || ''

  // זיהוי מקור
  let source: SearchSource = 'direct'
  if (utmSrc.includes('google') || referrer.includes('google.com'))     source = 'google'
  else if (utmSrc.includes('instagram') || referrer.includes('instagram')) source = 'instagram'
  else if (utmSrc.includes('facebook')  || referrer.includes('facebook'))  source = 'facebook'
  else if (utmSrc.includes('whatsapp')  || referrer.includes('whatsapp'))  source = 'whatsapp'
  else if (utmSrc || referrer)                                              source = 'other'

  // זיהוי מילת חיפוש
  let keyword: string | null = utmTerm || null

  // חילוץ q= מה-referrer של גוגל (HTTP)
  if (!keyword && referrer.includes('google.com')) {
    try {
      keyword = new URL(referrer).searchParams.get('q')
    } catch { /* ignore */ }
  }

  const category = keyword ? classifyKeyword(keyword) : 'general'
  return { keyword, source, category }
}

/** הודעת פתיחה מותאמת לפי כוונת החיפוש */
export function getPersonalizedOpener(intent: SearchIntent): string {
  const { keyword, source, category } = intent

  const kwPhrase = keyword ? `ראיתי שחיפשת "${keyword}" ` : ''
  const srcPhrase =
    source === 'google'    ? '(הגעת אלינו מגוגל) ' :
    source === 'instagram' ? '(הגעת אלינו מאינסטגרם) ' :
    source === 'facebook'  ? '(הגעת אלינו מפייסבוק) ' : ''

  switch (category) {
    case 'makeup':
      return `היי! ${kwPhrase}${srcPhrase}💄\nאני חגית. יש לי רשימה של מאפרות מדהימות שעובדות בסוויטה — אשמח להמליץ!\n\nמתי תאריך החתונה שלך?`

    case 'hair':
      return `היי! ${kwPhrase}${srcPhrase}✂️\nאני חגית. עובדות איתי מעצבות שיער מעולות לבוקר החתונה!\n\nמתי תאריך החתונה שלך?`

    case 'photography':
      return `היי! ${kwPhrase}${srcPhrase}📸\nאני חגית. יש לי קשרים עם כמה צלמות ממש מוכשרות — בואי נמצא לך את המתאימה!\n\nמתי תאריך החתונה שלך?`

    case 'catering':
      return `היי! ${kwPhrase}${srcPhrase}🍽️\nאני חגית. בסוויטה אנחנו מציעים גם כיבוד, ארוחת בוקר ועוד — בואי נבנה לך חבילה מושלמת!\n\nמתי תאריך החתונה שלך?`

    case 'bridal_suite':
      return `היי! ${kwPhrase}${srcPhrase}✨\nאני חגית, ואת הגעת בדיוק למקום הנכון — סוויטת כלות יוקרתית בהרי ירושלים!\n\nמתי תאריך החתונה שלך?`

    default:
      return `היי! מזל טוב 💍 אני חגית.\n\nמתי תאריך החתונה שלך?`
  }
}
