import { Container, Grid, Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import PokeappApi from "../api";
import Team from "./Team";

/**
 * Component that loads card data and passes into card component. 
 * 
 * Data for the card is loaded from the backend, while species specific info (like the official
 * artwork) is pulled and transformed from the PokeAPI. 
 * 
 */

function TeamView() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ teamData, setTeamData ] = useState({});
	const { teamId } = useParams();
	const { user, isAuthenticated } = useSelector(st => st.auth);
	const navigate = useNavigate();

	async function deleteTeam() {
		await PokeappApi.deleteTeam(teamId);
		navigate("/");
	}

	useEffect(
		function loadTeam() {
			console.debug(`TeamView useEffect loadTeam teamId: ${teamId}`);

			async function getTeamInfo() {
				try {
					let res = await PokeappApi.getTeam(teamId);
					setTeamData(res);
					setIsLoading(false);
				} catch (err) {
					console.error("TeamView loadTeamInfo: Problem loading", err);
				}
			}
			setIsLoading(true);
			getTeamInfo();
		},
		[ teamId ]
	);

	if (isLoading) return <p>loading...</p>;

	return (
		<Container>
			<Team team={teamData} />
			<Grid align="center">
				<br />
				{isAuthenticated ? (
					<Box sx={{ flexGrow: 1 }}>
						<Grid container align="center" spacing={5}>
							<Grid item>
								<Button
									component={Link}
									to="edit"
									variant="contained"
									color="secondary"
									style={{ margin: "1" }}
								>
									EDIT
								</Button>
							</Grid>
							<Grid item>
								<Button
									onClick={deleteTeam}
									variant="contained"
									color="primary"
									style={{ margin: "1" }}
								>
									DELETE
								</Button>
							</Grid>
						</Grid>
					</Box>
				) : (
					<Typography>Owner: {teamData.username}</Typography>
				)}
			</Grid>
		</Container>
	);
}

export default TeamView;
