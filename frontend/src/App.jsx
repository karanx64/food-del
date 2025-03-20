import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Cart from "./Pages/cart/Cart";
import PlaceOrder from "./Pages/placeOrder/PlaceOrder";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
      </Routes>
    </div>
  );
};

export default App;
