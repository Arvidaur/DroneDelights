import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RestaurantGrid from "../restaurant/RestaurantGrid";
import CuisineFilter from "../filters/CuisineFilter.jsx";
import FilterButton from "../filters/FilterButton";

function Layout({
  children,
  currentUser,
  onProfileClick,
  onFavoritesClick,
  onCartClick,
  setFilter,
  filter,
  setSort,
  sort,
}) {
  const location = useLocation();

  // Visa bara på startsidan
  const isHome = location.pathname === "/";

  return (
    <>
      <Header
        currentUser={currentUser}
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
        onCartClick={onCartClick}
        setFilter={setFilter}
        filter={filter}
        setSort={setSort}
        sort={sort}
      />

      {isHome && (
        <>
          <div className="header-and-filters">
            <h1 className="h1-main">Våra restauranger</h1>

            <div className="filter-sort-row" style={{ margin: "16px 0" }}>
              <FilterButton
                onClick={() =>
                  setSort((prev) =>
                    prev.field === "deliveryTime" && prev.order === "asc"
                      ? { field: "deliveryTime", order: "desc" }
                      : { field: "deliveryTime", order: "asc" }
                  )
                }
                active={sort.field === "deliveryTime"}
              >
                {sort.field === "deliveryTime"
                  ? sort.order === "asc"
                    ? "Långsamast Leveranstid"
                    : "Snabbast Leveranstid"
                  : "Snabbast Leveranstid"}
              </FilterButton>
              <FilterButton
                onClick={() =>
                  setSort((prev) =>
                    prev.field === "rating" && prev.order === "desc"
                      ? { field: "rating", order: "asc" }
                      : { field: "rating", order: "desc" }
                  )
                }
                active={sort.field === "rating"}
              >
                {sort.field === "rating"
                  ? sort.order === "desc"
                    ? "Sämst betyg"
                    : "Bäst betyg"
                  : "Bäst betyg"}
              </FilterButton>
              <FilterButton
                onClick={() => setSort({ field: "", order: "asc" })}
              >
                Nollställ sortering
              </FilterButton>
            </div>
            <CuisineFilter setFilter={setFilter} />
          </div>
        </>
      )}

      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
