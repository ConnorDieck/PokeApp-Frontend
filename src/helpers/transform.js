export const transform = data => {
	return {
		name      : data.name,
		art       : data.sprites.other["official-artwork"].front_default,
		abilities : data.abilities.map(a => a.ability),
		moves     : data.moves.map(m => m.move)
	};
};
