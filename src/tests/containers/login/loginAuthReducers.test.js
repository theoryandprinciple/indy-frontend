import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as AuthActions from '../../../../src/actions/auth'
import * as AuthReducers from '../../../../src/reducers/auth'
import * as Types from '../../../../src/action-types/auth'
import testHelper from '../../testHelper'
import mockAxios from 'jest-mock-axios'

export const mockStore = configureStore([thunk])
const store = mockStore()

// The assertion for a promise must be returned.
describe('Test the reducers for auth', () => {
    it('test login attempt', async () => {
        let testType = {
            type: Types.default.LOGIN_BEGIN,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = { status: '@@auth-status/WAITING' }
        let returnVal = AuthReducers.default(store.getState(), testType)
        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test login success', async () => {
        let testType = {
            type: Types.default.LOGIN_SUCCESS,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            artifacts: {},
            credentials: {},
            error: { login: false },
            isAuthenticated: true,
            status: '@@auth-status/FINISHED'
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test login fail', async () => {
        let testType = {
            type: Types.default.LOGIN_FAIL,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            error: { login: true },
            status: '@@auth-status/FINISHED'
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test logout fail', async () => {
        let testType = {
            type: Types.default.LOGOUT_FAIL,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            error: { logout: true },
            status: '@@auth-status/FINISHED'
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test logout success', async () => {
        let testType = {
            type: Types.default.LOGOUT_SUCCESS,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            artifacts: {},
            credentials: {},
            error: { logout: false },
            isAuthenticated: false,
            status: '@@auth-status/FINISHED'
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test logout attempt', async () => {
        let testType = {
            type: Types.default.LOGOUT_BEGIN,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            isAuthenticated: false,
            status: '@@auth-status/WAITING_LOGOUT'
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test no token', async () => {
        let testType = {
            type: Types.default.NO_TOKEN,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            isAuthenticated: false,
            status: '@@auth-status/FINISHED'
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })

    it('test clear errors', async () => {
        let testType = {
            type: Types.default.CLEAR_ERRORS,
            payload: { testData: 'Some test data' }
        }

        let expectedReturn = {
            error: { login: false, logout: false },
            forgotPass: { complete: false, error: false, errorMsg: '' },
            resetPass: { error: false, errorMsg: '' }
        }

        let returnVal = AuthReducers.default(store.getState(), testType)

        return expect(returnVal).toEqual(expectedReturn)
    })
})
