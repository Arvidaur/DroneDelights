import React from "react";
import RestaurantGrid from "../restaurant/RestaurantGrid";

function Layout({ filter, sort }) {
  return (
    <>
      <RestaurantGrid filter={filter} sort={sort} />
    </>
  );
}

export default Layout;
