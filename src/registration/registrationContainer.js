import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actionsAndReducers/actions';
import RegistrationForm from './registrationForm';

const mapStateToProps = state => {
    return {
        singleChoiceAttributes: state.registration.singleChoiceAttributes,
        cities: state.registration.cities,
        isLoading: state.registration.isLoading,
        error: state.registration.error,
        user: state.registration.user,
        imageUrl: state.registration.imageUrl,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
