
   
import React from 'react';
import { Link } from "react-router-dom";

/**
 * Template for any menu of items (cards, teams, items, natures).
 * 
 * If no items of given type have been loaded into Redux state, don't return a list.
 * Otherwise, return a list with links to each explored item.
 * 
 */

function ItemList({items, title}) {
  return (
    <>
      <h1 className="my-3">{title}</h1>
      {items.length !== 0
        ? (
          <ul style={{ fontSize: "120%" }}>
            {items.map(item =>
              <li key={item.id}>
                <Link to={item.url}>
                  {item.name}
                </Link>
              </li>
            )}
          </ul>
        )
        : <p>You haven't created any items of this type yet.</p>
      }
    </>
  );
}


export default ItemList;