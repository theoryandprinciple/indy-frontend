import { object, string } from 'yup';

const schemas = {
    step1: object().shape({
        firstName: string().required(),
        lastName: string().required(),
        address: string().required(),
        unit: string(),
        city: string().required(),
        state: string().required(),
        zip: string().required().matches(/[0-9]{5}/, { message: 'Zip Code must match "55555"' }),
    }),
    step2: object().shape({
        landlordCompany: string(),
        landlordFullName: string().required(),
        landlordSendMethod: string().required(),
        landlordAddress: string().when('landlordSendMethod', {
            is: 'usps',
            then: string().required('Address Required'),
            otherwise: string(),
        }),
        landlordUnit: string(),
        landlordCity: string().when('landlordSendMethod', {
            is: 'usps',
            then: string().required('City Required'),
            otherwise: string(),
        }),
        landlordState: string().when('landlordSendMethod', {
            is: 'usps',
            then: string().required('State Required'),
            otherwise: string(),
        }),
        landlordZip: string().when('landlordSendMethod', {
            is: 'usps',
            then: string().required('Zip Code Required').matches(/[0-9]{5}/, { message: 'Zip Code must match "55555"' }),
            otherwise: string(),
        }),
    }),
};

export default schemas;
