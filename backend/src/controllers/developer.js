const ApiKey = require("../models/ApiKey");
const crypto = require("crypto");
const AppError = require("../utils/AppError");

const generateApiKey = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const existingKey = await ApiKey.findOne({ userId });
    if (existingKey) {
      return next(new AppError("User already has an API key", 400));
    }

    const newKey = crypto.randomBytes(32).toString("hex");

    await ApiKey.create({
      userId,
      key: newKey,
      scopes: ["read", "write"],
      collections: ["notes", "tasks"],
    });

    return res.status(201).json({
      success: true,
      message: "API key generated successfully",
      apiKey: newKey,
    });
  } catch (error) {
    next(error);
  }
};

const getApiKeyForDev = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    let key = await ApiKey.findOne({ userId });

    if (!key) {
      const newKey = crypto.randomBytes(32).toString("hex");

      key = await ApiKey.create({
        userId,
        key: newKey,
        scopes: ["read", "write"],
        collections: ["notes", "tasks"],
      });

      return res.status(201).json({
        success: true,
        message: "API key generated automatically",
        apiKey: key.key,
      });
    }

    return res.status(200).json({
      success: true,
      apiKey: key.key,
    });
  } catch (err) {
    next(err);
  }
};

const regenerateApiKey = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    await ApiKey.deleteOne({ userId });

    const newKey = crypto.randomBytes(32).toString("hex");

    await ApiKey.create({
      userId,
      key: newKey,
      scopes: ["read", "write"],
      collections: ["notes", "tasks"],
    });

    return res.status(201).json({
      success: true,
      message: "API key regenerated successfully",
      apiKey: newKey,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateApiKey,
  getApiKeyForDev,
  regenerateApiKey,
};
