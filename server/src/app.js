const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express(); //Request comes to express

app.use(cors({ origin: "http://localhost:3000" }));

app.use(morgan("combined")); //Logging

app.use(express.json()); //Checks for json content type if data
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/planets',planetsRouter); // goes to express routes
app.use('/launches',launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
