import { object, string } from 'yup';

const schemas = {
    step1: object().shape({
        firstName: string().required(),
        lastName: string().required(),
        address: string().required(),
        unit: string(),
        city: string().required(),
        state: string().required(),
        zip: string().required(),
    }),
};

export default schemas;
