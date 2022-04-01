import { ADD_USER, FETCH_USER, REMOVE_USER } from "./types";
import PokeappApi from "../api";

/** Fetch user from API and add to store */

export const fetchUserFromAPI = username => {
	return async function(dispatch) {
		let user = await PokeappApi.getUser(username);
		return dispatch(fetchUser(user));
	};
};

const fetchUser = user => {
	return {
		type : FETCH_USER,
		user
	};
};

/** Add new user from formdata to store */

export const loginUser = userData => {
	return async function(dispatch) {
		let newToken = await PokeappApi.login(userData);
		return dispatch(addUser(user));
	};
};

export const registerUser = userData => {
	return async function(dispatch) {
		let newToken = await PokeappApi.register(userData);
		return dispatch(addUser(user));
	};
};

const addUser = user => {
	return {
		type : ADD_USER,
		user
	};
};

/** Edit the favoriteId of a user */

export const editFavoriteInAPI = (username, updateData) => {
	return async function(dispatch) {
		let user = await PokeappApi.editFavorite(username, updateData);
		return dispatch(editFavorite(user));
	};
};

const editFavorite = user => {
	return {
		type : FETCH_USER,
		user
	};
};

/** Empty user data from store (logout) */

export const logoutUser = () => {
	return {
		type : REMOVE_USER
	};
};
