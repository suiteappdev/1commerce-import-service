let Sequelize = require("sequelize");
let Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

let Init = (app, locals) => {
    locals.schemas = locals.schemas || {};
	locals.schemas.login =  schema;
}

module.exports = Init;