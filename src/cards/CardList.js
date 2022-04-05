import React from "react";
import { useSelector } from "react-redux";

import ItemList from "../util/ItemList";

/**
 * Component for list of cards. 
 * 
 * Renders an ItemList and passes any cards loaded to Redux state down as props.
 * 
 */

function CardList() {
	const items = useSelector(st => Object.values(st.cards).map(c => ({ ...c, url: `/cards/${c.id}` })));
	return <ItemList title="Cards" items={items} />;
}

export default CardList;
