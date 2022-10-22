const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductPost = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductPost', ProductPost);
