import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../common/withRoot';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom";
import {paths} from "../common/constants";

export class Login extends React.Component {

    state = {
        username: undefined
    };

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state.username, this.props.history);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    Welcome to CoffeeWithMe
                </Typography>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <TextField
                                id="username"
                                label="Username"
                                placeholder="Username"
                                className={classes.textField}
                                margin="normal"
                                type="email"
                                onChange={this.handleUsernameChange}
                            />
                            <Button id="login" variant="contained" color="primary" onClick={this.handleClick}>
                                Login
                            </Button>

                        </Grid>
                    </form>
                    <Typography gutterBottom>Not registered yet?</Typography>
                    <Link to={paths.REGISTRATION}>
                        <Button id="register" variant="contained" color="secondary">
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        border: '1px solid black',
        padding: '20px',
        margin: '20px',
        borderRadius: '5px'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    paper: {
        marginTop: theme.spacing * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing * 1,
        backgroundColor: theme.palette.secondary.main,
    }
});


export default withRoot(withStyles(styles)(Login));