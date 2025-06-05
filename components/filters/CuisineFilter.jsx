import React from "react";

function CuisineFilter({ setFilter }) {
  return (
    <div className="cuisine-filter-group">
      <img
        src="src/assets/FilterLogos/Symbol 1.svg"
        alt="Alla"
        className="filterLogo allFood symbol"
        onClick={() => setFilter("")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 2.svg"
        alt="Burgers"
        className="filterLogo burgers symbol"
        onClick={() => setFilter("Burgers")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 3.svg"
        alt="Pizza"
        className="filterLogo pizza symbol"
        onClick={() => setFilter("Pizza")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 4.svg"
        alt="Sushi"
        className="filterLogo sushi symbol"
        onClick={() => setFilter("Sushi")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 5.svg"
        alt="Asian"
        className="filterLogo asian symbol"
        onClick={() => setFilter("Asian")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 6.svg"
        alt="Chinese"
        className="filterLogo chinese symbol"
        onClick={() => setFilter("Chinese")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 7.svg"
        alt="Fika"
        className="filterLogo fika symbol"
        onClick={() => setFilter("Fika")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 8.svg"
        alt="Salads"
        className="filterLogo salads symbol"
        onClick={() => setFilter("Salads")}
      />
      <img
        src="src/assets/FilterLogos/Symbol 9.svg"
        alt="Sweets"
        className="filterLogo sweets symbol"
        onClick={() => setFilter("Sweets")}
      />
    </div>
  );
}

export default CuisineFilter;
