import {tmdb} from '../config/keys';

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
