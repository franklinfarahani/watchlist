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
/*
|--------------------------------------------------------------------------
| Initializations
|--------------------------------------------------------------------------
|
| includes:
|
|   * Firebase Admin
|   * Express
|   * Return objects' templates
|
*/
admin.initializeApp(functions.config().firebase);
const databaseRef = admin.database().ref();
const listRef = databaseRef.child('lists');
const app = express();
/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
|
| includes:
|
|   * Authentication:
|       For routes that use it, checks to see whether the request's
|       user is authenticated.
|
|   * Compression:
|       Compresses result JSON via gzip
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
        // 403: Forbidden
        res.status(403).send('Unauthorized');
        return;
    }
});
function getTitle(id, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://apis.justwatch.com/content/titles/${type}/${id}/locale/en_CA`);
            const json = yield res.json();
            const item = {
                id: json.id,
                media_type: type,
                title: json.title,
                poster: json.poster.split("{")[0],
                year: json.original_release_year,
                release_date: json.localized_release_date,
                genres: json.genre_ids,
                synopsis: json.short_description,
                ratings: json.scoring,
                viewing_options: json.offers
            };
            type === 'movie' ? item.runtime = json.runtime : null;
            return { item, error: null };
        }
        catch (err) {
            return { item: null, error: err };
        }
    });
}
app.use(compression());
app.use("/list", authenticate);
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
|   * /search?=query
|   * /media/:type/:id
|   * /list
|   * /CHANGE
|   * /CHANGE
|
*/
app.get("/search", (req, resp) => __awaiter(this, void 0, void 0, function* () {
    let query = req.query.query;
    try {
        const res = yield fetch(`https://apis.justwatch.com/content/titles/en_CA/popular?body={"content_types":["show","movie"],"page":1,"page_size":8,"query":"${query}"}`);
        const json = yield res.json();
        const searchResults = {
            page: json.page,
            page_size: json.page_size,
            total_pages: json.total_pages,
            total_results: json.total_results,
            items: []
        };
        json.items.map(item => searchResults.items.push({
            id: item.id,
            media_type: item.object_type,
            title: item.title,
            poster: item.poster.split("{")[0],
            year: item.original_release_year,
            release_date: item.localized_release_date,
            genres: item.genre_ids,
            synopsis: item.short_description,
            ratings: item.scoring
        }));
        resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        resp.status(200).send(searchResults);
    }
    catch (err) {
        console.error(err);
        // 400: Bad Request
        resp.sendStatus(400);
    }
}));
app.get("/media/:type/:id", (req, resp) => __awaiter(this, void 0, void 0, function* () {
    let mediaId = req.params.id;
    let mediaType = req.params.type;
    const result = yield getTitle(mediaId, mediaType);
    if (!result.error) {
        resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        resp.status(200).send(result.item);
    }
    else {
        console.error(result.error);
        // 400: Bad Request
        resp.sendStatus(400);
    }
}));
app.get("/list", (req, resp) => __awaiter(this, void 0, void 0, function* () {
    let listObj = {};
    let watchlist = [];
    try {
        // Fetch given user's list from firebase database and assign it to listObj for operations
        yield listRef.child(req.user.id)
            // await listRef.child('testuser') //Uncomment to test without user authentication
            .once("value", snapshot => listObj = snapshot.val());
        // convert json object of media objects to array of objects
        const list = Object.keys(listObj).map(index => listObj[index]);
        // Make sure each getTitle promise is resolved and add them to new watchlist array that gets sent back
        yield Promise.all(list.map((item) => __awaiter(this, void 0, void 0, function* () {
            const currentItem = yield getTitle(item.id, item.media_type);
            watchlist.push(currentItem.item);
        })));
        resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        resp.status(200).send(watchlist);
    }
    catch (err) {
        console.error(err);
        // 500: internal server error
        resp.sendStatus(500);
    }
}));
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map