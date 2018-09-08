import config from './config.json';

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

export const search = (query) => get(config.tmdb.url,`/search/multi?api_key=${config.tmdb.key}&query=${query}`);
