import projectOne from '../assets/projects/project1.png'

const Featured = () => {
  return (
    <section className="mx-auto max-w-page px-6 pb-24 lg:px-8 reveal-up reveal-delay-1">
      <a
        href="https://chatbot.k8s.dev.maayanlab.cloud/"
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-card bg-[#f7f2f4] p-6 sm:p-10"
      >
        <img
          src={projectOne}
          alt="GENI-AI bioinformatics chatbot"
          className="mx-auto max-h-[420px] w-full object-contain"
        />
      </a>
      <p className="mt-4 text-sm text-muted">
        Featured work — GENI-AI, a bioinformatics chatbot used by 10,000+ researchers each month.
      </p>
    </section>
  )
}

export default Featured
