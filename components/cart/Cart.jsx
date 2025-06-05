import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Cart({ cartItems, setCartItems, setOrderInfo, setShowCart }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Öka antal av en vara i kundvagnen
  const increase = (id, category, restaurantId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.category === category &&
        item.restaurantId === restaurantId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Minska antal eller ta bort vara om quantity = 1
  const decreaseOrRemove = (id, category, quantity, restaurantId) => {
    if (quantity === 1) {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.id === id &&
              item.category === category &&
              item.restaurantId === restaurantId
            )
        )
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id &&
          item.category === category &&
          item.restaurantId === restaurantId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // Spara orderinfo och gå till payment-sidan
  const goToPayment = () => {
    setOrderInfo({
      restaurantId: cartItems[0]?.restaurantId || 1,
      items: cartItems.map((item) => ({
        category: item.category,
        itemId: item.id,
        quantity: item.quantity,
      })),
      totalPrice: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    });
    // Stäng Cart på mobil så payment syns direkt
    if (window.innerWidth <= 600) {
      setShowCart(false);
    }
    navigate("/payment");
  };

  // Räkna ut totalsumma för kundvagnen
  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <aside className="Cart">
      {/* Minimera/stäng kundvagn */}
      <button
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
        onClick={() => setShowCart(false)}
        aria-label="Minimera kundvagn"
      >
        &minus;
      </button>
      <h3>Kundvagn</h3>
      <ul className="cart-items">
        {/* Visa tom-meddelande eller lista varor */}
        {cartItems.length === 0 ? (
          <li>Din varukorg är tom</li>
        ) : (
          cartItems.map((item) => (
            <li
              className="cart-image"
              key={item.id + "-" + item.category + "-" + item.restaurantId}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              {/* Bild på varan */}
              <img
                src={
                  item.image
                    ? item.image
                        .replace(/^src[\\/]+assets[\\/]+/, "/assets/")
                        .replaceAll("\\", "/")
                    : ""
                }
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "1rem",
                  marginTop: "2px",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <strong style={{ fontSize: "1.1rem", marginBottom: 2 }}>
                  {item.name}
                </strong>
                <span
                  style={{ fontSize: "0.95em", color: "#888", marginBottom: 2 }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--nav-color)",
                    marginBottom: 8,
                  }}
                >
                  {item.price} kr
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  {/* Minska eller ta bort vara */}
                  <button
                    className="cart-qty-btn button-glow"
                    onClick={() =>
                      decreaseOrRemove(
                        item.id,
                        item.category,
                        item.quantity,
                        item.restaurantId
                      )
                    }
                    style={{ marginRight: "0.5rem" }}
                  >
                    {item.quantity === 1 ? "🗑️" : "-"}
                  </button>
                  <span>{item.quantity}</span>
                  {/* Öka antal */}
                  <button
                    className="cart-qty-btn button-glow"
                    onClick={() =>
                      increase(item.id, item.category, item.restaurantId)
                    }
                    style={{ marginLeft: "0.5rem" }}
                  >
                    +
                  </button>
                  {/* Visa radens totalsumma */}
                  <span style={{ marginLeft: "1rem" }}>
                    {item.price && item.quantity
                      ? item.price * item.quantity
                      : 0}{" "}
                    kr
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {/* Visa totalsumma om det finns varor */}
      {total > 0 && (
        <p style={{ fontWeight: "bold", margin: "8px 0 16px 0" }}>
          Totalt: {total} kr
        </p>
      )}
      {/* Visa EJ knappen om vi är på /payment */}
      {location.pathname !== "/payment" && cartItems.length > 0 && (
        <button
          className="button-glow"
          onClick={goToPayment}
          disabled={cartItems.length === 0}
        >
          Till Betalning
        </button>
      )}
    </aside>
  );
}

export default Cart;
