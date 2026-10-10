export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="var(--color-ink)" />
        <path
          d="M11 24V8h6.5a4.75 4.75 0 0 1 0 9.5H11"
          fill="none"
          stroke="var(--color-canvas)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="22" r="2" fill="var(--color-accent)" />
      </svg>
      <span className="text-[0.9375rem] font-semibold tracking-tight">Practiq</span>
    </span>
  )
}
