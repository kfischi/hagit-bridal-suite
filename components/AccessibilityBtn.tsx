'use client'

import React, { useState } from 'react'
import { Accessibility, X, Type, Sun } from 'lucide-react'

export default function AccessibilityBtn() {
  const [isOpen, setIsOpen] = useState(false)
  const [contrast, setContrast] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleFontSize = (action: 'increase' | 'decrease' | 'reset') => {
    const html = document.documentElement
    // Get current font size or default to 100
    const currentSize = parseInt(window.getComputedStyle(html).fontSize) || 16
    
    let newSize = 100 // percentage
    
    if (action === 'increase') {
       html.style.fontSize = '120%'
    }
    if (action === 'decrease') {
       html.style.fontSize = '90%'
    }
    if (action === 'reset') {
       html.style.fontSize = '100%'
    }
  }

  const toggleContrast = () => {
    setContrast(!contrast)
    document.documentElement.classList.toggle('high-contrast')
    if (!contrast) {
        document.documentElement.style.filter = 'contrast(120%)'
    } else {
        document.documentElement.style.filter = 'none'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 shadow-2xl rounded-xl p-4 w-72 mb-2 animate-in fade-in slide-in-from-bottom-5 text-right" dir="rtl">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <button onClick={toggleOpen} className="text-gray-500 hover:text-red-500"><X size={20} /></button>
            <h3 className="font-bold text-gray-800">כלי נגישות</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 flex items-center gap-2"><Type size={16}/> גודל טקסט</span>
              <div className="flex gap-1">
                <button onClick={() => handleFontSize('decrease')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">-</button>
                <button onClick={() => handleFontSize('reset')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs">איפוס</button>
                <button onClick={() => handleFontSize('increase')} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">+</button>
              </div>
            </div>

            <button onClick={toggleContrast} className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 text-sm text-gray-700">
              <div className={`w-8 h-4 rounded-full relative transition-colors ${contrast ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${contrast ? 'translate-x-4' : ''}`} />
              </div>
              <span className="flex items-center gap-2"><Sun size={16}/> ניגודיות גבוהה</span>
            </button>

            <a href="/accessibility" className="block text-center text-xs text-blue-600 hover:underline mt-4">
              הצהרת נגישות מלאה
            </a>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="bg-[#0052cc] hover:bg-[#003d99] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="פתח תפריט נגישות"
      >
        <Accessibility size={24} />
      </button>
    </div>
  )
}
