const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const productsRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});

app.use('/v1/auth', authRoutes);
app.use('/v1/product', productsRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect('mongodb+srv://hanggitya:Ll8HN0DA5pyazBFh@cluster0.k7nqvd3.mongodb.net/product?retryWrites=true&w=majority')
  .then(() => {
    app.listen(4000, () => console.log('connection success'));
  })
  .catch((err) => console.log(err));
