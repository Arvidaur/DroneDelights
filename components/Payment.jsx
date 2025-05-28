import React, { useState } from "react";

function Payment({ cartItems, setCartItems, orderInfo, setOrderInfo }) {
  const [method, setMethod] = useState("kort");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderInfo) return;

    // Skicka ordern till servern
    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        restaurantId: orderInfo.restaurantId,
        items: orderInfo.items,
        totalPrice: orderInfo.totalPrice,
        deliveryAddress: address,
        paymentMethod: method,
      }),
    });

    // Lägg till favorit (mest beställd rätt)
    const mostOrdered = cartItems.reduce(
      (max, item) => (item.quantity > (max?.quantity || 0) ? item : max),
      null
    );
    if (mostOrdered) {
      await fetch("http://localhost:3001/users/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favorite: [
            {
              restaurantId: orderInfo.restaurantId,
              category: mostOrdered.category,
              itemId: mostOrdered.id,
            },
          ],
        }),
      });
    }

    setCartItems([]);
    setOrderInfo(null);
    alert(`Betalning med ${method}: ${number}\nOrdern är lagd!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Betalning</h2>
      <label>
        <input
          type="radio"
          value="kort"
          checked={method === "kort"}
          onChange={() => setMethod("kort")}
        />
        Kort
      </label>
      <label>
        <input
          type="radio"
          value="swish"
          checked={method === "swish"}
          onChange={() => setMethod("swish")}
        />
        Swish
      </label>
      <br />
      <input
        type="text"
        placeholder={method === "kort" ? "Kortnummer" : "Swishnummer"}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Leveransadress"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">Betala</button>
    </form>
  );
}

export default Payment;
