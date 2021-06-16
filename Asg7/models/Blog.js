const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        reuired: true,
    },

    userID: {
        type: String,
        reuired: true,
    },

});

module.exports = mongoose.model("blog", Blog, "blog");