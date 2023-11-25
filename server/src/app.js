const express = require("express");
const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");

const app = express(); //Request comes to express

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); //Checks for json content type if data
app.use(planetsRouter); // goes to express routes

module.exports = app;
