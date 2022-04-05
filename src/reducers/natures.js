import { FETCH_NATURES } from "../actions/actionTypes";

const natures = (state = { natures: [] }, action) => {
	switch (action.type) {
		case FETCH_NATURES:
			// Adds natures from API to state
			return { ...state, ...action.natures };
		default:
			return state;
	}
};

export default natures;
