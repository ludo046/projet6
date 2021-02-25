const Joi = require('joi');

const usersSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com', 'net'] } }),

    password: Joi.string()
        .min(8)
        .max(15)
        //.pattern(new RegExp('(?=^.{8,32}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
});

module.exports = usersSchema;