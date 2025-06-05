import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment({
  cartItems,
  setCartItems,
  orderInfo,
  setOrderInfo,
  currentUser,
  restaurants,
  setShowCart,
  setLastOrderInfo,
  setShowOrderReceipt,
  onOrderComplete,
  triggerFireworks,
}) {
  const [method, setMethod] = useState("kort");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const navigate = useNavigate(); // Lägg till denna rad

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderInfo) return;
    if (!address.trim()) {
      alert("Du måste ange en adress!");
      return;
    }
    if (!number.match(/^\d+$/) && method === "kort") {
      alert("Numret måste bara innehålla siffror!");
      return;
    }
    if (
      method === "swish" &&
      !(number.startsWith("07") || number.startsWith("+46"))
    ) {
      alert("Swishnummer måste börja med 07 eller +46!");
      return;
    }

    // Skicka ordern till servern
    const orderData = {
      userId: currentUser.id,
      restaurantId: orderInfo.restaurantId,
      items: orderInfo.items,
      totalPrice: orderInfo.totalPrice,
      deliveryAddress: address,
      paymentMethod: method,
      date: new Date().toISOString(),
    };
    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    // Hämta aktuell användare
    const userRes = await fetch(
      `http://localhost:3001/users/${currentUser.id}`
    );
    const user = await userRes.json();

    // Skapa en kopia av nuvarande favoriter
    let favorites = Array.isArray(user.favorite) ? [...user.favorite] : [];

    // Lägg till varje rätt från ordern om den inte redan finns
    orderInfo.items.forEach((item) => {
      const exists = favorites.some(
        (fav) =>
          fav.restaurantId == orderInfo.restaurantId &&
          fav.category === item.category &&
          fav.itemId === item.itemId
      );
      if (!exists) {
        favorites.push({
          restaurantId: orderInfo.restaurantId,
          category: item.category,
          itemId: item.itemId,
        });
      }
    });

    // Uppdatera användarens favoriter i json-server
    await fetch(`http://localhost:3001/users/${currentUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: favorites }),
    });

    // ...efter att ordern har skickats till servern...
    for (const item of orderInfo.items) {
      // Hämta aktuell restaurang från servern
      const restRes = await fetch(
        `http://localhost:3001/Restaurant/${orderInfo.restaurantId}`
      );
      const rest = await restRes.json();
      if (!rest) continue;
      // Uppdatera rätt rätts timesOrdered
      const updatedMenu = { ...rest.menu };
      updatedMenu[item.category] = updatedMenu[item.category].map((d) =>
        d.id === item.itemId
          ? { ...d, timesOrdered: (d.timesOrdered || 0) + item.quantity }
          : d
      );
      // PUT:a hela restaurangen tillbaka
      await fetch(`http://localhost:3001/Restaurant/${rest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          menu: updatedMenu,
        }),
      });
    }
    const restaurant = restaurants.find((r) => r.id == orderInfo.restaurantId);

    onOrderComplete(orderData, restaurant);
    if (triggerFireworks) triggerFireworks();
    setCartItems([]);
    setOrderInfo(null);
    setTimeout(() => {
      setShowThankYou(true);
      navigate("/");
    }, 100); // eller visa ThankYou på startsidan
  };

  return (
    <div className="payment" style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <h2>Betalning</h2>
        <div className="radio-group">
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
        </div>
        <input
          type="text"
          placeholder={method === "kort" ? "Kortnummer" : "Swishnummer"}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Leveransadress"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button className="button-glow" type="submit">
          Betala
        </button>
      </form>
    </div>
  );
}

export default Payment;
