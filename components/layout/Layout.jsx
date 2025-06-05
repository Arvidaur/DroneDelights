import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RestaurantGrid from "../restaurant/RestaurantGrid";
import CuisineFilter from "../filters/CuisineFilter.jsx";
import FilterButton from "../filters/FilterButton";

// Layout-komponenten omsluter hela sidans struktur och hanterar header, footer och filtrering
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
  cartCount,
}) {
  const location = useLocation();

  // Kontrollera om vi är på startsidan för att visa filter och rubrik
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Header visas på alla sidor */}
      <Header
        currentUser={currentUser}
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
        onCartClick={onCartClick}
        setFilter={setFilter}
        filter={filter}
        setSort={setSort}
        sort={sort}
        cartCount={cartCount}
      />

      {/* Visa filter och rubrik endast på startsidan */}
      {isHome && (
        <>
          <div className="header-and-filters">
            <h1 className="h1-main">Våra restauranger</h1>

            {/* Sorteringsknappar */}
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
            {/* Filtrera på kök */}
            <CuisineFilter setFilter={setFilter} />
          </div>
        </>
      )}

      {/* Huvudinnehåll (routes) */}
      <main>{children}</main>
      {/* Footer visas på alla sidor */}
      <Footer />
    </>
  );
}

export default Layout;
