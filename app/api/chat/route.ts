import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

// אתחול הקליינט
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    // 1. בדיקה ראשונית שהמפתח קיים
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("❌ Error: Missing ANTHROPIC_API_KEY in environment variables.");
      return NextResponse.json(
        { reply: "שגיאת מערכת: מפתח API חסר בשרת." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages, purpose } = body;

    console.log(`📩 Request received. Purpose: ${purpose || 'chat'}`);

    // 2. תרחיש: סיכום לוואטסאפ
    if (purpose === 'summary') {
      const summaryPrompt = `
        את העוזרת האישית של חגית. סכמי את השיחה להודעת וואטסאפ קצרה:
        "היי חגית, דיברתי עם הבוט באתר ואשמח לשריין! 💍
        📋 פרטים:
        - תאריך: [הוזכר/לא]
        - מלוות: [הוזכר/לא]
        - חבילה: [אם יש]
        אשמח לאישור!"
      `;

      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        messages: [
           ...messages.map((msg: any) => ({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content })),
           { role: "user", content: summaryPrompt }
        ]
      });
      
      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      return NextResponse.json({ reply: text });
    }

    // 3. תרחיש: שיחה רגילה
    const systemPrompt = `
      את חגית, בעלת "סוויטת כלות" בשורש.
      מטרה: לסגור עסקה.
      1. תמיד תסיימי בשאלה.
      2. תסריט: תאריך -> כמות מלוות -> הצעת חבילה -> סגירה לוואטסאפ.
      
      חבילות:
      - בסיס (1800): וילה+כיבוד.
      - פרימיום (2200): +א.בוקר ושמפניה.
      - הכל כלול (6500+): +ספקים.

      סגנון: חם, אימהי, קצר. אימוג'ים: ✨ 🤍.
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 400,
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    console.log("✅ Success: Reply sent.");
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    // 4. טיפול בשגיאות ספציפיות
    console.error('🔴 API Error:', error);

    // שגיאה נפוצה: מפתח לא תקין או אין קרדיט
    if (error.status === 401) {
      console.error("Reason: Unauthorized. Check API Key validity.");
    }
    
    // שגיאה נפוצה: נגמר הכסף בחשבון (Credit Balance is 0)
    if (error.status === 402 || error.type === 'insufficient_quota') {
       console.error("Reason: Insufficient credits in Anthropic account.");
    }

    return NextResponse.json(
      { reply: "אוי, יש לי בעיה קטנה בתקשורת. בואי נדבר ישר בוואטסאפ! (לחצי על הכפתור הירוק) 💖" },
      { status: 500 }
    );
  }
}
