import brown from '../assets/logos/brown_cs.png'
import alpert from '../assets/logos/alpert_medical.png'
import lifespan from '../assets/logos/lifespan_logo.png'
import rifc from '../assets/logos/rifc.png'
import alzheimers from '../assets/logos/alzheimers.png'
import hadr from '../assets/logos/hadr.png'

const logos = [
  { src: brown, alt: 'Brown Computer Science', href: 'https://cs.brown.edu/' },
  { src: alpert, alt: 'Warren Alpert Medical School', href: 'https://medical.brown.edu/' },
  { src: lifespan, alt: 'Lifespan', href: 'https://www.lifespan.org/' },
  { src: rifc, alt: 'Rhode Island Free Clinic', href: 'https://www.rifreeclinic.org/' },
  { src: alzheimers, alt: "Alzheimer's Association", href: 'https://www.alz.org/' },
  { src: hadr, alt: 'Healthy Aging Data Reports', href: 'https://healthyagingdatareports.org/' },
]

const Logos = () => {
  const loop = [...logos, ...logos]

  return (
    <section className="mx-auto max-w-page px-6 pb-20 pt-2 lg:px-8 reveal-up reveal-delay-3">
      <p className="mb-8 text-center text-sm text-muted">
        Places I&apos;ve studied, built, and volunteered
      </p>
      <div className="overflow-hidden py-5">
        <div className="logo-track flex w-max items-center gap-x-16">
          {loop.map((logo, i) => (
            <a
              key={`${logo.alt}-${i}`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/logo relative shrink-0 py-3"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="pointer-events-none h-14 w-auto max-w-[180px] object-contain transition-transform duration-300 ease-out group-hover/logo:-translate-y-3 sm:h-16"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Logos
