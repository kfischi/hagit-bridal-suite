import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

// הדפסה ראשונית כדי לראות אם המפתח קיים (בלי לחשוף אותו)
console.log("Server initialized. API Key exists?", !!process.env.ANTHROPIC_API_KEY);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, purpose } = body;

    console.log("Received request with purpose:", purpose || "chat");

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("CRITICAL ERROR: ANTHROPIC_API_KEY is missing in process.env");
      return NextResponse.json({ reply: "שגיאת מערכת: מפתח API חסר." }, { status: 500 });
    }

    // בדיקת סיכום
    if (purpose === 'summary') {
      console.log("Generating summary...");
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
      console.log("Summary generated successfully");
      return NextResponse.json({ reply: response.content[0].type === 'text' ? response.content[0].text : '' });
    }

    // שיחה רגילה
    console.log("Sending message to Claude...");
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

    console.log("Claude replied successfully");
    return NextResponse.json({ reply: response.content[0].type === 'text' ? response.content[0].text : '' });

  } catch (error: any) {
    // הדפסת השגיאה המדויקת ליומן
    console.error('FULL API ERROR DETAILS:', error);
    
    // בדיקה אם השגיאה היא בגלל מפתח לא תקין
    if (error.status === 401) {
        console.error("Error 401: The API Key is invalid or expired.");
    }

    return NextResponse.json({ reply: "אוי, יש לי בעיה קטנה בחיבור. בואי נדבר בוואטסאפ! 💖" }, { status: 500 });
  }
}
