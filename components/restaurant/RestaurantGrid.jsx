import React, { useState, useEffect } from "react";
import Restaurant from "./Restaurant";

function RestaurantGrid({ filter, sort = { field: "", order: "asc" } }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Restaurant")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  let filtered = filter
    ? restaurants.filter(
        (r) => r.category.toLowerCase() === filter.toLowerCase()
      )
    : restaurants;

  if (sort.field === "deliveryTime") {
    filtered = [...filtered].sort((a, b) =>
      sort.order === "asc"
        ? a.deliveryTime - b.deliveryTime
        : b.deliveryTime - a.deliveryTime
    );
  } else if (sort.field === "rating") {
    filtered = [...filtered].sort((a, b) =>
      sort.order === "desc" ? b.rating - a.rating : a.rating - b.rating
    );
  }

  return (
    <div className="restaurant-grid">
      {filtered.map((restaurant) => (
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
