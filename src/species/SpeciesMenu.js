import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpeciesItem from "./SpeciesItem";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import PokeappApi from "../api";
import SearchBar from "../util/SearchBar";

/** Component to list available Pokemon species.
 * 
 *  Pulls data from redux.store.species and populates with icons/links
 *  to NewCardForm, passing along the species' id
 */

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


// TODO: This component will currently not load species when refreshed without a user. The problem can be resolved by restarting demo process or hitting the search button again, but this is not an ideal experience and should be updated.

const SpeciesMenu = () => {
	const classes = useStyles();
	const species = useSelector(st => st.species);
	const [ listSpecies, setListSpecies ] = useState(species);
	// const [ isLoading, setIsLoading ] = useState(true);
	const { teamId } = useParams();

	// useEffect(
	// 	function loadSpecies() {
	// 		console.debug("SpeciesMenu useEffect loadSpecies");

	// 		async function loadAllSpecies() {
	// 			setListSpecies(species);
	// 			setIsLoading(false);
	// 		}

	// 		setIsLoading(true);
	// 		loadAllSpecies();
			
	// 	},
	// 	[listSpecies]
	// )

	/** Check the URL to see if we're adding to a team. 
	 *  If yes, we pass a different URL so that we can create a card and 
	 *  add to the given team in NewCardForm.
	 */
	let link = teamId ? `/teams/${teamId}/cards/new` : `/cards/new`;

	async function search(filter) {
		let species = await PokeappApi.getSpecies(filter);
		setListSpecies(species);
	}

	// if (isLoading) return 'Loading species...'

	return (
		<div className={classes.root}>
			
			<Grid align="center" className={classes.gridList}>
			<SearchBar search={search} />
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
