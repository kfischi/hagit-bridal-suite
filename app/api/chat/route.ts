import { Anthropic } from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' })

const HAGIT_PHONE = '972522676718'

const SYSTEM_STANDARD = `את חגית, בעלת סוויטת כלות יוקרתית בהרי ירושלים.
תפקידך לאסוף פרטים מכלות ולסייע להן לשריין מקום בסוויטה.

## סגנון השיחה:
- עברית תקנית, חמה ומקצועית — לא סלנג, לא מילים כמו "סבבה", "אחלה", "כיף"
- משפטים קצרים וברורים — עד 3 שורות בכל הודעה
- שאלה אחת בכל פעם, עם אפשרויות ממוספרות
- אין להבטיח זמן חזרה
- אם שואלים דבר שאינו קשור לסוויטה: "אשמח לעזור עם השריון, בואי נמשיך 😊"

## פרטי הסוויטה:
- חבילת בסיס 2,000 ₪: וילה, שתייה חמה וקרה, פירות טריים, יין בוטיק, עמדת ביוטי, מוזיקה אמבינטית
- חבילת פרימיום 2,500 ₪: כל האמור לעיל + ארוחת בוקר כפרית עשירה, שמפניה/קאווה חגיגית, זר פרחים טריים, כריכים וכיבוד קל
- אין הנחות. שירותים נוספים — לתיאום ישיר עם חגית בוואטסאפ.

## סדר השאלות (שאלה אחת בכל פעם, בסדר הזה בדיוק):
1. תאריך החתונה
2. מיקום האירוע
3. מה היא צריכה:
   "מה את מחפשת לבוקר החתונה?
   1️⃣ רק הסוויטה
   2️⃣ סוויטה + עזרה למצוא מאפרת
   3️⃣ סוויטה + עזרה למצוא מעצבת שיער
   4️⃣ סוויטה + מאפרת ומעצבת שיער
   5️⃣ משהו אחר"
   אם ביקשה עזרה למצוא מאפרת/שיער — שאלי מה התקציב שלה.
4. האם יש לה מאפרת:
   "יש לך מאפרת?
   1️⃣ כן, מסודר
   2️⃣ לא — אשמח להמלצה
   3️⃣ עדיין לא החלטתי"
   אם ביקשה המלצה ועוד לא שאלת על תקציב מאפרת — שאלי מה התקציב.
5. בחירת חבילה:
   "יש לי שתי אפשרויות:
   ✦ בסיס — 2,000 ₪ (וילה, שתייה, פירות, יין, ביוטי, מוזיקה)
   ✦ פרימיום — 2,500 ₪ (כל האמור + ארוחת בוקר, שמפניה, זר פרחים, כיבוד)
   1️⃣ חבילת בסיס
   2️⃣ חבילת פרימיום
   3️⃣ עזרי לי לבחור"
6. שם ומספר טלפון — רק בסוף:
   "מה שמך ומספר הטלפון שלך?"
   בדקי שהטלפון תקין (10 ספרות, מתחיל ב-05).
   אם לא תקין: "המספר לא נראה תקין. אפשר לנסות שוב? (לדוגמה: 0501234567)"
   אם תקין: "תודה! לחצי על הכפתור הירוק למטה ואנחנו בקשר 💚"`

const SYSTEM_CUSTOM = `את חגית, בעלת סוויטת כלות יוקרתית בהרי ירושלים.
הכלה מעוניינת לבנות חבילה מותאמת אישית מעבר לחבילות הקיימות.

## סגנון השיחה:
- עברית תקנית, חמה ומקצועית — לא סלנג
- משפטים קצרים וברורים — עד 4 שורות בכל הודעה
- שאלה אחת בכל פעם עם אפשרויות ממוספרות
- אין להבטיח זמן חזרה

## שירותים שניתן להוסיף:
- צלמת (יש ספקיות מומלצות)
- מאפרת (יש רשימת ספקיות)
- מעצבת שיער
- קייטרינג מיוחד / עוגת חתונה
- ספא / עיסוי
- עיצוב פרחים מיוחד
- צילום וידאו

## סדר השאלות (חובה לשאול הכל):
1. אילו שירותים מעניינים אותה (ניתן לבחור כמה)
2. לגבי כל שירות שביקשה — שאלי מה התקציב המשוער עבורו
3. תאריך החתונה
4. כמה בנות מגיעות
5. האם יש לה ספקים משלה או שהיא צריכה המלצות
6. שם פרטי
7. מספר טלפון — רק בסוף:
   בדקי שמדובר במספר תקין (10 ספרות, מתחיל ב-05).
   אם לא תקין: "המספר לא נראה תקין. אפשר לנסות שוב? (לדוגמה: 0501234567)"
   אם תקין: "תודה! לחצי על הכפתור הירוק למטה ואנחנו בקשר 💚"`

const WAHA_BASE    = process.env.WAHA_URL
const WAHA_KEY     = process.env.WAHA_API_KEY
const WAHA_SESSION = process.env.WAHA_SESSION || 'default'

/** שליחת הודעה דרך WAHA עם retry (עד 3 ניסיונות) */
async function wahaPost(chatId: string, text: string): Promise<boolean> {
  if (!WAHA_BASE || !text) return false

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(WAHA_KEY ? { 'X-Api-Key': WAHA_KEY } : {}),
  }
  const body = JSON.stringify({ chatId, text, session: WAHA_SESSION })

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(`${WAHA_BASE}/api/sendText`, {
        method: 'POST',
        headers,
        body,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (res.ok) return true

      const errText = await res.text().catch(() => '')
      console.error(`WAHA attempt ${attempt} failed: ${res.status} ${errText.slice(0, 200)}`)

      if (res.status === 401 || res.status === 403) break // no point retrying auth errors
    } catch (e) {
      console.error(`WAHA attempt ${attempt} error:`, e instanceof Error ? e.message : e)
    }

    if (attempt < 3) await new Promise(r => setTimeout(r, attempt * 1000))
  }

  return false
}

