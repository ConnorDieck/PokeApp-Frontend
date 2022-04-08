import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

/** Landing page for app. */

function Home() {
    // Layout varies depending on whether a user is present or not
    const {isAuthenticated} = useSelector(st => st.auth)

    let options = {};
    if (!isAuthenticated) {
        options = (
            <>
                <Button component={Link} to="/login" variant="contained" color="secondary" >SIGN IN</Button>
                <p>OR</p>
                <Button component={Link} to="/species" variant="text" color="primary">DEMO</Button>
            </>
        )
    } else {
        options = (
            <>
                <Button component={Link} to="/teams" variant="contained" color="secondary">LOAD TEAMS</Button>
                <p>OR</p>
                <Button component={Link} to="/teams/new" variant="text" color="primary">CREATE NEW TEAM</Button>
            </>
        )
    }

    return (
        <div className="homepage">
            <h2 className="title">POKEAPP</h2>
            <div className="options">
                {options}
            </div>
        </div>
    )
}

export default Home;