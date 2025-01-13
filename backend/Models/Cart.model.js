import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please enter your user ID"],
      unique: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Please enter the product ID"],
        },
        name : {
          type: String,
          required:[true, "please enter your product name"],
          unique: false
        },
        price : {
          type: Number,
          required:[true, "please enter your product price"],
          unique: false
        },
        quantity: {
          type: Number,
          required: [true, "Please enter the product quantity"],
          default: 1,
        },
      },
    ],    
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
