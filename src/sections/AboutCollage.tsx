import { collagePhotos } from '../data/about'

const SLOT_COUNT = 6
const tilts = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-5', '-rotate-3', 'rotate-2']

const AboutCollage = () => {
  const slots = Array.from({ length: Math.max(SLOT_COUNT, collagePhotos.length) }, (_, i) => collagePhotos[i])

  return (
    <section className="reveal-up reveal-delay-1 pb-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Snapshots</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        A pile of photos from around the edges of my life — still collecting them.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-5 px-1 py-6 sm:grid-cols-3 sm:gap-8">
        {slots.map((photo, i) => (
          <figure
            key={photo?.src ?? `slot-${i}`}
            className={`polaroid origin-center transition duration-300 ease-out hover:z-10 hover:rotate-0 hover:-translate-y-1 motion-reduce:transform-none ${tilts[i % tilts.length]}`}
          >
            {photo ? (
              <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div
                className="flex aspect-[4/5] w-full items-center justify-center bg-panel text-muted/70"
                aria-label="Photo coming soon"
              >
                <CameraMark />
              </div>
            )}
            <figcaption className="mt-3 text-center font-mono text-[11px] tracking-wide text-muted">
              {photo?.alt ?? 'coming soon'}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

const CameraMark = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
    <rect x="6" y="14" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="24" cy="26" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path d="M18 14l2.5-5h7L30 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
)

export default AboutCollage
