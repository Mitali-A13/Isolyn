const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
    apiKey: {
        type:String,
        required:true,
        unique: true
    },

    count: {
        type: Number,
        default: 0,
    },

    lastReset: {
        type: Date,
      default: Date.now,
    }
}, { timestamps: true });

module.exports = mongoose.model("Usage", usageSchema);