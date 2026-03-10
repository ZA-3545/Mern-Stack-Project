const express =require( 'express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const { signupUser, loginUser, addToCart, addProduct, getAllProducts, deleteProduct } =require( './controllers');
const auth = require('./middleware');

const router = express.Router();

router.post('/users/signup', signupUser);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }


    const payload = { user: { id: foundUser._id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token }); 
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});



router.post('/products/add', addProduct);




router.get('/', getAllProducts);
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.cart); 
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


router.delete('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.cart = []; 
    await user.save();

    res.json([]); 
  } catch (err) {
    console.error("Clear cart error:", err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/cart/:itemId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item => item._id.toString() !== req.params.itemId);
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('cart.productId');
    res.json(updatedUser.cart);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});



router.get('/cart', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.productId');
        res.json(user.cart || []);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/cart', auth, async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: "User not found" });

        user.cart.push({ productId, quantity, size, color });
        await user.save();

        const updatedUser = await User.findById(req.user.id).populate('cart.productId');
        res.json(updatedUser.cart);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.put('/cart/:itemId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const cartItem = user.cart.id(req.params.itemId);
        
        if (!cartItem) return res.status(404).json({ msg: 'Item not found' });

        cartItem.quantity = req.body.quantity;
        await user.save();
        
        const updatedUser = await User.findById(req.user.id).populate('cart.productId');
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;