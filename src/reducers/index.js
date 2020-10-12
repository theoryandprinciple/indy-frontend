import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import User from './user';

const Reducers = history => combineReducers({
    user: User,
    router: connectRouter(history),
});

export default Reducers;
