import { SET_CURRENT_USER } from "./actionTypes";

// /** Set current user in redux store */

export const setCurrentUser = user => {
	return {
		type : SET_CURRENT_USER,
		user
	};
};
