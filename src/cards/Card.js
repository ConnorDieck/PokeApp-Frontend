import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

/**
 * Component for a card. 
 * 
 * Accepts card info as props. If none is passed down, it will display empty.
 * 
 */

// const placeholder = {
// 	id        : 99,
// 	name      : "Spicy",
// 	gender    : true,
// 	art       :
// 		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
// 	natureId  : 1,
// 	abilityId : 1,
// 	speciesId : 288,
// 	itemId    : 1,
// 	moves     : [ 20, 21, 22, 23 ]
// };

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding         : theme.spacing(1),
	textAlign       : "center",
	color           : theme.palette.text.secondary
}));

const useStyles = makeStyles(theme => ({
	image : {
		[theme.breakpoints.down("sm")]: {
			width : "70vw"
		},
		[theme.breakpoints.up("md")]: {
			width : "475px"
		}
	},
	paper : {
		[theme.breakpoints.down("sm")]: {
			width : "90vw"
		},
		[theme.breakpoints.up("md")]: {
			width : "600px"
		},
		padding                        : 20,
		height                         : "auto",
		margin                         : "20px auto"
	}
}));

function Card({ cardinfo }) {
	const classes = useStyles();
	const species = useSelector(st => st.species[cardinfo.speciesId - 1]);
	console.log(cardinfo);

	// const paperStyle = {
	// 	padding : 20,
	// 	height  : "auto",
	// 	width   : "auto",
	// 	margin  : "20px auto"
	// };

	return (
		<Grid>
			<Paper elevation={10} className={classes.paper}>
				<Grid align="center">
					<img className={classes.image} src={cardinfo.art} alt="Pokemon Art" />
				</Grid>
				<h2>{species.name}</h2>
				<h3>{cardinfo.name}</h3>
				{species.type2 ? (
					<span>
						{species.type1}/{species.type2}
					</span>
				) : (
					<span>{species.type1}</span>
				)}
				{cardinfo.gender ? <p>Male</p> : <p>Female</p>}
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Item>{cardinfo.ability}</Item>
					</Grid>
					<Grid item xs={8}>
						<Item>{cardinfo.moves[0]}</Item>
					</Grid>
					<Grid item xs={4}>
						<Item>{cardinfo.nature}</Item>
					</Grid>
					<Grid item xs={8}>
						<Item>{cardinfo.moves[1]}</Item>
					</Grid>
					<Grid item xs={4}>
						<Item>{cardinfo.item}</Item>
					</Grid>
					<Grid item xs={8}>
						<Item>{cardinfo.moves[2]}</Item>
					</Grid>
					<Grid item xs={4} />
					<Grid item xs={8}>
						<Item>{cardinfo.moves[3]}</Item>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default Card;
