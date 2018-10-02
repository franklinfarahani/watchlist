import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from './config/keys'

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const listRef = databaseRef.child('lists');
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();