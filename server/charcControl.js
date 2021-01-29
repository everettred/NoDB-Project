const data = require("../data.json");
//const teams = require('../teams.json')

let teams = [];

module.exports = {
  getCharacters: (req, res) => {
    res.status(200).send(data);
  },

  getTeams: (req, res) => {
    res.status(200).send(teams);
  },

  postCharTeam: (req, res) => {
    let teamObj = req.body;
    teams.push(teamObj);
    console.log({ teams });
    res.status(200).send(teams);
  },
  updateTeamName: (req, res) => {
    console.log({ teams });
    //console.log("hit", { req });
    let { id } = req.params;
    console.log(id);
    let { nameChange } = req.body;
    const newName = teams.find((e) => e.id === +id);
    newName.teamName = nameChange;
    //teams[id].teamName = nameChange;
    res.status(200).send(teams);
  },
  deleteTeam: (req, res) => {
    let { id } = req.params;
    const deleteIndex = teams.find((e) => e.id === +id);
    teams.splice(id, 1);
    console.log(id);
    res.status(200).send(teams);
  },
};
