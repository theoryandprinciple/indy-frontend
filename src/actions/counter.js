import counterActions from '../action-types/counter'

export const increment = () => {
  return dispatch => {
    dispatch({
      type: counterActions.INCREMENT_REQUESTED
    });

    dispatch({
      type: counterActions.INCREMENT
    });
  };
};

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: counterActions.INCREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: counterActions.INCREMENT
      });
    }, 3000);
  };
};

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: counterActions.DECREMENT_REQUESTED
    });

    dispatch({
      type: counterActions.DECREMENT
    });
  };
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: counterActions.DECREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: counterActions.DECREMENT
      });
    }, 3000);
  };
};
