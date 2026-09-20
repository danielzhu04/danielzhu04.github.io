const AboutColumns = () => {
  return (
    <section id="about" className="mx-auto max-w-page px-6 pb-28 lg:px-8 reveal-up reveal-delay-1">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight text-ink">About me</h3>
          <p className="mt-5 text-base leading-7 text-muted">
            I&apos;m a senior at Brown studying Computer Science, with experience across Java,
            Python, TypeScript, and full-stack product work. Recently I&apos;ve focused on AI
            systems for science and healthcare — agentic chatbots, MCP tooling, and generative
            models for biology.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight text-ink">What I care about</h3>
          <p className="mt-5 text-base leading-7 text-muted">
            Technology will keep shaping medicine. I want the tools I build to be useful, careful,
            and easy to trust — whether that means cleaner research workflows or models that
            researchers can actually steer.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutColumns
