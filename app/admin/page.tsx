'use client'

import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, CheckCircle, XCircle, Wifi, WifiOff, Lock } from 'lucide-react'

const SESSION = process.env.NEXT_PUBLIC_WAHA_SESSION || 'default'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

type Status = 'STOPPED' | 'STARTING' | 'SCAN_QR_CODE' | 'WORKING' | 'FAILED' | 'error' | 'loading'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword]           = useState('')
  const [wrongPass, setWrongPass]         = useState(false)

  const [qr, setQr]               = useState<string>('')
  const [status, setStatus]       = useState<Status>('loading')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [loadingQr, setLoadingQr] = useState(false)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/status?session=${SESSION}`)
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
      const res = await fetch(`/api/admin/qr?session=${SESSION}`)
      const data = await res.json()
      if (data.qr) {
        setQr(data.qr)
        setLastUpdate(new Date())
      }
    } catch {
      // silent
    } finally {
      setLoadingQr(false)
    }
  }, [])

  // Poll status every 5s, fetch QR when needed
  useEffect(() => {
    if (!authenticated) return

    const poll = async () => {
      const currentStatus = await fetchStatus()
      if (currentStatus === 'SCAN_QR_CODE' || currentStatus === 'STOPPED' || currentStatus === 'STARTING') {
        fetchQR()
      } else {
        setQr('') // clear QR when connected
      }
    }

    poll()
    const interval = setInterval(poll, 5000)
    return () => clearInterval(interval)
  }, [authenticated, fetchStatus, fetchQR])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      setWrongPass(true)
      setTimeout(() => setWrongPass(false), 2000)
    }
  }

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
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            <button
              type="submit"
              className="bg-[#2C241A] text-white rounded-xl py-3 text-sm font-medium hover:bg-[#4a3e2f] transition-colors"
            >
              כניסה
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Status helpers ──
  const isConnected = status === 'WORKING'
  const needsQR     = status === 'SCAN_QR_CODE' || status === 'STOPPED' || status === 'STARTING'

  const statusLabel: Record<Status, string> = {
    WORKING:       'מחובר',
    SCAN_QR_CODE:  'ממתין לסריקה',
    STARTING:      'מתחיל...',
    STOPPED:       'מנותק',
    FAILED:        'שגיאה',
    error:         'לא ניתן להגיע לשרת',
    loading:       'טוען...',
  }

  const statusColor: Record<Status, string> = {
    WORKING:       'text-green-600 bg-green-50 border-green-200',
    SCAN_QR_CODE:  'text-yellow-700 bg-yellow-50 border-yellow-200',
    STARTING:      'text-blue-600 bg-blue-50 border-blue-200',
    STOPPED:       'text-gray-600 bg-gray-50 border-gray-200',
    FAILED:        'text-red-600 bg-red-50 border-red-200',
    error:         'text-red-600 bg-red-50 border-red-200',
    loading:       'text-gray-500 bg-gray-50 border-gray-200',
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
          {isConnected
            ? <CheckCircle className="w-4 h-4" />
            : status === 'error' || status === 'FAILED'
            ? <XCircle className="w-4 h-4" />
            : <Wifi className="w-4 h-4" />
          }
          {statusLabel[status]}
        </div>

        {/* Connected state */}
        {isConnected && (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-center text-[#2C241A] font-medium">WhatsApp מחובר ופעיל!</p>
            <p className="text-center text-sm text-[#8a7560]">הצ׳אט באתר מחובר לחשבון שלך</p>
          </div>
        )}

        {/* QR code */}
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
                  <WifiOff className="w-8 h-8" />
                  <span className="text-sm text-center px-4">לא ניתן לקבל QR מהשרת</span>
                </div>
              )}
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-[#2C241A]">פתחי WhatsApp בטלפון</p>
              <p className="text-xs text-[#8a7560]">הגדרות ← מכשירים מקושרים ← קישור מכשיר</p>
            </div>

            {lastUpdate && (
              <p className="text-xs text-[#aaa]">
                עודכן: {lastUpdate.toLocaleTimeString('he-IL')}
              </p>
            )}

            <button
              onClick={fetchQR}
              disabled={loadingQr}
              className="flex items-center gap-2 text-sm text-[#C9A86A] hover:text-[#b0935c] disabled:opacity-40 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loadingQr ? 'animate-spin' : ''}`} />
              רפרש QR
            </button>
          </div>
        )}

        <p className="text-center text-xs text-[#bbb] mt-6">
          ה-QR מתעדכן אוטומטית כל 5 שניות
        </p>
      </div>
    </div>
  )
}
