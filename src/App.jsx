import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import RestaurantMenu from "../components/restaurant/RestaurantMenu";
import Payment from "../components/cart/Payment";
import Cart from "../components/cart/Cart";
import Order from "../components/cart/Order";
import Favorites from "../components/user/Favorites";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import ProfileDropdown from "../components/user/ProfileDropdown";
import Orders from "../components/cart/Orders";
import ThankYou from "../components/cart/ThankYou";
import useMostOrdered from "./hooks/useMostOrdered";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showOrderReceipt, setShowOrderReceipt] = useState(false);
  const [lastOrderInfo, setLastOrderInfo] = useState(null);
  const [sort, setSort] = useState({ field: "", order: "asc" });
  const [showLogin, setShowLogin] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(""); // Lägg till denna
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/Restaurant")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3001/orders?userId=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [currentUser]);

  const mostOrdered = useMostOrdered(orders, 5);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header
          currentUser={currentUser}
          onProfileClick={() => {
            if (!currentUser) {
              setShowRegister(false);
              setShowProfile(false);
              setShowCart(false);
              setShowFavorites(false);
              setShowOrders(false);
              setShowLogin(true);
            } else {
              setShowProfile(true);
            }
          }}
          onFavoritesClick={() => {
            if (!currentUser) {
              setLoginPrompt(
                "Du måste vara inloggad för att se dina favoriter."
              );
              return;
            }
            setShowFavorites(true);
          }}
          onCartClick={() => {
            if (!currentUser) {
              setLoginPrompt(
                "Du måste vara inloggad för att använda kundvagnen."
              );
              return;
            }
            setShowCart((prev) => !prev);
          }}
          setFilter={setFilter}
          filter={filter}
          setSort={setSort}
          sort={sort}
        />
      )}

      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <RestaurantGrid
              filter={filter}
              sort={sort}
              restaurants={restaurants}
            />
          }
        />
        <Route
          path="/restaurant/:id"
          element={
            <RestaurantMenu
              addToCart={(item) => setCartItems([...cartItems, item])}
              currentUser={currentUser}
              setLoginPrompt={setLoginPrompt}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment
              cartItems={cartItems}
              setCartItems={setCartItems}
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
              currentUser={currentUser}
              restaurants={restaurants}
              onOrderComplete={(order, restaurant) => {
                setShowCart(false);
                setLastOrderInfo({ order, restaurant });
                setShowOrderReceipt(true);
                navigate("/");
              }}
            />
          }
        />
      </Routes>

      {/* Modaler */}
      {currentUser && showCart && !showOrderReceipt && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setOrderInfo={setOrderInfo}
          setShowCart={setShowCart}
        />
      )}
      {showOrderReceipt && lastOrderInfo && (
        <aside className="Cart">
          <Order
            order={lastOrderInfo.order}
            restaurant={lastOrderInfo.restaurant}
            onClose={() => setShowOrderReceipt(false)}
          />
        </aside>
      )}
      {currentUser && showFavorites && (
        <Favorites
          mostOrdered={mostOrdered}
          restaurants={restaurants}
          setShowFavorites={setShowFavorites}
        />
      )}
      {!currentUser && showLogin && (
        <aside className="Cart">
          <Login
            setCurrentUser={(user) => {
              setCurrentUser(user);
              setShowLogin(false);
            }}
            goToRegister={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
            onClose={() => setShowLogin(false)}
          />
        </aside>
      )}
      {showRegister && (
        <aside className="Cart">
          <Register
            goToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </aside>
      )}
      {showProfile && (
        <ProfileDropdown
          currentUser={currentUser}
          onLogin={() => {
            setShowProfile(false);
            setShowRegister(false);
          }}
          onLogout={() => {
            setCurrentUser(null);
            setShowProfile(false);
          }}
          onShowOrders={() => {
            setShowOrders(true);
            setShowProfile(false);
          }}
          onClose={() => setShowProfile(false)}
        />
      )}
      {showOrders && (
        <Orders
          orders={orders}
          restaurants={restaurants}
          onClose={() => {
            setShowOrders(false);
            setShowProfile(true);
          }}
        />
      )}
      {showThankYou && lastOrderInfo && (
        <ThankYou
          order={lastOrderInfo.order}
          restaurant={lastOrderInfo.restaurant}
          onClose={() => setShowThankYou(false)}
        />
      )}
      {loginPrompt && (
        <div
          style={{
            position: "fixed",
            top: 100,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff3cd",
            color: "#856404",
            border: "1px solid #ffeeba",
            borderRadius: 8,
            padding: "16px 32px",
            zIndex: 9999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {loginPrompt}
          <button style={{ marginLeft: 16 }} onClick={() => setLoginPrompt("")}>
            Stäng
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
