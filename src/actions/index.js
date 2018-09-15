import { listRef, authRef, provider } from '../firebase';
import { FETCH_LIST, FETCH_USER } from '../actions/types';

// let nextPosition = 0;

export const addToList = (newItem, uid) => async dispatch => {
  listRef
    .child(uid)
    .push()
    .set(newItem);
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

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};