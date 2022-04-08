import { ADD_TEAM, DELETE_TEAM, EDIT_TEAM, SET_TEAMS } from "./actionTypes";

/** Sets teams to state */

export const setTeams = teams => {
	return {
		type  : SET_TEAMS,
		teams
	};
};

/** Adds a team to state */

export const addTeam = team => {
	return {
		type : ADD_TEAM,
		team
	};
};

/** Edits a team in state */

export const editTeam = (oldTeam, newTeam) => {
	return {
		type    : EDIT_TEAM,
		oldTeam,
		newTeam
	};
};

/** Deletes a team from state */

export const deleteTeamFromStore = team => {
	return {
		type : DELETE_TEAM,
		team
	};
};
