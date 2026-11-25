export function toPublicPlaylist(playlist) {
  return {
    id: playlist._id,
    name: playlist.name,
    description: playlist.description,
    color: playlist.color,
    trackIds: playlist.trackIds,
    createdAt: playlist.createdAt,
  }
}