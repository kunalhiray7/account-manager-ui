import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actionsAndReducers/actions';
import Profile from './profile';

const mapStateToProps = (state, ownParams) => {
    return {
        user: state.registration.user,
        userId: ownParams.match.params.userId,
        singleChoiceAttributes: state.registration.singleChoiceAttributes,
        cities: state.registration.cities,
        imageUrl: state.registration.imageUrl,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
