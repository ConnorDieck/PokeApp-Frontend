import { ADD_CARD, SET_CARDS } from "./actionTypes";

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
