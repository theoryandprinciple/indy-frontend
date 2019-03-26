import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import counter from './counter';
import auth from './auth';

export default(history) => combineReducers({

    router: connectRouter(history),
    counter,
    auth,

});
