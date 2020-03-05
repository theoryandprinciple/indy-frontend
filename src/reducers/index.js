import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Auth from './auth';
import User from './user';

const Reducers = combineReducers({
    auth: Auth,
    user: User,
    routing: routerReducer,
});

export default Reducers;
