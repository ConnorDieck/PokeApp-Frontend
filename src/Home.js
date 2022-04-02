import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material"

function Home() {
    // Layout varies depending on whether a user is present or not
    const {isAuthenticated} = useSelector(st => st.auth)

    let options = {};
    if (!isAuthenticated) {
        options = (
            <>
                <Button variant="contained" color="secondary" href="/login">SIGN IN</Button>
                <p>OR</p>
                <Button variant="text" color="primary" href="/teams">GET STARTED</Button>
            </>
        )
    } else {
        options = (
            <>
                <Button variant="contained" color="secondary">LOAD TEAMS</Button>
                <p>OR</p>
                <Button variant="text" color="primary">CREATE NEW</Button>
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