import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button, Typography, Paper } from "@mui/material";

const UserProfile = () => {
	const { user } = useSelector(st => st.auth);
	console.log(user);

	const paperStyle = {
		padding : 20,
		height  : "auto",
		width   : 280,
		margin  : "20px auto"
	};

	const btnStyle = {
		margin : "8px 0"
	};
	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<img src={user.favorite.sprite} alt="Favorite sprite" />
				</Grid>
				<h2>{user.username}</h2>

				<Typography>Favorite Pokemon: {user.favorite.name}</Typography>
				<Button variant="text" color="secondary" style={btnStyle} href="/favorite">
					Change Favorite
				</Button>
			</Paper>
		</Grid>
	);
};

export default UserProfile;
