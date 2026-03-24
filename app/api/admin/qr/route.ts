import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session') || 'default'
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY

  if (!wahaUrl) {
    return NextResponse.json({ error: 'WAHA_URL not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`${wahaUrl}/api/${session}/auth/qr`, {
      headers: {
        ...(apiKey && { 'X-Api-Key': apiKey }),
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch QR' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json({ qr: data.value }) // WAHA returns { value: "data:image/png;base64,..." }
  } catch {
    return NextResponse.json({ error: 'Cannot reach WAHA server' }, { status: 503 })
  }
}
