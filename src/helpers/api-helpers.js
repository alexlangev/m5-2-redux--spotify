export function fetchArtistProfile(accessToken, artistId) {
  const options = {
    headers: {Authorization: `Bearer ${accessToken}`},
  };

  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  return fetch(url, options)
  .then((response) => response.json());
}
