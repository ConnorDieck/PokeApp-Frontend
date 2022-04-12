import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router-dom";

//smoke test
it("renders without crashing", function() {
	render(
		<MemoryRouter>
			<SignupForm />
		</MemoryRouter>
	);
});

// snapshot test
test("matches snapshot", function() {
	const { asFragment } = render(
		<MemoryRouter>
			<SignupForm />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
