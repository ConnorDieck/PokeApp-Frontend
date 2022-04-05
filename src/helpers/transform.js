export const transform = data => {
	return {
		name      : data.name,
		art       : data.sprites.other["official-artwork"].front_default,
		abilities : data.abilities.map(a => a.ability),
		moves     : data.moves.map(m => m.move)
	};
};

//  currentSpecies: (this key contains an object created by transforming the API data 					into a usable format. Used to determine options available for 						cardForm)
//  					{
//  						name, // data.name
//  						art, // data.sprites.other.official-artwork.front_default
//  						type1, // pass from species array
//  						type2, // pass from species array
//  						abilities: [{ name, url }, ...], // data.abilities.map(a =>
//  								   a.ability) - this will probably need to be added to
//  								   the db at the same time as the card (update card
//  								   save method)
//  						moves : [{ name, url }, ...] // data.moves.map(m => m.move),
//  						natures, // call from db
//  						items // call from db
//  					}
//  }
