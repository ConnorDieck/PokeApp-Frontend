import { FETCH_ITEMS } from "./actionTypes";
import PokeappApi from "../api";

export const fetchItemsFromAPI = () => {
	return async function(dispatch) {
		let items = await PokeappApi.getItems();
		return dispatch(fetchItems(items));
	};
};

const fetchItems = items => {
	return {
		type  : FETCH_ITEMS,
		items
	};
};
