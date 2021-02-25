const Joi = require('joi')

const schema = Joi.object({

    userId: Joi.string(),

    name: Joi.string()
    .min(5)
    .max(40)
    .pattern(new RegExp('^[^@&"()!_$*€£`+=\/;?#]+$')),

    manufacturer: Joi.string()
    .min(5)
    .max(40)
    .pattern(new RegExp('^[^@&"()!_$*€£`+=\/;?#]+$')),

    description: Joi.string()
    .min(10)
    .max(300)
    .pattern(new RegExp('^[^@&"()!_$*€£`+=\/;?#]+$')),

    mainPepper: Joi.string()
    .min(5)
    .max(300)
    .pattern(new RegExp('^[^@&"()!_$*€£`+=\/;?#]+$')),

    heat : Joi.number()

})

module.exports = schema;