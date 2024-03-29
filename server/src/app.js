const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express(); //Request comes to express

app.use(cors({ origin: "http://localhost:3000" }));

app.use(morgan("combined")); //Logging

app.use(express.json()); //Checks and extract for json content type in data
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/v1',api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
