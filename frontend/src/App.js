import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Categories from "./pages/Categories";
import AdminDashboard from "./components/AdminDashboard";
import SearchedProduct from "./components/SearchedProduct";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/singleproduct/:product" element={<Categories/>} />
          <Route path="/search/:product" element={<SearchedProduct/>} />
        </Routes>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
