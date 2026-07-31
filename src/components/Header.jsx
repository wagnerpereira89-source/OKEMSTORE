import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Header({ title, left, right, onBack }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <header className="sticky top-0 z-40 bg-[#1A1A1A] border-b border-[#2E2E2E] px-4 h-14 flex items-center gap-3">
      {(left !== false) && (
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-lg text-[#C4C4C4] hover:bg-[#242424]"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="flex-1 text-[17px] font-semibold text-[#F5F5F0] tracking-tight truncate">
        {title}
      </h1>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  )
}
