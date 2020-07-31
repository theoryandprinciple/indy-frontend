import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Auth from './auth';
import User from './user';

const Reducers = history => combineReducers({
    auth: Auth,
    user: User,
    router: connectRouter(history),
});

export default Reducers;
