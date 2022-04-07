import { Grid, Paper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding         : theme.spacing(1),
	margin          : theme.spacing(1),
	textAlign       : "center"
}));

const SpeciesItem = ({ item }) => {
	//MQ: Why are the grid items not converting to 4 columns when the screen hits mid-size?
	return (
		<Grid item xs={12} md={4}>
			<Item>
				<img src={item.sprite} alt="Pokemon Sprite" />
				<p>{item.name}</p>

				{item.type2 ? (
					<span>
						<small>
							{item.type1}/{item.type2}
						</small>
					</span>
				) : (
					<span>
						<small>{item.type1}</small>
					</span>
				)}
			</Item>
		</Grid>
	);
};

export default SpeciesItem;
