import { introBlurb, portraitSrc } from '../data/about'

const AboutIntro = () => {
  return (
    <section className="reveal-up pb-24">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-14">
        <div className="w-full max-w-[280px] shrink-0 sm:max-w-[300px]">
          {portraitSrc ? (
            <img
              src={portraitSrc}
              alt="Daniel Zhu"
              className="aspect-[4/5] w-full rounded-card object-cover object-top ring-1 ring-line"
            />
          ) : (
            <div
              className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-card border border-dashed border-muted/40 bg-panel text-muted"
              aria-label="Portrait coming soon"
            >
              <PortraitMark />
              <p className="mt-4 text-sm">Photo coming soon</p>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 sm:justify-start">
            <span className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Daniel Zhu</span>
            <span lang="zh-Hans" className="font-calligraphy text-5xl leading-none text-secondary sm:text-6xl">
              朱丹尼
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-base leading-7 text-muted sm:mx-0">{introBlurb}</p>
        </div>
      </div>
    </section>
  )
}

const PortraitMark = () => (
  <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
    <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M16 52c2.4-10 10-16 16-16s13.6 6 16 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

export default AboutIntro
