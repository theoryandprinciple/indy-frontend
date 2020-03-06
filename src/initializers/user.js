import { CheckToken } from '../actions/auth';

export default (store) => {
    store.dispatch(CheckToken());
};
