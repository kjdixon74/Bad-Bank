import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {
  createUser,
  readAllUsers,
  readUser,
  loginUser,
  logoutUser,
  updateBalance,
  deleteAllUsers,
} from "./mongoDB/dal.js";
import admin from "./admin.js";

// Create express app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// May need to change port number...
const PORT = process.env.PORT || 8000;

// Use application-level middleware to add CORS HTTP header
app.use(cors());
// Use express to serve react app
app.use(express.static(path.resolve(__dirname, "../react-client/build")));

// Create user
app.get(
  "/user/create/:name/:email/:password/:role/:accountType/:accountNumber",
  function (req, res) {
    createUser(
      req.params.name,
      req.params.email,
      req.params.password,
      req.params.role,
      req.params.accountType,
      req.params.accountNumber
    ).then((user) => {
      console.log(`Create user: ${JSON.stringify(user)}`);
      res.send(user);
    });
  }
);

// Read all users
app.get("/users/readAll", function (req, res) {
  readAllUsers().then((users) => {
    console.log(`Collection of users: ${JSON.stringify(users)}`);
    res.send(users);
  });
});

// Read user
app.get("/user/read/:email", function (req, res) {
  readUser(req.params.email).then((user) => {
    console.log(`User: ${JSON.stringify(user)}`);
    res.send(user);
  });
});

// Login user
app.get("/user/login/:email", function (req, res) {
  loginUser(req.params.email).then((user) => {
    console.log(`Login user: ${JSON.stringify(user)}`);
    res.send(user);
  });
});

// Logout user
app.get("/user/logout/:email", function (req, res) {
  logoutUser(req.params.email).then((user) => {
    console.log(`Logout user: ${JSON.stringify(user)}`);
    res.send(user);
  });
});

// Update user balance
app.get("/user/balance/:email/:balance", function (req, res) {
  updateBalance(req.params.email, req.params.balance).then((user) => {
    console.log(`User balance: ${JSON.stringify(user)}`);
    res.send(user);
  });
});

// Delete all users
app.get("/users/deleteAll", function (req, res) {
  deleteAllUsers().then((users) => {
    console.log(`Delete ${users.deletedCount} users`);
    res.send(users);
  });
});

// Authenticate Express server routes
app.get("/authenticate", function (req, res) {
  // Read token from request's header
  const idToken = req.headers.authorization;
  console.log(`Request header idToken: ${idToken}`);

  // Verify token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      console.log(`Decoded token: ${JSON.stringify(decodedToken)}`);
      res.send("Authentication successful");
    })
    .catch(function (error) {
      console.log(`Error: ${error}`);
      res.send("Authentication failed");
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// Video refactor - create Node.js server, add Express web application framework to Node.js
// Used RESTful API
