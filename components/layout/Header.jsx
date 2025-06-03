import React from "react";
import { useNavigate } from "react-router-dom";
import CuisineFilter from "../filters/CuisineFilter";

function Header({
  currentUser,
  onProfileClick,
  onFavoritesClick,
  onCartClick,
  setFilter,
  setSort,
  sort,
}) {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className="nav top">
          <img
            src="src\\assets\\Drone Delight LOGO FINAL.png"
            alt="The Drone Delight logo depicting a futuristic drone carrying delicious food"
            className="logo-main"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <h1 className="h1-main">Drone Delights</h1>
          <div className="nav-icons">
            <img
              src="src/assets/avatar.png"
              alt="Account"
              className="symbol account symbol-interactive"
              onClick={onProfileClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src="src/assets/heart.png"
              alt="Favorites"
              className="symbol favorites symbol-interactive"
              onClick={onFavoritesClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src="src/assets/shopping-cart.png"
              alt="Checkout"
              className="symbol checkout symbol-interactive"
              onClick={onCartClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Removed searchfunction */}
        {/* <div className="nav middle">
          <form action="submit">
            <input
              type="text"
              placeholder="Search Drone Delights for food, drinks, etc."
              className="search-bar"
            />
            <button type="submit" className="search-button">
              <img
                src="src\assets\search.png"
                alt="Search"
                className="symbol search"
              />
            </button>
          </form>
        </div> */}

        <div className="nav bottom">
          <CuisineFilter setFilter={setFilter} />
          <div className="filter-sort-row">
            <button
              className="filter-button"
              onClick={() =>
                setSort((prev) =>
                  prev.field === "deliveryTime" && prev.order === "asc"
                    ? { field: "deliveryTime", order: "desc" }
                    : { field: "deliveryTime", order: "asc" }
                )
              }
            >
              {sort.field === "deliveryTime"
                ? sort.order === "asc"
                  ? "Snabbast Leveranstid"
                  : "Långsamast Leveranstid"
                : "Långsamast Leveranstid"}
            </button>
            <button
              className="filter-button"
              onClick={() =>
                setSort((prev) =>
                  prev.field === "rating" && prev.order === "desc"
                    ? { field: "rating", order: "asc" }
                    : { field: "rating", order: "desc" }
                )
              }
            >
              {sort.field === "rating"
                ? sort.order === "desc"
                  ? "Bäst betyg"
                  : "Sämst betyg"
                : "Bäst betyg"}
            </button>
            <button
              className="filter-button"
              onClick={() => setSort({ field: "", order: "asc" })}
            >
              Nollställ sortering
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
