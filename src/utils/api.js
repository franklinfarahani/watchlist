import { tmdb, omdb } from '../config/keys';

// Returns promise that contains data
function get(url, endpoint) {
  return fetch(`${url}${endpoint}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    });
}

export const search = (query) => get(tmdb.url,`/search/multi?api_key=${tmdb.key}&query=${query}`);

export const getImdbId = (tmdbId) => get(tmdb.url,`/movie/${tmdbId}/external_ids?api_key=${tmdb.key}`).then(res => res.imdb_id);

export const getTitle = (imdbId) => get(omdb.url,`/?apikey=${omdb.key}&i=${imdbId}`)

// export function getImdbId(tmdbId){
//   get(tmdb.url,`/movie/${tmdbId}/external_ids?api_key=${tmdb.key}`)
//   .then(
//     function(res) {
//       console.log(res.imdb_id)
//       return res.imdb_id;
//     }
//   )
// }