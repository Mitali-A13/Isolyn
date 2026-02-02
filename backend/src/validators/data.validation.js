const Joi = require('joi');
const mongoose = require('mongoose');

// Custom validation for MongoDB ObjectId
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return value;
};

//collection name vaidation - only lowercase letters , prevents system / malicious names
exports.collectionParamSchema = Joi.object({
  collection: Joi.string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .min(2)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "Collection name can only contain letters, numbers, _ and -",
    }),
});

//create / update data validation -- allows dynamic keys , blocks empty object
exports.dataBodySchema = Joi.object()
  .min(1)
  .unknown(true) // allow dynamic fields
  .messages({
    "object.min": "Request body cannot be empty",
  });


//validation for :id param in routes
exports.idParamSchema = Joi.object({
  id: Joi.string()
    .custom(objectId)
    .required(),
});

//pagination query validation
exports.paginationQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(10),
});


exports.collectionWithIdParamSchema = Joi.object({
  collection: Joi.string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .min(2)
    .max(30)
    .required(),

  id: Joi.string()
    .custom(objectId)
    .required(),
});
