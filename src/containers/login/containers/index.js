import * as Auth from '../../../actions/auth';
import { connect } from 'react-redux';
import Login from '../components/';

const internals = {};

internals.connectStuff = connect(
  state => ({
    errored: state.auth.error.login
  }),
  {
    login: Auth.login
  }
);

export default internals.connectStuff(Login)
