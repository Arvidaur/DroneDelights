import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "../components/layout/Layout";
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
import Confetti from "react-confetti";

function App() {
  // State för varukorg, användare, filter, modaler m.m.
  const [cartItems, setCartItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    // Hämta användare från localStorage och logga ut efter 15 min
    const saved = localStorage.getItem("currentUser");
    const loginTime = localStorage.getItem("loginTime");
    if (saved && loginTime) {
      if (Date.now() - Number(loginTime) < 900000) {
        return JSON.parse(saved);
      } else {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("loginTime");
        return null;
      }
    }
    return null;
  });
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
  const [loginPrompt, setLoginPrompt] = useState(""); // Visar prompt om inloggning krävs
  const [showFireworks, setShowFireworks] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hämta restauranger vid start
  useEffect(() => {
    fetch("http://localhost:3001/Restaurant")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  // Hämta ordrar för inloggad användare
  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3001/orders?userId=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [currentUser]);

  // Logga ut automatiskt efter 15 minuter
  useEffect(() => {
    if (!currentUser) return;
    const loginTime = localStorage.getItem("loginTime");
    if (!loginTime) return;
    const timeout = 900000 - (Date.now() - Number(loginTime));
    if (timeout <= 0) {
      handleLogout();
      return;
    }
    const timer = setTimeout(() => {
      handleLogout();
    }, timeout);
    return () => clearTimeout(timer);
  }, [currentUser]);

  // Hämta mest beställda rätter för favoriter
  const mostOrdered = useMostOrdered(orders, 5);

  // Hantera klick på profil-ikon
  const onProfileClick = () => {
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
  };

  // Hantera klick på favoriter-ikon
  const onFavoritesClick = () => {
    if (!currentUser) {
      setLoginPrompt("Du måste vara inloggad för att se dina favoriter.");
      return;
    }
    setShowFavorites(true);
  };

  // Hantera klick på kundvagns-ikon
  const onCartClick = () => {
    if (!currentUser) {
      setLoginPrompt("Du måste vara inloggad för att använda kundvagnen.");
      return;
    }
    setShowCart((prev) => !prev);
  };

  // Visa konfetti vid beställning
  const triggerFireworks = () => {
    setShowFireworks(true);
  };

  // Logga ut användare och rensa localStorage
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTime");
    // Här kan du lägga till mer logik vid utloggning om du vill
  };

  return (
    <>
      {/* Visa konfetti på startsidan vid beställning */}
      {location.pathname === "/" && showFireworks && (
        <div className={`confetti-fade${fadeOutConfetti ? "" : " show"}`}>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={400}
            recycle={false}
            run={true}
            gravity={0.3}
            initialVelocityY={15}
            onConfettiComplete={() => {
              setFadeOutConfetti(true);
              setTimeout(() => {
                setShowFireworks(false);
                setFadeOutConfetti(false);
              }, 1200); // Samma tid som din CSS-transition (eller lite längre)
            }}
          />
        </div>
      )}
      <Layout
        currentUser={currentUser}
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
        onCartClick={onCartClick}
        setFilter={setFilter}
        filter={filter}
        setSort={setSort}
        sort={sort}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} // Antal varor i kundvagnen
      >
        {/* Routing för alla sidor */}
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
                addToCart={(item) => {
                  setCartItems([...cartItems, item]);
                  // Öppna Cart endast på desktop/surfplatta
                  if (window.innerWidth > 600) {
                    setShowCart(true);
                  }
                }}
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
                  setCartItems([]);
                  setLastOrderInfo({ order, restaurant });
                  setShowOrderReceipt(true);
                  navigate("/");
                }}
                triggerFireworks={triggerFireworks}
              />
            }
          />
        </Routes>

        {/* Modaler och overlays */}
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
        {/* Visa login-prompt om användaren försöker göra något som kräver inloggning */}
        {loginPrompt && (
          <div className="login-prompt-modal">
            <div className="login-prompt-content">
              <div style={{ fontSize: 20, marginBottom: 20 }}>
                {loginPrompt}
              </div>
              <button
                className="button-glow"
                onClick={() => setLoginPrompt("")}
              >
                Stäng
              </button>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default App;
