import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Intake from './intake';

const Reducers = history => combineReducers({
    intake: Intake,
    router: connectRouter(history),
});

export default Reducers;
