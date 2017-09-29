function getArtistEvents(artist) {
  return fetch(`https://rest.bandsintown.com/artists/${artist}/events?app_id=test`)
    .then(res => res.json())
}

export { getArtistEvents }