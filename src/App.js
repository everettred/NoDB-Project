import React, { Component } from "react";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import axios from "axios";
import TeamCard from "./components/TeamCard";
import RosterCard from "./components/RosterCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      team: [],
      myTeams: [],
      id: 0,
      switch: false,
      nameChange: "",
    };
  }
  switchUpdate = () => {
    this.setState({
      switch: !this.state.switch,
    });
  };

  componentDidMount() {
    this.getCharacters();
  }
  getCharacters() {
    axios.get("/api/char/").then((response) => {
      console.log("getCharacters");
      this.setState({
        characters: response.data,
      });
    });
  }

  addCharToTeam = (charObj) => {
    this.setState({
      team: [...this.state.team, charObj],
    });
  };

  handleChange = (event) => {
    this.setState({
      nameChange: event.target.value,
    });
    console.log(this.state.nameChange);
  };

  postCharTeam = () => {
    let teamNum = this.state.id + 1;
    console.log("Hit Team Add");
    let teamObject = {
      editing: false,
      teamName: `Team ${teamNum}`,
      id: this.state.id,
      team: this.state.team,
    };
    axios.post("/api/team/", teamObject).then((response) => {
      let team = response.data;
      this.setState({
        team: [],
        id: (this.state.id += 1),
        myTeams: team,
      });
    });
  };

  updateTeamName = () => {
    console.log("hit .get/api/team");
    axios
      .get("/api/team/")
      .then((response) => {
        let teams = response.data;
        this.setState({
          myTeams: teams,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let characterMap = this.state.characters.map((e) => (
      <CharacterCard
        addCharToTeamFn={this.addCharToTeam}
        data={e}
        key={e.id + 1000}
      />
    ));

    return (
      <div>
        <section id="header">Marvel Character Team Builder</section>
        <RosterCard
          myTeams={this.state.myTeams}
          switchUpdateFn={this.switchUpdate}
          handleChangeFn={this.handleChange}
          nameChangeState={this.state.nameChange}
          updateTeamNameFn={this.updateTeamName}
        />
        <TeamCard postCharTeamFn={this.postCharTeam} team={this.state.team} />
        <section>{characterMap}</section>
      </div>
    );
  }
}

export default App;
