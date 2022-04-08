import { ADD_CARD, DELETE_CARD, EDIT_CARD, SET_CARDS } from "../actions/actionTypes";

const cards = (state = {}, action) => {
	let cards = {};
	switch (action.type) {
		case SET_CARDS:
			cards = { ...state };
			action.cards.forEach(c => (cards[c.name] = { ...c }));
			return {
				...cards
			};
		case ADD_CARD:
			return {
				...state,
				[action.card.name]: { ...action.card }
			};
		case EDIT_CARD:
			cards = { ...state };
			cards[action.newCard.name] = { ...action.newCard, id: action.oldCard.id };

			delete cards[action.oldCard.name];

			return {
				...cards
			};
		case DELETE_CARD:
			cards = { ...state };

			delete cards[action.card.name];

			return {
				...cards
			};
		default:
			return state;
	}
};

export default cards;
