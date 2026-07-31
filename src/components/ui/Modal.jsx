import { X } from 'lucide-react'
import { useEffect } from 'react'

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-[#1A1A1A] rounded-2xl w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2E2E2E]">
          <h3 className="text-[16px] font-semibold text-[#F5F5F0]">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#C4C4C4] hover:bg-[#242424]">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
