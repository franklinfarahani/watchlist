"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const tmdbApiKey = functions.config().tmdbapi.key;
app.get("/movies", (req, resp) => {
    let movieId = req.query.id;
    fetch("https://api.themoviedb.org/3/movie/" +
        movieId +
        "?api_key=" +
        tmdbApiKey)
        .then(res => res.json())
        .then(json => {
        resp.send(json);
    })
        .catch(err => {
        console.error(err);
        resp.send(202);
    });
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map