import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:27017";
// Connect to Mongo
const client = new MongoClient(url);

let db = null;
let collection = null;

// Use connect method to connect to the server
client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB server!");

    // Connect to bad-bank database
    db = client.db("bad-bank");

    // Create collection of users
    collection = db.collection("users");
  })
  .catch((error) => console.log(error));

// Create user
export function createUser(name, email, password, accountType, accountNumber) {
  return new Promise((resolve, reject) => {
    // New user
    const user = {
      name,
      email,
      password,
      accountType,
      accountNumber,
      balance: 0,
    };

    collection
      .insertOne(user)
      .then(() => resolve(user))
      .catch((error) => reject(error));
  });
}

// Read all users
export function readAllUsers() {
  return new Promise((resolve, reject) => {
    collection
      .find({})
      .toArray()
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}

// Delete all users
export function deleteAllUsers() {
  return new Promise((resolve, reject) => {
    collection
      .deleteMany({})
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}

// Create MongoDB, run in Docker container, connect Express app
// Lesson learned - cannot call the createUser function in dal.js due to asynchronous operations - was receiving an error saying db was null because was trying to create a collection of users before connecting to the bad-bank database
// Lesson learned - was resolving createUser promise with the return value of the db.collection.insertOne method, {acknowledged, insertedId}, which was then getting sent back as the response of the UI create user account route when invoked in the browser
