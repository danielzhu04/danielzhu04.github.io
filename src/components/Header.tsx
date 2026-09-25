import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CellIcon, HelixIcon, NeuronIcon } from './NavIcons'
import SpikeTrace, { type TraceBounds } from './SpikeTrace'

const navItems = [
  { label: 'Home', to: '/', Icon: CellIcon },
  { label: 'Projects', to: '/projects', Icon: HelixIcon },
  { label: 'About', to: '/about', Icon: NeuronIcon },
]

const contacts = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel--zhu' },
  { label: 'Email', href: 'mailto:daniel_zhu1@brown.edu' },
  { label: 'GitHub', href: 'https://github.com/danielzhu04' },
]

type Marker = { left: number; width: number }

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [marker, setMarker] = useState<Marker | null>(null)
  const [traceBounds, setTraceBounds] = useState<TraceBounds | null>(null)
  const [animate, setAnimate] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const { pathname } = useLocation()

  const activeIndex = navItems.findIndex(({ to }) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to),
  )

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative z-10 inline-flex h-9 items-center gap-2 rounded-[10px] border-[1.5px] px-3 text-[15px] font-semibold transition-colors ${
      isActive
        ? 'border-transparent text-ink'
        : 'border-dashed border-transparent text-muted hover:border-muted/50 hover:text-ink'
    }`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 text-[15px] font-semibold transition ${
      isActive ? 'text-ink' : 'text-muted hover:text-ink'
    }`

  useLayoutEffect(() => {
    const measure = () => {
      const header = headerRef.current
      const link = activeIndex >= 0 ? linkRefs.current[activeIndex] : null
      setMarker(link?.offsetParent ? { left: link.offsetLeft, width: link.offsetWidth } : null)

      const lastLink = linkRefs.current[navItems.length - 1]
      const contact = contactRef.current
      if (!header || !lastLink?.offsetParent || !contact) {
        setTraceBounds(null)
        return
      }
      const headerBox = header.getBoundingClientRect()
      setTraceBounds({
        width: headerBox.width,
        from: lastLink.getBoundingClientRect().right - headerBox.left,
        to: contact.getBoundingClientRect().left - headerBox.left,
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (headerRef.current) observer.observe(headerRef.current)
    if (navRef.current) observer.observe(navRef.current)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [activeIndex])

  useEffect(() => {
    if (!marker || animate) return
    const frame = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(frame)
  }, [marker, animate])

  useEffect(() => {
    if (!contactOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!contactRef.current?.contains(event.target as Node)) {
        setContactOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [contactOpen])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-page sm:border-b-0"
      >
        <div className="flex w-full items-center px-6 py-3 sm:px-8 sm:pb-6 sm:pt-2.5">
          <div className="flex h-9 min-w-0 items-center gap-8 sm:gap-9">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="origin-left shrink-0 font-mono text-[15px] font-semibold text-ink transition-all duration-1000 ease-in-out hover:-translate-y-1 hover:scale-125 hover:text-primary"
            >
              &lt;daniel-zhu-04/&gt;
            </button>

            <nav
              ref={navRef}
              className="relative hidden items-center gap-5 sm:flex"
              aria-label="Main navigation"
            >
              {marker && (
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-9 rounded-[10px] border-[1.5px] border-ink bg-surface ${
                    animate ? 'transition-[transform,width] duration-[420ms] ease-in-out motion-reduce:transition-none' : ''
                  }`}
                  style={{ width: marker.width, transform: `translateX(${marker.left}px)` }}
                />
              )}
              {navItems.map(({ label, to, Icon }, i) => (
                <NavLink
                  key={to}
                  ref={(el) => {
                    linkRefs.current[i] = el
                  }}
                  to={to}
                  end={to === '/'}
                  className={linkClass}
                >
                  {({ isActive }) => (
                    <>
                      <span className="inline-flex w-[1.125rem] shrink-0 items-center justify-center" aria-hidden={!isActive}>
                        <span className={isActive ? 'opacity-100' : 'opacity-0'}>
                          <Icon />
                        </span>
                      </span>
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative" ref={contactRef}>
              <button
                type="button"
                className="text-[15px] text-ink transition hover:text-primary"
                aria-expanded={contactOpen}
                aria-haspopup="menu"
                onClick={() => setContactOpen((current) => !current)}
              >
                Contact me <span aria-hidden="true">{contactOpen ? '▲' : '▼'}</span>
              </button>
              {contactOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 min-w-[10.5rem] rounded-xl border border-line bg-surface py-1.5"
                >
                  {contacts.map(({ label, href }) => (
                    <a
                      key={label}
                      role="menuitem"
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="block px-4 py-2 text-[15px] text-ink/80 transition hover:bg-panel hover:text-primary"
                      onClick={() => setContactOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="rounded-full border border-ink px-3 py-1.5 text-sm sm:hidden"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        <SpikeTrace bounds={traceBounds} />

        {menuOpen && (
          <div className="border-t border-line px-4 py-4 sm:hidden">
            <div className="flex flex-col gap-4 text-[15px]">
              {navItems.map(({ label, to, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span className="inline-flex w-[1.125rem] shrink-0 items-center justify-center" aria-hidden={!isActive}>
                        <span className={isActive ? 'opacity-100' : 'opacity-0'}>
                          <Icon />
                        </span>
                      </span>
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
      <div className="h-[61px] sm:h-[70px]" aria-hidden="true" />
    </>
  )
}

export default Header
