const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        url: {
            type: String,
            required: true,
            unique: true,
        },
        source: String,
        publishedAt: Date,
        content: String,
        imageUrl: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
