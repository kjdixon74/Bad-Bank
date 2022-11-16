import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createUser, readAllUsers, deleteAllUsers } from "../mongodb/dal.js";

// Create express app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// May need to change port number...
const PORT = process.env.PORT || 3001;

// Use application-level middleware to add CORS HTTP header
app.use(cors());
// Use express to serve react app
app.use(express.static(path.resolve(__dirname, "../react-client/build")));

// Create user
app.get("/user/create/:name/:email/:password", function (req, res) {
  createUser(req.params.name, req.params.email, req.params.password).then(
    (user) => {
      console.log(`Create user: ${JSON.stringify(user)}`);
      res.send(user);
    }
  );
});

// Read all users
app.get("/users/readAll", function (req, res) {
  readAllUsers().then((users) => {
    console.log(`Collection of users: ${JSON.stringify(users)}`);
    res.send(users);
  });
});

// Delete all users
app.get("/users/deleteAll", function (req, res) {
  deleteAllUsers().then((users) => {
    console.log(`Delete ${users.deletedCount} users`);
    res.send(users);
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// Video refactor - create Node.js server, add Express web application framework to Node.js
