import React from "react";
import Restaurant from "./Restaurant";

function RestaurantGrid({
  filter,
  sort = { field: "", order: "asc" },
  restaurants = [],
}) {
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
