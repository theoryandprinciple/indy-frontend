import Joi from '@hapi/joi';

const email = Joi.string()
    .required() // never actually hit because .email structure requires non-empty string
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .messages({
        'string.empty': 'Error: Email is required',
        'string.email': 'Error: Email appears invalid',
    });

const password = Joi.string()
    .required()
    .messages({
        'string.empty': 'Error: Password is required',
    });

const schemas = {
    login: Joi.object({
        email,
        password,
    }),
    forgot: Joi.object({
        email,
    }),
    reset: Joi.object({
        email,
        password,
        resetToken: Joi.string().required()
            .messages({
                'string.required': 'Error: The URL you used to get here appears invalid',
            }),
        passwordConfirm: Joi.ref('password'),
    }),
};

export default schemas;
