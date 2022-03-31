/** Following functions are used in NODE REPL to obtain form info for db population  */

const axios = require("axios");
const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

async function getForms(name) {
	const result = await axios.get(`${SPECIES_URL}/${name}`);
	const forms = result.data.varieties;
	return forms;
}

async function getSprites(result) {
	const sprite = result.data.sprites.front_default;
	console.log(sprite);
	return sprite;
}

async function logInfo(name) {
	console.log(`Info for ${name}`);
	try {
		const forms = await getForms(name);
		console.log(forms);
		const urls = forms.map(r => r.pokemon.url);
		const calls = urls.map(url => axios.get(url));
		const sprites = await Promise.all(calls).then(dataArr => {
			dataArr.map(data => getSprites(data));
		});
		// const pokeObj = {
		// 	forms,
		// 	sprites
		// };
		// console.log(pokeObj);
	} catch (e) {
		console.error(e.response.statusText);
	}
}

logInfo("oricorio");
