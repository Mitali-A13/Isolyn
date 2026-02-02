const express = require('express');
const router = express.Router();
const apiKeyAuth = require("../middlewares/apiKeyAuth.js");
const {
  createData,
  getData,
  updateData,
  deleteData,
} = require("../controllers/data.js");
const rateLimit = require("../middlewares/rateLimit.js");
const validate = require("../middlewares/validate.js");

const {
  collectionParamSchema,
  dataBodySchema,
  idParamSchema,
  paginationQuerySchema,
  collectionWithIdParamSchema,
} = require("../validators/data.validation.js");


// Apply API key authentication middleware to all routes
router.post(
  "/:collection",
  apiKeyAuth,
  rateLimit,
  validate(collectionParamSchema, "params"),
  validate(dataBodySchema, "body"),
  createData
);

router.get(
  "/:collection",
  apiKeyAuth,
  rateLimit,
  validate(collectionParamSchema, "params"),
  validate(paginationQuerySchema, "query"),
  getData
);

router.put(
  "/:collection/:id",
  apiKeyAuth,
  rateLimit,
  validate(collectionWithIdParamSchema, "params"),
  validate(dataBodySchema, "body"),
  updateData
);

router.delete(
  "/:collection/:id",
  apiKeyAuth,
  rateLimit,
  validate(collectionWithIdParamSchema, "params"),
  deleteData
);




module.exports = router;
