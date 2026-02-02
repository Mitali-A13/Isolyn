const mongoose = require('mongoose');
const AppError = require("../utils/AppError");


const validateCollectionAccess = (collection, apiKey) => {
  if (!apiKey.collections.includes(collection)) {
    throw new AppError(
      `Access to collection '${collection}' is not allowed`,
      403
    );
  }
};

//create data
exports.createData = async(req,res) => {
    const {collection} = req.params; //new document created, URL se collection ka naam aayega
    validateCollectionAccess(collection, req.apiKey);
    const data = req.body; //data sent by user in request body

    const db = mongoose.connection.db; //get current database connection
    //insert data into specified collection
    const result = await db.collection(collection).insertOne({
        ...data,
        userId: req.userId, //associating data with user
        createdAt: new Date(),
    })
    res.status(201).json(result);
};

//read data
exports.getData = async (req, res, next) => {
  try {
    const { collection } = req.params;
    validateCollectionAccess(collection, req.apiKey);

    //convert pagination query params to integers with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const db = mongoose.connection.db;

    const query = { userId: req.userId };

    const [data, total] = await Promise.all([
      db
        .collection(collection)
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray(),

      db
        .collection(collection)
        .countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};



//update data
exports.updateData = async (req, res, next) => {
  try {
    const { collection, id } = req.params;
    const db = mongoose.connection.db;
    validateCollectionAccess(collection, req.apiKey);

    //remove protected fields from req.body
    delete req.body._id;
    delete req.body.userId;
    delete req.body.createdAt;

    const result = await db.collection(collection).updateOne(
      { _id: new mongoose.Types.ObjectId(id), userId: req.userId },
      { $set: req.body }
    );

    res.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
};


//delete data
exports.deleteData = async (req, res) => {
  const { collection, id } = req.params;
  const db = mongoose.connection.db;
  validateCollectionAccess(collection, req.apiKey);

  const result = await db.collection(collection).deleteOne({
    _id: new mongoose.Types.ObjectId(id),
    userId: req.userId,
  });

  res.json(result);
};