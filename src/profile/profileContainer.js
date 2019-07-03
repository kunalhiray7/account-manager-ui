import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from './actions';
import Profile from './profile';

const mapStateToProps = (state, ownParams) => {
    return {
        user: state.registration.user,
        userId: ownParams.match.params.userId,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
