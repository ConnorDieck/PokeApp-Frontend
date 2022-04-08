import { ADD_TEAM, SET_TEAMS } from "../actions/actionTypes";

const teams = (state = {}, action) => {
	switch (action.type) {
		case SET_TEAMS:
			let teams = { ...state };
			action.teams.forEach(t => (teams[t.name] = { ...t }));
			return {
				...teams
			};
		case ADD_TEAM:
			return {
				...state,
				[action.team.name]: { ...action.team }
			};
		default:
			return state;
	}
};

export default teams;
