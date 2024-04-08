import firebase from 'firebase/compat/app';;
import { getDatabase } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCy41R1moePQHlqXETiOHW1N8KM2QarVUA",
    authDomain: "melon-db-5c6e7.firebaseapp.com",
    projectId: "melon-db-5c6e7",
    storageBucket: "melon-db-5c6e7.appspot.com",
    messagingSenderId: "345869661755",
    appId: "1:345869661755:web:359f8d9574fe39f60d8e1e",
    measurementId: "G-K9P85004DG",
    databaseURL: 'https://melon-db-5c6e7-default-rtdb.asia-southeast1.firebasedatabase.app',
}

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase()

export { db, auth, firebase, firebaseConfig }