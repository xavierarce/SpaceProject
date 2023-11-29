const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLauch,
} = require("./launches.controller");
const { httpAbortLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLauch);
launchesRouter.delete("/:id",httpAbortLaunch);

module.exports = launchesRouter;
