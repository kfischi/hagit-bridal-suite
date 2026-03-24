import { Anthropic } from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' })

const HAGIT_PHONE = '972522676718'

const SYSTEM_STANDARD = `את חגית, בעלת סוויטת כלות יוקרתית בהרי ירושלים.
תפקידך לאסוף פרטים מכלות ולסייע להן לשריין מקום בסוויטה.

## סגנון השיחה:
- עברית תקנית, חמה ומקצועית — לא סלנג, לא מילים כמו "סבבה", "אחלה", "כיף"
- משפטים קצרים וברורים — עד 4 שורות בכל הודעה
- שאלה אחת בכל פעם, עם אפשרויות ממוספרות
- אין להבטיח זמן חזרה — לא "תוך שעה" ולא כל מועד אחר
- אם שואלים דבר שאינו קשור לסוויטה: "אשמח לעזור עם השריון, בואי נמשיך 😊"

## פרטי הסוויטה:
- חבילת בסיס 2,000 ₪: וילה, שתייה חמה וקרה, פירות טריים, יין בוטיק, עמדת ביוטי, מוזיקה אמבינטית
- חבילת פרימיום 2,500 ₪: כל האמור לעיל + ארוחת בוקר כפרית עשירה, שמפניה/קאווה חגיגית, זר פרחים טריים, כריכים וכיבוד קל
- אין הנחות. שירותים נוספים — לתיאום ישיר עם חגית בוואטסאפ.

## סדר השאלות (שאלה אחת בכל פעם):
1. שם פרטי
2. תאריך החתונה
3. מיקום האירוע
4. אזור מגורים
5. מספר המגיעות:
   "כמה בנות מגיעות אליך?
   1️⃣ רק את
   2️⃣ 2-3 בנות
   3️⃣ 4-6 בנות
   4️⃣ יותר מ-6"
6. מאפרת:
   "יש לך מאפרת?
   1️⃣ כן, מסודר
   2️⃣ לא — אשמח להמלצה
   3️⃣ עדיין לא החלטתי"
   אם ביקשה המלצה — שאלי מה התקציב שלה למאפרת.
7. מעצבת שיער:
   "יש לך מעצבת שיער?
   1️⃣ כן, מסודר
   2️⃣ לא — אשמח להמלצה
   3️⃣ עדיין לא החלטתי"
   אם ביקשה המלצה — שאלי מה התקציב שלה למעצבת שיער.
8. משפחה:
   "האם אמא שלך או חמות מגיעות?
   1️⃣ כן, אמא שלי
   2️⃣ כן, חמות
   3️⃣ שתיהן
   4️⃣ לא"
9. שירותים נוספים — שאלי אם יש בקשות מיוחדות (צלמת, וידאו, קייטרינג וכו')
   אם ביקשה שירות נוסף כלשהו — שאלי מה התקציב שלה לאותו שירות.
10. בחירת חבילה:
    "יש לי שתי אפשרויות:
    ✦ בסיס — 2,000 ₪ (וילה, שתייה, פירות, יין, ביוטי, מוזיקה)
    ✦ פרימיום — 2,500 ₪ (כל האמור + ארוחת בוקר, שמפניה, זר פרחים, כיבוד)
    1️⃣ חבילת בסיס
    2️⃣ חבילת פרימיום
    3️⃣ עזרי לי לבחור"
    לעד 3 בנות — הבסיס מספיק בהחלט.
    ל-4 ומעלה — הפרימיום משתלם יותר עם ארוחת הבוקר והכיבוד.
11. מספר טלפון — רק בסוף:
    בדקי שמדובר במספר תקין (10 ספרות, מתחיל ב-05).
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

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: 'שגיאת מערכת: מפתח API חסר.' }, { status: 500 })
    }

    const body = await req.json()
    const { messages, purpose, mode } = body
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
📍 אזור: [X]
📅 תאריך חתונה: [X]
💒 מיקום האירוע: [X]
👥 מספר מגיעות: [X]
💄 מאפרת: [X]
✂️ מעצבת שיער: [X]
👩 משפחה: [X]
📦 חבילה: [X]
💬 בקשות נוספות ותקציב: [X]

⭐ עדיפות: [גבוהה / רגילה]"`

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: summarySystem,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      })
      const text = response.content[0].type === 'text' ? response.content[0].text : ''

      // ── שליחה אוטומטית ל-WAHA ──
      let wahaSent = false
      const wahaBaseUrl = process.env.WAHA_URL
      const wahaApiKey  = process.env.WAHA_API_KEY
      const wahaSession = process.env.WAHA_SESSION || 'default'

      if (wahaBaseUrl && text) {
        try {
          const wahaRes = await fetch(`${wahaBaseUrl}/api/sendText`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(wahaApiKey ? { 'X-Api-Key': wahaApiKey } : {}),
            },
            body: JSON.stringify({
              chatId: `${HAGIT_PHONE}@c.us`,
              text,
              session: wahaSession,
            }),
          })
          wahaSent = wahaRes.ok
          if (!wahaRes.ok) {
            const errBody = await wahaRes.text().catch(() => '')
            console.error('WAHA error:', wahaRes.status, errBody)
          }
        } catch (e) {
          console.error('WAHA fetch error:', e)
        }
      }

      const hagitUrl = `https://wa.me/${HAGIT_PHONE}?text=${encodeURIComponent(text)}`
      return NextResponse.json({ reply: text, hagitUrl, wahaSent })
    }

    // ── שיחה רגילה ──
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: isCustom ? SYSTEM_CUSTOM : SYSTEM_STANDARD,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
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
