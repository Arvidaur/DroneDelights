import React, { useState, useEffect } from "react";
import Restaurant from "./Restaurant";

function RestaurantGrid() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Restaurant")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="restaurant-grid">
      {restaurants.map((restaurant) => (
        <Restaurant
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          image={restaurant.image}
          cuisine={restaurant.category}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
        />
      ))}
    </div>
  );
}

export default RestaurantGrid;
