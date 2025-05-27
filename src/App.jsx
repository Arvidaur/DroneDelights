import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "../components/Layout";
import RestaurantMenu from "../components/RestaurantMenu";
import cart from "../components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        </Routes>
        {/* <Cart /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
