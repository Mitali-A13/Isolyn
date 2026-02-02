const AppError = require("../utils/AppError");

const validate = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        status: "fail",
        message: error.details[0].message,
      });
    }

    // overwrite with validated data
    req[property] = value;
    next();
  };
};

module.exports = validate;
