import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDyJts06vNNBDnjJaLxTJftPT4c58Zs9Yw",
  authDomain: "prqm-ada.firebaseapp.com",
  databaseURL: "https://prqm-ada-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prqm-ada",
  storageBucket: "prqm-ada.appspot.com",
  messagingSenderId: "235247521680",
  appId: "1:235247521680:web:3c8ab6eebae7a8a99aad15",
  measurementId: "G-Y8N6HQ6YYG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const rtdb = getDatabase(app)

export { auth, rtdb, ref, set, push };