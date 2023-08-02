const connectToMongo = require("./db");

connectToMongo();
const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port http://localhost:${port}`);
});
