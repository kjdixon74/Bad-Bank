import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Create express app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// May need to change port number...
const PORT = process.env.PORT || 3000;

// Use application-level middleware to add CORS HTTP header
app.use(cors());
// Use express to serve react app
app.use(express.static(path.resolve(__dirname, "../react-client/build")));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
