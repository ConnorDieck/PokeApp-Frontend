import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router-dom";

//smoke test
it("renders without crashing", function() {
	render(
		<MemoryRouter>
			<LoginForm />
		</MemoryRouter>
	);
});

// snapshot test
test("matches snapshot", function() {
	const { asFragment } = render(
		<MemoryRouter>
			<LoginForm />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
