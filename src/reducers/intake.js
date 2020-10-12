import IntakeTypes from '../action-types/intake';

const internals = {
    initial: () => ({
        answers: {
            income: [],
            govermentAsst: '',
            affordRent: '',
            affordRentProblems: [],
            evictionHealthRisks: [],
            tryingToPay: '',
        },
    }),
};

const IntakeReducer = (stateParam, action) => {
    const state = stateParam || internals.initial();

    const { payload, type } = action;

    switch (type) {
    case IntakeTypes.SAVE_INTAKE:
        return {
            ...state,
            answers: {
                ...state.answers,
                ...payload,
            },
        };

    default:
        // do nothing
    }
    return state;
};

export default IntakeReducer;
