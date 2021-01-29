import React, { Component } from "react";
import "./charactercard.css";

class CharacterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { id, name, weakness, origin, baseRank } = this.props.data;
    return (
      <section className="box1">
        <h1>Character: {name}</h1>
        <h1>Weakness: {weakness}</h1>
        <h1>Rank: {baseRank}</h1>
        <h1>Origin: {origin}</h1>
        <button onClick={() => this.props.addCharToTeamFn(this.props.data)}>
          Add to Team
        </button>
      </section>
    );
  }
}

export default CharacterCard;
