import React from "react";

function Favorites({ mostOrdered, restaurants, setShowFavorites }) {
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
        onClick={() => setShowFavorites(false)}
        aria-label="Stäng favoriter"
      >
        &minus;
      </button>
      <h3>Dina mest beställda rätter</h3>
      <ol>
        {mostOrdered && mostOrdered.length > 0 ? (
          mostOrdered.map((fav, i) => {
            const rest = restaurants.find((r) => r.id == fav.restaurantId);
            let dish;
            if (rest && rest.menu && rest.menu[fav.category]) {
              dish = rest.menu[fav.category].find((d) => d.id == fav.itemId);
            }
            return (
              <li key={i} style={{ marginBottom: 12 }}>
                {dish ? (
                  <>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginRight: 8,
                      }}
                    />
                    <strong>{dish.name}</strong> ({fav.category})<br />
                    <span style={{ fontSize: "0.9em", color: "#888" }}>
                      {rest?.name}
                    </span>
                    <div>Beställd {fav.count} gånger</div>
                  </>
                ) : (
                  <span>Okänd rätt</span>
                )}
              </li>
            );
          })
        ) : (
          <li>Inga favoriter än!</li>
        )}
      </ol>
    </aside>
  );
}

export default Favorites;
