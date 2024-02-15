const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");

const express = require("express");

const api = express.Router();

api.use("/planets", planetsRouter); // goes to express routes
api.use("/launches", launchesRouter);

module.exports = api;
