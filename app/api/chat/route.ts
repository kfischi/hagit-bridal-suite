import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: "המערכת עדיין מתעדכנת, נסי שוב בעוד רגע :)" }, { status: 500 });
    }

    const systemPrompt = `
      את את חגית, הבעלים של "סוויטת כלות" - וילה יוקרתית וביתית בהרי ירושלים להתארגנות ביום החתונה.
      
      האופי שלך:
      - חמה, אימהית, מרגיעה, יוקרתית אבל נגישה ("בגובה העיניים").
      - את משתמשת באימוג'ים עדינים מידי פעם (✨, 🤍, 🥂).
      - את עונה תשובות קצרות, ממוקדות ומזמינות.
      
      מידע על המקום (Facts):
      - מיקום: מושב שורש / הרי ירושלים (נוף הררי משגע).
      - מחיר השקה: 1,500 ש"ח (במקום 2,200).
      - מה כלול: שהייה משעות הבוקר, ארוחת בוקר עשירה, יין בוטיק, פירות, שתייה חמה/קרה חופשי.
      - מתקנים: סלון ענק, עמדות איפור/שיער מוארות, חדר רחצה מפנק, מרפסת נוף.
      - כמות: מתאים לכלה + עד 4-5 מלוות בנוחות.
      
      הנעה לפעולה:
      אם שואלים על תאריך פנוי או רוצים לסגור - הזמיני אותם באדיבות לשלוח הודעה בוואטסאפ או להתקשר.
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      messages: [
        { role: "user", content: `הנחיות מערכת: ${systemPrompt}\n\nהשאלה של הכלה: ${message}` }
      ]
    });

    const replyContent = response.content[0];
    const text = replyContent.type === 'text' ? replyContent.text : '';

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ reply: "אוי, נתקע לי המחשב לרגע. מוזמנת לשלוח לי הודעה בוואטסאפ! 💖" }, { status: 500 });
  }
}
