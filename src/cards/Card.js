import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

/**
 * Component for a card. 
 * 
 * Accepts card info as props. If none is passed down, it will display empty.
 * 
 */

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding         : theme.spacing(1),
	margin          : theme.spacing(1),
	textAlign       : "center"
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
	},
	grid  : {
		marginTop     : 2,
		paddingRight  : 2,
		paddingBottom : 2,
		marginLeft    : "auto",
		marginRight   : "auto",
		maxWidth      : 500
	}
}));

function Card({ cardinfo, api }) {
	const classes = useStyles();
	const species = useSelector(st => st.species[cardinfo.speciesId]);

	return (
		<Grid>
			<Paper elevation={10} className={classes.paper}>
				<Grid align="center">
					<img className={classes.image} src={api.art} alt="Pokemon Art" />
				</Grid>
				<Grid align="center">
					<h2>{species.name}</h2>
					<h3>"{cardinfo.name}"</h3>
					{species.type2 ? (
						<span>
							{species.type1}/{species.type2}
						</span>
					) : (
						<span>{species.type1}</span>
					)}
					{cardinfo.gender ? <p>Male</p> : <p>Female</p>}
				</Grid>

				<Grid container spacing={2} className={classes.grid} align="center">
					<Grid item xs={4}>
						<Typography>Ability:</Typography>
						<Item>{cardinfo.ability}</Item>
						<Typography>Nature:</Typography>
						<Item>{cardinfo.nature}</Item>
						<Typography>Held Item:</Typography>
						<Item>{cardinfo.item}</Item>
					</Grid>

					<Grid item xs={8}>
						<Typography>Moves:</Typography>
						<Item>{cardinfo.moves[0]}</Item>
						<Item>{cardinfo.moves[1]}</Item>
						<Item>{cardinfo.moves[2]}</Item>
						<Item>{cardinfo.moves[3]}</Item>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default Card;
