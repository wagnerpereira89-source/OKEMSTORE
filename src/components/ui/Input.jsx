export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[13px] font-medium text-[#C4C4C4]">{label}</label>
      )}
      <input
        className={`w-full h-10 px-3 text-sm bg-[#1A1A1A] border rounded-lg outline-none transition-colors
          border-[#2E2E2E] focus:border-primary focus:ring-2 focus:ring-primary/20
          placeholder:text-[#9A9A9A] disabled:bg-[#242424] disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[13px] font-medium text-[#C4C4C4]">{label}</label>
      )}
      <textarea
        className={`w-full px-3 py-2 text-sm bg-[#1A1A1A] border rounded-lg outline-none transition-colors resize-y
          border-[#2E2E2E] focus:border-primary focus:ring-2 focus:ring-primary/20
          placeholder:text-[#9A9A9A] min-h-[200px]
          ${error ? 'border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
