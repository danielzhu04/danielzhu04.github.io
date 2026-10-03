import { spotifyPlaylistId, spotifyPlaylists } from '../data/about'

const AboutSongs = () => {
  return (
    <section className="reveal-up reveal-delay-2 pb-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">My top songs</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        Playlists I keep on rotation. Once they&apos;re public, they&apos;ll play right here.
      </p>

      {spotifyPlaylists.length > 0 ? (
        <div
          className={`mt-10 grid gap-6 ${spotifyPlaylists.length > 1 ? 'lg:grid-cols-2' : ''}`}
        >
          {spotifyPlaylists.map((playlist) => {
            const id = spotifyPlaylistId(playlist.id)
            return (
              <iframe
                key={id}
                title={playlist.label ? `Spotify playlist: ${playlist.label}` : 'Spotify playlist'}
                src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
                className="h-[352px] w-full rounded-xl border-0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            )
          })}
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-card border border-line bg-surface">
          <div className="flex items-center gap-4 border-b border-line px-5 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-white">
              <NoteMark />
            </div>
            <div>
              <p className="font-semibold text-ink">Playlists coming soon</p>
              <p className="text-sm text-muted">A public playlist will play right here.</p>
            </div>
          </div>
          <ul className="divide-y divide-line">
            {['Track one', 'Track two', 'Track three', 'Track four'].map((label, i) => (
              <li key={label} className="flex items-center gap-4 px-5 py-3.5 text-sm text-muted">
                <span className="w-4 font-mono text-xs">{i + 1}</span>
                <span className="h-2 flex-1 rounded-full bg-panel" />
                <span className="hidden sm:inline">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

const NoteMark = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
    <path d="M9 18.5a2.5 2.5 0 1 1-2.45-2.5H7V7.8l10-2.3v8.5a2.5 2.5 0 1 1-2.45-2.5H15V8.2L9 9.5v9z" />
  </svg>
)

export default AboutSongs
