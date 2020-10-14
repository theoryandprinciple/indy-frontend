import FormTypes from '../action-types/form';

const d = new Date();
const currentYear = d.getUTCFullYear();
const currentDate = d.getUTCDate();
const month = [];
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';
const currentMonth = month[d.getMonth()];

const internals = {
    initial: () => ({
        answers: {
            tenant: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                city: '',
                state: 'Indiana',
                zip: '',
                race: '',
                gender: '',
            },
            landlord: {
                company: '',
                name: '',
                email: '',
                address: '',
                address2: '',
                city: '',
                state: 'Indiana',
                zip: '',
            },
            date: `${currentMonth} ${currentDate}, ${currentYear}`,
            signature: null,
            sendMethod: '',
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
