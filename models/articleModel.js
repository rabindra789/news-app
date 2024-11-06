const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    url: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Article", articleSchema);
