import { useState } from 'react'
import { Phone, MapPin } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import emailjs from '@emailjs/browser'
import PageNav from "../components/ui/PageNav.jsx"
import {
  PHONE_NUMBER,
  PHONE_DISPLAY,
  ADDRESS,
  MAPS_URL,
  SOCIAL_LINKS,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from '../constants/contactInfo.js'

function validate(formData) {
  const errors = {}
  if (!formData.name.trim()) errors.name = 'Imię jest wymagane'
  if (!formData.message.trim()) errors.message = 'Wiadomość jest wymagana'
  return errors
}

export default function Contact() {
  // Map consent state (FR-016)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Form state (FR-023–FR-026)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [formErrors, setFormErrors] = useState({})

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = validate(formData)
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }
    setFormErrors({})
    setFormStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, phone: formData.phone, message: formData.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setFormStatus('success')
      setFormData({ name: '', phone: '', message: '' })
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      <PageNav />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl">
          Kontakt
        </h1>
        <p className="mt-3 max-w-2xl text-[#f5f5f5]/60">
          Zapraszamy do kontaktu — odpowiadamy szybko i chętnie.
        </p>

        {/* Map area — consent-gated (FR-016) */}
        <div className="mt-12">
          <div className="overflow-hidden rounded-xl border border-white/[0.08]">
            {!mapLoaded ? (
              <div className="flex h-64 items-center justify-center bg-white/[0.02] sm:h-80">
                <div className="text-center">
                  <p className="mb-4 text-sm text-[#f5f5f5]/50">
                    Kliknij, aby załadować mapę Google (zewnętrzna treść)
                  </p>
                  <button
                    type="button"
                    aria-label="Załaduj mapę Google"
                    onClick={() => setMapLoaded(true)}
                    className="rounded-lg border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-2.5 text-sm font-medium text-[#d4af37] transition duration-300 hover:bg-[#d4af37]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
                  >
                    Pokaż mapę
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60009.3969615876488!2d18.484528!3d54.4665729!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fda1ab087583a5%3A0xe16ec4ee08f6ee43!2sOlka%20Detailing!5e0!3m2!1spl!2spl!4v1775580863143!5m2!1spl!2spl"
                title="Mapa dojazdu do Olka Detailing"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 sm:h-96"
              />
            )}
          </div>

          {/* Fallback address — always visible (FR-022) */}
          <address className="mt-3 flex flex-wrap items-center gap-2 text-sm not-italic text-[#f5f5f5]/55">
            <MapPin className="size-4 shrink-0 text-[#d4af37]/70" aria-hidden />
            <span>{ADDRESS}</span>
            <span aria-hidden>·</span>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37]/80 underline-offset-2 hover:text-[#d4af37] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
            >
              Otwórz w Google Maps
            </a>
          </address>
        </div>

        {/* Info cards + contact form */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Info cards (FR-017–FR-021) */}
          <section aria-label="Dane kontaktowe">
            <h2 className="mb-6 text-lg font-semibold tracking-tight text-[#f5f5f5]">
              Dane kontaktowe
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Phone */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-[#f5f5f5] transition duration-300 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
              >
                <Phone className="size-5 shrink-0 text-[#d4af37]" aria-hidden />
                <span className="text-sm font-medium">{PHONE_DISPLAY}</span>
              </a>

              {/* Address */}
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-[#f5f5f5] sm:col-span-2">
                <MapPin className="size-5 shrink-0 text-[#d4af37]" aria-hidden />
                <span className="text-sm font-medium">{ADDRESS}</span>
              </div>

              {/* Social links */}
              {SOCIAL_LINKS.map((entry) => {
                const Icon = entry.icon ? LucideIcons[entry.icon] : null
                return (
                  <a
                    key={entry.label}
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-[#f5f5f5] transition duration-300 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
                  >
                    {Icon && <Icon className="size-5 shrink-0 text-[#d4af37]" aria-hidden />}
                    {!Icon && entry.svgPath && (
                      <svg className="size-5 shrink-0 fill-[#d4af37]" viewBox="0 0 24 24" aria-hidden>
                        <path d={entry.svgPath} />
                      </svg>
                    )}
                    <span className="text-sm font-medium">{entry.label}</span>
                  </a>
                )
              })}
            </div>
          </section>

          {/* Contact form (FR-023–FR-026) */}
          <section aria-label="Formularz kontaktowy">
            <h2 className="mb-6 text-lg font-semibold tracking-tight text-[#f5f5f5]">
              Napisz do nas
            </h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-[#f5f5f5]/75"
                >
                  Imię <span className="text-[#d4af37]" aria-hidden>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                  aria-invalid={Boolean(formErrors.name)}
                  className="w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 transition duration-200 hover:border-white/25 focus:border-[#d4af37]/50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
                  placeholder="Jan Kowalski"
                />
                {formErrors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-xs text-red-400">
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-[#f5f5f5]/75"
                >
                  Telefon <span className="text-[#f5f5f5]/35 text-xs font-normal">(opcjonalnie)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 transition duration-200 hover:border-white/25 focus:border-[#d4af37]/50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
                  placeholder="+48 500 600 700"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-[#f5f5f5]/75"
                >
                  Wiadomość <span className="text-[#d4af37]" aria-hidden>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                  aria-invalid={Boolean(formErrors.message)}
                  className="w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#f5f5f5] placeholder-[#f5f5f5]/30 transition duration-200 hover:border-white/25 focus:border-[#d4af37]/50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60 resize-none"
                  placeholder="Opisz zakres usługi, markę i model auta..."
                />
                {formErrors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full rounded-lg bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
              >
                {formStatus === 'sending' ? 'Wysyłanie…' : 'Wyślij'}
              </button>

              {/* Success */}
              {formStatus === 'success' && (
                <p role="status" className="rounded-lg border border-green-500/25 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  Wiadomość wysłana! Odezwiemy się najszybciej jak to możliwe.
                </p>
              )}

              {/* Error — FR-025: direct to phone/email as alternative */}
              {formStatus === 'error' && (
                <p role="alert" className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się telefonicznie pod{' '}
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/60"
                  >
                    {PHONE_DISPLAY}
                  </a>{' '}
                  albo mailowo:{' '}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/60"
                  >
                    {EMAIL}
                  </a>
                  .
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </>
  )
}
