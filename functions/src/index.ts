import * as functions from 'firebase-functions';
import * as express from 'express';
import * as fetch from 'node-fetch';

const app = express();
const tmdbApiKey = functions.config().tmdbapi.key;

app.get("/movies", (req, resp) => {  
  let movieId = req.query.id;
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?api_key=" +
      tmdbApiKey
  )
    .then(res => res.json())
    .then(json => {
      resp.send(json);
    })
    .catch(err => {
      console.error(err);
      resp.send(202);
    });
});

export const api = functions.https.onRequest(app);