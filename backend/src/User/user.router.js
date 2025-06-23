const express = require("express");
const { register, login, addToCart, getCart, removeFromCart, clearCart } = require("./user.controller");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/cart", auth, addToCart);
router.get("/cart", auth, getCart);
router.delete("/cart", auth, removeFromCart);
router.delete("/cart/all", auth, clearCart);

module.exports = router; 