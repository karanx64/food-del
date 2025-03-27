import React from "react";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Cart from "./Pages/cart/Cart";
import PlaceOrder from "./Pages/placeOrder/PlaceOrder";
import Footer from "./components/footer/Footer";
import LoginPopup from "./components/loginPopup/LoginPopup";
import Chatbot from "./components/chatbot/Chatbot";

const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/PlaceOrder" element={<PlaceOrder />} />
        </Routes>
        <Chatbot/>
      </div>
      <Footer />
    </>
  );
};

export default App;
