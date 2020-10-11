import { object, string } from 'yup';

const schemas = {
    step1: object().shape({
        firstName: string()
            .required(),
        lastName: string()
            .required(),
    }),
};

export default schemas;
