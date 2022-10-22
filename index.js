const express = require('express');
const bodyParser = require('body-parser');

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

app.use('/', productsRoutes);
app.use('/v1/auth', authRoutes);

app.listen(4000);
