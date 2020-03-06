import Joi from '@hapi/joi';

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.ref('password'),
});

export default schema;
