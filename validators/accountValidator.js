const Joi = require("joi");

exports.registerValidation = (req, res, next) => {
  const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return res.status(400).json({
    isSuccess: false,
    message,
  });
};
exports.loginValidation = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return res.status(400).json({
    isSuccess: false,
    message,
  });
};
