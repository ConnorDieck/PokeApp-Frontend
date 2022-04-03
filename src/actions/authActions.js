import { SET_CURRENT_USER } from "./actionTypes";
// import PokeappApi from "../api";
// import jwt from "jsonwebtoken";

// /** Add new user from formdata to store */

// export const loginUser = userData => {
// 	return async function(dispatch) {
// 		let newToken = await PokeappApi.login(userData);
// 		PokeappApi.token = newToken;
// 		return dispatch(setCurrentUser(jwt.decode(newToken)));
// 	};
// };

// export const registerUser = userData => {
// 	return async function(dispatch) {
// 		let newToken = await PokeappApi.register(userData);
// 		PokeappApi.token = newToken;
// 		return dispatch(setCurrentUser(jwt.decode(newToken)));
// 	};
// };

// /** Fetch user from API and add to store */

// export const fetchUserFromAPI = username => {
// 	return async function(dispatch) {
// 		let user = await PokeappApi.getUser(username);
// 		return dispatch(setCurrentUser(user));
// 	};
// };

export const setCurrentUser = user => {
	return {
		type : SET_CURRENT_USER,
		user
	};
};

/** Edit the favoriteId of a user */

// export const editFavoriteInAPI = (username, updateData) => {
// 	return async function(dispatch) {
// 		let user = await PokeappApi.editFavorite(username, updateData);
// 		return dispatch(setCurrentUser(user));
// 	};
// };
