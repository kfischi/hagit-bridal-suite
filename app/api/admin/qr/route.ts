import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session') || 'default'
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY

  if (!wahaUrl) {
    return NextResponse.json({ error: 'WAHA_URL not configured' }, { status: 500 })
  }

  const headers: Record<string, string> = {
    ...(apiKey ? { 'X-Api-Key': apiKey } : {}),
  }

  // Try both WAHA endpoint formats (new API first, then legacy)
  const endpoints = [
    `${wahaUrl}/api/sessions/${session}/auth/qr`,
    `${wahaUrl}/api/${session}/auth/qr`,
  ]

  let lastError = ''
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { headers, cache: 'no-store' })
      if (!res.ok) {
        lastError = `${endpoint} → ${res.status}`
        continue
      }
      const data = await res.json()
      // WAHA returns { value: "data:image/png;base64,..." } or { qr: "..." }
      const qr = data.value || data.qr || data.imageBase64 || null
      if (qr) return NextResponse.json({ qr })
      lastError = `${endpoint} → no QR field in response`
    } catch (e) {
      lastError = `${endpoint} → ${e instanceof Error ? e.message : 'fetch error'}`
    }
  }

  console.error('QR fetch failed:', lastError)
  return NextResponse.json({ error: `Failed to fetch QR: ${lastError}` }, { status: 502 })
}
