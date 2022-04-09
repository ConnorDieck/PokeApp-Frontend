import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Select, FormControl, TextField, Button, Paper, MenuItem, FormLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PokeappApi from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../actions/cardsActions";
import { transform } from "../helpers/transform";
import axios from "axios";

/** Form to create a card.
 * 
 * Species data will be added to the url when user selects a Pokemon to build.
 * This will also be used to call the external API to supply the form's select options 
 * (e.g.  moves, and abilities). This will also be used to display artwork.
 * 
 */

const useStyles = makeStyles(theme => ({
	image    : {
		[theme.breakpoints.down("sm")]: {
			width : "70vw"
		},
		[theme.breakpoints.up("md")]: {
			width : "475px"
		}
	},
	paper    : {
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
	btnStyle : {
		margin : "8px 0"
	}
}));

const NewCardForm = () => {
	let INITIAL_STATE = {
		name    : "",
		ability : {},
		move1   : {},
		move2   : {},
		move3   : {},
		move4   : {},
		item    : "",
		nature  : "",
		gender  : true
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const [ apiData, setApiData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const { isAuthenticated } = useSelector(st => st.auth);
	const { items, species, natures } = useSelector(st => st);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();

	const { speciesId, teamId } = useParams();

	/** Check the URL to see if we're adding to a team. 
	 *  If yes, we pass a different URL so that we'll redirect
	 *  back to that team upon creating.
	 */

	let link = teamId ? `/teams/${teamId}` : `/cards`;

	useEffect(
		function loadSpecies() {
			console.debug("NewCardForm useEffect loadSpecies");

			async function getSpeciesInfo() {
				try {
					let res = await axios.get(species[speciesId].url);

					let t = transform(res.data);
					setApiData(t);
					console.log("api data", apiData);
					setIsLoading(false);
				} catch (err) {
					console.error("NewCardForm getSpeciesInfo: Problem loading", err);
				}
			}
			setIsLoading(true);
			getSpeciesInfo();
		},
		[ species, speciesId ]
	);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// Build menu items for select items
	let itemsMenu = Object.values(items).map(({ name }, index) => (
		<MenuItem value={name} key={index}>
			{name}
		</MenuItem>
	));

	let naturesMenu = Object.values(natures).map(({ name }, index) => (
		<MenuItem value={name} key={index}>
			{name}
		</MenuItem>
	));

	// when submitted, runs adds new card to redux store. If user is logged in, it also saves it to the API
	const handleSubmit = async evt => {
		evt.preventDefault();
		try {
			await PokeappApi.addAbility(fData.ability);
		} catch (err) {
			console.error("error adding ability", fData.ability);
		}
		try {
			await PokeappApi.addMove(fData.move1);
		} catch (err) {
			console.error("error adding move", fData.move1);
		}
		try {
			await PokeappApi.addMove(fData.move2);
		} catch (err) {
			console.error("error adding move", fData.move2);
		}
		try {
			await PokeappApi.addMove(fData.move3);
		} catch (err) {
			console.error("error adding move", fData.move3);
		}
		try {
			await PokeappApi.addMove(fData.move4);
		} catch (err) {
			console.error("error adding move", fData.move4);
		}
		let formattedData = {
			name      : fData.name,
			ability   : fData.ability.name,
			url       : species[speciesId].url,
			gender    : fData.gender,
			item      : fData.item,
			nature    : fData.nature,
			speciesId : +speciesId,
			moves     : [ fData.move1.name, fData.move2.name, fData.move3.name, fData.move4.name ]
		};

		if (isAuthenticated) {
			let res = await PokeappApi.addCard(formattedData);
			if (teamId) await PokeappApi.addCardToTeam(teamId, res.id);
			dispatch(addCard(res));
			setFormData(INITIAL_STATE);
			navigate(link);
		} else {
			alert("Thanks for trying out PokeApp! Create an account for the full experience.");
			setFormData(INITIAL_STATE);
			navigate("/");
		}
	};

	if (isLoading) return <p>loading...</p>;

	return (
		<Grid>
			<Paper elevation={10} className={classes.paper}>
				<Grid align="center">
					<img src={apiData.art} className={classes.image} alt="Pokemon art" />
				</Grid>
				<h2>{species[speciesId].name}</h2>
				<form className="auth-form" onSubmit={handleSubmit}>
					<Grid align="center" container spacing={1}>
						<Grid item xs={8}>
							<FormControl>
								<FormLabel>Nickname</FormLabel>
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
							</FormControl>
						</Grid>

						<Grid item xs={4}>
							<FormControl>
								<FormLabel>Gender</FormLabel>
								<Select //
									label="Gender"
									id="gender"
									name="gender"
									value={fData.gender}
									onChange={handleChange}
									placeholder="Gender"
									fullWidth
								>
									<MenuItem value={true}>Male</MenuItem>
									<MenuItem value={false}>Female</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<Grid container spacing={1}>
						<Grid item xs={4}>
							<FormControl>
								<FormLabel>Ability</FormLabel>
								<Select //
									label="Ability"
									id="ability"
									name="ability"
									value={fData.ability}
									onChange={handleChange}
									placeholder="Ability"
									fullWidth
								>
									{Object.values(apiData.abilities).map((a, index) => (
										<MenuItem value={a} key={index}>
											{a.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl>
								<FormLabel>Nature</FormLabel>
								<Select //
									label="Nature"
									id="nature"
									name="nature"
									value={fData.nature}
									onChange={handleChange}
									placeholder="Nature"
									fullWidth
								>
									{naturesMenu}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl>
								<FormLabel>Held Item</FormLabel>
								<Select //
									label="Held Item"
									id="item"
									name="item"
									value={fData.item}
									onChange={handleChange}
									placeholder="Held Item"
									fullWidth
								>
									{itemsMenu}
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<Grid align="center" container spacing={1}>
						<Grid item xs={6}>
							<FormControl>
								<FormLabel>Move 1</FormLabel>
								<Select //
									label="Move 1"
									id="move1"
									name="move1"
									value={fData.move1}
									onChange={handleChange}
									placeholder="Move 1"
									fullWidth
								>
									{Object.values(apiData.moves).map((m, index) => (
										<MenuItem value={m} key={index}>
											{m.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl>
								<FormLabel>Move 2</FormLabel>
								<Select //
									label="Move 2"
									id="move2"
									name="move2"
									value={fData.move2}
									onChange={handleChange}
									placeholder="Move 2"
									fullWidth
								>
									{Object.values(apiData.moves).map((m, index) => (
										<MenuItem value={m} key={index}>
											{m.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<Grid align="center" container spacing={1}>
						<Grid item xs={6}>
							<FormControl>
								<FormLabel>Move 3</FormLabel>
								<Select //
									label="Move 3"
									id="move3"
									name="move3"
									value={fData.move3}
									onChange={handleChange}
									placeholder="Move 3"
									fullWidth
								>
									{Object.values(apiData.moves).map((m, index) => (
										<MenuItem value={m} key={index}>
											{m.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={6}>
							<FormControl>
								<FormLabel>Move 4</FormLabel>
								<Select //
									label="Move 4"
									id="move4"
									name="move4"
									value={fData.move4}
									onChange={handleChange}
									placeholder="Move 4"
									fullWidth
								>
									{Object.values(apiData.moves).map((m, index) => (
										<MenuItem value={m} key={index}>
											{m.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid align="center">
						<Button variant="contained" color="secondary" className={classes.btnStyle} type="submit">
							Submit
						</Button>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
};

export default NewCardForm;
