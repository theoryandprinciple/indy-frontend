import CounterActions from '../action-types/counter';

export const increment = () => {
    return (dispatch) => {
        dispatch({
            type: CounterActions.INCREMENT_REQUESTED
        });

        dispatch({
            type: CounterActions.INCREMENT
        });
    };
};

export const incrementAsync = () => {
    return (dispatch) => {
        dispatch({
            type: CounterActions.INCREMENT_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: CounterActions.INCREMENT
            });
        }, 3000);
    };
};

export const decrement = () => {
    return (dispatch) => {
        dispatch({
            type: CounterActions.DECREMENT_REQUESTED
        });

        dispatch({
            type: CounterActions.DECREMENT
        });
    };
};

export const decrementAsync = () => {
    return (dispatch) => {
        dispatch({
            type: CounterActions.DECREMENT_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: CounterActions.DECREMENT
            });
        }, 3000);
    };
};
