import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID

//These are hardcoded in. can change environmental variables in .env.local to correspond to these
    apiKey: "AIzaSyAGy-z_BdCUQqOKPMVuA7sCeBBaQg_r_zE",
    authDomain: "afterschool-development.firebaseapp.com",
    projectId: "afterschool-development",
    storageBucket: "afterschool-development.appspot.com",
    messagingSenderId: "42429888378",
    appId: "1:42429888378:web:90d2325ee91e15adab48c3",
    measurementId: "G-G1DHQW9NRJ"
})

export const auth = app.auth()
export default app

export const storage = app.storage();
export const firestore = app.firestore();

//this is better way to send data to user
export const database = {
    classes: firestore.collection('classes'),
    sessions: firestore.collection("sessions"),
    users: firestore.collection("users"),
    files: firestore.collection('files'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

