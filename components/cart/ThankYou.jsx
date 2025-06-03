import React from "react";

function ThankYou({ order, restaurant, onClose }) {
  if (!order || !restaurant) return null;
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        background: "#fff",
        border: "2px solid #eee",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: 32,
        zIndex: 10,
        textAlign: "center",
      }}
    >
      <h2>Tack för din beställning!</h2>
      <p>
        <strong>Restaurang:</strong> {restaurant.name}
        <br />
        <strong>Leveranstid:</strong> {restaurant.deliveryTime} min
      </p>
      <h3>Din beställning:</h3>
      <ul style={{ textAlign: "left" }}>
        {order.items.map((item, i) => {
          const dish = restaurant.menu[item.category]?.find(
            (d) => d.id === item.itemId
          );
          return (
            <li key={i}>
              {dish ? (
                <>
                  {dish.name} ({item.category}) x {item.quantity} –{" "}
                  {dish.price * item.quantity} kr
                </>
              ) : (
                <>Okänd rätt x {item.quantity}</>
              )}
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Totalt:</strong> {order.totalPrice} kr
      </p>
      <p>
        <strong>Betalsätt:</strong> {order.paymentMethod}
        <br />
        <strong>Leveransadress:</strong> {order.deliveryAddress}
      </p>
      <button onClick={onClose}>Stäng</button>
    </div>
  );
}

export default ThankYou;
