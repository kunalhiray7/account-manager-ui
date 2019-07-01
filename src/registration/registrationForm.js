import React from 'react';
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialUIForm from 'material-ui-form'

import withRoot from "../common/withRoot";
import AppBanner from "../common/appBar";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

export class RegistrationForm extends React.Component {

    componentDidMount() {
        this.props.fetchSingleChoiceAttributes();
        this.props.fetchCities();
    }

    onSubmit = (values, pristineValues) => {
        console.log(values, pristineValues);
        this.props.registerUser(values);
    };

    getSingleSelectionField = (formItemClass, fieldDisplayName, fieldName, values, isRequired) => <FormControl
        required={isRequired}
        id={fieldName}
        className={formItemClass}>
        <InputLabel htmlFor={`${fieldName}-helper`}>{fieldDisplayName}</InputLabel>
        <Select
            value=""
            name={fieldName}
            input={<Input name={`${fieldName}-1`} id={`${fieldName}-helper`}/>}
        >
            {!isRequired && <MenuItem value="">
                <em>None</em>
            </MenuItem>}
            {values.map(value => <MenuItem key={value.id} value={value.name}>{value.name}</MenuItem>)}
        </Select>
    </FormControl>;

    render() {
        const {classes} = this.props;

        return <div>
            <AppBanner/>
            <MaterialUIForm id="registrationForm" className={classes.container} onSubmit={this.onSubmit}>
                <Typography id="formName" className={classes.formName} component="h2" variant="h5">
                    User Registration
                </Typography>
                <TextField
                    id="email"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    required={true}
                    name="email"
                    type="email"
                    value=""
                    className={classes.formItem}
                />

                <TextField
                    id="realName"
                    label="Full Name"
                    placeholder="Full Name"
                    margin="normal"
                    required={true}
                    name="realName"
                    value=""
                    className={classes.formItem}
                />

                <TextField
                    id="displayName"
                    label="Display Name"
                    placeholder="Display Name"
                    margin="normal"
                    required={true}
                    name="displayName"
                    value=""
                    className={classes.formItem}
                />

                <TextField
                    id="profilePic"
                    label="Profile Picture"
                    placeholder="Profile Picture"
                    margin="normal"
                    name="profilePic"
                    type="file"
                    className={classes.formItem}
                />

                <TextField
                    id="dob"
                    label="Date of birth"
                    type="date"
                    className={classes.formItem}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required={true}
                    name="dateOfBirth"
                    value=""
                />

                <FormControl required={true} className={classes.formItem}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        id="gender"
                        value={this.props.singleChoiceAttributes.gender[0].name}
                    >
                        {this.props.singleChoiceAttributes.gender.map(gender => <FormControlLabel key={gender.id}
                                                                                                  value={gender.name}
                                                                                                  control={<Radio/>}
                                                                                                  label={gender.name.toUpperCase()}/>)}
                    </RadioGroup>
                </FormControl>

                {this.getSingleSelectionField(classes.formItem, "Ethnicity", "ethnicity", this.props.singleChoiceAttributes.ethnicity)}

                {this.getSingleSelectionField(classes.formItem, "Religion", "religion", this.props.singleChoiceAttributes.religion)}

                <TextField
                    id="height"
                    label="Height"
                    type="number"
                    className={classes.formItem}
                    name="height"
                    value=""
                    placeholder="Height in centimeters"
                    margin="normal"
                />

                {this.getSingleSelectionField(classes.formItem, "Figure", "figure", this.props.singleChoiceAttributes.figure)}

                {this.getSingleSelectionField(classes.formItem, "Marital Status", "maritalStatus", this.props.singleChoiceAttributes.marital_status, true)}

                <TextField
                    id="occupation"
                    label="Occupation"
                    className={classes.formItem}
                    name="occupation"
                    value=""
                    placeholder="Occupation"
                    margin="normal"
                    multiline={true}
                    rows={3}
                />

                <TextField
                    id="aboutMe"
                    label="About Me"
                    className={classes.formItem}
                    name="aboutMe"
                    value=""
                    placeholder="About Me"
                    margin="normal"
                    multiline={true}
                    rows={3}
                />

                <div className={classes.buttonGroup}>
                    <Button id="reset" variant="contained" color="secondary" type="reset">Reset</Button>
                    <Button id="submit" variant="contained" color="primary" type="submit">Submit</Button>
                </div>

            </MaterialUIForm>
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
    formItem: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
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
    },
    formName: {
        marginBottom: '10px'
    },
    buttonGroup: {
        width: "20%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default withRoot(withStyles(styles)(RegistrationForm));