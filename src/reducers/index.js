import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Auth from './auth';

const Reducers = combineReducers({
    auth: Auth,
    routing: routerReducer,
});

export default Reducers;
