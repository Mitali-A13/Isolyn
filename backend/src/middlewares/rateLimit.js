const Usage = require("../models/Usage");
const AppError = require("../utils/AppError");

const DAILY_LIMIT = 100; // free plan

const rateLimit = async (req, res, next) => {
    try {
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return next(new AppError("API key is required", 401));
        }

        let usage = await Usage.findOne({ apiKey });
        const now = new Date();

        if (!usage) {
            await Usage.create({
                apiKey,
                count: 1,
                lastReset: now,
            });
            return next();
        }

        // Reset daily count
        if (now - usage.lastReset > 24 * 60 * 60 * 1000) {
            usage.count = 1;
            usage.lastReset = now;
            await usage.save();
            return next();
        }

        // Limit exceeded
        if (usage.count >= DAILY_LIMIT) {
            return next(new AppError("Daily API limit exceeded", 429));
        }

        // Normal increment
        usage.count += 1;
        await usage.save();
        next();

    } catch (err) {
        next(err);
    }
};

module.exports = rateLimit;
