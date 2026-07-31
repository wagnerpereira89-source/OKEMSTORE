export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-[#2E2E2E] rounded-lg ${className}`} />
  )
}

export function ProductSkeleton() {
  return (
    <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex gap-3">
      <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}
