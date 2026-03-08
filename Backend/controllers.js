
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Product } = require('./models');

const addToCart = async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  
  try {
    let user = await User.findById(req.user.id); 
    if (!user) return res.status(404).json({ msg: "User not found" });

  
    user.cart = user.cart || []; 

    const itemIndex = user.cart.findIndex(p => p.productId.toString() === productId); 

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += (quantity || 1);
    } else {
     
      user.cart.push({ productId, quantity, size, color });
    }

    await user.save();
    res.status(200).json(user.cart); 

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error during signup" });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({ 
      message: "Login successful", 
      token: "stride_super_secret_key_54321",
     user: { name: user.username, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); 
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

  
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await User.updateMany(
      { "cart.productId": productId },
      { $pull: { cart: { productId: productId } } }
    );

    res.json({ msg: "Product deleted and removed from all carts" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};



module.exports = { signupUser, loginUser, addToCart, addProduct, getAllProducts, deleteProduct  };