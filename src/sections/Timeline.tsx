import { useState } from 'react'
import lifespanLogo from '../assets/logos/lifespan_logo.png'
import barrowLogo from '../assets/logos/barrow.png'
import maayanLogo from '../assets/logos/maayan-lab.png'
import sinaiLogo from '../assets/logos/mount-sinai.png'

interface Entry {
  role: string
  org: string
  period: string
  location: string
  color: string
  logos: { src: string; alt: string; href: string }[]
  bullets: string[]
}

const entries: Entry[] = [
  {
    role: 'Machine Learning Researcher',
    org: 'RI Hospital',
    period: '2023 – 2024',
    location: 'Providence, RI',
    color: '#c4a35a',
    logos: [{ src: lifespanLogo, alt: 'Lifespan / Brown University Health', href: 'https://www.brownhealth.org/' }],
    bullets: [
      'Developed ML models to predict clinical outcomes from EHR data.',
      'Collaborated with physicians to translate research into actionable tools.',
      'Processed and cleaned large longitudinal patient datasets.',
      'Presented findings to clinical and research stakeholders.',
    ],
  },
  {
    role: 'VR Research Intern',
    org: 'Barrow Neurological Institute',
    period: '2022 – 2023',
    location: 'Phoenix, AZ',
    color: '#1d4ed8',
    logos: [
      {
        src: barrowLogo,
        alt: 'Barrow Neurological Institute',
        href: 'https://www.barrowneuro.org/for-physicians-researchers/research/research-programs-labs/sonntag-spine-center/spine-virtual-reality-laboratory/',
      },
    ],
    bullets: [
      'Built virtual reality environments for neurological rehabilitation studies.',
      'Integrated biometric sensors with VR hardware for data collection.',
      'Conducted user studies with patients and clinical staff.',
      'Contributed to IRB-approved research protocols.',
    ],
  },
  {
    role: 'Bioinformatics Engineer',
    org: "Ma'ayan Lab, Icahn School of Medicine at Mount Sinai",
    period: '2024 – Present',
    location: 'New York, NY',
    color: '#db2777',
    logos: [
      { src: maayanLogo, alt: "Ma'ayan Lab", href: 'https://labs.icahn.mssm.edu/maayanlab/' },
      { src: sinaiLogo, alt: 'Mount Sinai', href: 'https://icahn.mssm.edu/' },
    ],
    bullets: [
      'Built GENI-AI, an agentic bioinformatics chatbot used by 10,000+ monthly users.',
      "Created 10 MCP servers integrating Ma'ayan Lab tools (Enrichr, ChEA3, Geneshot).",
      'Deployed on a 16-node Kubernetes cluster with a user-data caching system.',
      'Integrated LangGraph for multi-step autonomous workflow chaining.',
    ],
  },
]

function ExpandPanel({ bullets, open }: { bullets: string[]; open: boolean }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <ul className="mt-3 space-y-1.5 rounded-xl border border-ink/10 bg-white/70 px-3 py-3 text-left text-sm leading-6 text-ink/80">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Logos({ entry }: { entry: Entry }) {
  const paired = entry.logos.length > 1

  return (
    <div className={`mt-6 flex items-center justify-center ${paired ? 'gap-4' : ''}`}>
      {entry.logos.map((logo) => (
        <a
          key={logo.alt}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex origin-center transition-transform duration-500 ease-in-out hover:-translate-y-2 hover:scale-110"
        >
          {logo.alt === 'Mount Sinai' ? (
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-48 w-auto max-w-[150px] object-contain opacity-85 transition hover:opacity-100"
            />
          ) : (
            <img
              src={logo.src}
              alt={logo.alt}
              className={`object-contain opacity-85 transition hover:opacity-100 ${
                paired ? 'h-32 w-auto max-w-[160px]' : 'h-36 w-auto max-w-[220px]'
              }`}
            />
          )}
        </a>
      ))}
    </div>
  )
}

function RoleCard({
  entry,
  isOpen,
  onClick,
}: {
  entry: Entry
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full max-w-[210px] origin-center text-left transition-transform duration-500 ease-in-out hover:-translate-y-2 hover:scale-105"
      aria-expanded={isOpen}
    >
      <div className="rounded-xl border border-ink/10 bg-white/60 px-3 py-2.5 shadow-sm transition hover:bg-white/90">
        <p className="text-[13px] font-semibold leading-snug text-ink">{entry.role}</p>
        <p className="mt-0.5 text-[12px] font-medium leading-snug text-ink/70">{entry.org}</p>
        <p className="mt-1 text-[11px] text-muted">
          {entry.period} · {entry.location}
        </p>
        <p className="mt-1 text-[11px] text-ink/50 group-hover:text-ink/70">
          {isOpen ? '▲ collapse' : '▼ expand'}
        </p>
      </div>
    </button>
  )
}

function Dot({
  color,
  isOpen,
  label,
  onClick,
}: {
  color: string
  isOpen: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative z-10 h-5 w-5 shrink-0 rounded-full border-[3px] border-[#edd4b8] transition-transform hover:scale-125"
      style={{ backgroundColor: isOpen ? '#111111' : color }}
    />
  )
}

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section className="mx-auto max-w-page px-6 pb-16 pt-12 lg:px-8 reveal-up reveal-delay-2">
      {/* ── desktop ── */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 justify-items-center">
          {entries.map((entry, i) => (
            <RoleCard
              key={entry.org}
              entry={entry}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </div>

        <div className="relative my-5 h-10">
          <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-ink" />
          <div className="relative grid h-full grid-cols-3">
            {entries.map((entry, i) => (
              <div key={entry.org} className="flex items-center justify-center">
                <Dot
                  color={entry.color}
                  isOpen={openIndex === i}
                  label={`${openIndex === i ? 'Collapse' : 'Expand'} details for ${entry.org}`}
                  onClick={() => toggle(i)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 justify-items-center gap-x-6">
          {entries.map((entry, i) => (
            <div key={entry.org} className="flex w-full flex-col items-center px-2">
              <Logos entry={entry} />
              <ExpandPanel bullets={entry.bullets} open={openIndex === i} />
            </div>
          ))}
        </div>
      </div>

      {/* ── mobile ── */}
      <div className="flex flex-col items-center gap-2 md:hidden">
        {entries.map((entry, i) => (
          <div key={entry.org} className="flex w-full flex-col items-center">
            <RoleCard entry={entry} isOpen={openIndex === i} onClick={() => toggle(i)} />
            <div className="relative flex h-10 w-full items-center justify-center">
              {i < entries.length - 1 && (
                <div aria-hidden="true" className="absolute left-1/2 top-5 h-16 w-1.5 -translate-x-1/2 bg-ink" />
              )}
              <Dot
                color={entry.color}
                isOpen={openIndex === i}
                label={`${openIndex === i ? 'Collapse' : 'Expand'} details for ${entry.org}`}
                onClick={() => toggle(i)}
              />
            </div>
            <Logos entry={entry} />
            <div className="mb-6 w-full max-w-[240px]">
              <ExpandPanel bullets={entry.bullets} open={openIndex === i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
