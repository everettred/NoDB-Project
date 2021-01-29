import React, { Component } from "react";
import "./teamCard.css";

function teamCard(props) {
  let mappedTeam = props.team.map((e) => (
    <h3>
      {e.name} {e.id}
    </h3>
  ));
  let { postCharTeamFn } = props;
  return (
    <div>
      {mappedTeam}
      <button id="button" onClick={() => postCharTeamFn()}>
        Create Team
      </button>
    </div>
  );
}

export default teamCard;
