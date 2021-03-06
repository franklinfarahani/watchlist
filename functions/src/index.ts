import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as fetch from 'node-fetch';
import * as compression from 'compression';
import * as cors from 'cors';

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

const corsHandler = cors({origin: true});

const app = express();

interface Media {
  id: number,
  media_type: string,
  title: string,
  slug: string,
  poster: string,
  year: number,
  release_date: string,
  genres: Array<number>,
  synopsis?: string,
  ratings?: Array<object>,
  runtime?: number,
  age_rating?: string,
  seasons?: number,
  viewing_options?: Array<object>,
  clips?: Array<object>
}

interface AuthRequest extends express.Request {
  user: any 
}

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
    res.status(403).send('Token Missing or formatted incorrectly');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    
    next();
    return;
  } 
  catch(e) {
    // 403: Forbidden
    res.status(403).send('Unauthorized: ' + e);
    return;
  }
};

async function getTitle(id: number, type: "movie" | "show") {
  try {
    const res = await fetch(`https://apis.justwatch.com/content/titles/${type}/${id}/locale/en_CA`);
    const json = await res.json();
    const item: Media = {
      id: json.id,
      media_type: type,
      title: json.title,
      slug: json.full_path ? json.full_path.split("/")[3] : "untitled",
      poster: json.poster ? json.poster.split("{")[0] : "",
      year: json.original_release_year,
      release_date: json.localized_release_date,
      genres: json.genre_ids,
      synopsis: json.short_description,
      ratings: json.scoring,
      age_rating: json.age_certification
    };
    json.offers ? item.viewing_options = json.offers.map(option => 
      // Create array of viewing option keys
      Object.keys(option)
      // Keep only the provider_id and urls fields
        .filter(key => key === 'provider_id' || key === 'urls')
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: option[key]
          };
        }, {})
      )
      // Remove all the duplicate option objects
      .filter((value, index, self) => self.findIndex(t => t.provider_id === value.provider_id) === index) :
      null;
    type === 'movie' ?
      item.runtime = json.runtime :
      item.seasons = json.max_season_number;
    json.clips ? item.clips = json.clips.slice(0,3) : null;
    return {item, error: null};
  }
  catch(err) {
    return {item: null, error: err};
  }
}

app.use(compression());
app.use(corsHandler);
app.use("/list", authenticate);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
|   * GET     /search?=query
|   * GET     /media/:type/:id
|   * GET     /list
|   * POST    /list
|   * DELETE  /list
|
*/

app.get("/search", async (req, resp) => {
  const query = req.query.query || null;
  const mediaType = req.query.media_type || "[\"show\",\"movie\"]";
  const genre = req.query.genre || null;
  const ageRating = req.query.age_rating || null;
  const provider = req.query.provider || null;
  const releaseYearFrom = req.query.year_from || null;
  const releaseYearUntil = req.query.year_until || null;
  const minScoringValue = req.query.min_score || 0;
  const maxScoringValue = req.query.max_score || 0;
  const page = req.query.page || 1;
  const pageSize = req.query.page_size || 8;
  const url = 'https://apis.justwatch.com/content/titles/en_CA/popular?body={' +
    `"query":${query},` +
    `"content_types":${mediaType},` +
    `"genres":${genre},` +
    `"age_certifications":${ageRating},` +
    `"providers":${provider},` +
    `"release_year_from":${releaseYearFrom},` +
    `"release_year_until":${releaseYearUntil},` +
    `"scoring_filter_types":{"imdb:score":{"min_scoring_value":${minScoringValue},"max_scoring_value":${maxScoringValue}}},` +
    `"page":${page},` +
    `"page_size":${pageSize}}`

  try {
    const res = await fetch(url);
    const json = await res.json();
    
    const searchResults = {
      page: json.page,
      page_size: json.page_size,
      total_pages: json.total_pages,
      total_results: json.total_results,
      items: []
    }
    json.items.map(item => {
      searchResults.items.push(
      {
        id: item.id,
        media_type: item.object_type,
        title: item.title,
        slug: item.full_path ? item.full_path.split("/")[3] : "untitled",
        poster: item.poster ? item.poster.split("{")[0] : "",
        year: item.original_release_year,
        release_date: item.localized_release_date,
        genres: item.genre_ids,
        synopsis: item.short_description,
        ratings: item.scoring
      })}
    )
    
    resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    resp.status(200).send(searchResults);
  }
  catch(err) {
    console.error(err);
    // 400: Bad Request
    resp.sendStatus(400);  
  }
});

app.get("/media/:type/:id", async (req, resp) => {
  const mediaId = req.params.id;
  const mediaType = req.params.type;
  const result = await getTitle(mediaId, mediaType);
  if (!result.error){
    resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    resp.status(200).send(result.item);
  } else {
    console.error(result.error);
    // 400: Bad Request
    resp.status(400).send(result.error);  
  }   
});

app.get("/list", async (req: AuthRequest, resp) => {
  let listObj = {};
  let watchlist = [];
  try {
    // Fetch given user's list from firebase database and assign it to listObj for operations
    await listRef.child(req.user.uid)
    // await listRef.child('testuser') //Uncomment to test without user authentication
      .once("value", snapshot => snapshot.exists() ? listObj = snapshot.val() : listObj);
    
    // convert json object of media objects to array of objects
    const list = Object.keys(listObj).map(index => listObj[index])
    
    // Make sure each getTitle promise is resolved and add them to new watchlist array that gets sent back
    await Promise.all(
      list.map(async item => {
        const currentItem = await getTitle(item.id, item.media_type);
        watchlist.push(currentItem.item);
      })
    )

    resp.status(200).send(watchlist);
      
  }
  catch(err) {
    console.error(err);
    // 500: internal server error
    resp.sendStatus(500);
  }
});

app.post("/list", async (req: AuthRequest, resp) => {
  const itemToAdd = req.body;
  try {
    // await listRef.child('testuser')
    await listRef.child(req.user.uid)
      .child(itemToAdd.id)
      .update(itemToAdd)
    
    // 200 : OK
    resp.status(200).send('Item added successfully.');
  }
  catch(err) {
    console.error(err);
    // 400: Bad request
    resp.status(400).send(err);
  }
});

app.delete("/list", async (req: AuthRequest, resp) => {
  const itemToDelete = req.body;
  try {
    await listRef.child(req.user.uid)
      .child(itemToDelete.id)
      .remove();
    
    // 200 : OK
    resp.status(200).send('Item removed successfully.');
  }
  catch(err) {
    console.error(err);
    // 400: Bad request
    resp.status(400).send(err);
  }
});

export const api = functions.https.onRequest(app);