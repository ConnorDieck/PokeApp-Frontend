import { ADD_CARD, EDIT_CARD, SET_CARDS } from "./actionTypes";

/** Sets cards to state */

export const setCards = cards => {
	return {
		type  : SET_CARDS,
		cards
	};
};

/** Adds a card to state */

export const addCard = card => {
	return {
		type : ADD_CARD,
		card
	};
};

/** Edits a card in state */

export const editCard = card => {
	return {
		type : EDIT_CARD,
		card
	};
};
