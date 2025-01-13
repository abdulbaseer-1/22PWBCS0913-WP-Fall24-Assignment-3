import React, { lazy, Suspense } from 'react';
import {BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './components/contexts/CartContext';
const SigninSignup = lazy(() => import('./pages/SigninSignupPage/SigninSignupPage'));
const Home = lazy(() => import('./pages/HomePage/Home'));
const Cart = lazy(() => import('./pages/CartPage/CartPage'));
const ContactUs = lazy(() => import('./pages/ContactPage/ContactUs'));
const Settings = lazy(() => import('./pages/settingsPage/settings'));
const AddProduct = lazy(() => import('./pages/addProduct/AddProductPage'));

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/SigninSignup" element={<SigninSignup />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/" element={<Navigate to="/SigninSignup" />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

/*
Notes:
For larger applications, consider using React's lazy and Suspense for route-based code splitting to improve performance:
*/