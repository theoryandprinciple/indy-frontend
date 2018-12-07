import { REHYDRATE } from 'redux-persist/constants'
//import { renderApp } from '../index'

const initialState = {
    hydrated: false
}

export default (state = initialState, action) => {

    state = state || initialState;

    const type = action.type;

    switch (type) {

        case REHYDRATE:
console.log("rehydreate")
            // wait till we rehydrate the app before we render it.
            return {
                ...state,
                hydrated: true
            }

        default: // do nothing
    }

    return state;
}
