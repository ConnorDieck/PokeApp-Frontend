import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() =>({
    link: {
        textDecoration: "none",
        fontSize: "20px",
        color: "blue"
    },
    icon: {
        color: "white"
    }
}));

function DrawerComponent({logout}) {
    const classes = useStyles();
    const [ openDrawer, setOpenDrawer ] = useState(false);
    const {user, isAuthenticated} = useSelector(st => st.auth)

    let drawer = {}

    if (isAuthenticated) {
        drawer = (
            <>
                <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <List>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/" className={classes.link}>
                                    Home
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/teams" className={classes.link}>
                                    Teams
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/cards" className={classes.link}>
                                    {user.username}'s PC
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/profile" className={classes.link}>
                                    Profile
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/" className={classes.link} onClick={() => logout()}>
                                    Logout
                                </Link>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon}>
                    <MenuIcon />
                </IconButton>
            </>
        )
    } else {
        drawer = (
            <>
                <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <List>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/" className={classes.link}>
                                    Home
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/login" className={classes.link}>
                                    Login
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/signup" className={classes.link}>
                                    Sign Up
                                </Link>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon}>
                    <MenuIcon />
                </IconButton>
            </>
        )
    }
    return drawer
}

export default DrawerComponent;
