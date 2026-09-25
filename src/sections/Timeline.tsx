import { useState } from 'react'
import brownHealthLogo from '../assets/logos/brown_health_logo.png'
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
    role: 'Bioinformatics Engineer',
    org: "Ma'ayan Lab, Icahn School of Medicine at Mount Sinai",
    period: 'Jun 2025 – Present',
    location: 'New York, NY',
    color: 'bg-secondary',
    logos: [
      { src: maayanLogo, alt: "Ma'ayan Lab", href: 'https://labs.icahn.mssm.edu/maayanlab/' },
      { src: sinaiLogo, alt: 'Mount Sinai', href: 'https://icahn.mssm.edu/' },
    ],
    bullets: [
      'Built GENI-AI, an agentic bioinformatics chatbot that helps researchers find new insights in their data.',
      "Created 10 MCP servers integrating Ma'ayan Lab tools (Enrichr, ChEA3, Geneshot).",
      'Deployed on a 16-node Kubernetes cluster with a user-data caching system.',
      'Integrated LangGraph for multi-step autonomous workflow chaining.',
    ],
  },
  {
    role: 'Machine Learning Research Intern',
    org: 'Computational Neuromodulation Lab, RI Hospital',
    period: 'Oct 2023 – Oct 2024',
    location: 'Providence, RI',
    color: 'bg-accent',
    logos: [{ src: brownHealthLogo, alt: 'Brown University Health', href: 'https://www.brownhealth.org/' }],
    bullets: [
      'Collected continuous neurophysiological data from Arduino Due microcontrollers during Deep Brain Stimulation (DBS).',
      'Developed a Python program to resolve bilateral synchronization of signals between brain hemispheres.',
      'Implemented an SVM-based ML model to optimize stimulation parameters from real-time data during closed-loop DBS.',
      'Collaborated with physicians to translate research into actionable tools.',
    ],
  },
  {
    role: 'Computer Vision Research Intern',
    org: 'Virtual Reality Lab, Barrow Neurological Institute',
    period: 'May 2024 – Sep 2024',
    location: 'Phoenix, AZ',
    color: 'bg-primary',
    logos: [
      {
        src: barrowLogo,
        alt: 'Barrow Neurological Institute',
        href: 'https://www.barrowneuro.org/for-physicians-researchers/research/research-programs-labs/sonntag-spine-center/spine-virtual-reality-laboratory/',
      },
    ],
    bullets: [
      'Developed an nnU-Net model in PyTorch to segment spine pathologies in CT scans, reaching >90% accuracy on unstructured public CT data and accelerating 500+ 3D models for a VR pathology library.',
      'Automated segmentation and 3D modeling workflows in 3D Slicer with Python, reducing task time by a factor of 10.',
      'Implemented a bone decortication feature in a VR spine surgery application used by 70 medical residents in Unreal Engine.',
    ],
  },
]

function ExpandPanel({ bullets, open }: { bullets: string[]; open: boolean }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        open ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <ul className="mt-3 space-y-1.5 rounded-xl border border-line bg-surface px-4 py-3 text-left text-sm leading-6 text-ink/85">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
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
    <div className={`flex shrink-0 items-center justify-center ${paired ? 'gap-2' : ''}`}>
      {entry.logos.map((logo) => (
        <a
          key={logo.alt}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex origin-center transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className={`pointer-events-none w-auto object-contain opacity-85 transition hover:opacity-100 ${
              logo.alt === 'Mount Sinai'
                ? 'h-20 max-w-[150px] sm:h-24 sm:max-w-[190px]'
                : paired
                  ? 'h-16 max-w-[200px] sm:h-20 sm:max-w-[250px]'
                  : 'h-20 max-w-[250px] sm:h-24 sm:max-w-[320px]'
            }`}
          />
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
      className="group w-full text-left"
      aria-expanded={isOpen}
    >
      <div
        className={`rounded-xl border bg-surface px-4 py-3 shadow-sm transition ${
          isOpen ? 'border-primary/50' : 'border-line hover:border-primary/40'
        }`}
      >
        <p className="text-[15px] font-semibold leading-snug text-ink">{entry.role}</p>
        <p className="mt-0.5 text-[13px] font-medium leading-snug text-ink/75">{entry.org}</p>
        <p className="mt-1 text-[12px] text-muted">
          {entry.period} · {entry.location}
        </p>
        <p className={`mt-1 text-[12px] ${isOpen ? 'text-primary' : 'text-muted group-hover:text-primary'}`}>
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
      className={`relative z-10 h-5 w-5 shrink-0 rounded-full border-[3px] border-page transition-transform hover:scale-125 ${color} ${
        isOpen ? 'scale-125 ring-2 ring-ink ring-offset-2 ring-offset-page' : ''
      }`}
    />
  )
}

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="timeline"
      className="mx-auto max-w-page scroll-mt-[72px] px-6 pb-16 pt-12 lg:px-8 reveal-up reveal-delay-2"
    >
      <div className="relative py-10">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-2.5 top-0 w-1.5 -translate-x-1/2 bg-ink"
        />
        {entries.map((entry, i) => (
          <div key={entry.org} className="relative flex items-start gap-5 pb-10 last:pb-0 sm:gap-8">
            <div className="flex h-[7rem] w-5 shrink-0 items-center justify-center sm:h-[8rem]">
              <Dot
                color={entry.color}
                isOpen={openIndex === i}
                label={`${openIndex === i ? 'Collapse' : 'Expand'} details for ${entry.org}`}
                onClick={() => toggle(i)}
              />
            </div>
            <div className="flex h-[7rem] w-[14.5rem] shrink-0 items-center justify-center sm:h-[8rem] sm:w-[21rem]">
              <Logos entry={entry} />
            </div>
            <div className="min-w-0 flex-1">
              <RoleCard entry={entry} isOpen={openIndex === i} onClick={() => toggle(i)} />
              <ExpandPanel bullets={entry.bullets} open={openIndex === i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

