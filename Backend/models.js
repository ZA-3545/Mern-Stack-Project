const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  img: { type: String }, 
  rating: { type: Number, default: 5.0 },
  badge: { type: String }, 
  bestseller: { type: Boolean, default: false },
  colors: { type: [String], default: [] }
 
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },

  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: { type: Number, default: 1 },
    size: String,
    color: String
  }]
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { User, Product };