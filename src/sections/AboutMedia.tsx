import { currentlyWatching, favorites, type MediaItem } from '../data/about'

const favoriteShelves: { key: keyof typeof favorites; title: string }[] = [
  { key: 'books', title: 'Books' },
  { key: 'movies', title: 'Movies' },
  { key: 'shows', title: 'TV' },
]

const AboutMedia = () => {
  return (
    <section className="reveal-up reveal-delay-3 pb-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Media I&apos;m consuming
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        What I&apos;m in the middle of, and a few things I keep going back to.
      </p>

      <div className="bookshelf mt-10 rounded-card px-4 pb-6 pt-8 sm:px-8">
        <Shelf title="Currently watching" items={currentlyWatching} />

        <div className="shelf-divider" role="separator" />

        <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.32em] text-page/80">Favorites</p>
        {favoriteShelves.map((shelf) => (
          <Shelf key={shelf.key} title={shelf.title} items={favorites[shelf.key]} nested />
        ))}
      </div>
    </section>
  )
}

const Shelf = ({
  title,
  items,
  nested = false,
}: {
  title: string
  items: MediaItem[]
  nested?: boolean
}) => {
  return (
    <div className={nested ? 'mb-8 last:mb-0' : 'mb-8'}>
      <p
        className={`mb-4 font-mono text-[11px] uppercase tracking-[0.32em] ${
          nested ? 'text-page/55' : 'text-page/80'
        }`}
      >
        {title}
      </p>
      {items.length > 0 ? (
        <div className="flex items-end gap-8 overflow-x-auto px-1 pt-7 sm:gap-12">
          {items.map((item) => (
            <Cover key={item.title} item={item} />
          ))}
        </div>
      ) : (
        <div className="h-[var(--cover-h)]" aria-hidden="true" />
      )}
      <div className="shelf-plank mt-3" />
    </div>
  )
}

const Cover = ({ item }: { item: MediaItem }) => (
  <figure className="group w-[var(--cover-w)] shrink-0" title={item.creator ? `${item.title} — ${item.creator}` : item.title}>
    {item.cover ? (
      <img src={item.cover} alt={item.title} className="shelf-cover" />
    ) : (
      <div className="shelf-cover flex items-end bg-secondary/80 px-2 py-3 text-[11px] font-semibold leading-4 text-surface">
        {item.title}
      </div>
    )}
    <figcaption className="mt-4 line-clamp-2 h-8 text-center text-[11px] leading-4 tracking-wide text-page/80">
      {item.title}
    </figcaption>
  </figure>
)

export default AboutMedia
