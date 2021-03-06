import React from 'react';
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialUIForm from 'material-ui-form'
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import {pathOr} from "ramda";

import AutoCompleteField from "../common/autocompleteFormField";
import withRoot from "../common/withRoot";
import AppBanner from "../common/appBar";

export class RegistrationForm extends React.Component {

    state = {
        location: undefined
    };

    componentDidMount() {
        this.props.fetchSingleChoiceAttributes();
        this.props.fetchCities();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevUserId = pathOr(undefined, ["user", "id"], prevProps);
        const userId = pathOr(undefined, ["user", "id"], this.props);
        if(userId !== prevUserId) {
            this.props.history.push(`/profile/${userId}`);
        }
    }

    onSubmit = (values) => {
        values.location = this.state.location;
        values.profilePic = this.props.imageUrl;
        this.props.registerUser(values);
    };

    onLocationChange = (selectedLocation) => {
        this.setState({
            location: selectedLocation && selectedLocation.value
        });
    };

    handleImageUpload = e => {
        this.props.imageUpload(e.target.files[0]);
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

    getTextField = (formItemClass, fieldDisplayName, fieldName, type, isRequired, isMultiline, inputLabelProps) =>
        <TextField
            id={fieldName}
            label={fieldDisplayName}
            placeholder={fieldDisplayName}
            margin="normal"
            required={isRequired}
            name={fieldName}
            type={type}
            value=""
            className={formItemClass}
            InputLabelProps={inputLabelProps}
            multiline={isMultiline}
            rows={isMultiline && 3}
        />;

    render() {
        const {classes, cities, singleChoiceAttributes} = this.props;
        const citiesFromProps = pathOr([], ["cities"], cities);
        const citiesOptions = citiesFromProps.map(city => ({value: city, label: city.city}));
        const genderOptions = pathOr([], ["gender"], singleChoiceAttributes);
        const ethnicityOptions = pathOr([], ["ethnicity"], singleChoiceAttributes);
        const religionOptions = pathOr([], ["religion"], singleChoiceAttributes);
        const figureOptions = pathOr([], ["figure"], singleChoiceAttributes);
        const maritalStatusOptions = pathOr([], ["marital_status"], singleChoiceAttributes);

        return <div>
            <AppBanner/>
            <MaterialUIForm id="registrationForm" className={classes.container} onSubmit={this.onSubmit}>
                <Typography id="formName" className={classes.formName} component="h2" variant="h5">
                    User Registration
                </Typography>

                {this.getTextField(classes.formItem, "Email", "email", "email", true)}

                {this.getTextField(classes.formItem, "Full Name", "realName", undefined, true)}

                {this.getTextField(classes.formItem, "Display Name", "displayName", undefined, true)}

                <FormControl id="profilePic" className={classes.formItem}>
                    <FormLabel className={classes.formLabel} component="legend">Profile Picture</FormLabel>
                    <input
                        accept="image/*"
                        className={classes.input}
                        style={{display: 'none'}}
                        id="raised-button-file"
                        type="file"
                        onChange={this.handleImageUpload}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="secondary" component="span">
                            Upload
                        </Button> max 10MB
                    </label>
                </FormControl>

                {this.getTextField(classes.formItem, "Date of birth", "dateOfBirth", "date", true, undefined, {shrink: true})}

                <FormControl required={true} className={classes.formItem}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        id="gender"
                        value={genderOptions.length > 1 && genderOptions[0].name}
                    >
                        {genderOptions.map(gender => <FormControlLabel key={gender.id}
                                                                                                  value={gender.name.toUpperCase()}
                                                                                                  control={<Radio/>}
                                                                                                  label={gender.name.toUpperCase()}/>)}
                    </RadioGroup>
                </FormControl>

                {this.getSingleSelectionField(classes.formItem, "Ethnicity", "ethnicity", ethnicityOptions)}

                {this.getSingleSelectionField(classes.formItem, "Religion", "religion", religionOptions)}

                {this.getTextField(classes.formItem, "Height in centimeters", "height", "number")}

                {this.getSingleSelectionField(classes.formItem, "Figure", "figure", figureOptions)}

                {this.getSingleSelectionField(classes.formItem, "Marital Status", "maritalStatus", maritalStatusOptions, true)}

                {this.getTextField(classes.formItem, "Occupation", "occupation", undefined, undefined, true)}

                {this.getTextField(classes.formItem, "About Me", "aboutMe", undefined, undefined, true)}

                <FormControl id="location" required={true} className={classes.formItem}>
                    <FormLabel className={classes.formLabel} component="legend">Location</FormLabel>
                    <AutoCompleteField name="location" options={citiesOptions} onChange={this.onLocationChange}/>
                </FormControl>

                <div className={classes.buttonGroup}>
                    <Button id="reset" variant="contained" color="secondary" type="reset">Reset</Button>
                    <Button id="submit" variant="contained" color="primary" type="submit">Submit</Button>
                </div>

            </MaterialUIForm>
            <Snackbar
                id="snackbar"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={!!this.props.error}
                onClose={() => {}}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.error}</span>}
            />
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
        marginBottom: theme.spacing.unit * 4,
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
    },
    formLabel: {
        marginBottom: theme.spacing.unit * 2,
    }
});

export default withRoot(withStyles(styles)(RegistrationForm));