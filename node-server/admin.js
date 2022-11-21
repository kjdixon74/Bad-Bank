import admin from "firebase-admin";

import serviceAccount from "./bad-bank-firebase-adminsdk.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bad-bank-e401f-default-rtdb.firebaseio.com",
});

export default admin;

// Method #3 of authentication - Firebase authentication for back-end - Express server routes
// Challenge with authentication - importing json file; overcame with assert {type: "json"} above
