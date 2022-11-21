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
  databaseURL: "https://bad-bank-e401f-default-rtdb.firebaseio.com",
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

// Server Authentication
export function authenticateRoute() {
  // Call server with token
  if (auth.currentUser) {
    auth.currentUser
      .getIdToken()
      .then((idToken) => {
        console.log(`idToken: ${idToken}`);

        (async () => {
          const response = await fetch("/authenticate", {
            method: "GET",
            headers: {
              Authorization: idToken,
            },
          });
          const text = await response.text();
          console.log(`Server response: ${text}`);
          console.log(response);
        })();
      })
      .catch((error) => console.log(`Error: ${error}`));
  } else {
    console.warn(
      "There is currently no user signed in. Unable to authenticate route."
    );
  }
}

export function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      authenticateRoute();
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
