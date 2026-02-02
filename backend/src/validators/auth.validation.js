const Joi = require('joi');

//for regstration validation
exports.registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),
});


//for login validation
exports.loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});