import React from "react";
import { useSelector } from "react-redux";

import ItemList from "../util/ItemList";

/**
 * Component for list of teams. 
 * 
 * Renders an ItemList and passes any teams loaded to Redux state down as props.
 * 
 */

function TeamList() {
	const items = useSelector(st => Object.values(st.teams).map(t => ({ ...t, localurl: `/teams/${t.id}` })));
	return <ItemList title="teams" items={items} />;
}

export default TeamList;
