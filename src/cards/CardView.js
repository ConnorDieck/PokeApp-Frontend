import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PokeappApi from "../api";
import Card from "./Card";

/**
 * Component that loads card data and passes into card component. 
 * 
 */

function CardView() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ cardData, setCardData ] = useState({});
	const { cardId } = useParams();
	const editLink = `cards/${cardId}/edit`;
	const { user, isAuthenticated } = useSelector(st => st.auth);

	useEffect(
		function loadCard() {
			console.debug("CardView useEffect loadCard");

			async function getCardInfo() {
				try {
					const res = await PokeappApi.getCard(cardId);
					setCardData(res);
				} catch (err) {
					console.error("CardView loadCardInfo: Problem loading", err);
				}
				setIsLoading(false);
			}
			setIsLoading(true);
			getCardInfo();
		},
		[ cardId ]
	);

	console.log("cardData:", cardData);

	if (isLoading) return "Loading...";

	return (
		<Container>
			<Card cardinfo={cardData} />
			{isAuthenticated ? <Link to={editLink}>Edit</Link> : <Typography>Owner: {user.username}</Typography>}
		</Container>
	);
}

export default CardView;
