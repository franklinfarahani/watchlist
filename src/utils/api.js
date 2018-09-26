import { tmdb, omdb } from '../config/keys';

// Returns promise that contains data
function get(url, endpoint) {
  return fetch(`${url}${endpoint}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response)
        throw new Error(response);
      }
    });
}

export const search = (query) => get(tmdb.url,`/search/multi?api_key=${tmdb.key}&query=${query}`);

export const getImdbId = async (tmdbId, type) => {
  const response = await fetch(`${tmdb.url}/${type}/${tmdbId}/external_ids?api_key=${tmdb.key}`)
    if (response.ok) {
      const json = await response.json();
      const imdbId = await json.imdb_id;
      return imdbId;
    } else {
      throw new Error('An error occured: ' + response);
    }
}

export const getTitle = async (imdbId) => {
  const response = await fetch(`${omdb.url}/?apikey=${omdb.key}&i=${imdbId}`)
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error('An error occured: ' + response);
    }
}