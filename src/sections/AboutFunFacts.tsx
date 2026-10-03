import type { ReactNode } from 'react'
import { profiles, stravaAthleteId } from '../data/about'

const duolingoHref = profiles.duolingoUsername
  ? `https://www.duolingo.com/profile/${profiles.duolingoUsername}`
  : null
const hevyHref = profiles.hevyUsername ? `https://hevy.com/user/${profiles.hevyUsername}` : null
const stravaId = profiles.stravaAthlete ? stravaAthleteId(profiles.stravaAthlete) : ''
const stravaHref = stravaId ? `https://www.strava.com/athletes/${stravaId}` : null

const AboutFunFacts = () => {
  return (
    <section className="reveal-up reveal-delay-4 pb-28">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Other fun facts</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        A few things I keep up with outside of work.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <FactCard
          accent="text-success"
          icon={<FlameIcon />}
          title="Duolingo"
          stat="—"
          statLabel="day streak"
          body="A daily language streak. Once my profile is linked, a live card can sit here."
          href={duolingoHref}
          cta="View streak"
        >
          {profiles.duolingoUsername ? (
            <img
              src={`https://duolingo-streak-tracker.vercel.app/api/card/${profiles.duolingoUsername}?theme=polar&variant=compact`}
              alt={`Duolingo stats for ${profiles.duolingoUsername}`}
              className="mt-5 w-full rounded-xl ring-1 ring-line"
              loading="lazy"
            />
          ) : null}
        </FactCard>

        <FactCard
          accent="text-secondary"
          icon={<DumbbellIcon />}
          title="Hevy"
          stat="—"
          statLabel="workouts logged"
          body="Logging lifts and watching the numbers climb. I'll link my public Hevy profile here."
          href={hevyHref}
          cta="View profile"
        />

        <FactCard
          accent="text-warning"
          icon={<TrailIcon />}
          title="Strava"
          stat="—"
          statLabel="this week"
          body="Miles on the road and trail. Public activities can be embedded here."
          href={stravaHref}
          cta="View athlete"
        >
          {profiles.stravaActivityIds.length > 0 ? (
            <div className="mt-5 space-y-3">
              {profiles.stravaActivityIds.map((id) => (
                <iframe
                  key={id}
                  title="Strava activity"
                  src={`https://strava-embeds.com/activity/${id}`}
                  className="h-[160px] w-full rounded-xl border-0"
                  loading="lazy"
                />
              ))}
            </div>
          ) : null}
        </FactCard>
      </div>
    </section>
  )
}

const FactCard = ({
  accent,
  icon,
  title,
  stat,
  statLabel,
  body,
  href,
  cta,
  children,
}: {
  accent: string
  icon: ReactNode
  title: string
  stat: string
  statLabel: string
  body: string
  href: string | null
  cta: string
  children?: ReactNode
}) => (
  <article className="flex flex-col rounded-card border border-line bg-surface p-6">
    <div className={`mb-4 ${accent}`}>{icon}</div>
    <h3 className="text-xl font-extrabold tracking-tight text-ink">{title}</h3>
    <p className="mt-4 text-4xl font-extrabold tracking-tight text-ink">{stat}</p>
    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{statLabel}</p>
    <p className="mt-4 flex-1 text-sm leading-6 text-muted">{body}</p>
    {children}
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
      >
        {cta}
      </a>
    ) : (
      <p className="mt-6 text-sm text-muted/80">Profile link coming soon</p>
    )}
  </article>
)

const FlameIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <path
      d="M16 4c1 5-4 7-4 12a8 8 0 1 0 14.5-4.5C24 16 22 15 22 11c-3 2-5 4-6-7z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M16 22a4 4 0 0 0 2-7c-1.5 2-3 2-4 0 0 3 1 5 2 7z" fill="currentColor" />
  </svg>
)

const DumbbellIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <path
      d="M6 12v8M10 10v12M22 10v12M26 12v8M10 16h12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const TrailIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <path
      d="M4 24l8-12 5 7 4-5 7 10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="23" cy="8" r="2.2" fill="currentColor" />
  </svg>
)

export default AboutFunFacts
