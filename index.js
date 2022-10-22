const express = require('express');

const app = express();

app.use(() => {
  console.log('Hallo Server');
  console.log('Hallo Server');
  
});

app.listen(4000);
