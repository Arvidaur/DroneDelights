import React from "react";

function CuisineFilter({ setFilter }) {
  return (
    <div className="cuisine-filter-group">
      <img
        src="src/assets/FilterLogos/Symbol 1.svg"
        alt="Alla"
        className="filterLogo allFood"
        onClick={() => setFilter("")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 2.svg"
        alt="Burgers"
        className="filterLogo burgers"
        onClick={() => setFilter("Burgers")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 3.svg"
        alt="Pizza"
        className="filterLogo pizza"
        onClick={() => setFilter("Pizza")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 4.svg"
        alt="Sushi"
        className="filterLogo sushi"
        onClick={() => setFilter("Sushi")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 5.svg"
        alt="Asian"
        className="filterLogo asian"
        onClick={() => setFilter("Asian")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 6.svg"
        alt="Chinese"
        className="filterLogo chinese"
        onClick={() => setFilter("Chinese")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 7.svg"
        alt="Fika"
        className="filterLogo fika"
        onClick={() => setFilter("Fika")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 8.svg"
        alt="Salads"
        className="filterLogo salads"
        onClick={() => setFilter("Salads")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 9.svg"
        alt="Sweets"
        className="filterLogo sweets"
        onClick={() => setFilter("Sweets")}
      />
    </div>
  );
}

export default CuisineFilter;
