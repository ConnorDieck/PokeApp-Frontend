import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
	navlinks : {
		marginLeft : theme.spacing(10),
		display    : "flex"
	},
	logo     : {
		flexGrow : "1",
		cursor   : "pointer"
	},
	link     : {
		textDecoration : "none",
		color          : "white",
		fontSize       : "20px",
		marginLeft     : theme.spacing(20),
		"&:hover"      : {
			color        : "yellow",
			borderBottom : "1px solid white"
		}
	}
}));

function NavBar({ logout }) {
	const { isAuthenticated, user } = useSelector(st => st.auth);
	const classes = useStyles();
	let Navs = {};

	if (isAuthenticated) {
		Navs = (
			<AppBar position="static">
				<CssBaseline />
				<Toolbar>
					<Typography variant="h4" className={classes.logo}>
						PokeApp
					</Typography>
					<div className={classes.navlinks}>
						<Link to="/" className={classes.link}>
							Home
						</Link>
						<Link to="/teams" className={classes.link}>
							Teams
						</Link>
						<Link to="/profile" className={classes.link}>
							{user.username} Profile
						</Link>
						<Link to="/" className={classes.link} onClick={() => logout()}>
							Logout
						</Link>
					</div>
				</Toolbar>
			</AppBar>
		);
	} else {
		Navs = (
			<AppBar position="static">
				<CssBaseline />
				<Toolbar>
					<Typography variant="h4" className={classes.logo}>
						PokeApp
					</Typography>
					<div className={classes.navlinks}>
						<Link to="/" className={classes.link}>
							Home
						</Link>
						<Link to="/teams" className={classes.link}>
							Teams
						</Link>
						<Link to="/login" className={classes.link}>
							Login
						</Link>
						<Link to="/signup" className={classes.link}>
							Sign Up
						</Link>
					</div>
				</Toolbar>
			</AppBar>
		);
	}

	return <div>{Navs}</div>;
}

export default NavBar;
