import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  href: {
    type: String,
  },
  features: [{ feature: String, value: String }],
});
export const ProductModel = mongoose.model('Products', ProductSchema);
