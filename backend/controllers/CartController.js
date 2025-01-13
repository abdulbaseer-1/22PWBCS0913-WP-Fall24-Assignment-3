import mongoose from 'mongoose';
import Cart from "../Models/Cart.model.js";
import Product from "../Models/Product.model.js";
import getUserIdFromToken from './getIdFromJWT.js';

const cartInfo = async (req, res) => {
  try {

    console.log("inside the cart info controller");

    const userId = await getUserIdFromToken(req);
    console.log("userId in get" ,userId);
    if (!userId) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const cart = await Cart.findOne({userId:userId});

    console.log("cart in get" ,cart);  

      const products = cart.products.map(item => ({
          productId: item.productId._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
      }));

      console.log("products in get" ,products);  

      const totalPrice = products.reduce(
          (sum, item) => sum + (item.price * item.quantity), 
          0
      );

      console.log("price in get" ,totalPrice);  

      res.status(200).json({ products, totalPrice });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
  }
  res.status(500).json({ 
      message: "Server error", 
      error: error.message 
  });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in token" });
    }

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({
        userId,
        products: []
      });
    }

    const productIndex = cart.products.findIndex(
      item => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      cart.products.push({
        productId: product._id, // Use product._id instead of productId
        quantity,
        name: product.name,
        price: product.price
      });
    } else {
      cart.products[productIndex].quantity = quantity;
      cart.products[productIndex].name = product.name;
      cart.products[productIndex].price = product.price;
    }

    await cart.save();
    
    const updatedCart = await Cart.findOne({ userId });
    const products = updatedCart.products.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const totalPrice = products.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    res.status(200).json({ products, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    const products = cart.products.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const totalPrice = products.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    res.status(200).json({ products, totalPrice });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting item from cart", 
      error: error.message 
    });
  }
};

export default { updateCart, deleteCartItem, cartInfo };