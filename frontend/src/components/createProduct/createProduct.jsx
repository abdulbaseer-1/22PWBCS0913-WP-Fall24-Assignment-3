import React,{useState} from "react";
import FormStyle from "./createProduct.module.css";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const URL = import.meta.env.VITE_BACKEND_URL;

if (!URL) {
    throw new Error("VITE_BACKEND_URL is not defined in the environment file");
}

function SigninSignup({children, className}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
  
    try {
      
      console.log("data",formData);
      const response = await axios.post(`${URL}/api/products/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const productAddedSound = new Audio("/audio/mixkit-kids-cartoon-close-bells-2256.mp3"); //fro sound
      productAddedSound.play();

      toast.success("Product added successfully");
      
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
    
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product:");
    }
  };

  return(
    <div className={`main-container ${className}`}>
      <div className={`form-container ${className}`}>
      <form className={`${FormStyle.form} ${className}`} onSubmit={handleSubmit}>
        <div className={`input-group ${className}`}>
          <input
            id="name"
            name="name"
            className={`${FormStyle.inputfield} ${className}`}
            type="text"
            placeholder="Productname"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">name</label>
        </div>
        <div className={`input-group ${className}`}>
          <input
            id="price"
            name="price"
            className={`${FormStyle.inputfield} ${className}`}
            type="number"
            placeholder="price"
            maxLength={20}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="description">price</label>
        </div>
        <div className={`input-group ${className}`}>
          <textarea
            id="description"
            name="description"
            className={`${FormStyle.inputfield} ${className}`}
            type="text"
            placeholder="description"
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="password">description</label>
        </div>

        <div className={`input-group ${className}`}>
          <input
            id="image"
            name="image"
            className={`${FormStyle.inputfield} ${className}`}
            type="file"
            placeholder="image"
            maxLength={20}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <label htmlFor="image">Product Image</label>
        </div>

        <button type="submit" className={`${FormStyle.submitButton} ${className}`}>
          Submit
        </button>
      </form>
      
      </div>
    </div>
  );
}

export default SigninSignup;