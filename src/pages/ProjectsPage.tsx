import Featured from '../sections/Featured'
import Highlight from '../sections/Highlight'

const ProjectsPage = () => (
  <main className="relative z-0 mx-auto max-w-page px-6 pt-16 lg:px-8">
    <h1 className="mb-12 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl reveal-up">Projects</h1>
    <Featured />
    <Highlight />
  </main>
)

export default ProjectsPage
