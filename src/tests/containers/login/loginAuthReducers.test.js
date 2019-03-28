import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthReducers from '../../../reducers/auth';
import * as Types from '../../../action-types/auth';

const mockStore = configureStore([thunk]);
const store = mockStore();

// The assertion for a promise must be returned.
describe('Test the reducers for auth', () => {
    it('test login attempt', async () => {
        const testType = {
            type: Types.default.LOGIN_BEGIN,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = { status: '@@auth-status/WAITING' };
        const returnVal = AuthReducers.default(store.getState(), testType);
        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test login success', async () => {
        const testType = {
            type: Types.default.LOGIN_SUCCESS,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            artifacts: {},
            credentials: {},
            error: { login: false },
            isAuthenticated: true,
            status: '@@auth-status/FINISHED',
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test login fail', async () => {
        const testType = {
            type: Types.default.LOGIN_FAIL,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            error: { login: true },
            status: '@@auth-status/FINISHED',
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test logout fail', async () => {
        const testType = {
            type: Types.default.LOGOUT_FAIL,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            error: { logout: true },
            status: '@@auth-status/FINISHED',
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test logout success', async () => {
        const testType = {
            type: Types.default.LOGOUT_SUCCESS,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            artifacts: {},
            credentials: {},
            error: { logout: false },
            isAuthenticated: false,
            status: '@@auth-status/FINISHED',
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test logout attempt', async () => {
        const testType = {
            type: Types.default.LOGOUT_BEGIN,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            isAuthenticated: false,
            status: '@@auth-status/WAITING_LOGOUT',
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test no token', async () => {
        const testType = {
            type: Types.default.NO_TOKEN,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            isAuthenticated: false,
            status: '@@auth-status/FINISHED',
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });

    it('test clear errors', async () => {
        const testType = {
            type: Types.default.CLEAR_ERRORS,
            payload: { testData: 'Some test data' },
        };

        const expectedReturn = {
            error: { login: false, logout: false },
            forgotPass: { complete: false, error: false, errorMsg: '' },
            resetPass: { error: false, errorMsg: '' },
        };

        const returnVal = AuthReducers.default(store.getState(), testType);

        return expect(returnVal).toEqual(expectedReturn);
    });
});
