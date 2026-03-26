import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session') || 'default'
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY

  if (!wahaUrl) {
    return NextResponse.json({ status: 'error', error: 'WAHA_URL not configured' }, { status: 500 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(`${wahaUrl}/api/sessions/${session}`, {
      headers: { ...(apiKey ? { 'X-Api-Key': apiKey } : {}) },
      cache: 'no-store',
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (res.status === 404) {
      return NextResponse.json({ status: 'STOPPED', error: 'Session not found' })
    }
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json(
        { status: 'error', error: 'Authentication failed — check WAHA_API_KEY' },
        { status: 401 }
      )
    }
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      return NextResponse.json({ status: 'error', error: `WAHA ${res.status}: ${body.slice(0, 200)}` })
    }

    const data = await res.json()
    // WAHA session statuses: STOPPED | STARTING | SCAN_QR_CODE | WORKING | FAILED
    return NextResponse.json({ status: data.status ?? 'STOPPED', me: data.me ?? null })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    const isTimeout = msg.includes('abort') || msg.includes('timeout')
    return NextResponse.json(
      { status: 'error', error: isTimeout ? 'WAHA server timeout (8s)' : `Cannot reach WAHA: ${msg}` },
      { status: 503 }
    )
  }
}
