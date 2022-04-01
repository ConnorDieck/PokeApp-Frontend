import "./App.css";
import Navigator from "./Navigator";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";

const theme = createTheme({
	palette : {
		primary   : red,
		secondary : blue
	}
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<header className="App-header" />
				<Navigator />
			</div>
		</ThemeProvider>
	);
}

export default App;
