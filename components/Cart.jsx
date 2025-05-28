import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems, setOrderInfo }) {
  const navigate = useNavigate();

  const increase = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseOrRemove = (id, quantity) => {
    if (quantity === 1) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
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
      <h3>Kundvagn</h3>
      <ul>
        {cartItems.length === 0 ? (
          <li>Din varukorg är tom</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "1rem",
                }}
              />
              <strong>{item.name}</strong>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
              >
                <button
                  onClick={() => decreaseOrRemove(item.id, item.quantity)}
                  style={{ marginRight: "0.5rem" }}
                >
                  {item.quantity === 1 ? "🗑️" : "-"}
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increase(item.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  +
                </button>
              </div>
              <span style={{ marginLeft: "1rem" }}>
                {item.price * item.quantity} kr
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
