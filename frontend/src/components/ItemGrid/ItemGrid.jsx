import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ItemGrid.module.css";
import { useCart } from '../contexts/CartContext';
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_BACKEND_URL;

if (!URL) {
    throw new Error("VITE_BACKEND_URL is not defined in the environment file");
}

function ItemGrid() {
    const [items, setItems] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const { setCartItems, setTotalPrice } = useCart();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${URL}/api/products/getProducts`, {
                    params: { //another way to send params
                        limit: 15
                    }
                });

                setItems(response.data.products || []);
            } catch (error) {
                setItems([]);
            }
        };
        
        fetchProducts();
    }, [trigger]);

    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error("Please login to add items to cart");
                return;
            }
    
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const response = await axios.put(
                `${URL}/api/cart/updateCart`, 
                { productId, quantity: 1 },
                config
            );
    
            if (response.data) {
                const { data } = await axios.get(`${URL}/api/cart/getCart`, config);

                setCartItems(data.products || []);
                setTotalPrice(data.totalPrice || 0);
            }

            //loading sound
            const addToCartSound = new Audio("../../../public/audio/mixkit-kids-cartoon-close-bells-2256.mp3");
            //check if redy to play
            addToCartSound.oncanplaythrough = () => {
                console.log("Audio is loaded and ready to play.");
            };
            //error
            addToCartSound.onerror = (err) => {
                console.error("Error loading audio:", err);
            };
            //play
            addToCartSound.play().catch((err) => {
                console.error("Error playing sound:", err);
            });

            toast.success("Product added to Cart");
        } catch (err) {
            console.error("Error adding to cart:", err);
            if (err.response?.status === 401) {
                toast.error("Please login to add items to cart");
            } else {
                toast.error("Error adding item to cart. Please try again.");
            }
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${URL}/api/products/${productId}`);
            if (response.status === 200) {
                const deleteSound = new Audio("../../../public/audio/mixkit-achievement-bell-600.mp3"); //fro sound
                deleteSound.load();
                deleteSound.play().catch(err => {
                    console.error("Error playing sound:", err);
                });

                toast.success("Product deleted successfully");
                
                setTrigger(prev => prev + 1);
            }
        } catch (error) {
            console.error("Error deleting product", error);
            toast.error("Failed to delete product"); // Show error toast if something goes wrong
        }
    };

    if (!Array.isArray(items)) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Our Products</h1>
            <div className={styles.itemGrid}>
                {items.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className={styles.itemCard}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <p className={styles.itemDescription}>{item.description}</p>
                            <p className={styles.itemPrice}>${item.price}</p>
                            <button 
                                className={styles.addToCartButton} 
                                onClick={() => addToCart(item._id)}
                            >
                                Add to Cart
                            </button><br/><br/>
                            <button 
                                className={styles.deleteButton}
                                onClick={() => deleteProduct(item._id)}
                            >
                                Delete Product
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ItemGrid;



/*
In React, if you want a `useEffect` hook to run after any function is called, you need to trigger some state changes that the `useEffect` hook depends on. You can't directly "listen" for function calls, but you can indirectly achieve this by modifying a piece of state whenever a function is called.

Here’s how you can do it:

### Steps to Achieve This:
1. Create a state variable to act as a "trigger."
2. Increment or toggle this state variable in every function.
3. Add the state variable as a dependency in your `useEffect` hook.

### Example Code:
```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [trigger, setTrigger] = useState(0);

  // Example functions
  const handleFunction1 = () => {
    console.log('Function 1 called');
    setTrigger(prev => prev + 1); // Increment trigger
  };

  const handleFunction2 = () => {
    console.log('Function 2 called');
    setTrigger(prev => prev + 1); // Increment trigger
  };

  // useEffect will run every time `trigger` changes
  useEffect(() => {
    console.log('useEffect ran because a function was called');
  }, [trigger]);

  return (
    <div>
      <button onClick={handleFunction1}>Run Function 1</button>
      <button onClick={handleFunction2}>Run Function 2</button>
    </div>
  );
};

export default App;
```

### Key Points:
1. **State Dependency**:
   - The `useEffect` hook listens for changes in the `trigger` state.
   - Every time `setTrigger` is called, the `useEffect` hook re-runs.

2. **No Infinite Loop**:
   - This pattern ensures `useEffect` doesn't create an infinite loop because it only re-runs when the `trigger` changes.

3. **Flexible Functionality**:
   - You can add `setTrigger` to any function you want to "track" to ensure the `useEffect` is executed.

If you have other specific use cases, let me know!
*/