import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, FormControl, TextField, Button, Paper, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PokeappApi from "../api";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { addCard } from "../actions/cardsActions";
import { POKEAPI_URL } from "../util/pokeAPI";
import { transform } from "../helpers/transform";

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

const avatarStyle = {
	backgroundColor : "#22d46c"
};

const btnStyle = {
	margin : "8px 0"
};

const NewCardForm = () => {
	let INITIAL_STATE = {
		name    : "",
		ability : "",
		moves   : [],
		item    : "",
		nature  : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const [ apiData, setApiData ] = useState({});
	const { isAuthenticated } = useSelector(st => st.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const speciesId = useParams(speciesId);

	useEffect(
		function loadSpecies() {
			console.debug("NewCardForm useEffect loadSpecies");

			function getSpeciesInfo() {
				axios
					.get(`${POKEAPI_URL}/pokemon/${speciesId}`)
					.then(res => {
						let t = transform(res.data);
						setApiData(t);
						setIsLoading(false);
					})
					.catch(err => {
						console.error("NewCardForm getSpeciesInfo: Problem loading", err);
					});
			}
			setIsLoading(true);
			getSpeciesInfo();
		},
		[ speciesId ]
	);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// when submitted, runs adds new card to redux store. If user is logged in, it also saves it to the API
	const handleSubmit = async evt => {
		evt.preventDefault();
		if (isAuthenticated) {
			await PokeappApi.addCard(fData);
		}
		dispatch(addCard(fData));
		setFormData(INITIAL_STATE);
		navigate("/");
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockOutlinedIcon />
					</Avatar>
				</Grid>
				<h2>Log In</h2>
				<form className="auth-form" onSubmit={handleSubmit}>
					<FormControl>
						<TextField //
							label="Nickname"
							id="name"
							name="name"
							value={fData.name}
							onChange={handleChange}
							placeholder="Nickname"
							fullWidth
							required
						/>

						<TextField //
							label="Password"
							id="login_password"
							name="password"
							type="password"
							value={fData.password}
							onChange={handleChange}
							placeholder="Password"
							fullWidth
							required
						/>

						<Button variant="contained" color="secondary" style={btnStyle} type="submit">
							Login
						</Button>
					</FormControl>
				</form>
				<Typography>
					Don't have an account?
					<Link to="/signup">Sign Up</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};

export default NewCardForm;
