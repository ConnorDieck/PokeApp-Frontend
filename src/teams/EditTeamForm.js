import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, FormControl, TextField, Button, Paper, FormLabel } from "@mui/material";
import PokeappApi from "../api";
import { useDispatch, useSelector } from "react-redux";
import { editTeam } from "../actions/teamsActions";

/** Form to edit a team.
 * 
 *  Team data is pulled from store based on id in URL. 
 *  
 *  Upon submission, sends team to server and dispatches editTeam() to 
 *  update redux store.
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

const EditTeamForm = () => {
	const { teamId } = useParams();

	const oldTeam = useSelector(st => Object.values(st.teams).filter(t => t.id === +teamId)[0]);

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
		console.log("fData", fData);

		PokeappApi.editTeam(fData, teamId)
			.then(res => {
				dispatch(editTeam(oldTeam, res));
			})
			.catch(err => {
				console.error(err);
			});

		setFormData(INITIAL_STATE);
		navigate(`/teams`);
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<h1>Edit Team</h1>{" "}
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

export default EditTeamForm;
