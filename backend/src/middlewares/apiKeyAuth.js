const ApiKey = require('../models/ApiKey');
const AppError = require('../utils/AppError');


const apiKeyAuth = async (req, res, next) => {
    //read the api key from the request headers
    const apiKey = req.headers["x-api-key"];

    //check if the api key is provided
    if(!apiKey){
        throw new AppError("API key is required", 401);
    }

    //api key is provided, validate it
    const keyDoc = await ApiKey.findOne({key: apiKey});
    if (!keyDoc) {
        throw new AppError("Invalid API key", 401);
    }

    req.userId = keyDoc.userId; // owner of data
    req.apiKey = apiKey;
    req.userId = apiKey.userId;
    next();
};

module.exports = apiKeyAuth;