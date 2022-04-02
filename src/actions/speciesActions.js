import { FETCH_SPECIES } from "./actionTypes";
import PokeappApi from "../api";

export const fetchSpeciesFromAPI = () => {
	return async function(dispatch) {
		let species = await PokeappApi.getSpecies();
		return dispatch(fetchSpecies(species));
	};
};

const fetchSpecies = species => {
	return {
		type    : FETCH_SPECIES,
		species
	};
};
