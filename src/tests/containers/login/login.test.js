import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'jest-mock-axios';
import * as AuthActions from '../../../actions/auth';
import testHelper from '../../testHelper';

const mockStore = configureStore([thunk]);
const store = mockStore();

// The assertion for a promise must be returned.
it('test login', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: testHelper.loginToken, status: 200 }));

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { role: testHelper.loginRole }, status: 200 }));

    const expectedActions = [
        {
            payload: [testHelper.loginEmail, testHelper.loginPassword],
            type: 'LOGIN_BEGIN',
        },
        {
            payload: {
                artifacts: null,
                credentials: {
                    role: testHelper.loginRole,
                    token: testHelper.loginToken,
                },
            },
            type: 'LOGIN_SUCCESS',
        },
    ];

    await store
        .dispatch(
            AuthActions.login(testHelper.loginEmail, testHelper.loginPassword),
        )
        .then(async () => {
            console.log('store.getActions()', store.getActions());
            console.log('expectedActions', expectedActions);
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockAxios.post).toHaveBeenCalledWith(
                '/login',
                {
                    email: testHelper.loginEmail,
                    password: testHelper.loginPassword,
                },
                { responseType: 'text' },
            );
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith('/user', {
                headers: { authorization: testHelper.loginToken },
            });

            return expect(mockAxios.get).toHaveBeenCalledTimes(1);
        });
});

it('test logout', async () => {
    store.clearActions();
    const expectedActions = [
        { payload: [], type: 'LOGOUT_BEGIN' },
        { payload: null, type: 'LOGOUT_SUCCESS' },
    ];
    await store.dispatch(AuthActions.logout());
    expect(store.getActions()).toEqual(expectedActions);
});
