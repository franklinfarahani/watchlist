import { listRef, authRef, provider } from '../firebase';
import {tmdb} from '../utils/config';
import { SEARCH_TITLES, FETCH_LIST, AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from '../actions/types';

// let nextPosition = 0;

export const searchTitles = (query) => dispatch => {
  fetch(`${tmdb.url}/search/multi?api_key=${tmdb.key}&query=${query}`)
    .then(response => {
      dispatch({
        type: SEARCH_TITLES,
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