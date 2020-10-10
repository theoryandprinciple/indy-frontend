import { object, string } from 'yup';

const schemas = {
    step1: object().shape({
        dob: string()
            .required()
            .matches(/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/),
        firstName: string()
            .required(),
        lastName: string()
            .required(),
    }),
    step2: object().shape({
        driversLicense: string()
            .matches(/[A-Z][0-9]{3}-[0-9]{4}-[0-9]{4}-[0-9]{2}/),
        socialSecurity: string()
            .matches(/[0-9]{3}-[0-9]{2}-[0-9]{4}/),
    }),
};

export default schemas;
