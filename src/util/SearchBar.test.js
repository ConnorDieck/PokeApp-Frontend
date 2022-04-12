import React from "react";
import { render } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { MemoryRouter } from "react-router-dom";

//smoke test
it("renders without crashing", function() {
	render(
		<MemoryRouter>
			<SearchBar />
		</MemoryRouter>
	);
});

// snapshot test
test("matches snapshot", function() {
	const { asFragment } = render(
		<MemoryRouter>
			<SearchBar />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
