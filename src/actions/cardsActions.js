import { SET_CARDS } from "./actionTypes";

/** Adds cards to state */

export const setCards = cards => {
	return {
		type  : SET_CARDS,
		cards
	};
};
