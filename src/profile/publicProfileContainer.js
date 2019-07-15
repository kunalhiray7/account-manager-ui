import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actionsAndReducers/actions';
import Profile from './profile';

const mapStateToProps = (state, ownParams) => {
    return {
        userId: ownParams.match.params.userId,
        publicMode: true,
        user: state.registration.user,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
