import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { session = 'default' } = await req.json().catch(() => ({}))
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY

  if (!wahaUrl) {
    return NextResponse.json({ error: 'WAHA_URL not configured' }, { status: 500 })
  }

  try {
    // Try to start existing session first
    const startRes = await fetch(`${wahaUrl}/api/sessions/${session}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'X-Api-Key': apiKey }),
      },
    })

    // If 404, session doesn't exist yet — create it
    if (startRes.status === 404) {
      const createRes = await fetch(`${wahaUrl}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'X-Api-Key': apiKey }),
        },
        body: JSON.stringify({ name: session, start: true }),
      })
      const data = await createRes.json()
      return NextResponse.json(data, { status: createRes.status })
    }

    const data = await startRes.json()
    return NextResponse.json(data, { status: startRes.status })
  } catch {
    return NextResponse.json({ error: 'Cannot reach WAHA server' }, { status: 503 })
  }
}
