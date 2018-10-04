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
    res.status(403).send('Unauthorized');
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
    res.status(403).send('Unauthorized');
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
      poster: json.poster.split("{")[0],
      year: json.original_release_year,
      release_date: json.localized_release_date,
      genres: json.genre_ids,
      synopsis: json.short_description,
      ratings: json.scoring,
      viewing_options: json.offers
    };
    type === 'movie' ? item.runtime = json.runtime : null;
    return {item, error: null};
  }
  catch(err) {
    return {item: null, error: err};
  }
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

app.get("/search", async (req, resp) => {
  let query = req.query.query;
  try {
    const res = await fetch(`https://apis.justwatch.com/content/titles/en_CA/popular?body={"content_types":["show","movie"],"page":1,"page_size":8,"query":"${query}"}`);
    const json = await res.json();
    
    const searchResults = {
      page: json.page,
      page_size: json.page_size,
      total_pages: json.total_pages,
      total_results: json.total_results,
      items: []
    }
    json.items.map(item => searchResults.items.push(
      {
        id: item.id,
        media_type: item.object_type,
        title: item.title,
        poster: item.poster.split("{")[0],
        year: item.original_release_year,
        release_date: item.localized_release_date,
        genres: item.genre_ids,
        synopsis: item.short_description,
        ratings: item.scoring
      })
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
  let mediaId = req.params.id;
  let mediaType = req.params.type;
  const result = await getTitle(mediaId, mediaType);
  if (!result.error){
    resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    resp.status(200).send(result.item);
  } else {
    console.error(result.error);
    // 400: Bad Request
    resp.sendStatus(400);  
  }   
});

app.get("/list", async (req: AuthRequest, resp) => {
  let listObj = {};
  let watchlist = [];
  try {
    // Fetch given user's list from firebase database and assign it to listObj for operations
    await listRef.child(req.user.id)
    // await listRef.child('testuser') //Uncomment to test without user authentication
      .once("value", snapshot => listObj = snapshot.val());
    
    // convert json object of media objects to array of objects
    const list = Object.keys(listObj).map(index => listObj[index])
    
    // Make sure each getTitle promise is resolved and add them to new watchlist array that gets sent back
    await Promise.all(
      list.map(async item => {
        const currentItem = await getTitle(item.id, item.media_type);
        watchlist.push(currentItem.item);
      })
    )

    resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    resp.status(200).send(watchlist);
      
  }
  catch(err) {
    console.error(err);
    // 500: internal server error
    resp.sendStatus(500);
  }
});

app.post("/list", async (req: AuthRequest, resp) => {
  const itemToAdd = req.body.item;
  try {
    await listRef.child(req.user.id)
      .child(itemToAdd.id)
      .update(itemToAdd)
    
    resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    // 200 : OK
    resp.sendStatus(200);      
  }
  catch(err) {
    console.error(err);
    // 400: Bad request
    resp.sendStatus(400);
  }
});

export const api = functions.https.onRequest(app);