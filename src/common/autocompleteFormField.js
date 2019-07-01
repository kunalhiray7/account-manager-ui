import React from 'react';
import Select from 'react-select';
import {withStyles} from "@material-ui/core";
import NoSsr from '@material-ui/core/NoSsr';
import withRoot from "./withRoot";

const styles = () => ({
    root: {
        flexGrow: 1,
    }
});

export function AutoCompleteField(props) {
    const [single, setSingle] = React.useState(null);

    function handleChangeSingle(value) {
        setSingle(value);
        props.onChange(value);
    }

    const {classes, options, name} = props;
    return (
        <div className={classes.root}>
            <NoSsr>
                <Select
                    id={name}
                    classes={classes}
                    inputId="react-select-single"
                    options={options}
                    value={single}
                    name={name}
                    onChange={handleChangeSingle}
                />
            </NoSsr>
        </div>
    );
}

export default withRoot(withStyles(styles)(AutoCompleteField))
