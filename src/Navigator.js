import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { fetchSpeciesFromAPI } from "./actions/species";

import PokeappApi from "./api";
import jwt from "jsonwebtoken";

/** Import any components needed */

import NavBar from "./NavBar";
import Home from "./Home";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import EditFavoriteForm from "./user/EditFavoriteForm";
import NotFound from "./NotFound";

import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch } from "react-redux";

function Navigator() {
	// TODO: update all references to currentUser in local state to redux store with dispatch
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	// Look in local storage for token
	const [ token, setToken ] = useLocalStorage("token", "");
	const dispatch = useDispatch();

	console.debug("isLoading=", isLoading, "currentUser=", currentUser, "token=", token);

	async function login(userData) {
		try {
			let newToken = await PokeappApi.login(userData);
			setToken(newToken);
			return { success: true };
		} catch (err) {
			console.error("login failed", err);
			return { success: false, err };
		}
	}

	async function register(userData) {
		try {
			let newToken = await PokeappApi.register(userData);
			setToken(newToken);
			return { success: true };
		} catch (err) {
			console.error("signup failed", err);
			return { success: false, err };
		}
	}

	async function editUserFavorite(username, updateData) {
		try {
			let updatedUser = await PokeappApi.editFavorite(username, updateData);
			setCurrentUser(updatedUser);
			return { sucess: true };
		} catch (err) {
			console.error("login failed", err);
			return { success: false, err };
		}
	}

	function logout() {
		setToken(null);
	}

	// When app loads, pull species data from db
	useEffect(
		function loadSpecies() {
			console.debug("Navigator useEffect loadSpecies");

			async function getSpeciesInfo() {
				try {
					dispatch(fetchSpeciesFromAPI());
				} catch (err) {
					console.error("Navigator getUserInfo: Problem loading", err);
					setCurrentUser(null);
				}

				setIsLoading(false);
			}

			setIsLoading(true);
			getSpeciesInfo();
		},
		[ dispatch ]
	);

	// When token changes, get info on user or set to null (if logged out)
	useEffect(
		function loadUserInfo() {
			console.debug("Navigator useEffect loadUserInfo", "token=", token);

			async function getUserInfo() {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						PokeappApi.token = token;
						let currentUser = await PokeappApi.getCurrentUser(username);
						setCurrentUser(currentUser);
					} catch (err) {
						console.error("Navigator getUserInfo: Problem loading", err);
						setCurrentUser(null);
					}
				} else {
					setCurrentUser(null);
				}
				setIsLoading(false);
			}

			setIsLoading(true);
			getUserInfo();
		},
		[ token ]
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<BrowserRouter>
			<NavBar logout={logout} />
			<Routes>
				<Route //
					path="/"
					element={<Home />}
				/>
				<Route //
					path="/login"
					element={<LoginForm login={login} />}
				/>
				<Route //
					path="/signup"
					element={<SignupForm register={register} />}
				/>
				{/* <Route //
					path="/favorite"
					element={currentUser ? <EditFavoriteForm editFavorite={editUserFavorite} /> : <NotFound />}
				/> */}
				<Route //
					path="/favorite"
					element={<EditFavoriteForm editFavorite={editUserFavorite} />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Navigator;
