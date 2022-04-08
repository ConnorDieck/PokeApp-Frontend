import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import App from "./App";

const theme = createTheme({
	palette : {
		primary   : red,
		secondary : blue
	}
});

test("renders without crashing", () => {
	render(
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	);
});
