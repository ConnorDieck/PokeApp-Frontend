
   
import { Button } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

/**
 * Template for any menu of items (cards, teams, items, natures).
 * 
 * If no items of given type have been loaded into Redux state, don't return a list.
 * Otherwise, return a list with links to each explored item.
 * 
 */

function ItemList({items, title, newLink}) {
  return (
    <>
      <h1 className="my-3">{title}</h1>
      <Button component={Link} to={newLink} color="secondary">NEW</Button>
      {items.length !== 0
        ? (
          <ul style={{ fontSize: "120%", listStyleType: "none" }}>
            {items.map(item =>
              <li key={item.id}>
                <Link to={item.localurl}>
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