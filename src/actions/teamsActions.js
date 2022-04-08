import { ADD_TEAM, SET_TEAMS } from "./actionTypes";

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
