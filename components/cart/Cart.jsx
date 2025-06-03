import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems, setOrderInfo, setShowCart }) {
  const navigate = useNavigate();

  const increase = (id, category) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.category === category
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseOrRemove = (id, category, quantity) => {
    if (quantity === 1) {
      setCartItems((prev) =>
        prev.filter((item) => !(item.id === id && item.category === category))
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id && item.category === category
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // Spara orderinfo och gå till payment
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
    navigate("/payment");
  };

  return (
    <aside className="Cart">
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
      <ul>
        {cartItems.length === 0 ? (
          <li>Din varukorg är tom</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.id + "-" + item.category}>
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
                }}
              />
              <strong>
                {item.name}{" "}
                <span style={{ fontSize: "0.9em", color: "#888" }}>
                  ({item.category})
                </span>
              </strong>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
              >
                <button
                  onClick={() =>
                    decreaseOrRemove(item.id, item.category, item.quantity)
                  }
                  style={{ marginRight: "0.5rem" }}
                >
                  {item.quantity === 1 ? "🗑️" : "-"}
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increase(item.id, item.category)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  +
                </button>
              </div>
              <span style={{ marginLeft: "1rem" }}>
                {item.price && item.quantity ? item.price * item.quantity : 0}{" "}
                kr
              </span>
            </li>
          ))
        )}
      </ul>
      <button onClick={goToPayment} disabled={cartItems.length === 0}>
        Beställ
      </button>
    </aside>
  );
}

export default Cart;
