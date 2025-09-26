const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
  }
});

const BlogsModel = mongoose.model("blogs", BlogsSchema);

module.exports = BlogsModel;
