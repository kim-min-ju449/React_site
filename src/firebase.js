// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: ,
    projectId:,
    storageBucket: ,
    messagingSenderId:,
    appId: ,
    measurementId: process.env.REACT_MEASUREMENT_ID
  };
  firebase.initializeApp(firebaseConfig);
// export default initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
