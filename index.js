const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

connectToMongo();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port http://localhost:${port}`);
});
