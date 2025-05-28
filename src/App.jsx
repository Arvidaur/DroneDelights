import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "../components/Layout";
import RestaurantMenu from "../components/RestaurantMenu";
import Cart from "../components/Cart";
import Payment from "../components/Payment";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null); // För att spara info till Payment
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();

  function addToCart(dish) {
    if (!currentUser) {
      alert("Du måste vara inloggad för att lägga till i kundvagnen!");
      return;
    }
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === dish.id);
      if (found) {
        setShowCart(true); // Visa Cart när man lägger till vara
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      setShowCart(true); // Visa Cart när man lägger till vara
      return [
        ...prev,
        {
          ...dish,
          quantity: 1,
          restaurantId: dish.restaurantId,
          category: dish.category,
        },
      ];
    });
  }

  // Visa inte nav på login/register
  const hideNav =
    location.pathname === "/login" || location.pathname === "/register";

  if (!currentUser && showRegister === true) {
    return <Register goToLogin={() => setShowRegister(false)} />;
  }
  if (!currentUser && showRegister === false) {
    return (
      <Login
        setCurrentUser={setCurrentUser}
        goToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <>
      {!hideNav && (
        <Header
          currentUser={currentUser}
          onProfileClick={() => {
            if (!currentUser) setShowRegister(false); // Visa login
            // Annars visa profil (lägg till kod här om du vill visa profil)
          }}
          onFavoritesClick={() => {
            if (!currentUser) alert("Logga in för att se dina favoriter!");
            // Annars visa favoriter
          }}
          onCartClick={() => setShowCart((prev) => !prev)}
        />
      )}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          path="/restaurant/:id"
          element={<RestaurantMenu addToCart={addToCart} />}
        />
        <Route
          path="/payment"
          element={
            <Payment
              cartItems={cartItems}
              setCartItems={setCartItems}
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
            />
          }
        />
      </Routes>
      {currentUser && showCart && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setOrderInfo={setOrderInfo}
        />
      )}
    </>
  );
}

export default App;
