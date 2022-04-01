import { FETCH_USER, ADD_USER, REMOVE_USER } from "../actions/types";

const user = (state = {}, action) => {
	switch (action.type) {
		case ADD_USER:
			// Adds user from API to state
			return { ...state, ...action.user };
		case FETCH_USER:
			// Adds user from API to state
			return { ...state, ...action.user };
		case REMOVE_USER:
			// Adds user from API to state
			let copy = { ...state };
			copy[user] = {};
			return { ...copy };
		default:
			return state;
	}
};

export default user;
