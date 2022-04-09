import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Select, FormControl, TextField, Button, Paper, MenuItem, FormLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PokeappApi from "../api";
import { useDispatch, useSelector } from "react-redux";
import { editCard } from "../actions/cardsActions";
import { transform } from "../helpers/transform";
import axios from "axios";
import isEmpty from "lodash";

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

const EditCardForm = () => {
	const { cardId } = useParams();
	const cardData = useSelector(st => Object.values(st.cards).filter(c => c.id === +cardId)[0]);

	/** MQ: Why does setting the inital state to depend on cardData cause onSubmit()
	 *  to fail? Even if you don't reset the form data to this and just set it to
	 *  empty 
     * 
    */

	// let INITIAL_STATE = {
	// 	name    : cardData.name,
	// 	ability : cardData.ability,
	// 	move1   : {},
	// 	move2   : {},
	// 	move3   : {},
	// 	move4   : {},
	// 	item    : cardData.item,
	// 	nature  : cardData.nature,
	// 	gender  : cardData.gender
	// };

	let INITIAL_STATE = {
		name    : "",
		ability : {},
		move1   : {},
		move2   : {},
		move3   : {},
		move4   : {},
		item    : "",
		nature  : "",
		gender  : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const [ apiData, setApiData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const { items, species, natures } = useSelector(st => st);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(function loadData() {
		console.debug("EditCardForm useEffect loadSpecies");

		async function getSpeciesInfo() {
			try {
				let res = await axios.get(cardData.url);
				let t = transform(res.data);
				setApiData(t);
				console.log("api data", apiData);
				setIsLoading(false);
			} catch (err) {
				console.error("EditCardForm getSpeciesInfo: Problem loading", err);
			}
		}
		setIsLoading(true);
		getSpeciesInfo();
	}, []);

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
			!isEmpty(fData.ability)
				? await PokeappApi.addAbility(fData.ability)
				: await PokeappApi.addAbility(apiData.abilities[0]);
		} catch (err) {
			console.error("error adding ability", err);
		}
		try {
			!isEmpty(fData.move1) ? await PokeappApi.addMove(fData.move1) : await PokeappApi.addMove(apiData.moves[0]);
		} catch (err) {
			console.error("error adding move", err);
		}
		try {
			!isEmpty(fData.move2) ? await PokeappApi.addMove(fData.move2) : await PokeappApi.addMove(apiData.moves[1]);
		} catch (err) {
			console.error("error adding move", err);
		}
		try {
			!isEmpty(fData.move3) ? await PokeappApi.addMove(fData.move3) : await PokeappApi.addMove(apiData.moves[2]);
		} catch (err) {
			console.error("error adding move", err);
		}
		try {
			!isEmpty(fData.move4) ? await PokeappApi.addMove(fData.move4) : await PokeappApi.addMove(apiData.moves[3]);
		} catch (err) {
			console.error("error adding move", err);
		}
		let formattedData = {
			name      : fData.name,
			ability   : fData.ability.name ? fData.ability.name : cardData.ability,
			url       : species[cardData.speciesId].url,
			gender    : fData.gender ? fData.gender : true,
			item      : fData.item ? fData.item : cardData.item,
			nature    : fData.nature ? fData.nature : cardData.nature,
			speciesId : cardData.speciesId,
			moves     : [
				fData.move1.name ? fData.move1.name : apiData.moves[0].name,
				fData.move2.name ? fData.move2.name : apiData.moves[1].name,
				fData.move3.name ? fData.move3.name : apiData.moves[2].name,
				fData.move4.name ? fData.move4.name : apiData.moves[3].name
			]
		};

		await PokeappApi.editCard(formattedData, cardId);

		dispatch(editCard(cardData, formattedData));
		setFormData(INITIAL_STATE);
		navigate("/cards");
	};

	if (isLoading) return <p>loading...</p>;

	return (
		<Grid>
			<Paper elevation={10} className={classes.paper}>
				<Grid align="center">
					<img src={apiData.art} className={classes.image} alt="Pokemon art" />
				</Grid>
				<h2>{species[cardData.speciesId].name}</h2>
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

export default EditCardForm;
