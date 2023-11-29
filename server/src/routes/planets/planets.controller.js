const {getAllPlanets} = require("../../models/planets.model"); //planet model

function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets()); //set response only once
}

module.exports = {
  httpGetAllPlanets,
};
