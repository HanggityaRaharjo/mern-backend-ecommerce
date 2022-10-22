exports.storeProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json(
        {
            message: 'Create Product Success!',
            data:{
                id:1,
                name:name,
                price:price,
            }
        }
    );
  next();
};

exports.getAllProducts = (req, res, next) => {
  res.json(
    {
        message: 'Gett All Product Success',
        data:[
            {
                id:1,
                name:'Jaket Hoodie',
                price:175000,
            },
            {
                id:2,
                name:'Celana Hoodie',
                price:175000,
            },
            {
                id:3,
                name:'Baju Hoodie',
                price:175000,
            }
        ]
    }
  );
  next();
};
