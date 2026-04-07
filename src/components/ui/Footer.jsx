import { Link } from 'react-router-dom'
import { PHONE_NUMBER, PHONE_DISPLAY } from '../../constants/contactInfo.js'

function SocialIcon({ children, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex size-11 items-center justify-center rounded-full border border-white/10 text-[#f5f5f5]/75 transition duration-300 hover:-translate-y-0.5 hover:border-[#0047ab]/45 hover:text-[#5b9bd5] hover:brightness-110"
      aria-label={label}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0a0a0a]/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-tight text-[#d4af37] transition duration-300 hover:-translate-y-0.5 hover:text-[#e8c547] hover:brightness-110"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="mt-7 flex justify-center gap-5">
          <SocialIcon label="Facebook" href="https://www.facebook.com/share/1EwocP1HZk/">
            <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.41c0-2.39 1.43-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22v7.03c4.78-.76 8.44-4.92 8.44-9.94z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="Instagram" href="https://www.instagram.com/olka_detailing/">
            <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="WhatsApp" href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`}>
            <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="TikTok" href="https://www.tiktok.com/@olkadetailing">
            <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M16.6 5.82s.51.5 1.3.86c.78.35 1.7.52 1.7.52v3.25a4.5 4.5 0 0 1-2.5-.9v5.95a5.6 5.6 0 1 1-5.6-5.6c.12 0 .24.01.36.02v3.35a2.3 2.3 0 0 0-.36-.03 2.35 2.35 0 1 0 2.35 2.35V2h3.15a4.4 4.4 0 0 0 1.6 3.82z" />
            </svg>
          </SocialIcon>
        </div>

        <nav className="mt-8 border-t border-white/[0.06] pt-6" aria-label="Nawigacja w stopce">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#f5f5f5]/70">
            <li>
              <Link to="/" className="transition hover:text-[#d4af37]">
                Strona główna
              </Link>
            </li>
            <li>
              <Link to="/cennik" className="transition hover:text-[#d4af37]">
                Cennik
              </Link>
            </li>
            <li>
              <Link to="/realizacje" className="transition hover:text-[#d4af37]">
                Realizacje
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="transition hover:text-[#d4af37]">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>

        <p className="mt-6 text-center text-sm text-[#f5f5f5]/40">
          © 2025 Olka Detailing. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
