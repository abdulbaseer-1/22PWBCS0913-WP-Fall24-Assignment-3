import mongoose from 'mongoose';
import Product from '../Models/Product.model.js';



const getProduct = async (req, res) => {
  try {
      const itemsPerPage = parseInt(req.query.limit) || 15;
      
      const totalProducts = await Product.countDocuments();
      
      const products = await Product.find({})
          .limit(itemsPerPage)
          .select('-__v'); // Exclude version key
      
      res.status(200).json({
          products,
          totalProducts
      });
  } catch (error) {
      res.status(500).json({
          message: "Error fetching products",
          error: error.message
      });
  }
};

const createProduct = async(req, res) => {
  try {
      const image = req.files?.image ? req.files.image[0].path : null ;
      const { name, price, description} = req.body;

      if (!name || !price || !description || !image) {
          return res.status(400).json({ message: "All fields are required" });
        }

        console.log("inside",{ name, price, description, image} );

      const product = await Product.create({
          name:req.body.name,
          price:req.body.price,
          description:req.body.description,
          image:image,
      });
      console.log("inside", product);
      if(!product) {
        return res.status(500).json({ message: "Error creating product"});
      }
      res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
}


const updateProduct = async (req, res) => { // work on this later
    try {
      const id = req.params; // Assuming the product ID is passed as a URL parameter
      const { name, price, description, image } = req.body; // Extracting fields from the request body
  
      // Validate the input
      if (!id || !name || !price || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        id, // The ID of the product to update
        {
          name,
          price,
          description,
          image,
        },
        { new: true, runValidators: true } // Return the updated document and validate input
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


const deleteProduct = async(req, res) => {
    try {
      console.log("in delete");
      const id = req.params.id; // gonna use a delete req, it dosent allow a req body (in axios).
      console.log("in delete", id);

      await Product.findByIdAndDelete(id);

      res.status(200).json("Product deleted succesfully");   
    } catch (error) {
        res.status(500).json("Error , user not deleted");        
    }
}
 
export default {getProduct, createProduct, updateProduct, deleteProduct};

 
/*
The line of code you provided is extracting the path of an uploaded file named CNIC_Front_Image from a request object (req) that likely comes from a file upload middleware like Multer in a Node.js/Express.js application. Here's a detailed explanation:

Code Breakdown
javascript
Copy code
const CNIC_Front_Image = req.files?.CNIC_Front_Image 
    ? req.files.CNIC_Front_Image[0].path 
    : null;
req.files:

This refers to the files uploaded by the client in the HTTP request.
Typically, a middleware like Multer processes the file upload and populates the req.files object with the uploaded files.
Optional Chaining (?.):

The ?. operator is used to avoid errors if req.files is undefined or null.
If req.files is undefined (e.g., no files were uploaded), the expression req.files?.CNIC_Front_Image evaluates to undefined without throwing an error.
req.files.CNIC_Front_Image:

Assuming CNIC_Front_Image is the key used for the uploaded file in the form data, this will access the array of files uploaded under that key.
Multer stores uploaded files as arrays in req.files because the form input for file upload can allow multiple files.
req.files.CNIC_Front_Image[0]:

This accesses the first file in the array of files uploaded under the key CNIC_Front_Image.
req.files.CNIC_Front_Image[0].path:

path is a property added by Multer to each file object. It contains the full file path where the file has been stored on the server.
Ternary Operator:

The ternary operator ? : checks if the file exists:
If req.files?.CNIC_Front_Image is truthy (i.e., the file exists), it assigns req.files.CNIC_Front_Image[0].path to CNIC_Front_Image.
If it is falsy (i.e., the file doesn’t exist or wasn’t uploaded), it assigns null to CNIC_Front_Image.
Purpose of the Code
The purpose of this line is to safely extract the file path of the first uploaded file under the CNIC_Front_Image key if it exists. If no file is uploaded, the value is set to null.
*/