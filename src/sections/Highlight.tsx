import projectTwo from '../assets/projects/project2.png'

const Highlight = () => {
  return (
    <section id="projects" className="mx-auto max-w-page px-6 pb-24 lg:px-8 reveal-up reveal-delay-2">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-card bg-[#f3eef6]">
          <img
            src={projectTwo}
            alt="Multimodal diffusion models for protein generation"
            className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[380px]"
          />
        </div>

        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Protein design with diffusion models
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            A zero-shot, text-guided protein design pipeline using ProteinGenerator and ProtCLAP.
            It reached 97%+ structural confidence and mapped functional states of the Abl1 kinase
            domain.
          </p>
          <a
            href="https://github.com/danielzhu04/cs2840-final"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            View project
          </a>
        </div>
      </div>
    </section>
  )
}

export default Highlight
