import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { fetchSpeciesFromAPI } from "./actions/speciesActions";

import PokeappApi from "./api";
import jwt from "jsonwebtoken";

/** Import any components needed */

import NavBar from "./util/NavBar";
import Home from "./Home";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import EditFavoriteForm from "./user/EditFavoriteForm";
import NotFound from "./util/NotFound";
import CardList from "./cards/CardList";
import NewCardForm from "./cards/NewCardForm";

import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./actions/authActions";
import UserProfile from "./user/UserProfile";
import { setCards } from "./actions/cardsActions";
import CardView from "./cards/CardView";
import { fetchItemsFromAPI } from "./actions/itemsActions";
import { fetchNaturesFromAPI } from "./actions/naturesActions";
import EditCardForm from "./cards/EditCardForm";
import SpeciesMenu from "./species/SpeciesMenu";

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

	// When app loads, pull species, items and nature data from db
	useEffect(
		function loadData() {
			console.debug("Navigator useEffect loadData");

			async function getAllData() {
				try {
					dispatch(fetchSpeciesFromAPI());
					dispatch(fetchItemsFromAPI());
					dispatch(fetchNaturesFromAPI());
				} catch (err) {
					console.error("Navigator getAllData: Problem loading", err);
					setCurrentUser(null);
				}

				setIsLoading(false);
			}

			setIsLoading(true);
			getAllData();
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
					try {
						let cards = await PokeappApi.getCards();
						dispatch(setCards(cards));
					} catch (err) {
						console.error("Navigator getUserInfo: Problem loading cards", err);
						dispatch(setCards({}));
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
					path="/profile"
					element={isAuthenticated ? <UserProfile /> : <NotFound />}
				/>
				<Route //
					path="/species"
					element={<SpeciesMenu />}
				/>
				{/* <Route //
					path="/teams"
					element={isAuthenticated ? <TeamsList /> : <NotFound />}
				/>
				<Route //
					path="/teams/new"
					element={<TeamsForm />}
				/>
				<Route //
					path="/teams/:teamId"
					element={<TeamView />}
				/>
				<Route //
					path="/teams/:teamId/edit"
					element={<TeamsForm />}
				/> */}
				<Route //
					path="/cards"
					element={<CardList />}
				/>
				<Route //
					path="/cards/new/:speciesId"
					element={<NewCardForm />}
				/>
				<Route //
					path="/cards/:cardId"
					element={<CardView />}
				/>
				<Route //
					path="/cards/:cardId/edit"
					element={<EditCardForm />}
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
