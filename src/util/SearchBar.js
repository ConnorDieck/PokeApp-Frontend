import { Select, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";

const SearchBar = ({ search }) => {
	let INITIAL_STATE = {
		name : "",
		type : null
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);

	const types = [
		"Normal",
		"Fire",
		"Water",
		"Grass",
		"Electric",
		"Ice",
		"Fighting",
		"Poison",
		"Ground",
		"Flying",
		"Psychic",
		"Bug",
		"Rock",
		"Ghost",
		"Dark",
		"Dragon",
		"Steel",
		"Fairy"
	];

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// When submitted, runs search function passed down from SpeciesList to set species to the result in state
	const handleSubmit = evt => {
		evt.preventDefault();
		search(fData);
		setFormData(INITIAL_STATE);
	};

	return (
		<form className="searchBar" onSubmit={handleSubmit}>
			<TextField //
				id="name"
				name="name"
				value={fData.name}
				onChange={handleChange}
				placeholder="Name..."
			/>
			<Select //
				id="type"
				name="type"
				value={fData.type}
				onChange={handleChange}
				placeholder=""
			>
				{types.map(t => <MenuItem value={t}>{t}</MenuItem>)}
			</Select>
			<button className="searchBtn">Submit</button>
		</form>
	);
};

export default SearchBar;
