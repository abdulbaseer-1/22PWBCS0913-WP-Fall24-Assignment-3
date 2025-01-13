import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
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
    description : {
        type: String,
        required:[true, "please enter your product description"],
        unique: false
    },
    image : {
        type: String,
        required:[true, "please enter your product image"],
        unique: false
    },
    },
    {
        timestamps:true,
    }
);

const Product = new mongoose.model("Product", ProductSchema);

export default Product;