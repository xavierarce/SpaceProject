const launches = new Map();

let latestFlightNumber = 100;
//Our structure
const launch = {
  flightNumber: 100,
  mission: "Lasa",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function AddNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber, 
    Object.assign(launch, {
      success:true,
      upcoming:true,
      customers:["Zero to Mastery", 'Nasa'],
      flightNumber:latestFlightNumber,
    })
  );
}

module.exports = { getAllLaunches , AddNewLaunch };
