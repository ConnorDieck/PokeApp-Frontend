import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { fetchSpeciesFromAPI } from "./actions/speciesActions";

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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./actions/authActions";

function Navigator() {
	const [ isLoading, setIsLoading ] = useState(true);
	const { user, isAuthenticated } = useSelector(st => st.auth);
	// Look in local storage for token
	const [ token, setToken ] = useLocalStorage("token", "");
	const dispatch = useDispatch();

	console.debug("isLoading=", isLoading, "currentUser=", user.username, "token=", token);

	async function login(userData) {
		try {
			let newToken = await PokeappApi.login(userData);
			console.log("new token from login:", newToken);
			PokeappApi.token = newToken;
			setToken(newToken);
			console.log("token from setToken:", token);
			console.log("decoded user:", jwt.decode(newToken));
			dispatch(setCurrentUser(jwt.decode(newToken)));
			return { success: true };
		} catch (err) {
			console.error("login failed", err);
			return { success: false, err };
		}
	}

	async function register(userData) {
		try {
			let newToken = await PokeappApi.register(userData);
			PokeappApi.token = newToken;
			setToken(newToken);
			dispatch(setCurrentUser(jwt.decode(newToken)));
			return { success: true };
		} catch (err) {
			console.error("signup failed", err);
			return { success: false, err };
		}
	}

	async function editFavorite(updateData) {
		try {
			let u = await PokeappApi.editFavorite(user.username, updateData);
			dispatch(setCurrentUser(u));
			return { sucess: true };
		} catch (err) {
			console.error("edit failed", err);
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
						let u = await PokeappApi.getUser(username);
						dispatch(setCurrentUser(u));
					} catch (err) {
						console.error("Navigator getUserInfo: Problem loading", err);
						dispatch(setCurrentUser({}));
					}
				} else {
					dispatch(setCurrentUser({}));
				}
				setIsLoading(false);
			}

			setIsLoading(true);
			getUserInfo();
		},
		[ token, dispatch ]
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
				<Route //
					path="/favorite"
					element={isAuthenticated ? <EditFavoriteForm editFavorite={editFavorite} /> : <NotFound />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Navigator;
