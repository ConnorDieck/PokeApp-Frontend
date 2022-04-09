import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, FormControl, TextField, Button, Paper, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = ({ login }) => {
	let INITIAL_STATE = {
		username : "",
		password : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const navigate = useNavigate();

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// when submitted, runs login function the current user and token to state
	const handleSubmit = async evt => {
		evt.preventDefault();
		let res = await login(fData);
		setFormData(INITIAL_STATE);
		if (res.success) {
			navigate("/");
		} else {
			alert(res.err);
		}
	};

	const paperStyle = {
		padding : 20,
		height  : "auto",
		width   : 280,
		margin  : "20px auto"
	};

	const avatarStyle = {
		backgroundColor : "#22d46c"
	};

	const btnStyle = {
		margin : "8px 0"
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockOutlinedIcon />
					</Avatar>
				</Grid>
				<h2>Log In</h2>
				<form className="auth-form" onSubmit={handleSubmit}>
					<FormControl>
						<TextField //
							label="Username"
							id="login_username"
							name="username"
							value={fData.username}
							onChange={handleChange}
							placeholder="Username"
							className="styled-input"
							fullWidth
							required
						/>

						<TextField //
							label="Password"
							id="login_password"
							name="password"
							type="password"
							value={fData.password}
							onChange={handleChange}
							placeholder="Password"
							className="styled-input"
							fullWidth
							required
						/>

						<Button variant="contained" color="secondary" style={btnStyle} type="submit">
							Login
						</Button>
					</FormControl>
				</form>
				<Typography>
					Don't have an account?
					<Link to="/signup">Sign Up</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};

export default LoginForm;
