import React from "react";
import { useNavigate } from "react-router-dom";

const categoryNames = {
    starters: "Förrätt",
    main: "Huvudrätt",
    dessert: "Efterrätt",
    drinks: "Drycker",
  };

function Restaurant(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${props.id}`);
  };
  return (
    <div
      className="restaurant"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={props.image} alt={props.name} className="restaurant-image" />
      <h2 className="restaurant-name">{props.name}</h2>
      <p className="restaurant-cuisine">{props.cuisine}</p>
      <p className="restaurant-deliveryTime">{props.deliveryTime}min</p>
      <p className="restaurant-rating">{props.rating} av 5⭐</p>
    </div>
  );
}

export default Restaurant;
