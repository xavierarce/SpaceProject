const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
      //   if (isHabitablePlanet(data)) {
      //     // habitablePlanets.push(data);
      //     //TODO Replace below create with insert + update = upsert
      //     await planets.create({
      //       keplerName: data.kepler_name,
      //     });
      //   }
      })
      .on("error", (error) => console.log(error))
      .on("end", () =>
        console.log(`${habitablePlanets.length} Habitable Planets were found`)
      );
    resolve();
  });
}

async function getAllPlanets() {
  // return habitablePlanets;
  return await planets.find({});
}

module.exports = { getAllPlanets, loadPlanetsData };
