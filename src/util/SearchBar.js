import { Select, TextField, MenuItem, Button, FormLabel } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
	searchBar     : {
		margin: '5px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
}));

/** SearchBar component to pass filters into species menu. */

const SearchBar = ({ search }) => {
	let INITIAL_STATE = {
		name : "",
		type : null
	};
	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const classes = useStyles();

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
		<form className={classes.searchBar} onSubmit={handleSubmit}>
			<TextField //
				id="name"
				name="name"
				value={fData.name}
				onChange={handleChange}
				placeholder="Name..."
			/>
			<FormLabel htmlFor="type">Type:</FormLabel>
			<Select //
				id="type"
				name="type"
				value={fData.type}
				onChange={handleChange}
				placeholder=""
			>
				{types.map((t, index) => (
					<MenuItem value={t} key={index}>
						{t}
					</MenuItem>
				))}
			</Select>
			<Button color="secondary" variant="contained" type="submit">
				Search
			</Button>
		</form>
	);
};

export default SearchBar;
