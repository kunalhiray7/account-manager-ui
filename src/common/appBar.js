import React from 'react';
import {withStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

import withRoot from "./withRoot";
import {paths} from "./constants";
import {Link} from "react-router-dom";

const banner = require('./banner.png');

export function AppBanner(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <AppBar id="appBanner" position="static">
                <Toolbar>
                    <div className={classes.toolbar}>
                    <img height={80} src={banner} alt={banner}/>
                    {props.showLogout &&
                    <Link id="logout" to={paths.LOGIN}>
                        <LogoutIcon className={classes.logout}/>
                    </Link>}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing * 2,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logout: {
        fontSize: "26px",
        margin: "20px",
        color: "white",
    }
});

export default withRoot(withStyles(styles)(AppBanner));