import { FETCH_ITEMS } from "../actions/actionTypes";

const items = (state = { items: [] }, action) => {
	switch (action.type) {
		case FETCH_ITEMS:
			// Adds items from API to state
			return { ...state, ...action.items };
		default:
			return state;
	}
};

export default items;
