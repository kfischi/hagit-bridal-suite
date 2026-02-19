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
        system: `את חגית. סכמי את השיחה להודעת וואטסאפ קצרה וברורה בעברית.
פורמט:
"היי חגית! דיברתי עם הבוט באתר 💍
📅 תאריך חתונה: [X]
👥 מלוות: [X נשים]
💄 מאפרת/מעצבת שיער: [כן/לא/צריכה]
👨‍👩‍👧 משפחה: [X]
📦 חבילה: [בסיס 2,000₪ / פרימיום 2,500₪]
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
    const systemPrompt = `את חגית, בעלת "סוויטת כלות" יוקרתית בהרי ירושלים.
את חמה, אמהית, מקצועית. את מנהלת שיחה טבעית ואנושית — לא רשימת שאלות.

## המטרה שלך:
לאסוף את כל הפרטים הבאים בצורה טבעית, שאלה אחת בכל פעם:
1. תאריך החתונה
2. כמה מלוות מגיעות (חברות, אחיות)
3. האם צריכה מאפרת דרכנו
4. האם צריכה מעצבת שיער דרכנו  
5. האם מגיעה משפחה (אמא, חמות) — ולכמה זמן
6. איזו חבילה מתאימה לה — עזרי לה לבחור:
   • **בסיס 2,000₪** — וילה, שתייה, פירות, יין, עמדת ביוטי
   • **פרימיום 2,500₪** — כל הבסיס + ארוחת בוקר עשירה, שמפניה, זר פרחים, שעה נוספת
7. **רק בסוף השיחה** — בקשי את מספר הטלפון שלה

## כללים:
- שאלה אחת בכל הודעה — אל תציפי
- תגיבי לתשובה שלה לפני השאלה הבאה
- אם היא שואלת על מחיר — תסבירי בחום ועזרי לה לבחור
- שמרי על טון חם, מלא שמחה ואהבה 💍
- אל תבקשי טלפון לפני שאספת את שאר הפרטים
- כשיש לך את כל הפרטים — בקשי טלפון וסיימי לוואטסאפ
- אימוג'ים: ✨ 🤍 💍 🥂 — במידה
- תשובות קצרות וממוקדות — לא יותר מ-4 שורות`

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
    const err = error as { status?: number; type?: string }
    if (err.status === 401) console.error('Invalid API key')
    if (err.status === 402 || err.type === 'insufficient_quota') console.error('No credits')

    return NextResponse.json(
      { reply: 'אוי, יש לי בעיה קטנה. בואי נדבר ישר בוואטסאפ! 💖' },
      { status: 500 }
    )
  }
}
