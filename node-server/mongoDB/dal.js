import { MongoClient } from "mongodb";

// Connection URL
const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bad-bank";
// Connect to Mongo
const client = new MongoClient(url, { useNewUrlParser: true });

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
export function createUser(
  name,
  email,
  password,
  role,
  accountType,
  accountNumber
) {
  return new Promise((resolve, reject) => {
    // New user
    const user = {
      name,
      email,
      password,
      role,
      accountType,
      accountNumber,
      balance: 0,
      loggedIn: false,
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

// Read user
export function readUser(email) {
  return new Promise((resolve, reject) => {
    collection
      .find({ email: email })
      .toArray()
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
}

// Login user
export function loginUser(email) {
  return new Promise((resolve, reject) => {
    collection
      .findOneAndUpdate({ email: email }, { $set: { loggedIn: true } })
      .then((result) => resolve(result.value))
      .catch((error) => reject(error));
  });
}

// Logout user
export function logoutUser(email) {
  return new Promise((resolve, reject) => {
    collection
      .findOneAndUpdate({ email: email }, { $set: { loggedIn: false } })
      .then((result) => resolve(result.value))
      .catch((error) => reject(error));
  });
}

// Update user balance
export function updateBalance(email, balance) {
  return new Promise((resolve, reject) => {
    collection
      .findOneAndUpdate({ email: email }, { $set: { balance: balance } })
      .then((result) => resolve(result.value))
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
// New features - login/logout based on email and new user property loggedIn (wanted to consolidate login/logout but issues with boolean values being passed as strings, tried converting to boolean but wasn't consistent)
// Design decisions - based around CRUD - utilize updateBalance for both deposit and withdraw because passed in amount after doing calculations on the front end, deleteAllUsers for me to delete my testing
