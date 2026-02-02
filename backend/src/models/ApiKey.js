const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        key: {
            type: String,
            required: true,
            unique: true
        },

        scopes: {
            type: [String],
            enum: ["read", "write", "delete"],
            default: ["read"],
        },

        collections: {
            type: [String],
            default: [],
        }
    }, { timestamps: true }
);

module.exports = mongoose.model('ApiKey', apiKeySchema);
