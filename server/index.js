const express = require("express");
const app = express();
let port = 3470;
app.use(express.json());

//endpoint
let charcControl = require("./charcControl");
app.get("/api/char/", charcControl.getCharacters);
app.get("/api/team/", charcControl.getTeams);
app.post("/api/team/", charcControl.postCharTeam);
app.put("/api/update/:id", charcControl.updateTeamName);
app.delete("/api/delete/:id", charcControl.deleteTeam);

app.listen(port, () => console.log(`Server up on port ${port}`));
