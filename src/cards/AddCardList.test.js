import React from "react";
import { render } from "@testing-library/react";
import AddCardList from "./AddCardList";
import { MemoryRouter } from "react-router-dom";
import rootReducer from "../reducers/root";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//smoke test
it("renders without crashing", function() {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<AddCardList />
			</MemoryRouter>
		</Provider>
	);
});

// snapshot test
test("matches snapshot", function() {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<AddCardList />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
