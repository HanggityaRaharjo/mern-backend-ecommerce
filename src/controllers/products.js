const { validationResult } = require('express-validator');
const ProductPost = require('../models/product');
var mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

exports.storeProduct = (req, res, next) => {
  // Validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error('Image harus di upload');
    err.errorStatus = 422;
    throw err;
  }
  console.log(req.file);
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file.filename;
  const kategori = req.body.kategori;

  const Posting = new ProductPost({
    name: name,
    price: price,
    image: image,
    kategori: kategori,
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: 'Create Product Success!',
        data: result,
      });
      next();
    })
    .catch((err) => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
  ProductPost.find()
    .then((result) => {
      res.status(200).json({
        message: 'Get All Data Product Success',
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  ProductPost.findById(productId)
    .then((result) => {
      if (!result) {
        const error = new Error('Data Product Not Found');
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Get Data Product Success',
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateProduct = (req, res, next) => {
  // Validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error('Image harus di upload');
    err.errorStatus = 422;
    throw err;
  }
  console.log(req.file);
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file.filename;
  const kategori = req.body.kategori;

  const productId = req.params.productId;
  ProductPost.findById(productId)
    .then((product) => {
      if (!product) {
        const err = new Error('Product not found');
        err.errorStatus = 404;
        throw err;
      }

      product.name = name;
      product.price = price;
      product.kategori = kategori;
      product.image = image;

      return product.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Update sukses',
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  ProductPost.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error('Product not found');
        error.errorStatus = 404;
        throw error;
      }

      removeImage(product.image);
      return ProductPost.findByIdAndRemove(productId);
    })
    .then((result) => {
      res.status(200).json({
        message: 'Data Berhasil dihapus',
        data: result,
      });
    })
    .catch((err) => next(err));
};

const removeImage = (filepath) => {
  console.log(filepath);
  filepath = path.join(__dirname, '../../images', filepath);
  fs.unlink(filepath, (err) => console.log(err));
};
