import cards from "./cards";
import species from "./species";
// import titles from "./titles";
import { combineReducers } from "redux";

export default combineReducers({
	cards,
	species
});

/** PokeApp State:
 * {
 * user: {
 * 			username,
 * 			favoriteId
 * 		},
 * team: { 
 * 		name,
 * 		cards: [ {
					nickname : "c1",
					art      : "www.test.org"
				},
				{
					nickname : "c2",
					art      : "www.test.org"
				},
				{
					nickname : "c3",
					art      : "www.test.org"
				} ] 
 * 		},
 * cards: {
 * 			c1: {
 * 					nickname  : "c1",
					gender    : true,
					art       :
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
					natureId  : 1,
					abilityId : 2,
					speciesId : 257,
					itemId    : 4,
					moveIds   : [ 0, 1, 2, 3 ]
 * 			},
			c2: {
 * 					nickname  : "c2",
					gender    : false,
					art       :
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
					natureId  : 2,
					abilityId : 3,
					speciesId : 25,
					itemId    : 3,
					moveIds   : [ 0, 1, 2, 3 ]
 * 			},
			c3: {
 * 					nickname  : "c3",
					gender    : true,
					art       :
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
					natureId  : 2,
					abilityId : 5,
					speciesId : 2,
					itemId    : 3,
					moveIds   : [ 0, 1, 2, 3 ]
 * 			}	
 * 		},
 * currentSpecies: (this key contains an object created by transforming the API data 					into a usable format. Used to determine options available for 						cardForm)
 * 					{
 * 						name, // data.name
 * 						art, // data.sprites.other.official-artwork.front_default
 * 						type1, // pass from species array
 * 						type2, // pass from species array
 * 						abilities: [{ name, url }, ...], // data.abilities.map(a => 
 * 								   a.ability) - this will probably need to be added to 
 * 								   the db at the same time as the card (update card 
 * 								   save method)	
 * 						moves : [{ name, url }, ...] // data.moves.map(m => m.move),
 * 						natures, // call from db
 * 						items // call from db
 * 					}
 * }
 */
