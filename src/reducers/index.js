import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Intake from './intake';
import Form from './form';

const Reducers = history => combineReducers({
    intake: Intake,
    form: Form,
    router: connectRouter(history),
});

export default Reducers;
