export function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    likedTrackIds: user.likedTrackIds,
  }
}