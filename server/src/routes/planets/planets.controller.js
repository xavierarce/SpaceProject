const {habitablePlanets} = require("../../models/planets.model"); //planet model

function getAllPlanets(req, res) {
  return res.status(200).json(habitablePlanets); //set response only once
}

module.exports = {
  getAllPlanets,
};
