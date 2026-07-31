export function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }) {
  return (
    <h2 className={`text-[18px] font-semibold text-[#F5F5F0] mb-3 ${className}`}>
      {children}
    </h2>
  )
}
