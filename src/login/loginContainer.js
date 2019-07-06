import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actionsAndReducers/actions';
import Login from './login';

const mapStateToProps = state => {
    return {

    }
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
