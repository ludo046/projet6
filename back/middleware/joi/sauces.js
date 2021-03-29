const Joi = require('joi')

const schema = Joi.object({

    userId: Joi.string(),

    name: Joi.string()
    .min(5)
    .max(40)
    .pattern(new RegExp('^[a-zA-Z ]+$')),

    manufacturer: Joi.string()
    .min(5)
    .max(40)
    .pattern(new RegExp('^[a-zA-Z ]+$')),

    description: Joi.string()
    .min(10)
    .max(300)
    .pattern(new RegExp('^[a-zA-Z ]+$')),

    mainPepper: Joi.string()
    .min(5)
    .max(300)
    .pattern(new RegExp('^[a-zA-Z ]+$')),

    heat : Joi.number()

})

module.exports = schema;