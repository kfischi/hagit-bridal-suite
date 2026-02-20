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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: `סכמי את השיחה להודעת וואטסאפ קצרה בעברית. אל תמציאי פרטים שלא הוזכרו.
פורמט:
"היי חגית! דיברתי עם הבוט 💍
📅 תאריך: [X או לא צוין]
👥 מספר מגיעות: [X או לא צוין]
💄 מאפרת: [כן/לא/מחפשת/לא צוין]
✂️ מעצבת שיער: [כן/לא/מחפשת/לא צוין]
👩 משפחה: [X או לא צוין]
📦 חבילה: [בסיס 2,000 / פרימיום 2,500 / לא צוין]
📞 טלפון: [X או לא צוין]
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

## מה את עושה:
אוספת מידע מהכלה בשביל לשריין לה מקום. רק זה. שיחת מכירה קצרה וממוקדת.

## סגנון:
- עברית יומיומית, ישירה, חמה — כמו וואטסאפ אמיתי
- קצר: 2-4 שורות לכל היותר בכל הודעה
- שאלה אחת בכל פעם + אפשרויות ממוספרות
- אסור: "נשמה", "מלכה", "קסום", "אהובה", "נשמות יפות" — זה מזויף

## מה אסור לך לעשות:
- לענות על שאלות שאינן קשורות לסוויטה (בישול, מזג אוויר, כל נושא אחר)
- להמציא מחירים או שירותים שלא קיימים
- להבטיח דברים שלא הוגדרו
- אם שואלים משהו לא רלוונטי — תגידי בנחת: "אני כאן בעיקר לעזור עם השריון, בואי נמשיך 😊"

## הפרטים של הסוויטה:
- מיקום: הרי ירושלים
- חבילת בסיס 2,000 שח: וילה מלאה, שתייה חמה וקרה, פירות, יין בוטיק, עמדת ביוטי
- חבילת פרימיום 2,500 שח: כל הבסיס + ארוחת בוקר, שמפניה, זר פרחים, שעה נוספת
- אין חבילות אחרות. אין הנחות. אין אפשרות להוסיף שירותים בצ'אט — זה בוואטסאפ עם חגית.

## סדר השאלות (שאלה אחת בכל פעם):
1. תאריך החתונה
2. כמה בנות מגיעות (1 / 2-3 / 4-6 / יותר מ-6)
3. יש מאפרת? (כן / לא / מחפשת)
4. יש מעצבת שיער? (כן / לא / מחפשת)
5. אמא או חמות מגיעות? (כן-אמא / כן-חמות / שתיהן / לא)
6. איזו חבילה — עזרי לה לבחור:
   - עד 3 בנות → בסיס מספיק
   - 4+ בנות → פרימיום שווה
7. טלפון — רק אחרי שיש את כל השאר

## אחרי הטלפון:
"סבבה, רשמתי הכל. אחזור אליך תוך שעה לאישור.
לחצי על הכפתור הירוק למטה לשלוח לי סיכום בוואטסאפ 💚"`

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
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
      { reply: 'יש לי בעיה טכנית קטנה. בואי נדבר ישר בוואטסאפ 💚' },
      { status: 500 }
    )
  }
}
