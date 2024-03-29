import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Item from "./components/Item"
import CreatItem from "./components/CreateItem";
import Order from "./components/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './amplify-config';


function App() {
  
  return (
    <BrowserRouter>
    <Header/>
      <div className="App">
        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/item" element={<Item />}></Route>
          <Route exact path="/createitem" element={<CreatItem />}></Route>
          <Route exact path="/order" element={<Order />}></Route>
          
        </Routes>
      </div>
    <Footer/>
    </BrowserRouter>

  );
}

export default App;