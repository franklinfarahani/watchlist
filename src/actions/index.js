import { listRef, authRef, provider, authFetch } from '../firebase';
import {tmdb, omdb} from '../config/keys';
import { 
  SEARCH_TITLES_REQUEST,
  SEARCH_TITLES_SUCCESS,
  SEARCH_TITLES_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  CLEAR_RESULTS,
  GET_IMDB_ID,
  GET_TITLE,
  FETCH_LIST,
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT_USER
} from '../actions/types';

const baseURL = process.env.REACT_APP_BASE_URL;
// let nextPosition = 0;

export const searchTitles = (query) => async dispatch => {
  dispatch({ type: SEARCH_TITLES_REQUEST})
  try {
    let response = await fetch(`${baseURL}/api/search?query=${query}`)
    let results = await response.json();    
    dispatch({
      type: SEARCH_TITLES_SUCCESS,
      payload: results.items
    });
  }
  catch(error) {
    dispatch({
      type: SEARCH_TITLES_FAIL,
      error
    });
  };
}

export const clearResults = () => {
  return {
    type: CLEAR_RESULTS
  }
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

export const addToList = (newItem) => async dispatch => {
  dispatch({ type: ADD_ITEM_REQUEST})
  try {
    let response = await authFetch('POST', `${baseURL}/api/list`, newItem)
    let result = await response.json();        
    dispatch({
      type: ADD_ITEM_SUCCESS,
      status: result
    });
  }
  catch(error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      error
    });
  };
}

export const removeFromList = (removeItem) => async dispatch => {
  dispatch({ type: REMOVE_ITEM_REQUEST})
  try {
    let response = await authFetch('DELETE', `${baseURL}/api/list`, removeItem)
    let result = await response.json();        
    dispatch({
      type: REMOVE_ITEM_SUCCESS,
      status: result
    });
  }
  catch(error) {
    dispatch({
      type: REMOVE_ITEM_FAIL,
      error
    });
  };
}

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