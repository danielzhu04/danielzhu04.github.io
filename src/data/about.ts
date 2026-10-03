export type CollagePhoto = {
  src: string
  alt: string
}

export type SpotifyPlaylist = {
  /** Public playlist ID, or a full open.spotify.com playlist URL. */
  id: string
  label?: string
}

export type MediaItem = {
  title: string
  creator?: string
  cover?: string
}

export const introBlurb =
  'A few sentences about me — I still need to write this part.'

/**
 * Drop a file named portrait.jpg (or .jpeg/.png/.webp) into src/assets/about/.
 * It will show up here automatically.
 */
const portraitModules = import.meta.glob<string>(
  '../assets/about/portrait.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

export const portraitSrc = Object.values(portraitModules)[0] ?? null

/**
 * Drop photos into src/assets/about/collage/ — they appear in filename order.
 */
const collageModules = import.meta.glob<string>(
  '../assets/about/collage/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

export const collagePhotos: CollagePhoto[] = Object.entries(collageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: fileLabel(path) || 'Photo',
  }))

/** Public playlists only — Spotify's embed player is free and needs no API key. */
export const spotifyPlaylists: SpotifyPlaylist[] = [
  { id: 'https://open.spotify.com/playlist/0HeQklYl0bVxfKnzpBZHUL', label: 'Jpop' },
  { id: 'https://open.spotify.com/playlist/2nof4ajeLRXLSMO508sk3A', label: 'C' },
  { id: 'https://open.spotify.com/playlist/25OQf6MjPT9as3La6XcdB8', label: 'K' },
  { id: 'https://open.spotify.com/playlist/5krabSbinEHQX14x6tknIK', label: 'E' },
]

export const monthlyPlaylist: SpotifyPlaylist = {
  id: 'https://open.spotify.com/playlist/0YqaHCXNT3YSa2faNfieKc',
  label: "Can I embrace what's ahead — September 2026",
}

/**
 * Drop covers into src/assets/about/media/{current,books,movies,tv}/.
 * The file name, without its extension, is the caption under the cover.
 */
const mediaModules = import.meta.glob<string>(
  '../assets/about/media/*/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

function mediaFrom(folder: string): MediaItem[] {
  return Object.entries(mediaModules)
    .filter(([path]) => path.includes(`/media/${folder}/`))
    .sort(([a], [b]) => fileCaption(a).localeCompare(fileCaption(b)))
    .map(([path, src]) => ({
      title: fileCaption(path),
      cover: src,
    }))
}

export const currentlyWatching = mediaFrom('current')

export const favorites = {
  books: mediaFrom('books'),
  movies: mediaFrom('movies'),
  shows: mediaFrom('tv'),
}

/**
 * Usernames / public IDs. Leave blank until you want the cards to link out.
 * None of these require a paid API.
 */
export const profiles = {
  duolingoUsername: '',
  hevyUsername: '',
  /** Numeric athlete ID from strava.com/athletes/ID, or a full profile URL. */
  stravaAthlete: '',
  /**
   * Optional public activity IDs from Strava's Share → Embed dialog
   * (strava-embeds.com). The old "latest rides" profile widget is unreliable.
   */
  stravaActivityIds: [] as string[],
}

export function spotifyPlaylistId(idOrUrl: string) {
  return idOrUrl.match(/playlist\/([a-zA-Z0-9]+)/)?.[1] ?? idOrUrl
}

export function stravaAthleteId(idOrUrl: string) {
  return idOrUrl.match(/athletes\/(\d+)/)?.[1] ?? idOrUrl.replace(/\D/g, '')
}

function fileCaption(path: string) {
  const file = path.split('/').pop() ?? ''
  return file.replace(/\.[^.]+$/, '')
}

function fileLabel(path: string) {
  return fileCaption(path).replace(/[-_]/g, ' ')
}
