'use client'

import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, CheckCircle, XCircle, Wifi, WifiOff, Lock, Play } from 'lucide-react'

const SESSION = process.env.NEXT_PUBLIC_WAHA_SESSION || 'default'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

type Status = 'STOPPED' | 'STARTING' | 'SCAN_QR_CODE' | 'WORKING' | 'FAILED' | 'error' | 'loading'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword]           = useState('')
  const [wrongPass, setWrongPass]         = useState(false)

  const [qr, setQr]                 = useState<string>('')
  const [status, setStatus]         = useState<Status>('loading')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [loadingQr, setLoadingQr]   = useState(false)
  const [starting, setStarting]     = useState(false)
  const [startError, setStartError] = useState('')

  const fetchStatus = useCallback(async () => {
    try {
      const res  = await fetch(`/api/admin/status?session=${SESSION}`)
      const data = await res.json()
      setStatus(data.status)
      return data.status as Status
    } catch {
      setStatus('error')
      return 'error'
    }
  }, [])

  const fetchQR = useCallback(async () => {
    setLoadingQr(true)
    try {
      const res  = await fetch(`/api/admin/qr?session=${SESSION}`)
      const data = await res.json()
      if (data.qr) {
        setQr(data.qr)
        setLastUpdate(new Date())
      }
    } finally {
      setLoadingQr(false)
    }
  }, [])

  const startSession = async () => {
    setStarting(true)
    setStartError('')
    try {
      const res = await fetch('/api/admin/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session: SESSION }),
      })
      if (!res.ok) {
        const data = await res.json()
        setStartError(data.error || `שגיאה ${res.status}`)
      }
      // status poll will pick up the new state automatically
    } catch {
      setStartError('לא ניתן להגיע לשרת WAHA')
    } finally {
      setStarting(false)
    }
  }

  // Poll status every 5s, fetch QR when needed
  useEffect(() => {
    if (!authenticated) return

    const poll = async () => {
      const s = await fetchStatus()
      if (s === 'SCAN_QR_CODE' || s === 'STARTING') {
        fetchQR()
      } else if (s === 'WORKING') {
        setQr('')
      }
    }

    poll()
    const interval = setInterval(poll, 5000)
    return () => clearInterval(interval)
  }, [authenticated, fetchStatus, fetchQR])

  // ── Login screen ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm border border-[#E5D5C0]">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-[#2C241A] rounded-2xl flex items-center justify-center">
              <Lock className="text-[#C9A86A] w-7 h-7" />
            </div>
            <h1 className="font-cormorant text-2xl font-bold text-[#2C241A]">כניסת מנהל</h1>
            <p className="text-sm text-[#8a7560]">חיבור WhatsApp לאתר</p>
          </div>
          <form onSubmit={e => {
            e.preventDefault()
            if (password === ADMIN_PASSWORD) setAuthenticated(true)
            else { setWrongPass(true); setTimeout(() => setWrongPass(false), 2000) }
          }} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="סיסמה"
              className={`w-full border rounded-xl px-4 py-3 text-sm text-center outline-none transition-colors ${
                wrongPass ? 'border-red-400 bg-red-50' : 'border-[#E5D5C0] focus:border-[#C9A86A]'
              }`}
            />
            {wrongPass && <p className="text-red-500 text-xs text-center">סיסמה שגויה</p>}
            <button type="submit" className="bg-[#2C241A] text-white rounded-xl py-3 text-sm font-medium hover:bg-[#4a3e2f] transition-colors">
              כניסה
            </button>
          </form>
        </div>
      </div>
    )
  }

  const isConnected = status === 'WORKING'
  const needsQR     = status === 'SCAN_QR_CODE' || status === 'STARTING'
  const isStopped   = status === 'STOPPED' || status === 'FAILED' || status === 'error'

  const statusLabel: Record<Status, string> = {
    WORKING:      'מחובר',
    SCAN_QR_CODE: 'ממתין לסריקה',
    STARTING:     'מתחיל...',
    STOPPED:      'מנותק',
    FAILED:       'שגיאה',
    error:        'לא ניתן להגיע לשרת',
    loading:      'טוען...',
  }

  const statusColor: Record<Status, string> = {
    WORKING:      'text-green-600 bg-green-50 border-green-200',
    SCAN_QR_CODE: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    STARTING:     'text-blue-600 bg-blue-50 border-blue-200',
    STOPPED:      'text-gray-600 bg-gray-50 border-gray-200',
    FAILED:       'text-red-600 bg-red-50 border-red-200',
    error:        'text-red-600 bg-red-50 border-red-200',
    loading:      'text-gray-500 bg-gray-50 border-gray-200',
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-[#E5D5C0]">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <h1 className="font-cormorant text-2xl font-bold text-[#2C241A]">חיבור WhatsApp</h1>
          <p className="text-sm text-[#8a7560]">סשן: <span className="font-mono text-[#2C241A]">{SESSION}</span></p>
        </div>

        {/* Status badge */}
        <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6 ${statusColor[status]}`}>
          {isConnected  ? <CheckCircle className="w-4 h-4" />
           : isStopped  ? <XCircle className="w-4 h-4" />
           : <Wifi className="w-4 h-4" />}
          {statusLabel[status]}
        </div>

        {/* ── CONNECTED ── */}
        {isConnected && (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-center text-[#2C241A] font-medium">WhatsApp מחובר ופעיל!</p>
            <p className="text-center text-sm text-[#8a7560]">הצ׳אט באתר מחובר לחשבון שלך</p>
          </div>
        )}

        {/* ── STOPPED / ERROR → show Start button ── */}
        {isStopped && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <WifiOff className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-center text-sm text-[#8a7560]">הסשן לא פעיל. לחצי כדי להפעיל ולקבל QR.</p>
            <button
              onClick={startSession}
              disabled={starting}
              className="flex items-center gap-2 bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              {starting
                ? <RefreshCw className="w-4 h-4 animate-spin" />
                : <Play className="w-4 h-4" />
              }
              {starting ? 'מפעיל...' : 'הפעל סשן'}
            </button>
            {startError && <p className="text-red-500 text-xs text-center">{startError}</p>}
          </div>
        )}

        {/* ── QR code ── */}
        {needsQR && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-64 h-64 bg-[#F5F0E8] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#E5D5C0]">
              {loadingQr && !qr ? (
                <div className="flex flex-col items-center gap-2 text-[#8a7560]">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                  <span className="text-sm">טוען QR...</span>
                </div>
              ) : qr ? (
                <img src={qr} alt="WhatsApp QR Code" className="w-full h-full object-contain rounded-2xl p-2" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#8a7560]">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                  <span className="text-sm">ממתין ל-QR...</span>
                </div>
              )}
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-[#2C241A]">פתחי WhatsApp בטלפון</p>
              <p className="text-xs text-[#8a7560]">הגדרות ← מכשירים מקושרים ← קישור מכשיר</p>
            </div>

            {lastUpdate && (
              <p className="text-xs text-[#aaa]">QR עודכן: {lastUpdate.toLocaleTimeString('he-IL')}</p>
            )}

            <button
              onClick={fetchQR}
              disabled={loadingQr}
              className="flex items-center gap-2 text-sm text-[#C9A86A] hover:text-[#b0935c] disabled:opacity-40 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loadingQr ? 'animate-spin' : ''}`} />
              רפרש QR ידני
            </button>
          </div>
        )}

        <p className="text-center text-xs text-[#bbb] mt-6">מתעדכן אוטומטית כל 5 שניות</p>
      </div>
    </div>
  )
}
