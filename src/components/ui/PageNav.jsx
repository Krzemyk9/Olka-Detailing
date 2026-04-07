import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Strona główna', path: '/' },
  { label: 'Cennik', path: '/cennik' },
  { label: 'Realizacje', path: '/realizacje' },
  { label: 'Kontakt', path: '/kontakt' },
]

export default function PageNav() {
  const location = useLocation()

  return (
    <nav
      className="border-b border-white/10 bg-[#0a0a0a]/65 backdrop-blur-md"
      aria-label="Nawigacja stron"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`group relative inline-flex min-w-[8rem] items-center justify-center rounded-full border px-5 py-2 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/70 ${
                    isActive
                      ? 'border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_35px_-8px_rgba(212,175,55,0.6)]'
                      : 'border-white/10 bg-white/[0.02] text-[#f5f5f5]/80 hover:border-[#d4af37]/40 hover:bg-white/[0.06] hover:text-[#f5f5f5]'
                  }`}
                >
                  <span className="flex flex-col items-center">
                    <span>{link.label}</span>
                    <span
                      className={`mt-1 h-[2px] w-10 origin-center rounded-full transition duration-300 group-hover:w-full ${
                        isActive ? 'w-full bg-[#d4af37]' : 'bg-[#d4af37]/0 group-hover:bg-[#d4af37]/80'
                      }`}
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
