import { ADD_CARD, SET_CARDS } from "../actions/actionTypes";

const cards = (state = {}, action) => {
	switch (action.type) {
		case SET_CARDS:
			let cards = { ...state };
			action.cards.forEach(c => (cards[c.name] = { ...c }));
			return {
				...cards
			};
		case ADD_CARD:
			return {
				...state,
				[action.card.name]: { ...action.card }
			};
		default:
			return state;
	}
};

export default cards;
