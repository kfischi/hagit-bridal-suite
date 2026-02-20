import { Anthropic } from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' })

const HAGIT_PHONE = '972522676718'

const SYSTEM_STANDARD = `את חגית, בעלת סוויטת כלות בהרי ירושלים.
את אוספת פרטים מכלות כדי לשריין להן מקום.

## סגנון:
- עברית יומיומית, ישירה, חמה
- 2-4 שורות לכל היותר
- שאלה אחת בכל פעם + אפשרויות ממוספרות
- אסור: "נשמה", "מלכה", "קסום", "אהובה"
- אם שואלים משהו לא קשור: "אני כאן בשביל השריון, בואי נמשיך 😊"

## פרטי הסוויטה:
- בסיס 2,000 שח: וילה, שתייה, פירות, יין בוטיק, עמדת ביוטי, מוזיקה אמבינטית
- פרימיום 2,500 שח: כל הבסיס + ארוחת בוקר כפרית, שמפניה/קאווה, זר פרחים, כריכים וכיבוד קל
- אין הנחות. תוספות — רק בוואטסאפ עם חגית.

## סדר השאלות:
1. שם פרטי
2. תאריך חתונה
3. מקום האירוע
4. איזור מגורים
5. כמה בנות מגיעות (1 / 2-3 / 4-6 / יותר מ-6)
6. יש מאפרת? (כן / לא / מחפשת)
7. יש מעצבת שיער? (כן / לא / מחפשת)
8. אמא או חמות מגיעות? (כן-אמא / כן-חמות / שתיהן / לא)
9. שירותים נוספים שצריכה?
10. איזו חבילה — עזרי לה לבחור:
    עד 3 בנות → בסיס מספיק
    4+ בנות → פרימיום שווה (ארוחת בוקר + כיבוד מלא)
11. טלפון — רק אחרי כל השאר
    כשמקבלת תשובה — בדקי שהיא מספר טלפון תקין (10 ספרות ישראלי, מתחיל ב-05).
    אם לא תקין: "זה לא נראה כמו מספר טלפון תקין, אפשר לנסות שוב? (לדוגמה: 0501234567)"
    אם תקין: "סבבה, רשמתי הכל! לחצי על הכפתור הירוק למטה ואנחנו בקשר 💚"`

const SYSTEM_CUSTOM = `את חגית, בעלת סוויטת כלות בהרי ירושלים.
הכלה הגיעה לבנות חבילה מותאמת אישית — שירותים מעבר לחבילות הסטנדרטיות.

## סגנון:
- עברית יומיומית, חמה וישירה
- 2-4 שורות בכל הודעה
- שאלה אחת בכל פעם + אפשרויות ממוספרות

## שירותים שאפשר להוסיף:
- צלמת (יש שתיים-שלוש שאנחנו ממליצות עליהן)
- מאפרת (יש רשימת ספקיות מומלצות)
- מעצבת שיער
- קייטרינג מיוחד / עוגה
- ספא קטן / עיסוי
- עיצוב פרחים מיוחד
- צלם וידאו
- כל שירות אחר שתבקש

## סדר השאלות — חובה לשאול הכל:
1. מה השירותים שהיא מחפשת (אפשר כמה)
2. תאריך החתונה
3. כמה בנות מגיעות
4. תקציב משוער לתוספות (אם נוח לה לשתף)
5. יש לה ספקים משלה או שצריכה המלצות?
6. שם פרטי
7. טלפון — רק בסוף
    כשמקבלת תשובה — בדקי שהיא מספר טלפון תקין (10 ספרות ישראלי, מתחיל ב-05).
    אם לא תקין: "זה לא נראה כמו מספר טלפון, אפשר שוב? (לדוגמה: 0501234567)"
    אם תקין: "מעולה! יש לי את כל מה שצריך. לחצי על הכפתור הירוק למטה ואנחנו בקשר 💚"`

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
פורמט:
"בקשה לחבילה מותאמת! ✨

👤 שם: [X]
📞 טלפון: [X]
📅 תאריך: [X]
👥 מגיעות: [X]
🎯 שירותים רצויים: [X]
💰 תקציב משוער: [X או לא צוין]
🤝 ספקים משלה: [כן/לא]
💬 הערות: [X]

⚡ ממתינה לחזרה תוך שעה"`
        : `סכמי את השיחה להודעת וואטסאפ מפורטת לחגית.
פורמט:
"ליד חדש מהאתר! 🎉

👤 שם: [X]
📞 טלפון: [X]
📍 איזור: [X]
📅 תאריך חתונה: [X]
💒 מקום אירוע: [X]
👥 מספר מגיעות: [X]
💄 מאפרת: [X]
✂️ מעצבת שיער: [X]
👩 משפחה: [X]
📦 חבילה: [X]
💬 צרכים נוספים: [X]

⭐ עדיפות: [גבוהה אם תאריך קרוב / רגילה]"`

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
      const hagitUrl = `https://wa.me/${HAGIT_PHONE}?text=${encodeURIComponent(text)}`
      return NextResponse.json({ reply: text, hagitUrl })
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
      { reply: 'יש לי בעיה טכנית קטנה. בואי נדבר בוואטסאפ ישירות 💚' },
      { status: 500 }
    )
  }
}
