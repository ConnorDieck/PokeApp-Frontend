import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpeciesItem from "./SpeciesItem";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import PokeappApi from "../api";
import SearchBar from "../util/SearchBar";

const useStyles = makeStyles(theme => ({
	root     : {
		display        : "flex",
		flexWrap       : "wrap",
		justifyContent : "space-around"
	},
	link     : {
		textDecoration : "none"
	},
	gridList : {
		[theme.breakpoints.up("xs")]: {
			width : "70vw"
		},
		[theme.breakpoints.up("md")]: {
			width : "40vw"
		},
		height                       : "auto"
	}
}));

const SpeciesMenu = () => {
	const classes = useStyles();
	const species = useSelector(st => st.species);
	const [ listSpecies, setListSpecies ] = useState(species);
	const { teamId } = useParams();

	/** Check the URL to see if we're adding to a team. 
	 *  If yes, we pass a different URL so that we can create a card and 
	 *  add to the given team in NewCardForm.
	 */
	let link = teamId ? `/teams/${teamId}/cards/new` : `/cards/new`;

	async function search(filter) {
		let species = await PokeappApi.getSpecies(filter);
		setListSpecies(species);
	}

	return (
		<div className={classes.root}>
			<SearchBar search={search} />
			<Grid align="center" className={classes.gridList}>
				{Object.values(listSpecies).map(s => (
					<Link className={classes.link} to={`${link}/${s.id}`}>
						<SpeciesItem item={s} />
					</Link>
				))}
			</Grid>
		</div>
	);
};

export default SpeciesMenu;
