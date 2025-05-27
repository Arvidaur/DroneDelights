import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const categoryNames = {
  starters: "Förrätt",
  main: "Huvudrätt",
  dessert: "Efterrätt",
  drinks: "Drycker",
};

const categories = ["starters", "main", "dessert", "drinks"];

function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/Restaurant/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurant(data));
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h1>{restaurant.name} – Meny</h1>
      {categories.map((category) =>
        restaurant.menu[category] && restaurant.menu[category].length > 0 ? (
          <section key={category} id={category}>
            <h2>{categoryNames[category]}</h2>
            <ul>
              {restaurant.menu[category].map((dish) => (
                <li key={dish.id} style={{ marginBottom: "1.5rem" }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "1rem",
                      float: "left",
                    }}
                  />
                  <div style={{ overflow: "hidden" }}>
                    <strong>{dish.name}</strong> – {dish.price} kr
                    <br />
                    {dish.description}
                    <br />
                    <button onClick={() => addToCart(dish.id)}>
                      Lägg till i varukorg
                    </button>
                  </div>
                  <div style={{ clear: "both" }} />
                </li>
              ))}
            </ul>
          </section>
        ) : null
      )}
    </div>
  );
}

export default RestaurantMenu;
