import { useEffect, useState } from 'react'
import HeroField from '../components/HeroField'
import profile from '../assets/profile.jpg'

const facts = [
  'M.S. and B.S. in Computer Science from Brown University',
  'Software Engineer at Icahn School of Medicine at Mount Sinai',
  'Passionate about building software at the intersection of AI, healthcare, and research tooling.',
]

/** Add new lines here — they type out in the last bullet. */
const interests = [
  'I like finding waterfalls on weekend hikes.',
  'Always curious about how medicine and software can work together.',
  'I cook a little too ambitiously for a weeknight.',
  'I unwind by tinkering with side projects that have no deadline.',
]

const Hero = () => {
  const [interestIndex, setInterestIndex] = useState(0)
  const [interestText, setInterestText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const full = interests[interestIndex]
    const typedFull = interestText === full
    const cleared = interestText.length === 0

    const delay = typedFull && !isDeleting ? 1800 : isDeleting && cleared ? 280 : isDeleting ? 28 : 55

    const timeout = window.setTimeout(() => {
      if (typedFull && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && cleared) {
        setIsDeleting(false)
        setInterestIndex((current) => (current + 1) % interests.length)
        return
      }

      const nextLength = interestText.length + (isDeleting ? -1 : 1)
      setInterestText(full.slice(0, Math.max(0, nextLength)))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [interestIndex, interestText, isDeleting])

  return (
    <section id="top" className="hero-band relative isolate flex min-h-[calc(100dvh-61px)] sm:min-h-[calc(100dvh-70px)] items-center overflow-hidden">
      <HeroField />
      <div className="reveal-up relative z-10 mx-auto flex w-full max-w-page flex-col items-center gap-10 px-6 py-12 md:flex-row md:items-center md:justify-between md:gap-16 lg:px-8">
        <div className="relative z-10 w-full max-w-xl text-left">
          <h1 className="hero-line w-fit font-mono text-2xl text-ink sm:text-3xl">
            Hi, I&apos;m <span className="name-flash">Daniel</span>
          </h1>

          <ul className="mt-8 list-none space-y-3 text-[16px] leading-7 text-ink/85">
            {facts.map((fact) => (
              <li key={fact} className="hero-line flex w-fit max-w-full gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                <span>{fact}</span>
              </li>
            ))}
            <li className="hero-line flex w-fit max-w-full gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
              <span className="min-h-[3.25rem] flex-1">
                {interestText}
                <span className="typing-caret" aria-hidden="true" />
              </span>
            </li>
          </ul>
        </div>

        <img
          src={profile}
          alt="Daniel Zhu"
          className="hero-photo relative z-10 h-64 w-64 shrink-0 rounded-full object-cover object-[center_20%] sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem]"
        />
      </div>

      <a
        href="#timeline"
        aria-label="Scroll to timeline"
        className="hero-caret absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-muted transition hover:text-primary"
      >
        <svg viewBox="0 0 96 28" className="h-7 w-24" fill="none" aria-hidden="true">
          <path
            d="M8 8 L48 22 L88 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}

export default Hero
