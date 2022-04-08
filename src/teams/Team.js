import { Grid, Button, Box, Paper } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import PokeappApi from "../api";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding         : theme.spacing(1),
	textAlign       : "center",
	color           : theme.palette.text.secondary
}));

const useStyles = makeStyles(theme => ({
	paper : {
		[theme.breakpoints.down("sm")]: {
			width : "90vw"
		},
		[theme.breakpoints.up("md")]: {
			width : "600px"
		},
		padding                        : 20,
		height                         : "auto",
		margin                         : "20px auto"
	},
	wrap  : {
		marginTop : 5
	},
	link  : { textDecoration: "none" }
}));

function Team({ team }) {
	const species = useSelector(st => st.species);
	const { isAuthenticated } = useSelector(st => st.auth);
	const classes = useStyles;
	const navigate = useNavigate();

	async function remove(cardId) {
		await PokeappApi.removeCardFromTeam(team.id, cardId);
		navigate(0);
	}

	const members = [];

	for (let i = 0; i < 6; i++) {
		if (team.cards[i]) {
			members.push(team.cards[i]);
		} else {
			members.push(<HelpOutlineIcon />);
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }} className={classes.wrap}>
			<h3>{team.name}</h3>
			<Grid container spacing={2}>
				{isAuthenticated ? (
					members.map(
						(m, index) =>
							m.id ? (
								<Grid item xs={4}>
									<Item key={m.id} style={{ backgroundColor: "#ffffeb" }}>
										<Link to={`/cards/${m.id}`}>
											<img src={species[m.speciesId].sprite} />
										</Link>
										<p>{m.name}</p>
										<Button onClick={() => remove(m.id)}>Remove</Button>
									</Item>
								</Grid>
							) : (
								<Grid item xs={4}>
									<Item style={{ backgroundColor: "#ffffeb" }} key={index}>
										{m}
										<p>???</p>
										<Button component={Link} to="add" variant="contained" color="secondary">
											ADD
										</Button>
									</Item>
								</Grid>
							)
					)
				) : (
					members.map(
						(m, index) =>
							m.id ? (
								<Grid item xs={4}>
									<Item key={m.id} style={{ backgroundColor: "#ffffeb" }}>
										<Link to={`/cards/${m.id}`}>
											<img src={species[m.speciesId].sprite} />
										</Link>
										<p>{m.name}</p>
									</Item>
								</Grid>
							) : (
								<Grid item xs={4}>
									<Item style={{ backgroundColor: "#ffffeb" }} key={index}>
										{m}
										<p>???</p>
									</Item>
								</Grid>
							)
					)
				)}
			</Grid>
		</Box>
	);
}

export default Team;