/** בניית תוספת לפרומפט לפי כוונת חיפוש */
function buildIntentContext(searchIntent?: { keyword?: string | null; source?: string; category?: string } | null): string {
  if (!searchIntent) return ''
  const parts: string[] = []
  if (searchIntent.keyword) parts.push(`המבקרת הגיעה מחיפוש: "${searchIntent.keyword}"`)
  if (searchIntent.source && searchIntent.source !== 'direct') parts.push(`מקור: ${searchIntent.source}`)
  if (searchIntent.category && searchIntent.category !== 'general') parts.push(`קטגוריית עניין: ${searchIntent.category}`)
  if (!parts.length) return ''
  return `\n\n## הקשר כניסה:\n${parts.join('\n')}\nהתאימי את הגישה בהתאם — אם חיפשה מאפרת, שאלי על מאפרת בהתחלה. אם חיפשה שיער, שאלי על שיער. התנהגי כאילו אתה יודעת למה היא הגיעה.`
}

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: 'שגיאת מערכת: מפתח API חסר.' }, { status: 500 })
    }

    const body = await req.json()
    const { messages, purpose, mode, searchIntent, visitorPhone } = body
    const isCustom = mode === 'custom'

    // ── סיכום לחגית ──
    if (purpose === 'summary') {
      const summarySystem = isCustom
        ? `סכמי את השיחה להודעת וואטסאפ מפורטת לחגית — בקשה לחבילה מותאמת.
אל תמציאי פרטים שלא הוזכרו. אם פרט חסר כתבי "לא צוין".
פורמט:
"בקשה לחבילה מותאמת! ✨

👤 שם: [X]
📞 טלפון: [X]
📅 תאריך: [X]
👥 מגיעות: [X]
🎯 שירותים רצויים: [X]
💰 תקציב לשירותים: [X או לא צוין]
🤝 ספקים משלה: [כן/לא/לא צוין]
💬 הערות: [X]"`
        : `סכמי את השיחה להודעת וואטסאפ מפורטת לחגית.
אל תמציאי פרטים שלא הוזכרו. אם פרט חסר כתבי "לא צוין".
פורמט:
"ליד חדש מהאתר! 🎉

👤 שם: [X]
📞 טלפון: [X]
📅 תאריך חתונה: [X]
💒 מיקום האירוע: [X]
🎯 מה היא צריכה: [X]
💄 מאפרת: [X]
📦 חבילה: [X]

⭐ עדיפות: [גבוהה / רגילה]"`

      // Claude API requires: starts with 'user', ends with 'user'
      let apiMessages = messages
        .map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        }))
        .filter((_m: { role: string }, i: number, arr: { role: string }[]) => {
          const firstUserIdx = arr.findIndex(x => x.role === 'user')
          return i >= firstUserIdx
        })
      if (apiMessages.length === 0 || apiMessages[apiMessages.length - 1].role !== 'user') {
        apiMessages = [...apiMessages, { role: 'user', content: 'אנא צרי סיכום מסודר של השיחה.' }]
      }

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: summarySystem,
        messages: apiMessages,
      })
      const text = response.content[0].type === 'text' ? response.content[0].text : ''

      // ── שליחה לחגית ──
      const wahaSent = await wahaPost(`${HAGIT_PHONE}@c.us`, text)

      // ── שליחת הודעה אישית למבקרת (אם יש טלפון) ──
      if (visitorPhone) {
        const kwLine = searchIntent?.keyword
          ? `ראיתי שהגעת מחיפוש על "${searchIntent.keyword}" 🔍\n`
          : ''
        const visitorMsg =
          `היי! 💍\n` +
          `תודה שדיברת איתי — שמחה שפנית!\n\n` +
          kwLine +
          `הפרטים שלך אצלי ✅\n` +
          `אחזור אליך בהקדם לתאם תאריך ולגבש את החבילה המושלמת בשבילך.\n\n` +
          `— חגית 💛\nhttps://suite-hagit.co.il`
        await wahaPost(`${visitorPhone}@c.us`, visitorMsg)
      }

      const hagitUrl = `https://wa.me/${HAGIT_PHONE}?text=${encodeURIComponent(text)}`
      return NextResponse.json({ reply: text, hagitUrl, wahaSent })
    }

    // ── שיחה רגילה ──
    const intentCtx = buildIntentContext(searchIntent)
    const systemPrompt = (isCustom ? SYSTEM_CUSTOM : SYSTEM_STANDARD) + intentCtx

    const chatMessages = messages
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      }))
      .filter((_m: { role: string }, i: number, arr: { role: string }[]) => {
        const firstUserIdx = arr.findIndex(x => x.role === 'user')
        return i >= firstUserIdx
      })

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: systemPrompt,
      messages: chatMessages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply: text })

  } catch (error: unknown) {
    const err = error as { status?: number; message?: string; type?: string }
    console.error('=== API ERROR ===')
    console.error('Status:', err.status)
    console.error('Type:', err.type)
    console.error('Message:', err.message)
    console.error('Full error:', JSON.stringify(error, null, 2))
    console.error('=================')
    return NextResponse.json(
      { reply: 'יש לי בעיה טכנית. אנא נסי שוב או צרי קשר ישירות בוואטסאפ 💚' },
      { status: 500 }
    )
  }
}
