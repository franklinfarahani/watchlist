import * as firebase from 'firebase';
import {firebaseConfig} from './utils/config'

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const listRef = databaseRef.child('lists');
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();