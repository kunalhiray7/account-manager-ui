import React from 'react';
import TextField from "@material-ui/core/TextField";
import withRoot from "../common/withRoot";
import {withStyles} from "@material-ui/core";

export class RegistrationForm extends React.Component {

    componentDidMount() {
        this.props.fetchSingleChoiceAttributes();
        this.props.fetchCities();
    }

    render() {
        const {classes} = this.props;

        return <div>
            <form className={classes.container}>
                <TextField
                    id="realName"
                    label="Full Name"
                    placeholder="Full Name"
                    className={classes.textField}
                    margin="normal"
                />
            </form>
        </div>
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

export default withRoot(withStyles(styles)(RegistrationForm));