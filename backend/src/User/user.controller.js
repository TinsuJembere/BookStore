const User = require("./user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../Book/book.schema");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
    res.json({ token, user: { email: user.email, id: user._id } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: "Book ID is required." });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found." });
    const cartItem = user.cart.find(item => item.book.toString() === bookId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ book: bookId, quantity: 1 });
    }
    await user.save();
    res.json({ message: "Book added to cart.", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('cart.book');
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: "Book ID is required." });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    user.cart = user.cart.filter(item => item.book.toString() !== bookId);
    await user.save();
    res.json({ message: "Book removed from cart.", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared.", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, addToCart, getCart, removeFromCart, clearCart }; 