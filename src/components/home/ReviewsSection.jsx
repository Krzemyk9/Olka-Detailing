import { useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const REVIEWS = [
  { author: 'Agnieszka Бiałek', date: '4 dni temu', text: 'Profesjonalizm przez wielkie P. Odbieram zawsze idealnie wyczyszczone i zadbane auto. Polecam z całego serca' },
  { author: 'Małgorzata Hróściel', guide: true, date: '5 dni temu', text: 'Jestem absolutnie zachwycona usługą! Oddałam auto, które było hmm...nie oszukujmy się, w dość ciężkim stanie 😅 W środku sporo zabrudzenia, a wisienką na torcie — efekt końcowy przeszedł moje oczekiwania.' },
  { author: 'Sophie Hatter', guide: true, date: '2 tygodnie temu', text: 'Pani Ola jest po prostu mistrzynią w myciu samochodów, oddawaliśmy swoje samochody do różnych miejsc ale tylko tu zostaliśmy na stałe. Obsługa jest przesympatyczna, ceny wcale nie są wysokie, a samochód wyjeżdża z tego miejsca jak nówka sztuka z salonu. Pozdrawiamy Pani Olu!' },
  { author: 'Krzysztof Wywiоł', date: '3 tygodnie temu', text: 'Polecam ich usługi. Perfekcyjnie wyczyszczony Fiat Tipo. Na pewno będę do nich wracał.' },
  { author: 'Piotr Malicki', date: '2 miesiące temu', text: 'Polecam. Świetna robota.' },
  { author: 'cizumek cizumek', date: '3 miesiące temu', text: 'Jestem pełen podziwu dla zaangażowania i profesjonalizmu pracowników Olka Detailing. Oddawałem tam kilka samochodów do renowacji lakieru. Samochody w wieku od lat 25 po całkiem nowe. Wszystkie opracowane w sposób idealny.' },
  { author: 'Monika', date: '3 miesiące temu', text: 'Fantastyczne miejsce. Korzystam z tej myjni od lat. Teraz jest pięknie i nowocześnie.' },
  { author: 'Miroslaw Leszczynski', date: '3 miesiące temu', text: 'Dzisiaj odebrałem samochód po działaniu wandala na parkingu. Rysy znikęły, a samochód odebrałem jak nowy i tak czysty, że żal było wyjeżdżać na ulice. Szczerze polecam i gratuluję najwyższego profesjonalizmu i kultury obsługi. Pozdrawiam' },
  { author: 'Beata', date: '5 miesięcy temu', text: 'Jestem stałą klientką — nowe piękne miejsce a jakość jak zawsze perfekt, zawsze wyjeżdżam zadowolona. Pani Ola i Pan Dominik wykonują swoją pracę bardzo dokładnie, wszystko dopieszczone, wnętrze idealnie odkurzone a samochód błyszczy jak nowy.' },
  { author: 'Adam Różyński', date: '5 miesięcy temu', text: 'Świetny kontakt — np. gdy Pani Ola nie może odebrać to oddzwania. Wszystko w terminie, zgodnie z umową. Samochód wygląda świetnie po każdej wizycie. Polecam z całego serca!' },
  { author: 'Slawek Jasnoch', date: '5 miesięcy temu', text: 'Świetna obsługa, krótkie terminy, dobra robota, dobre ceny. Polecam' },
  { author: 'Liliana Poszumska', guide: true, date: '6 miesięcy temu', text: 'Pani Ola czyni cuda. Po zarysowaniach nie ma śladu, auto wygląda jakby wyjechało z salonu. I to wszystko z uśmiechem na ustach i full profesjonalnie! Polecam!' },
  { author: 'Piotr Dorozik', guide: true, date: '6 miesięcy temu', text: '' },
  { author: 'Darek Lork', guide: true, date: '7 miesięcy temu', text: 'Mistrzostwo wykonanej pracy. Maluch odzyskał blask chyba jeszcze lepszy niż gdy wyjechał z Polmozbytu trzydzieści lat temu 😀 Pani Ola wykonała ogrom pracy ale efekt końcowy jest spektakularny. Polecam' },
  { author: 'Karolinaa', guide: true, date: '7 miesięcy temu', text: 'Wspaniała obsługa! Auto umyte, wyczyszczone perfekcyjnie!! Polecam gorąco!' },
  { author: 'Tomasz Nelka', date: '8 miesięcy temu', text: 'Polecam! Świetna robota, przystępnie cenowo, na pewno skorzystam po raz kolejny. Super dokładnie, wzorowo.' },
  { author: 'Joanna Juńska', date: '8 miesięcy temu', text: 'Bardzo polecam. Przystępne ceny a robota na 5+' },
  { author: 'Daniel Dec', guide: true, date: '9 miesięcy temu', text: 'Bardzo dobry kontakt. Pani Ola jest bardzo miła i rzeczowa. Ceny przystępne, realizacja była w jeden dzień roboczy.' },
  { author: 'Jakub', date: '9 miesięcy temu', text: 'Jestem pewny, że moje auto jak jest brudne to cieszy się na wizytę u pani Oli. Jak zawsze super jakość, dokładność na zewnątrz i w środku. A to wszystko w normalnej cenie.' },
]

function ReviewCard({ author, guide, date, text }) {
  const initials = author
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-[border-color,box-shadow] duration-200 group-hover:border-[#d4af37]/30 group-hover:shadow-xl group-hover:shadow-black/60">
      <div className="flex items-start gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0047ab]/20 text-xs font-semibold text-[#7eb8ff]"
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#f5f5f5]">{author}</p>
          {guide && <p className="text-xs text-[#f5f5f5]/40">Lokalny przewodnik</p>}
        </div>
      </div>
      <div className="flex items-center gap-1" aria-label="Ocena 5 na 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-[#d4af37] text-[#d4af37]" aria-hidden />
        ))}
        <span className="ml-2 text-xs text-[#f5f5f5]/40">{date}</span>
      </div>
      {text && <p className="text-sm leading-relaxed text-[#f5f5f5]/70">{text}</p>}
    </article>
  )
}

