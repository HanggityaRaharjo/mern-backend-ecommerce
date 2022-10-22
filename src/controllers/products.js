const { validationResult } = require('express-validator');

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

  const result = {
    message: 'Create Product Success!',
    data: {
      product_id: 1,
      name: name,
      image: 'imagefile.png',
      price: price,
      kategori: kategori,
    },
  };
  res.status(201).json(result);
  next();
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
