"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const fetch = require("node-fetch");
admin.initializeApp(functions.config().firebase);
const databaseRef = admin.database().ref();
const wldbRef = databaseRef.child('wldb');
const app = express();
const tmdbApiKey = functions.config().tmdbapi.key;
app.get("/media", (req, resp) => {
    let mediaId = req.query.id;
    let mediaType = req.query.type;
    wldbRef.child(mediaId).once("value", snapshot => {
        if (snapshot.exists()) {
            resp.send(snapshot.val());
        }
        else {
            fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${tmdbApiKey}&append_to_response=external_ids`)
                .then(res => res.json())
                .then(json => {
                const item = {
                    id: json.id,
                    imdb_id: json.external_ids.imdb_id,
                    media_type: mediaType,
                    title: mediaType === 'movie' ? json.title : json.name,
                    poster: json.poster_path,
                    year: mediaType === 'movie' ? json.release_date : json.first_air_date,
                    runtime: mediaType === 'movie' ? json.runtime : json.episode_run_time[0],
                    genres: json.genres,
                    synopsis: json.overview
                };
                wldbRef.child(mediaId).update(item);
                resp.send(item);
            })
                .catch(err => {
                console.error(err);
                resp.send(202);
            });
        }
    });
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map