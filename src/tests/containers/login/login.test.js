import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import * as AuthActions from '../../../../src/actions/auth';
import testHelper from '../../testHelper'
import mockAxios from 'jest-mock-axios';


export const mockStore = configureStore([thunk]);
const store = mockStore();

// The assertion for a promise must be returned.
it('test login', async() => {

  mockAxios.post.mockImplementationOnce(() =>
   Promise.resolve({ data: testHelper.loginToken, status: 200 })
  );

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { role: testHelper.loginRole }, status: 200 })
  );

  let expectedActions =
       [{"payload": [testHelper.loginEmail, testHelper.loginPassword], "type": "LOGIN_ATTEMPT"},
       {"payload": {"artifacts": null, "credentials": {"role": testHelper.loginRole, "token": testHelper.loginToken}},
       "type": "LOGIN_SUCCESS"}];

  await store.dispatch(AuthActions.login(testHelper.loginEmail, testHelper.loginPassword)).then(async () => {

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalledWith('/login', {"email": testHelper.loginEmail, "password": testHelper.loginPassword}, { responseType: 'text' });
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('/user', {"headers": {"authorization": testHelper.loginToken}});

    return expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

});

it('test logout', async() => {

  mockAxios.post.mockImplementationOnce(() =>
   Promise.resolve({ data: testHelper.loginToken, status: 200 })
  );

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { role: testHelper.loginRole }, status: 200 })
  );

  let expectedActions =
       [{"payload": [testHelper.loginEmail, testHelper.loginPassword], "type": "LOGIN_ATTEMPT"},
       {"payload": {"artifacts": null, "credentials": {"role": testHelper.loginRole, "token": testHelper.loginToken}},
       "type": "LOGIN_SUCCESS"}];

  await store.dispatch(AuthActions.login(testHelper.loginEmail, testHelper.loginPassword)).then(async () => {

    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalledWith('/login', {"email": testHelper.loginEmail, "password": testHelper.loginPassword}, { responseType: 'text' });
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('/user', {"headers": {"authorization": testHelper.loginToken}});

    return expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

});
