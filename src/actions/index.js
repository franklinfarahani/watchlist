import { listRef, authRef, provider } from '../firebase';
import {tmdb, omdb} from '../config/keys';
import { SEARCH_TITLES, GET_IMDB_ID, GET_TITLE, FETCH_LIST, AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../actions/types';

// let nextPosition = 0;

export const searchTitles = (query) => dispatch => {
  fetch(`${tmdb.url}/search/multi?api_key=${tmdb.key}&query=${query}`)
    .then(response => response.json())
    .then(result => {
      dispatch({
        type: SEARCH_TITLES,
        payload: result
      });
    })
    .catch(error => {
      dispatch({
        type: SEARCH_TITLES,
        error
      });
    });
}


export function getImdbId(tmdbId){
  return function(dispatch) {
  fetch(`${tmdb.url}/movie/${tmdbId}/external_ids?api_key=${tmdb.key}`)
    .then(response => response.json())
    .then(result => {
      dispatch({
        type: GET_IMDB_ID,
        payload: result.imdb_id
      });
    })
    .catch(error => {
      dispatch({
        type: GET_IMDB_ID,
        error
      });
    });
  }
}

export const getTitle = (imdbId) => dispatch => {
  fetch(`${omdb.url}/?apikey=${omdb.key}&i=${imdbId}`)
    .then(response => {
      dispatch({
        type: GET_TITLE,
        payload: response.json()
      });
    });
}

export const addToList = (newItem, uid) => async dispatch => {
  listRef
    .child(uid)
    .child(newItem.id)
    .update(newItem);
};

export const changeItemStatus = (existingItemId, uid) => async dispatch => {
  listRef
    .child(uid)
    .child(existingItemId)
    .update({ watched: true });
};

export const removeFromList = (removeItemId, uid) => async dispatch => {
  listRef
    .child(uid)
    .child(removeItemId)
    .remove();
};

export const fetchList = uid => async dispatch => {
  listRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_LIST,
      payload: snapshot.val()
    });
  });
};

export const verifyAuth = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch(authUser(user));
    } else {
      dispatch(signOut());
    }
  });
};

export function authUser(user) {
  return {
      type: AUTH_USER,
      payload: user
  }
}

export function authError(error) {
  return {
      type: AUTH_ERROR,
      payload: error
  }
}

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(response => {
      dispatch(authUser());
    })
    .catch(error => {
        dispatch(authError(error));
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() =>{
      dispatch({
          type: SIGN_OUT_USER
      })
    });
};