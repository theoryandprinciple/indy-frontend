import FormTypes from '../action-types/form';

const internals = {
    initial: () => ({
        answers: {
            firstName: '',
            lastName: '',
            address: '',
            unit: '',
            city: '',
            state: 'Indiana',
            zip: '',
            landlordCompany: '',
            landlordFullName: '',
            landlordSendMethod: '',
            landlordAddress: '',
            landlordUnit: '',
            landlordCity: '',
            landlordState: 'Indiana',
            landlordZip: '',
        },
    }),
};

const FormReducer = (stateParam, action) => {
    const state = stateParam || internals.initial();

    const { payload, type } = action;

    switch (type) {
    case FormTypes.SAVE_FORM:
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

export default FormReducer;
