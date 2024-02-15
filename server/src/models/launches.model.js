const axios = require("axios");

const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
// let latestFlightNumber = 100;

const launches = new Map();

//Our structure
const launch = {
  flightNumber: 100, //flight_number
  mission: "First Exploration", //name
  rocket: "Explorer IS1", //rocket.name
  launchDate: new Date("January 1, 2024"), //date_local
  target: "Kepler-442 b", // not applicable
  customers: ["ZTM", "NASA"], //payload.customers for each payload
  upcoming: true, //upcomming
  success: true, // success
};

saveLaunch(launch);
// launches.set(launch.flightNumber, launch);

const SPACE_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadLaunchData() {
  console.log("Downloading DATA API");
  const response = await axios.post(SPACE_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: ["name"],
        },
        {
          path: "payloads",
          select: ["customers"],
        },
      ],
    },
  });
}

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({ keplerName: launch.target });

    if (!planet) {
      console.error("No matching planet was found for launch:", launch);
      throw new Error("No matching planet was found for launch:", launch);
    }

    await launchesDatabase.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error("Error in saveLaunch:", error);
    // Handle the error as needed
  }
}

async function shceduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Xavier Arcce", "ESGI"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;

  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
}

module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  shceduleNewLaunch,
  abortLaunchById,
};
