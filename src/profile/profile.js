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

import AppBanner from "../common/appBar";
import withRoot from "../common/withRoot";

export class Profile extends React.Component {

    componentDidMount() {
        if (!this.props.user) {
            this.props.fetchUserProfile(this.props.userId);
        }
    }

    renderField = (label, value, fieldName, onEdit) => <div className={this.props.classes.singleRowField}>
        <div className={this.props.classes.labelAndIcon}>
            {icons[fieldName]}
            <Typography id={`${fieldName}Label`}>{label}</Typography>
        </div>
        <div className={this.props.classes.value}>
            <Typography id={`${fieldName}Value`} variant="h8">{value}</Typography>
            <EditIcon id={`${fieldName}Edit`} onClick={onEdit} className={this.props.classes.edit}/>
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
                        <Avatar id="profilePic" alt={user.realName} src={user.profilePic} className={classes.bigAvatar}/>
                    </Paper>
                </div>
                <div className={classes.basicInfoSection}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">Basic Info</Typography>
                        {this.renderField("Full Name", user.realName, "realName")}
                        {this.renderField("Display Name", user.displayName, "displayName")}
                        {this.renderField("Gender", user.gender, "gender")}
                        {this.renderField("Date of Birth", user.dateOfBirth, "dateOfBirth")}
                        {this.renderField("Height in Centimeters", user.height, "height")}
                        {this.renderField("Marital Status", user.maritalStatus, "maritalStatus")}
                    </Paper>
                </div>
                <div className={classes.socialInfoSection}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">Social Info</Typography>
                        {this.renderField("About Me", user.aboutMe, "aboutMe")}
                        {this.renderField("Occupation", user.occupation, "occupation")}
                        {this.renderField("Ethnicity", user.ethnicity, "ethnicity")}
                        {this.renderField("Figure", user.figure, "figure")}
                        {this.renderField("City", user.location.city, "city")}
                    </Paper>
                </div>
            </Grid>}
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
});

export default withRoot(withStyles(styles)(Profile));