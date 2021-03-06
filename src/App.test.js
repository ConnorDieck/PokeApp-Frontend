import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import App from "./App";
import rootReducer from "./reducers/root";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const theme = createTheme({
	palette : {
		primary   : red,
		secondary : blue
	}
});

// smoke test
test("renders without crashing", () => {
	render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	);
});

// snapshot test
test("matches snapshot", function() {
	const { asFragment } = render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
