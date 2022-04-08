import cards from "./cards";
import teams from "./teams";
import species from "./species";
import auth from "./auth";
import items from "./items";
import natures from "./natures";
import { combineReducers } from "redux";

export default combineReducers({
	auth,
	teams,
	cards,
	species,
	items,
	natures
});
