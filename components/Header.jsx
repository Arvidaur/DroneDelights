import React from "react";
import CuisineFilter from "./CuisineFilter";

function Header({
  currentUser,
  onProfileClick,
  onFavoritesClick,
  onCartClick,
}) {
  return (
    <>
      <nav>
        <div className="nav top">
          <img
            src="src\assets\Drone Delight LOGO FINAL.png"
            alt="The Drone Delight logo depicting a futuristic drone carrying delicious food"
            className="logo-main"
          />
          <img
            src="src\assets\location-pin.png"
            alt="Location pin"
            className="symbol location"
          />
          <h2>Gatangatan 123 Malmö 222 22</h2>
          <h1>Drone Delights</h1>
          <img
            src="src/assets/avatar.png"
            alt="Account"
            className="symbol account"
            onClick={onProfileClick}
            style={{ cursor: "pointer" }}
          />
          <img
            src="src/assets/heart.png"
            alt="Favorites"
            className="symbol favorites"
            onClick={onFavoritesClick}
            style={{ cursor: "pointer" }}
          />
          <img
            src="src/assets/shopping-cart.png"
            alt="Checkout"
            className="symbol checkout"
            onClick={onCartClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="nav middle">
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
        </div>

        <div className="nav bottom">
          <CuisineFilter />
        </div>
      </nav>
    </>
  );
}

export default Header;
