// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaD9Q7uaZZoBADf13MMoDUTwghgyd_uQQ",
  authDomain: "adaprq.firebaseapp.com",
  projectId: "adaprq",
  storageBucket: "adaprq.appspot.com",
  messagingSenderId: "36210659537",
  appId: "1:36210659537:web:22e4711241f234ebb3b5f0",
  measurementId: "G-FG1DT0GZYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const rtdb = getDatabase(app)
const db = getFirestore(app)

export { auth, db, rtdb };