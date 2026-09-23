import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  tone: number
  drift: number
}

type Ripple = {
  x: number
  y: number
  born: number
}

const MAX_PARTICLES = 88
const RIPPLE_MS = 1400

const HeroField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    if (!canvas || !section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const particles: Particle[] = []
    const ripples: Ripple[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let last = performance.now()

    const seed = () => {
      const count = Math.min(MAX_PARTICLES, Math.max(42, Math.round((width * height) / 16000)))
      particles.length = 0
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 1.1 + Math.random() * 1.7,
          tone: Math.random(),
          drift: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const bounds = section.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const pulse = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect()
      ripples.push({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        born: performance.now(),
      })
    }

    const draw = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      ctx.clearRect(0, 0, width, height)

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        if (now - ripples[i].born > RIPPLE_MS) ripples.splice(i, 1)
      }

      for (const ripple of ripples) {
        const age = (now - ripple.born) / RIPPLE_MS
        const radius = 40 + age * 220
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.16 * (1 - age)})`
        ctx.lineWidth = 1.25
        ctx.stroke()
      }

      for (const particle of particles) {
        particle.drift += dt * 0.0008
        particle.vx += Math.cos(particle.drift) * 0.002
        particle.vy += Math.sin(particle.drift * 0.85) * 0.002

        for (const ripple of ripples) {
          const age = (now - ripple.born) / RIPPLE_MS
          const radius = 40 + age * 220
          const dx = particle.x - ripple.x
          const dy = particle.y - ripple.y
          const dist = Math.hypot(dx, dy) || 0.001
          const band = Math.abs(dist - radius)
          if (band < 46) {
            const force = ((46 - band) / 46) * 0.085 * (1 - age)
            particle.vx += (dx / dist) * force
            particle.vy += (dy / dist) * force
          }
        }

        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.x += particle.vx * dt
        particle.y += particle.vy * dt

        if (particle.x < -8) particle.x = width + 8
        if (particle.x > width + 8) particle.x = -8
        if (particle.y < -8) particle.y = height + 8
        if (particle.y > height + 8) particle.y = -8

        const ink = 0.1 + particle.tone * 0.06
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.tone > 0.62
            ? `rgba(37, 99, 235, ${0.14 + particle.tone * 0.04})`
            : `rgba(17, 17, 17, ${ink})`
        ctx.fill()
      }

      frame = window.requestAnimationFrame(draw)
    }

    resize()
    frame = window.requestAnimationFrame(draw)
    const observer = new ResizeObserver(resize)
    observer.observe(section)
    section.addEventListener('pointerdown', pulse)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      section.removeEventListener('pointerdown', pulse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

export default HeroField
