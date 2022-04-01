import React from "react";
import { useSelector } from "react-redux";
import {Button} from "@mui/material"

function Home() {
    // Layout varies depending on whether a user is present or not
    const currentUser = useSelector(st => st.user)

    let options = {};
    if (currentUser) {
        options = (
            <>
                <Button variant="contained" color="secondary">SIGN IN</Button>
                <p>OR</p>
                <Button variant="text" color="primary">GET STARTED</Button>
            </>
        )
    } else {
        options = (
            <>
                <Button variant="contained" color="secondary">LOAD TEAM</Button>
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