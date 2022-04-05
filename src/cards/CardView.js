import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PokeappApi from "../api";
import Card from "./Card";
import { POKEAPI_URL } from "../util/pokeAPI";
import axios from "axios";
import { transform } from "../helpers/transform";

/**
 * Component that loads card data and passes into card component. 
 * 
 * Data for the card is loaded from the backend, while species specific info (like the official
 * artwork) is pulled and transformed from the PokeAPI. 
 * 
 */

function CardView() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ cardData, setCardData ] = useState({});
	const [ apiData, setApiData ] = useState({});
	const { cardId } = useParams();
	const { user, isAuthenticated } = useSelector(st => st.auth);

	const editLink = `cards/${cardId}/edit`;

	useEffect(
		function loadCard() {
			console.debug("CardView useEffect loadCard");

			function getCardInfo() {
				PokeappApi.getCard(cardId).then(r1 => {
					setCardData(r1);
					return axios.get(`${POKEAPI_URL}/pokemon/${r1.speciesId}`).then(r2 => {
						let t = transform(r2.data);
						setApiData(t);
						setIsLoading(false);
					});
				});
			}
			setIsLoading(true);
			getCardInfo();
		},
		[ cardId ]
	);

	// TODO: Review below code with mentor. How could we have made the above work with async/await?
	// useEffect(
	// 	function loadCard() {
	// 		console.debug("CardView useEffect loadCard");

	// 		async function getCardInfo() {
	// 			try {
	// 				const res = await PokeappApi.getCard(cardId);
	// 				setCardData(res);
	// 			} catch (err) {
	// 				console.error("CardView loadCardInfo: Problem loading", err);
	// 			}
	// 			setIsLoading(false);
	// 		}
	// 		setIsLoading(true);
	// 		getCardInfo();
	// 	},
	// 	[ cardId ]
	// );

	// useEffect(
	// 	function fetchAPI() {
	// 		console.debug("CardView useEffect fetchAPI");

	// 		async function fetchAPIInfo() {
	// 			try {
	// 				const res = await axios.get(`${POKEAPI_URL}/pokemon/${cardData.speciesId}`);
	// 				let data = transform(res.data);
	// 				setApiData(data);
	// 			} catch (err) {
	// 				console.error("CardView fetchAPIInfo: Problem loading", err);
	// 			}
	// 			setIsLoading(false);
	// 		}
	// 		setIsLoading(true);
	// 		fetchAPIInfo();
	// 	},
	// 	[ cardData ]
	// );

	console.log("cardData:", cardData);
	console.log("apiData:", apiData);

	if (isLoading) return <p>loading...</p>;

	return (
		<Container>
			<Card cardinfo={cardData} api={apiData} />
			{isAuthenticated ? <Link to={editLink}>Edit</Link> : <Typography>Owner: {user.username}</Typography>}
		</Container>
	);
}

export default CardView;
