import { useState } from 'react'
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '../../constants/faqData.js'

function Item({ item, open, onToggle }) {
  const expanded = open === item.q
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="border-b border-white/[0.08] last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => onToggle(expanded ? null : item.q)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-[#f5f5f5] transition duration-300 hover:text-[#d4af37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/60"
          aria-expanded={expanded}
        >
          <span className="text-base font-medium sm:text-lg">{item.q}</span>
          <Motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
            className="shrink-0 text-[#f5f5f5]/45"
            aria-hidden
          >
            <ChevronDown className="size-5" />
          </Motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {expanded && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm leading-relaxed text-[#f5f5f5]/60 sm:text-[0.95rem]">
              {item.a}
            </p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqAccordion() {
  const [open, setOpen] = useState(null)

  return (
    <section
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="faq-heading"
          className="text-center text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl"
        >
          Najczęstsze pytania
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#f5f5f5]/55">
          Krótko o czasie, trwałości i zakresie usług.
        </p>

        <div className="mt-12 rounded-2xl border border-white/[0.1] bg-white/[0.02] px-4 sm:px-6">
          {FAQ_ITEMS.map((item) => (
            <Item key={item.q} item={item} open={open} onToggle={setOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
