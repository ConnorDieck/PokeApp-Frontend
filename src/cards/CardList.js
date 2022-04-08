import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Button, Box, Paper } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

/**
 * Component for list of cards. 
 * 
 * Renders an ItemList and passes any cards loaded to Redux state down as props.
 * 
 */

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding         : theme.spacing(1),
	textAlign       : "center",
	color           : theme.palette.text.secondary
}));

function CardList() {
	const species = useSelector(st => st.species);
	const items = useSelector(st => Object.values(st.cards).map(c => ({ ...c, localurl: `/cards/${c.id}` })));
	return (
		<Box sx={{ flexGrow: 1 }}>
			<h1>Pokemon</h1>
			<Grid container spacing={2}>
				{items.map(m => (
					<Grid item xs={4}>
						<Item key={m.id} style={{ backgroundColor: "#ffffeb" }}>
							<Link to={m.localurl}>
								<img src={species[m.speciesId].sprite} />
							</Link>
							<p>{m.name}</p>
						</Item>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default CardList;
