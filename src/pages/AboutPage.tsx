import AboutIntro from '../sections/AboutIntro'
import AboutCollage from '../sections/AboutCollage'
import AboutSongs from '../sections/AboutSongs'
import AboutMedia from '../sections/AboutMedia'
import AboutFunFacts from '../sections/AboutFunFacts'

const AboutPage = () => (
  <main className="relative z-0 mx-auto max-w-page px-6 pt-16 lg:px-8">
    <h1 className="sr-only">About</h1>
    <AboutIntro />
    <AboutCollage />
    <AboutSongs />
    <AboutMedia />
    <AboutFunFacts />
  </main>
)

export default AboutPage
