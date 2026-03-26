import { NextResponse } from 'next/server'

/** endpoint לבדיקת חיבור WAHA — זמין ב-/api/admin/test */
export async function GET() {
  const wahaUrl = process.env.WAHA_URL
  const apiKey  = process.env.WAHA_API_KEY
  const session = process.env.WAHA_SESSION || 'default'

  const result: Record<string, unknown> = {
    config: {
      WAHA_URL: wahaUrl || '(not set)',
      WAHA_API_KEY: apiKey ? '(set)' : '(empty)',
      WAHA_SESSION: session,
    },
    tests: {},
  }

  if (!wahaUrl) {
    return NextResponse.json({ ...result, error: 'WAHA_URL is not configured' }, { status: 500 })
  }

  const headers: Record<string, string> = {
    ...(apiKey ? { 'X-Api-Key': apiKey } : {}),
  }

  // Test 1: server reachable (list sessions)
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 8000)
    const res = await fetch(`${wahaUrl}/api/sessions`, { headers, cache: 'no-store', signal: controller.signal })
    const body = await res.json().catch(() => null)
    ;(result.tests as Record<string, unknown>).listSessions = { status: res.status, ok: res.ok, body }
  } catch (e) {
    ;(result.tests as Record<string, unknown>).listSessions = { error: e instanceof Error ? e.message : String(e) }
  }

  // Test 2: specific session status
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 8000)
    const res = await fetch(`${wahaUrl}/api/sessions/${session}`, { headers, cache: 'no-store', signal: controller.signal })
    const body = await res.json().catch(() => null)
    ;(result.tests as Record<string, unknown>).sessionStatus = { status: res.status, ok: res.ok, body }
  } catch (e) {
    ;(result.tests as Record<string, unknown>).sessionStatus = { error: e instanceof Error ? e.message : String(e) }
  }

  // Test 3: QR endpoint (new format)
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 8000)
    const res = await fetch(`${wahaUrl}/api/sessions/${session}/auth/qr`, { headers, cache: 'no-store', signal: controller.signal })
    const body = await res.json().catch(() => null)
    ;(result.tests as Record<string, unknown>).qrNew = { status: res.status, ok: res.ok, hasValue: !!(body?.value || body?.qr) }
  } catch (e) {
    ;(result.tests as Record<string, unknown>).qrNew = { error: e instanceof Error ? e.message : String(e) }
  }

  // Test 4: QR endpoint (legacy format)
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 8000)
    const res = await fetch(`${wahaUrl}/api/${session}/auth/qr`, { headers, cache: 'no-store', signal: controller.signal })
    const body = await res.json().catch(() => null)
    ;(result.tests as Record<string, unknown>).qrLegacy = { status: res.status, ok: res.ok, hasValue: !!(body?.value || body?.qr) }
  } catch (e) {
    ;(result.tests as Record<string, unknown>).qrLegacy = { error: e instanceof Error ? e.message : String(e) }
  }

  return NextResponse.json(result)
}
