import React from 'react';
import {Paper, Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import TagFaceIcon from '@material-ui/icons/TagFaces';
import WcIcon from '@material-ui/icons/Wc';
import EditIcon from '@material-ui/icons/Edit';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import GroupTopIcon from '@material-ui/icons/Group';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TextIcon from '@material-ui/icons/TextsmsSharp';
import BusinessIcon from '@material-ui/icons/Business';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FigureIcon from '@material-ui/icons/ThreeSixty';
import LocationIcon from '@material-ui/icons/LocationOn';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

import AppBanner from "../common/appBar";
import withRoot from "../common/withRoot";
import AutoCompleteField from "../common/autocompleteFormField";

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.fields = this.getProfileFieldsWithMetadata(props);
    }

    state = {
        isEditModalOpen: false,
        updatedField: undefined,
        updatedValue: undefined
    };

    modalChildComponent = undefined;

    componentDidMount() {
        if (!this.props.user) {
            this.props.fetchUserProfile(this.props.userId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fields = this.getProfileFieldsWithMetadata(this.props);
    }

    getProfileFieldsWithMetadata = props => {
        const cities = props.cities.cities.map(city => ({value: city, label: city.city}));
        return {
            realName: {label: "Full Name", type: "textField", subType: undefined, isRequired: true},
            displayName: {label: "Display Name", type: "textField", subType: undefined, isRequired: true},
            gender: {label: "Gender", type: "radio", subType: undefined, isRequired: true, options: props.singleChoiceAttributes.gender},
            dateOfBirth: {label: "Date of Birth", type: "textField", subType: "date", isRequired: true},
            height: {label: "Height in Centimeters", type: "textField", subType: "number", isRequired: false},
            maritalStatus: {label: "Marital Status", type: "select", subType: undefined, isRequired: false, options: props.singleChoiceAttributes.marital_status},
            aboutMe: {label: "About Me", type: "textField", subType: undefined, multiline: true, isRequired: false},
            occupation: {label: "Occupation", type: "textField", subType: undefined, multiline: true, isRequired: false},
            ethnicity: {label: "Ethnicity", type: "select", subType: undefined, isRequired: false, options: props.singleChoiceAttributes.ethnicity},
            figure: {label: "Figure", type: "select", subType: undefined, isRequired: false, options: props.singleChoiceAttributes.figure},
            city: {label: "City", type: "autoComplete", subType: undefined, isRequired: true, options: cities},
        }
    };

    openEditModal = () => {
        this.setState({isEditModalOpen: true})
    };

    closeEditModal = () => {
        this.setState({isEditModalOpen: false})
    };

    onEdit = (field) => {
        this.modalChildComponent = this.getModalChildComponent(field);
        this.openEditModal();
    };

    getModalChildComponent = (field) => {
        const fieldMetadata = this.fields[field];
        if (fieldMetadata.type === "textField") {
            return this.getTextField(field, fieldMetadata.label, fieldMetadata.subType,
                fieldMetadata.isRequired, fieldMetadata.multiline)
        }
        if (fieldMetadata.type === "radio") {
            return this.getRadioButton(field, fieldMetadata.label, fieldMetadata.options);
        }
        if (fieldMetadata.type === "select") {
            return this.getSingleSelectionField(fieldMetadata.label, field, fieldMetadata.options, fieldMetadata.isRequired)
        }
        if (fieldMetadata.type === "autoComplete") {
            return this.getAutoCompleteField(fieldMetadata.options)
        }
    };

    getAutoCompleteField = (cities) => <div>
        <FormLabel component="legend">Location</FormLabel>
        <AutoCompleteField id="locationSelect" name="location" options={cities} onChange={(value) => this.onAutoCompleteFieldChange(value, "city")}/>
    </div>;

    onFieldChange = (event, fieldName) => {
        console.log(event.target.value);
        this.setState({
            updatedValue: event.target.value,
            updatedField: fieldName
        });
    };

    onAutoCompleteFieldChange = (value, fieldName) => {
        console.log(value);
        this.setState({
            updatedValue: value,
            updatedField: fieldName
        });
    };

    getTextField = (fieldName, fieldDisplayName, type, isRequired, isMultiline, inputLabelProps) =>
        <TextField
            id={fieldName}
            label={fieldDisplayName}
            placeholder={fieldDisplayName}
            margin="normal"
            required={isRequired}
            name={fieldName}
            type={type}
            InputLabelProps={inputLabelProps}
            multiline={isMultiline}
            rows={isMultiline && 3}
            onChange={(e) => this.onFieldChange(e, fieldName)}
        />;

    getRadioButton = (fieldName, label, options) => <div>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
            aria-label={label}
            name={fieldName}
            id={`${fieldName}Radio`}
            onChange={(e) => this.onFieldChange(e, fieldName)}
        >
            {options.map(option => <FormControlLabel key={option.id}
                                                     value={option.name}
                                                     control={<Radio/>}
                                                     label={option.name.toUpperCase()}/>)}
        </RadioGroup>
    </div>;

    getSingleSelectionField = (fieldDisplayName, fieldName, values, isRequired) => <FormControl
        required={isRequired}
        id={fieldName}>
        <InputLabel htmlFor={`${fieldName}-helper`}>{fieldDisplayName}</InputLabel>
        <Select
            value=""
            id={`${fieldName}Select`}
            name={fieldName}
            input={<Input name={`${fieldName}-1`} id={`${fieldName}-helper`}/>}
            onChange={(e) => this.onFieldChange(e, fieldName)}
        >
            {!isRequired && <MenuItem value="">
                <em>None</em>
            </MenuItem>}
            {values.map(value => <MenuItem key={value.id} value={value.name}>{value.name}</MenuItem>)}
        </Select>
    </FormControl>;

    renderField = (label, value, fieldName, onEdit) => <div className={this.props.classes.singleRowField}>
        <div className={this.props.classes.labelAndIcon}>
            {icons[fieldName]}
            <Typography id={`${fieldName}Label`}>{label}</Typography>
        </div>
        <div className={this.props.classes.value}>
            <Typography id={`${fieldName}Value`} variant="h8">{value}</Typography>
            {onEdit &&
            <EditIcon id={`${fieldName}Edit`} onClick={() => onEdit(fieldName)} className={this.props.classes.edit}/>}
        </div>
    </div>;

    render() {
        const {classes, user} = this.props;
        return <React.Fragment>
            <AppBanner id="appBanner" showLogout={true}/>
            {user &&
            <Grid container spacing={3}>
                <div className={classes.profileImageContainer}>
                    <Paper className={classes.paper}>
                        <Avatar id="profilePic" alt={user.realName} src={user.profilePic}
                                className={classes.bigAvatar}/>
                    </Paper>
                </div>
                <div className={classes.basicInfoSection}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">Basic Info</Typography>
                        {this.renderField("Full Name", user.realName, "realName", this.onEdit)}
                        {this.renderField("Display Name", user.displayName, "displayName", this.onEdit)}
                        {this.renderField("Gender", user.gender, "gender", this.onEdit)}
                        {this.renderField("Date of Birth", user.dateOfBirth, "dateOfBirth", this.onEdit)}
                        {this.renderField("Height in Centimeters", user.height, "height")}
                        {this.renderField("Marital Status", user.maritalStatus, "maritalStatus", this.onEdit)}
                    </Paper>
                </div>
                <div className={classes.socialInfoSection}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">Social Info</Typography>
                        {this.renderField("About Me", user.aboutMe, "aboutMe", this.onEdit)}
                        {this.renderField("Occupation", user.occupation, "occupation", this.onEdit)}
                        {this.renderField("Ethnicity", user.ethnicity, "ethnicity", this.onEdit)}
                        {this.renderField("Figure", user.figure, "figure", this.onEdit)}
                        {this.renderField("City", user.location.city, "city", this.onEdit)}
                    </Paper>
                </div>
            </Grid>}
            <Dialog id="dialog" open={this.state.isEditModalOpen} onClose={this.closeEditModal}
                    aria-labelledby="form-dialog-title"
                    fullWidth="md"
                    maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new value
                    </DialogContentText>
                    {this.modalChildComponent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.closeEditModal} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    }
}

const icons = {
    realName: <PersonIcon id="realNameIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    displayName: <TagFaceIcon id="displayNameIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    gender: <WcIcon id="genderIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    height: <VerticalAlignTopIcon id="heightIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    maritalStatus: <GroupTopIcon id="maritalStatusIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    dateOfBirth: <CalendarIcon id="dateOfBirthIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    aboutMe: <TextIcon id="aboutMeIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    occupation: <BusinessIcon id="occupationIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    ethnicity: <PersonPinIcon id="ethnicityIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    figure: <FigureIcon id="figureIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
    city: <LocationIcon id="cityIcon" style={{fontSize: "26px", margin: "0 10px"}}/>,
};

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    profileImageContainer: {
        width: "30%",
        height: "auto",
        flexDirection: "row",
        justifyContent: "center"
    },
    basicInfoSection: {
        width: "70%",
        height: "auto",
    },
    socialInfoSection: {
        width: "100%",
        height: "auto",
    },
    bigAvatar: {
        margin: 10,
        width: 300,
        height: 300,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: "10px"
    },
    singleRowField: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    labelAndIcon: {
        width: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: "5px",
        padding: "6px",
    },
    value: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: "5px",
        padding: "6px",
    },
    edit: {
        fontSize: "26px",
        margin: "0 10px",
        color: theme.palette.secondary.dark,
        justifyContent: "flex-start",
    },
    formItem: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4,
        width: '90%',
    }
});

export default withRoot(withStyles(styles)(Profile));