import IntakeTypes from '../action-types/intake';

const internals = {
    initial: () => ({
        answers: {
            income: [],
            governmentAsst: '',
            affordRent: '',
            affordRentProblems: [],
            evictionHealthRisks: [],
            tryingToPay: '',
        },
        intakeStepCleared: 0,
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
    case IntakeTypes.UPDATE_INTAKE_STEP:
        return {
            ...state,
            intakeStepCleared: payload,
        };

    default:
        // do nothing
    }
    return state;
};

export default IntakeReducer;
