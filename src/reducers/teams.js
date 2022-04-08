import { ADD_TEAM, DELETE_TEAM, EDIT_TEAM, SET_TEAMS } from "../actions/actionTypes";

const teams = (state = {}, action) => {
	let teams = {};
	switch (action.type) {
		case SET_TEAMS:
			teams = { ...state };
			action.teams.forEach(t => (teams[t.name] = { ...t }));
			return {
				...teams
			};
		case ADD_TEAM:
			return {
				...state,
				[action.team.name]: { ...action.team }
			};
		case EDIT_TEAM:
			teams = { ...state };
			teams[action.newTeam.name] = action.newTeam;

			delete teams[action.oldTeam.name];

			return {
				...teams
			};
		case DELETE_TEAM:
			teams = { ...state };

			delete teams[action.team.name];

			return {
				...teams
			};
		default:
			return state;
	}
};

export default teams;
