import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7EXcr6qY-iD-tTtQGn2LRgicDVpfsEtg",
  authDomain: "ccm-library.firebaseapp.com",
  projectId: "ccm-library",
  storageBucket: "ccm-library.appspot.com",
  messagingSenderId: "145164285009",
  appId: "1:145164285009:web:97fe337e53da3b5c72b470",
  measurementId: "G-EJ2ZSD7G7B",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };
