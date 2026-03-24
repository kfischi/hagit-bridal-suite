import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session') || 'default'
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY

  if (!wahaUrl) {
    return NextResponse.json({ status: 'error', error: 'WAHA_URL not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`${wahaUrl}/api/sessions/${session}`, {
      headers: {
        ...(apiKey && { 'X-Api-Key': apiKey }),
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ status: 'STOPPED' })
    }

    const data = await res.json()
    // WAHA session statuses: STOPPED | STARTING | SCAN_QR_CODE | WORKING | FAILED
    return NextResponse.json({ status: data.status })
  } catch {
    return NextResponse.json({ status: 'error', error: 'Cannot reach WAHA server' }, { status: 503 })
  }
}
