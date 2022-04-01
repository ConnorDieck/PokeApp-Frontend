import { FETCH_SPECIES } from "./types";
import PokeappApi from "../api";

export const fetchSpeciesFromAPI = () => {
	return async function(dispatch) {
		let species = await PokeappApi.getSpecies();
		console.log(species);
		return dispatch(fetchSpecies(species));
	};
};

const fetchSpecies = species => {
	return {
		type    : FETCH_SPECIES,
		species
	};
};
