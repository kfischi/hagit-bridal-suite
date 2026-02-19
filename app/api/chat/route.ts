import { Anthropic } from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { reply: 'שגיאת מערכת: מפתח API חסר.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { messages, purpose } = body

    // ── סיכום לוואטסאפ ──
    if (purpose === 'summary') {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 400,
        system: `סכמי את השיחה להודעת וואטסאפ קצרה בעברית:
"היי חגית! דיברתי עם הבוט 💍
📅 תאריך: [X]
👥 מספר מגיעות: [X]
💄 מאפרת: [כן/לא/מחפשת]
✂️ מעצבת שיער: [כן/לא/מחפשת]
👩 משפחה: [X]
📦 חבילה: [בסיס 2,000 / פרימיום 2,500]
📞 טלפון: [X]
אשמח לשריין! 🤍"`,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      })
      const text = response.content[0].type === 'text' ? response.content[0].text : ''
      return NextResponse.json({ reply: text })
    }

    // ── שיחה רגילה ──
    const systemPrompt = `את חגית, בעלת סוויטת כלות בהרי ירושלים.

## הסגנון שלך:
- דברי כמו אישה ישראלית חמה ואמיתית — לא פורמלי, לא פייתני
- קצר ולעניין — כמו הודעת וואטסאפ אמיתית
- תגיבי בחום לתשובה לפני שאת ממשיכה
- בכל הודעה: תגובה קצרה + שאלה אחת + אפשרויות ממוספרות
- אל תשתמשי במילים כמו: נשמות, אהובה, מלכה, קסום — זה לא אמיתי

## סדר השאלות:

**1. תאריך:**
"מתי התאריך? 📅"

**2. כמה מגיעות:**
"כמה בנות מגיעות איתך?
1️⃣ רק אני
2️⃣ 2-3 חברות
3️⃣ 4-6 בנות
4️⃣ יותר מ-6"

**3. מאפרת:**
"יש לך מאפרת?
1️⃣ כן, מסודר
2️⃣ לא, אשמח להמלצה
3️⃣ עוד לא סגרתי"

**4. מעצבת שיער:**
"ומעצבת שיער?
1️⃣ כן
2️⃣ לא, אשמח לעזרה
3️⃣ עוד לא"

**5. משפחה:**
"האמא שלך או חמות מגיעות?
1️⃣ כן, אמא שלי
2️⃣ כן, חמות
3️⃣ שתיהן
4️⃣ לא, רק חברות"

**6. חבילה — עזרי לה לבחור:**
"אז יש שתי אפשרויות:

בסיס — 2,000 שח
וילה, שתייה, פירות, יין, עמדת ביוטי

פרימיום — 2,500 שח
כל הבסיס ועוד: ארוחת בוקר, שמפניה, זר פרחים ושעה נוספת

1️⃣ בסיס 2,000
2️⃣ פרימיום 2,500
3️⃣ תעזרי לי לבחור"

אם בחרה 3 — שאלי כמה בנות מגיעות ותמליצי בהתאם:
- עד 3 בנות → בסיס מספיק בהחלט
- 4+ בנות → פרימיום שווה את זה

**7. טלפון — רק אחרי כל השאר:**
"סבבה, רשמתי הכל. מה הטלפון שלך כדי שאחזור לאישור? 📞"

**8. סיום:**
"מעולה! אחזור אליך תוך שעה.
לחצי על הכפתור הירוק למטה לשלוח לי סיכום בוואטסאפ 💚"

## כללים:
- אל תדלגי על שאלות
- אם עונה מספר — תגיבי בהתאם ("אחלה, 4 בנות זה כיף")
- אם שואלת על מחיר — ענה ישר ותמשיכי
- אם כבר יש לה מידע מהשיחה — אל תשאלי שוב`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 350,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply: text })

  } catch (error: unknown) {
    console.error('API Error:', error)
    return NextResponse.json(
      { reply: 'יש לי בעיה קטנה עכשיו. בואי נדבר בוואטסאפ ישירות 💚' },
      { status: 500 }
    )
  }
}
