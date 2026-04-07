import { useEffect, useRef, useState } from 'react'

const RIGHT_SRC = '/mercedes-profil-gpt.webp'
const LEFT_SRC = '/mercedes-profil-oryg.webp'

export default function BeforeAfterSlider() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0.5)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  // Deferred mount: only render interactive slider once container is 50% visible
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  // Custom drag: getBoundingClientRect() on every move event (FR-001)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    function getPosition(clientX) {
      const rect = container.getBoundingClientRect()
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    }

    function handleMove(e) {
      if (!isDragging.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      if (e.cancelable) e.preventDefault()
      setSliderPosition(getPosition(clientX))
    }

    function handleEnd() {
      isDragging.current = false
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }

    function handleStart(e) {
      isDragging.current = true
      if (!hasInteracted) setHasInteracted(true)
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      setSliderPosition(getPosition(clientX))
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleEnd)
      window.addEventListener('touchmove', handleMove, { passive: false })
      window.addEventListener('touchend', handleEnd)
    }

    container.addEventListener('mousedown', handleStart)
    container.addEventListener('touchstart', handleStart, { passive: false })

    return () => {
      container.removeEventListener('mousedown', handleStart)
      container.removeEventListener('touchstart', handleStart)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [hasInteracted])

  return (
    <section
      className="border-b border-white/[0.06] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="compare-heading"
          className="text-center text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl"
        >
          Różnica, którą zobaczysz od razu
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#f5f5f5]/60">
          Przesuń suwak i odkryj, jak detal zmienia wszystko.
        </p>

        <div className="relative mt-12">
          {!hasInteracted && (
            <p
              className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 animate-pulse text-xs font-medium tracking-wide text-[#d4af37]/60 motion-reduce:animate-none"
              aria-hidden="true"
            >
              Przesuń, aby oczyścić
            </p>
          )}
          <div
            ref={containerRef}
            role="group"
            aria-label="Porównanie: przed i po detailingu. Przeciągnij, aby zmienić punkt podziału."
            className="relative cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.85)]"
          >
            {isVisible ? (
              <>
                {/* Right image — always full width, underneath */}
                <img
                  src={RIGHT_SRC}
                  alt="Mercedes — stan po detailingu (oryg)"
                  className="pointer-events-none block h-auto w-full"
                  draggable={false}
                />
                {/* Left image — płynne odsłanianie przez clip-path */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition * 100}% 0 0)`,
                    transition: isDragging.current ? 'none' : 'clip-path 200ms ease-out'
                  }}
                >
                  <img
                    src={LEFT_SRC}
                    alt="Mercedes — stan przed (GPR)"
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                {/* Divider line */}
                <div
                  className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-[#d4af37]"
                  style={{ left: `${sliderPosition * 100}%` }}
                  aria-hidden="true"
                />
                {/* Handle circle */}
                <div
                  className="pointer-events-none absolute top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#d4af37] bg-black/70 shadow-lg"
                  style={{ left: `${sliderPosition * 100}%` }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M5 3L1 8l4 5M11 3l4 5-4 5"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <img
                src={LEFT_SRC}
                alt="Mercedes — stan przed detailingiem"
                className="w-full h-auto"
              />
            )}
            <span
              className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold tracking-wider text-[#f5f5f5] backdrop-blur-sm"
              aria-hidden="true"
            >
              PRZED
            </span>
            <span
              className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold tracking-wider text-[#f5f5f5] backdrop-blur-sm"
              aria-hidden="true"
            >
              PO
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
