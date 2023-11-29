const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

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
    return res.status(404).json({
      error: "Missing Required Launch Property",
    });
  }

  launch.launchDate = new Date(launch.launchDate); // Transform string into date object
  if (isNaN(launch.launchDate)){
    return res.status(404).json({
      error: 'Invalid Launch Date'
    })
  }  
  
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLauch,
};
