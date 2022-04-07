import { FETCH_SPECIES } from "../actions/actionTypes";

const species = (state = {}, action) => {
	switch (action.type) {
		case FETCH_SPECIES:
			// Adds species from API to state
			let species = { ...state };
			action.species.forEach(s => (species[s.id] = { ...s }));
			return { ...species };
		default:
			return state;
	}
};

export default species;
