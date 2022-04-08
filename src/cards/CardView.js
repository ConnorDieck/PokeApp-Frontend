import { Container, Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import PokeappApi from "../api";
import Card from "./Card";
import axios from "axios";
import { transform } from "../helpers/transform";

/**
 * Component that loads card data and passes into card component. 
 * 
 * Data for the card is loaded from the backend, while species specific info (like the 
 * official artwork) is pulled and transformed from the PokeAPI. 
 * 
 */

function CardView() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ cardData, setCardData ] = useState({});
	const [ apiData, setApiData ] = useState({});
	const { cardId } = useParams();
	const { user, isAuthenticated } = useSelector(st => st.auth);
	const navigate = useNavigate();

	async function deleteCard() {
		await PokeappApi.deleteCard(cardId);
		navigate("/");
	}

	useEffect(
		function loadCard() {
			console.debug(`CardView useEffect loadCard cardId: ${cardId}`);

			function getCardInfo() {
				PokeappApi.getCard(cardId).then(r1 => {
					setCardData(r1);
					return axios
						.get(`${r1.url}`)
						.then(r2 => {
							let t = transform(r2.data);
							setApiData(t);
							setIsLoading(false);
						})
						.catch(err => {
							console.error("CardView loadCardInfo: Problem loading", err);
						});
				});
			}
			setIsLoading(true);
			getCardInfo();
		},
		[ cardId ]
	);

	if (isLoading) return <p>loading...</p>;

	return (
		<Container>
			<Card cardinfo={cardData} api={apiData} />
			<Grid align="center">
				{isAuthenticated ? (
					<div>
						<Button component={Link} to="edit" variant="contained" color="secondary">
							EDIT
						</Button>
						<Button onClick={deleteCard} variant="contained" color="primary" style={{ margin: "1" }}>
							DELETE
						</Button>
					</div>
				) : (
					<Typography>Owner: {user.username}</Typography>
				)}
			</Grid>
		</Container>
	);
}

export default CardView;
