import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, FormControl, Select, Button, Paper, Avatar, MenuItem } from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useSelector } from "react-redux";

/** Form to edit user's favorite_id.
 *  
 */

const EditFavoriteForm = ({ editFavorite }) => {
	let INITIAL_STATE = {
		id : ""
	};

	const species = useSelector(st => st.species);
	let menuItems = Object.values(species).map(({ name, id }, index) => (
		<MenuItem value={id} key={index}>
			{name}
		</MenuItem>
	));

	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const navigate = useNavigate();

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// when submitted, runs editFavorite function the current user and token to state
	const handleSubmit = evt => {
		evt.preventDefault();
		editFavorite(fData);
		setFormData(INITIAL_STATE);
		navigate("/");
	};

	const paperStyle = {
		padding : 20,
		height  : "auto",
		width   : 280,
		margin  : "20px auto"
	};

	const avatarStyle = {
		backgroundColor : "#22d46c"
	};

	const btnStyle = {
		margin : "8px 0"
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<ExitToAppOutlinedIcon />
					</Avatar>
				</Grid>
				<h2>Select Your Favorite Pokemon</h2>
				<form className="fav-form" onSubmit={handleSubmit}>
					<FormControl>
						<Select //
							label="Favorite"
							id="id"
							name="id"
							value={fData.id}
							onChange={handleChange}
							placeholder="Favorite"
							fullWidth
						>
							{menuItems}
						</Select>

						<Button variant="contained" color="secondary" style={btnStyle} type="submit">
							Select
						</Button>
					</FormControl>
				</form>
			</Paper>
		</Grid>
	);
};

export default EditFavoriteForm;
