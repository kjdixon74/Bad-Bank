// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSW3aBVsOvv7wsW0xqFZvesVj1T97tIU8",
  authDomain: "bad-bank-e401f.firebaseapp.com",
  projectId: "bad-bank-e401f",
  storageBucket: "bad-bank-e401f.appspot.com",
  messagingSenderId: "218743158083",
  appId: "1:218743158083:web:8d850b63ce3abd43e22bf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Password Authentication
export function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function signOutUser() {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      // Sign-out successful
      console.log("Firebase sign-out successful");
    })
    .catch((error) => {
      // An error happened
      console.log(error);
    });
}

// Method #2 of authentication - Firebase password authentication for front-end
// Method #3 of authentication - Firebase authentication for back-end
