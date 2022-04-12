/** TO DO: Implement mock Redux store for testing */

// import React from "react";
// import { render } from "@testing-library/react";
// import Card from "./Card";
// import { MemoryRouter } from "react-router-dom";
// import rootReducer from "../reducers/root";
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { Provider } from "react-redux";
// import { makeStyles } from "@mui/styles";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { styled } from "@mui/material/styles";
// import { red, blue } from "@mui/material/colors";

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// // const Item = styled(Paper)(({ theme }) => ({
// // 	backgroundColor : theme.palette.mode === "dark" ? "#1A2027" : "#fff",
// // 	...theme.typography.body2,
// // 	padding         : theme.spacing(1),
// // 	margin          : theme.spacing(1),
// // 	textAlign       : "center"
// // }));

// const useStyles = makeStyles(theme => ({
// 	image : {
// 		[theme.breakpoints.down("sm")]: {
// 			width : "70vw"
// 		},
// 		[theme.breakpoints.up("md")]: {
// 			width : "475px"
// 		}
// 	},
// 	paper : {
// 		[theme.breakpoints.down("sm")]: {
// 			width : "90vw"
// 		},
// 		[theme.breakpoints.up("md")]: {
// 			width : "600px"
// 		},
// 		padding                        : 20,
// 		height                         : "auto",
// 		margin                         : "20px auto"
// 	},
// 	grid  : {
// 		marginTop     : 2,
// 		paddingRight  : 2,
// 		paddingBottom : 2,
// 		marginLeft    : "auto",
// 		marginRight   : "auto",
// 		maxWidth      : 500
// 	}
// }));

// const theme = createTheme({
// 	palette : {
// 		primary   : red,
// 		secondary : blue
// 	}
// });

// //smoke test
// it("renders without crashing", function() {
// 	render(
// 		<Provider store={store}>
// 			<MemoryRouter>
// 				<ThemeProvider theme={theme}>
// 					<Card />
// 				</ThemeProvider>
// 			</MemoryRouter>
// 		</Provider>
// 	);
// });

// // snapshot test
// test("matches snapshot", function() {
// 	const { asFragment } = render(
// 		<Provider store={store}>
// 			<MemoryRouter>
// 				<ThemeProvider theme={theme}>
// 					<Card />
// 				</ThemeProvider>
// 			</MemoryRouter>
// 		</Provider>
// 	);
// 	expect(asFragment()).toMatchSnapshot();
// });
