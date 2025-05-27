import React from "react";
import { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
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
              <strong>{item.name}</strong> – {item.price} kr
              <button
                onClick={() =>
                  setCartItems(cartItems.filter((i) => i.id !== item.id))
                }
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default Cart;
