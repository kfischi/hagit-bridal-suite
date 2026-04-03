import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { session = 'default' } = await req.json().catch(() => ({}))
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY

  if (!wahaUrl) {
    return NextResponse.json({ error: 'WAHA_URL not configured' }, { status: 500 })
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'X-Api-Key': apiKey } : {}),
  }

  const withTimeout = (ms: number) => {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), ms)
    return controller.signal
  }

  try {
    // 1. Try to start existing session
    const startRes = await fetch(`${wahaUrl}/api/sessions/${session}/start`, {
      method: 'POST',
      headers,
      signal: withTimeout(10000),
    })

    if (startRes.ok || startRes.status === 422) {
      // 422 = already started, that's fine
      const data = await startRes.json().catch(() => ({}))
      return NextResponse.json(data, { status: 200 })
    }

    // 2. Session doesn't exist → create it
    if (startRes.status === 404) {
      const createRes = await fetch(`${wahaUrl}/api/sessions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: session, start: true }),
        signal: withTimeout(10000),
      })
      const data = await createRes.json().catch(() => ({}))
      return NextResponse.json(data, { status: createRes.ok ? 200 : createRes.status })
    }

    // Other error
    const body = await startRes.text().catch(() => '')
    return NextResponse.json(
      { error: `WAHA returned ${startRes.status}: ${body.slice(0, 200)}` },
      { status: startRes.status }
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    const isTimeout = msg.includes('abort') || msg.includes('timeout')
    return NextResponse.json(
      { error: isTimeout ? 'WAHA server timeout (10s)' : `Cannot reach WAHA: ${msg}` },
      { status: 503 }
    )
  }
}
