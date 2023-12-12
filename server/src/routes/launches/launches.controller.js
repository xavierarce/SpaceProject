const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLauch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing Required Launch Property",
    });
  }

  launch.launchDate = new Date(launch.launchDate); // Transform string into date object
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  //id launch doest exist 404
  if (!existsLaunchWithId(launchId))
    return res.status(400).json({
      error: "Launch Doesnt Exist",
    });

  //If exists, delete launch
  const aborted = abortLaunchById(launchId);
  return res.status(202).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLauch,
  httpAbortLaunch,
};
