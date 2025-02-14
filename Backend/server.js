const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,  path.join(__dirname, 'uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true, enum: ['gaming', 'accessories', 'smartphones', 'laptops'] },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String },
  features: [String],
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    review: String
  }],
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true,
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
  role: { 
    type: String, 
    default: 'user' 
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  total: Number,
  status: { type: String, default: 'pending' }
});

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().exec(); 
    console.log('Products found:', products); 
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/users/:userId/username', async (req, res) => {
  try {
    const { username } = req.body;  
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== req.params.userId) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update password
app.put('/api/users/:userId/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; 
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      productData,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const userResponse = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});