const {getAllPlanets} = require("../../models/planets.model"); //planet model

async function httpGetAllPlanets(req, res) {
  return res.status(200).json( await getAllPlanets()); //set response only once
}

module.exports = {
  httpGetAllPlanets,
};