export default function ReviewsSection() {
  const sliderRef = useRef(null)
  const rafRef = useRef(null)
  const track = [...REVIEWS, ...REVIEWS]

  function startAutoScroll() {
    const el = sliderRef.current
    if (!el) return
    function step() {
      el.scrollLeft += 0.9
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft -= el.scrollWidth / 2
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    startAutoScroll()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  function scrollBy(dir) {
    const el = sliderRef.current
    if (!el) return
    const CARD = 336 // sm:w-80 (320px) + gap-4 (16px)
    const start = el.scrollLeft
    const target = start + dir * CARD
    const duration = 400
    const t0 = performance.now()

    cancelAnimationFrame(rafRef.current)

    function animate(now) {
      const p = Math.min((now - t0) / duration, 1)
      // ease-out cubic
      const ease = 1 - Math.pow(1 - p, 3)
      const half = el.scrollWidth / 2
      let pos = start + (target - start) * ease
      if (pos >= half) pos -= half
      if (pos < 0) pos += half
      el.scrollLeft = pos
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        startAutoScroll()
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  return (
    <section
      id="reviews"
      className="scroll-mt-28 border-b border-white/[0.06] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="reviews-heading"
            className="text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl"
          >
            Opinie Google
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5" aria-label="Ocena 5 na 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[#d4af37] text-[#d4af37]" aria-hidden />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#d4af37]">5.0</span>
            <span className="text-sm text-[#f5f5f5]/40">· {REVIEWS.length} opinii</span>
          </div>
        </div>
      </div>

      {/*
        Outer wrapper: relative, NO overflow — arrows are absolutely positioned here
        so they never drift when scrollLeft changes.
        Inner scroll container: overflow-hidden + pt-24 so cards can pop up into padding.
      */}
      <div className="relative mt-12">
        {/* Left gradient strip + arrow */}
        <div className="pointer-events-auto absolute inset-y-0 left-0 z-30 flex w-14 flex-col items-center justify-center bg-gradient-to-r from-[#0a0a0a] to-transparent">
          <div className="mt-24">
            <button
              onClick={() => scrollBy(-1)}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/70 text-[#f5f5f5]/50 backdrop-blur-sm transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
              aria-label="Poprzednia opinia"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>

        {/* Right gradient strip + arrow */}
        <div className="pointer-events-auto absolute inset-y-0 right-0 z-30 flex w-14 flex-col items-center justify-center bg-gradient-to-l from-[#0a0a0a] to-transparent">
          <div className="mt-24">
            <button
              onClick={() => scrollBy(1)}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/70 text-[#f5f5f5]/50 backdrop-blur-sm transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
              aria-label="Następna opinia"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Scroll container — clips horizontally, pt-24 gives cards room to pop up */}
        <div ref={sliderRef} className="overflow-hidden pt-24 pb-2">
          <div
            className="flex w-max items-start gap-4"
            aria-label="Przewijane opinie klientów"
          >
            {track.map((review, i) => (
              <div
                key={i}
                className="group relative w-72 shrink-0 transition-transform duration-200 hover:z-20 hover:-translate-y-10 hover:scale-[1.18] sm:w-80"
              >
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}