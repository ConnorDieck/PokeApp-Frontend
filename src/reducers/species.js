import { FETCH_SPECIES } from "../actions/types";

const species = (state = { species: [] }, action) => {
	switch (action.type) {
		case FETCH_SPECIES:
			// Adds species from API to state
			return { ...state, ...action.species };
		default:
			return state;
	}
};

export default species;
