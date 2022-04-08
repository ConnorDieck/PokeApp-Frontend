import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, FormControl, TextField, Button, Paper, FormLabel } from "@mui/material";
import PokeappApi from "../api";
import { useDispatch, useSelector } from "react-redux";
import { editTeam, setTeams, addTeam } from "../actions/teamsActions";

/** Form to create a card.
 * 
 * Species data will be added to the url when user selects a Pokemon to build.
 * This will also be used to call the external API to supply the form's select options 
 * (e.g.  moves, and abilities). This will also be used to display artwork.
 * 
 */

const paperStyle = {
	padding : 20,
	height  : "auto",
	width   : 280,
	margin  : "20px auto"
};

const btnStyle = {
	margin : "8px 0"
};

const NewTeamForm = () => {
	let INITIAL_STATE = {
		name : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	/** When submitted,  adds new team to redux store and sends to API. 
     *  Form is not available if not logged in.
     * 
     */

	const handleSubmit = async evt => {
		evt.preventDefault();

		PokeappApi.addTeam(fData)
			.then(res => {
				dispatch(addTeam(res));
			})
			.catch(err => {
				console.error(err);
				alert(err);
				navigate(0);
			});

		setFormData(INITIAL_STATE);
		navigate(`/teams`);
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<h1>New Team</h1>
				</Grid>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>Team Name</FormLabel>
						<TextField //
							label="Name"
							id="name"
							name="name"
							value={fData.name}
							onChange={handleChange}
							placeholder="Team name..."
							fullWidth
							required
						/>
					</FormControl>

					<Grid align="center">
						<Button variant="contained" color="secondary" style={btnStyle} type="submit">
							Submit
						</Button>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
};

export default NewTeamForm;
