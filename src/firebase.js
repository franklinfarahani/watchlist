import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from './config/keys'

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const listRef = databaseRef.child('lists');
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export function authFetch(url, method, data) {
  if (!authRef.currentUser) {
    throw new Error('Not authenticated. Make sure you\'re signed in!');
  }
  // Get the Firebase auth token to authenticate the request
  return authRef.currentUser.getIdToken(true).then(token => {
    let request = {
      method: method ? method : 'GET',
      headers: {
        "Authorization": "Bearer " + token
      } 
    }

    if (method === 'POST' || method === 'DELETE') {
      request.headers["Content-Type"] = "application/json";
      request.body = JSON.stringify(data);
    }

    return fetch(url, request)
  });
};