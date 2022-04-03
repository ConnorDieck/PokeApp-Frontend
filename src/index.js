import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import PokeappApi from "./api";
// import { setCurrentUser } from "./actions/authActions";
// import jwt from "jsonwebtoken";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// if (localStorage.token) {
// 	PokeappApi.token = localStorage.token;
// 	store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
// }

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
