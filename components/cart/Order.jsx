import React from "react";

function Order({ order, restaurant, onClose }) {
  if (!order || !restaurant) return null;

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
        onClick={onClose}
        aria-label="Stäng kvitto"
      >
        &minus;
      </button>
      <h2>Tack för din beställning!</h2>
      <p>
        <strong>Restaurang:</strong> {restaurant.name}<br />
        <strong>Leveranstid:</strong> {restaurant.deliveryTime} min
      </p>
      <h3>Din beställning:</h3>
      <ul>
        {order.items.map((item, i) => {
          const dish = restaurant.menu[item.category]?.find(d => d.id === item.itemId);
          return (
            <li key={i}>
              {dish ? (
                <>
                  {dish.name} ({item.category}) x {item.quantity} – {dish.price * item.quantity} kr
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
        <strong>Betalsätt:</strong> {order.paymentMethod}<br />
        <strong>Leveransadress:</strong> {order.deliveryAddress}
      </p>
    </aside>
  );
}

export default Order;