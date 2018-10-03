"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const fetch = require("node-fetch");
const compression = require("compression");
admin.initializeApp(functions.config().firebase);
const databaseRef = admin.database().ref();
const listRef = databaseRef.child('lists');
const app = express();
app.use(compression());
/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
|
| Description
|
*/
const authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = yield admin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
        return;
    }
    catch (e) {
        res.status(403).send('Unauthorized');
        return;
    }
});
app.use("/list", authenticate);
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Description
|
*/
app.get("/media", (req, resp) => {
    let mediaId = req.query.id;
    let mediaType = req.query.type;
    fetch(`https://apis.justwatch.com/content/titles/${mediaType}/${mediaId}/locale/en_CA`)
        .then(res => res.json())
        .then(json => {
        const item = {
            id: json.id,
            media_type: mediaType,
            title: json.title,
            poster: json.poster.split("{")[0],
            year: json.original_release_year,
            release_date: json.localized_release_date,
            genres: json.genre_ids,
            synopsis: json.short_description,
            ratings: json.scoring,
            viewing_options: json.offers
        };
        mediaType === 'movie' ? item.runtime = json.runtime : null;
        resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        resp.status(200).send(item);
    })
        .catch(err => {
        console.error(err);
        resp.send(202);
    });
});
app.get("/list", (req, resp) => {
    listRef.child(req.user.uid).once("value", snapshot => resp.status(200).send(snapshot.val()));
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map