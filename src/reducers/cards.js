import { ADD_CARD, SET_CARDS } from "../actions/actionTypes";

const cards = (state = {}, action) => {
	switch (action.type) {
		case SET_CARDS:
			return {
				...action.cards
			};
		case ADD_CARD:
			let newCard = action.card;
			return {
				...state,
				newCard
			};
		default:
			return state;
	}
};

export default cards;
