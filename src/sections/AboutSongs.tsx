import { monthlyPlaylist, spotifyPlaylistId, spotifyPlaylists, type SpotifyPlaylist } from '../data/about'

const AboutSongs = () => {
  return (
    <section className="reveal-up reveal-delay-2 pb-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">My top songs</h2>
      <p className="mt-3 text-lg leading-8 text-muted">
        I like to group my favorite songs by language. These are the languages I mainly listen to,
        but I also love exploring music from other languages (Spanish, French, Tagalog, Swahili, and
        more!).
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {spotifyPlaylists.map((playlist) => (
          <PlaylistEmbed key={spotifyPlaylistId(playlist.id)} playlist={playlist} />
        ))}
      </div>

      <div className="mt-14">
        <p className="text-lg leading-8 text-muted">
          I also create playlists for each month...
        </p>
        <div className="mt-6">
          <PlaylistEmbed playlist={monthlyPlaylist} />
        </div>
      </div>
    </section>
  )
}

const PlaylistEmbed = ({ playlist }: { playlist: SpotifyPlaylist }) => {
  const id = spotifyPlaylistId(playlist.id)
  return (
    <iframe
      title={playlist.label ? `Spotify playlist: ${playlist.label}` : 'Spotify playlist'}
      src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator`}
      className="h-[464px] w-full rounded-xl border-0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  )
}

export default AboutSongs
