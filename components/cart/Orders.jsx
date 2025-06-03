import React from "react";

function Orders({ orders, restaurants, onClose }) {
  // Hjälpfunktion för att formatera datum
  function formatDate(dateString) {
    if (!dateString) return "Okänt datum";
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
        aria-label="Stäng beställningar"
      >
        &minus;
      </button>
      <h3>Tidigare beställningar</h3>
      <button
        style={{
          marginBottom: 16,
          width: "100%",
          background: "#eee",
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 8,
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Tillbaka
      </button>
      {orders.length === 0 ? (
        <p>Du har inga beställningar än.</p>
      ) : (
        <ul>
          {orders.map((order, i) => {
            const rest = restaurants.find((r) => r.id == order.restaurantId);
            return (
              <li key={order.id || i} style={{ marginBottom: 12 }}>
                <strong>{rest ? rest.name : "Okänd restaurang"}</strong>
                <br />
                <span style={{ fontSize: "0.9em", color: "#888" }}>
                  {formatDate(order.date)}
                </span>
                <br />
                {order.items.map((item, j) => {
                  const dish = rest?.menu[item.category]?.find(
                    (d) => d.id === item.itemId
                  );
                  return (
                    <div key={j}>
                      {dish ? dish.name : "Okänd rätt"} ({item.category}) x{" "}
                      {item.quantity}
                    </div>
                  );
                })}
                <div style={{ fontSize: "0.9em", color: "#888" }}>
                  Totalt: {order.totalPrice} kr
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

export default Orders;
