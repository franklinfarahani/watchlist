import { listRef, authRef, provider } from '../firebase';
import { FETCH_LIST, FETCH_USER } from '../actions/types';

// let nextPosition = 0;

// export const addToList = item => ({
//   type: 'ADD_TO_LIST',
//   payload : {
//     id: item.id,
//     name: item.media_type === "movie" ? item.title : item.name,
//     type: item.media_type,
//     poster: item.poster,
//     releaseDate: item.media_type === 'movie' ? item.release_date : item.first_air_date,
//     genreIds: item.genre_ids,
//     position: nextPosition++,
//     dateAdded: Date.now()
//   }  
// })

export const addToList = (newItem, uid) => async dispatch => {
  console.log(listRef)
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