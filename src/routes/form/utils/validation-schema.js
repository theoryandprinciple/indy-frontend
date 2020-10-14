import { object, string } from 'yup';

const schemas = {
    step1: object().shape({
        firstName: string().required(),
        lastName: string().required(),
        address: string().required(),
        address2: string(),
        city: string().required(),
        state: string().required(),
        zip: string().required().matches(/[0-9]{5}/, { message: 'Zip Code must match "55555"' }),
    }),
    step2: object().shape({
        company: string(),
        name: string().required(),
        sendMethod: string().required(),
        email: string().when('sendMethod', {
            is: 'email',
            then: string().required('Email Required').email('Invalid Email Format'),
            otherwise: string(),
        }),
        address: string().when('sendMethod', {
            is: 'usps',
            then: string().required('Address Required'),
            otherwise: string(),
        }),
        address2: string(),
        city: string().when('sendMethod', {
            is: 'usps',
            then: string().required('City Required'),
            otherwise: string(),
        }),
        state: string().when('sendMethod', {
            is: 'usps',
            then: string().required('State Required'),
            otherwise: string(),
        }),
        zip: string().when('sendMethod', {
            is: 'usps',
            then: string().required('Zip Code Required').matches(/[0-9]{5}/, { message: 'Zip Code must match "55555"' }),
            otherwise: string(),
        }),
    }),
};

export default schemas;
