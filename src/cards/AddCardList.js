import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Box, Paper } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import PokeappApi from "../api";
import { compareObjInArrs } from "../helpers/compareObjInArrs";

/**
 * Component for list of cards available to be added to a team. 
 * 
 * Renders all cards not already on given team.
 * 
 */

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding         : theme.spacing(1),
	textAlign       : "center",
	color           : theme.palette.text.secondary
}));

function AddCardList() {
	const species = useSelector(st => st.species);
	const cards = useSelector(st => Object.values(st.cards).map(c => ({ ...c })));
	const { teamId } = useParams();
	const [ team, setTeam ] = useState();
	const [ candidates, setCandidates ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const navigate = useNavigate();

	/** MQ: Review this useEffect. I don't understand how it got working, or why it
	 *  wasn't in the first place. setCandidates started working when I made res.cards 
	 *  the argument rather than team.cards. I'm not even using team in local state 
	 *  now. Using res instead of team looks like the same thing I was doing in the 
	 *  commented out .then() (what's this pattern called again?) code, no?
	 */
	useEffect(
		function loadTeam() {
			console.debug(`AddCardList useEffect loadTeam teamId: ${teamId}`);

			// function getTeamInfo() {
			// 	PokeappApi.getTeam(teamId)
			// 		.then(res => {
			// 			setTeam(res);
			// 			return team;
			// 		})
			// 		.then(t => {
			// 			console.log(t);
			// 			setCandidates(compareObjInArrs(t.cards, cards));
			// 			setIsLoading(false);
			// 		})
			// 		.catch(err => {
			// 			console.error("AddCardList loadTeamInfo: Problem loading", err);
			// 		});
			// }

			async function getTeamInfo() {
				try {
					const res = await PokeappApi.getTeam(teamId);
					// console.log("res", res);
					setTeam(res);

					// console.log("team cards", team.cards);
					// console.log("cards", cards);

					setCandidates(compareObjInArrs(res.cards, cards));
					setIsLoading(false);
				} catch (err) {
					console.error("TeamView loadTeamInfo: Problem loading", err);
				}
			}
			setIsLoading(true);
			getTeamInfo();
		},
		[ teamId ]
	);

	async function addToTeam(cardId) {
		if (team.cards.length === 6) return alert("There are already 6 Pokemon on this team.");
		await PokeappApi.addCardToTeam(teamId, cardId);
		navigate(`/teams/${teamId}`);
	}

	if (isLoading) return <p>Loading...</p>;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<h1>Pokemon</h1>
			<Button component={Link} to={"new"} color="secondary">
				CREATE
			</Button>
			<Grid container spacing={2}>
				{candidates.map(c => (
					<Grid item xs={4} key={c.id}>
						<Item style={{ backgroundColor: "#ffffeb" }}>
							<img src={species[c.speciesId].sprite} />
							<p>{c.name}</p>
							<Button onClick={() => addToTeam(c.id)} variant="contained" color="secondary">
								ADD
							</Button>
						</Item>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default AddCardList;
