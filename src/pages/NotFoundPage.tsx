import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="py-16">
      <p className="font-mono text-2xs uppercase tracking-wider text-faint">404</p>
      <h1 className="mt-2 text-xl">Page not found</h1>
      <p className="mt-1 text-muted">The page you're looking for doesn't exist or was moved.</p>
      <Link
        to="/"
        className="mt-5 inline-flex h-9 items-center rounded-control border border-border-strong bg-surface px-3 text-sm font-medium transition-colors hover:bg-subtle"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
