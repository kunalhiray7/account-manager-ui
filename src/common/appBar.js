import React from 'react';
import {withStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
                    <img src={banner} alt={banner}/>
                    {props.showLogout &&
                    <Link id="logout" to={paths.LOGIN}>
                        <Button color="inherit">Logout</Button>
                    </Link>}
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
});

export default withRoot(withStyles(styles)(AppBanner));