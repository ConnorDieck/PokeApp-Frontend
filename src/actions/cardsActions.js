import { ADD_CARD, DELETE_CARD, EDIT_CARD, SET_CARDS } from "./actionTypes";

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

export const editCard = (oldCard, newCard) => {
	return {
		type    : EDIT_CARD,
		oldCard,
		newCard
	};
};

/** Deletes a card from state */

export const deleteCardFromStore = card => {
	return {
		type : DELETE_CARD,
		card
	};
};
