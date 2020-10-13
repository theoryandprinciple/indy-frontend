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
};

export default schemas;
