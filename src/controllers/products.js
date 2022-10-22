const { validationResult } = require('express-validator');
const ProductPost = require('../models/product');

exports.storeProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  //   const image = req.body.image;
  const kategori = req.body.kategori;

  // Validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const Posting = new ProductPost({
    name: name,
    price: price,
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
  res.json({
    message: 'Gett All Product Success',
    data: [
      {
        id: 1,
        name: 'Jaket Hoodie',
        price: 175000,
      },
      {
        id: 2,
        name: 'Celana Hoodie',
        price: 175000,
      },
      {
        id: 3,
        name: 'Baju Hoodie',
        price: 175000,
      },
    ],
  });
  next();
};
