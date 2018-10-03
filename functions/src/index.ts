import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as fetch from 'node-fetch';
import * as compression from 'compression';


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

app.use(compression());

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

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch(e) {
    res.status(403).send('Unauthorized');
    return;
  }
};

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

app.get("/media", (req, resp) => {
  let mediaId = req.query.id;
  let mediaType = req.query.type;
  fetch(`https://apis.justwatch.com/content/titles/${mediaType}/${mediaId}/locale/en_CA`)
    .then(res => res.json())
    .then(json => {
      interface Media {
        id: number,
        media_type: string,
        title: string,
        poster: string,
        year: number,
        release_date: string,
        genres: Array<number>,
        synopsis?: string,
        ratings?: Array<object>,
        runtime?: number,
        viewing_options?: Array<object>
      }
      const item: Media = {
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

interface IGetUserAuthInfoRequest extends express.Request {
  user: any 
}

app.get("/list", (req: IGetUserAuthInfoRequest, resp) => {
  listRef.child(req.user.uid).once("value", snapshot => resp.status(200).send(snapshot.val()));
});

export const api = functions.https.onRequest(app);