import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getAllProducts } from './getAllProducts.js';
import { ProductModel } from './models/Product.js';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
mongoose.connect(
  'mongodb+srv://theodosis:theodosis@cluster0.wazy6.mongodb.net/ProductTest?retryWrites=true&w=majority'
); ///CONNECTION STRING WITH MONGO DB

app.listen(PORT, console.log(`server running on port ${PORT}`));

///RETRIEVES TRANSACTIONS FROM DATABASE
app.get('/getProducts', (req, res) => {
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/WriteProducts', async (req, res) => {
  const products = await getAllProducts();
  products.forEach(async (product) => {
    const newProduct = new ProductModel(product);
    await newProduct.save();
  });

  res.json(products);
});
