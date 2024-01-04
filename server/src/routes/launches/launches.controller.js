const {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  shceduleNewLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLauch(req, res) {
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

  await shceduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existLaunch = await existsLaunchWithId(launchId)
  //id launch doest exist 404
  if (!existLaunch)
    return res.status(400).json({
      error: "Launch Doesnt Exist",
    });

  //If exists, delete launch
  const aborted = await abortLaunchById(launchId);
  if(!aborted){
    return res.status(400).json({
      error:'Launch not aborted'
    })
  }
  return res.status(202).json({ok:true});
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLauch,
  httpAbortLaunch,
};
