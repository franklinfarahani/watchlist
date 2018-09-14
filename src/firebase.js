import firebase from 'firebase';
import {firebaseConfig} from './utils/config'

firebase.initializeApp(firebaseConfig);
const database = firebase.database()
export default database;