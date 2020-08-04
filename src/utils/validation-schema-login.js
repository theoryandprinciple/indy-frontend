import * as yup from 'yup';

const email = yup
    .string()
    .required('Email is required')
    .email('Email is invalid');

const password = yup
    .string()
    .required('Password is required');

const schemas = {
    login: yup.object().shape({
        email,
        password,
    }),
    forgot: yup.object().shape({
        email,
    }),
    reset: yup.object().shape({
        email,
        password,
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Confirmation password does not match'),
        resetToken: yup.string().required('The URL you used to get here appears invalid'),
    }),
};

export default schemas;
