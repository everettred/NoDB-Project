import React, { Component } from "react";
import "./rosterCard.css";
import axios from "axios";
//() => (e.id)
function RosterCard(props) {
  let teams = "No team to display.";
  let { switchUpdateFn, handleChangeFn } = props;
  if (props.myTeams && props.myTeams.length) {
    teams = props.myTeams.map((teamItems) => {
      let teamList = teamItems.team.map((e) => {
        return (
          <section>
            <span className="characterDisplayFont">-({e.name})- </span>{" "}
            <span className="characterDisplayFont">-({e.origin})- </span>
            <span className="characterDisplayFont">-({e.weakness})- </span>{" "}
            <span className="characterDisplayFont">-({e.baseRank})- </span>
          </section>
        );
      });
      //function to toggle edit and save.......switchupdateFn just switches a key from false to true to update state and render the components
      function deleteTeam() {
        axios
          .delete(`/api/delete/${teamItems.id}/`, {})
          .then(() => props.updateTeamNameFn());
      }

      function edit() {
        teamItems.editing = !teamItems.editing;
        switchUpdateFn();
        console.log(teamItems);
        console.log(props.value);
      }
      function save() {
        console.log({ props });
        axios
          .put(`/api/update/${teamItems.id}/`, {
            nameChange: props.nameChangeState,
          })
          .then(() => props.updateTeamNameFn())
          .catch((err) => console.log(err));
      }

      return (
        <section className="displayBoxTeam">
          <section key={`teamId`}>
            {teamItems.editing === false ? (
              <div>
                {teamItems.teamName}
                <button onClick={edit}>Edit Team Name</button>
              </div>
            ) : (
              <div>
                <input onChange={handleChangeFn}></input>
                <button onClick={save}>Save</button>
              </div>
            )}
          </section>
          <p>
            {teamList} <button onClick={deleteTeam}> Delete Team</button>
          </p>
        </section>
      );
    });
  }

  return (
    <div>
      <section className="characterDisplayFont2">{teams}</section>
    </div>
  );
}

export default RosterCard;
