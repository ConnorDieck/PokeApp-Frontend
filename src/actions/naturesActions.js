import { FETCH_NATURES } from "./actionTypes";
import PokeappApi from "../api";

export const fetchNaturesFromAPI = () => {
	return async function(dispatch) {
		let natures = await PokeappApi.getNatures();
		return dispatch(fetchNatures(natures));
	};
};

const fetchNatures = natures => {
	return {
		type    : FETCH_NATURES,
		natures
	};
};
