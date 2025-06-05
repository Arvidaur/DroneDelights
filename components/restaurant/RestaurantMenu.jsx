import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const categoryNames = {
  all: "Alla rätter",
  starters: "Förrätter",
  main: "Huvudrätter",
  dessert: "Efterrätter",
  drinks: "Drycker",
};

const categories = ["starters", "main", "dessert", "drinks"];

function RestaurantMenu({ addToCart, currentUser, setLoginPrompt }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [dishCategory, setDishCategory] = useState("all"); // <-- NYTT

  useEffect(() => {
    fetch(`http://localhost:3001/Restaurant/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurant(data));
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  const allDishes = categories
    .flatMap((cat) =>
      (restaurant.menu[cat] || []).map((dish) =>
        dish && typeof dish.timesOrdered === "number"
          ? { ...dish, category: cat }
          : null
      )
    )
    .filter(Boolean);

  // Filtrera ut rätter som har beställts minst 1 gång
  const popularDishes = [...allDishes]
    .filter((dish) => dish.timesOrdered > 0)
    .sort((a, b) => b.timesOrdered - a.timesOrdered)
    .slice(0, 4);

  // Filtrera rätter baserat på valt filter
  const filteredDishes =
    dishCategory === "all"
      ? allDishes
      : allDishes.filter((dish) => dish.category === dishCategory);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <img
          className="restaurant-img"
          src={
            restaurant.image
              ? restaurant.image
                  .replace(/^src[\\/]+assets[\\/]+/, "/assets/")
                  .replaceAll("\\", "/")
              : ""
          }
          alt={restaurant.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
            margin: "16px", // Lägg till om du vill ha luft nedtill
          }}
        />
        <h1 className="h1-main">{restaurant.name} – Meny</h1>
      </div>

      <button
        className="button-glow"
        style={{ marginBottom: 24, marginLeft: 32 }}
        onClick={() => navigate("/")}
      >
        Tillbaka
      </button>

      {/* KATEGORI-FILTER */}
      <div className="filter-button-group" style={{ marginBottom: 24 }}>
        <button
          className="button-glow"
          onClick={() => setDishCategory("all")}
          style={{
            marginRight: 8,
            fontWeight: dishCategory === "all" ? "bold" : "normal",
          }}
        >
          Alla
        </button>
        <button
          className="button-glow"
          onClick={() => setDishCategory("starters")}
          style={{
            marginRight: 8,
            fontWeight: dishCategory === "starters" ? "bold" : "normal",
          }}
        >
          Förrätt
        </button>
        <button
          className="button-glow"
          onClick={() => setDishCategory("main")}
          style={{
            marginRight: 8,
            fontWeight: dishCategory === "main" ? "bold" : "normal",
          }}
        >
          Huvudrätt
        </button>
        <button
          className="button-glow"
          onClick={() => setDishCategory("dessert")}
          style={{
            marginRight: 8,
            fontWeight: dishCategory === "dessert" ? "bold" : "normal",
          }}
        >
          Efterrätt
        </button>
        <button
          className="button-glow"
          onClick={() => setDishCategory("drinks")}
          style={{
            fontWeight: dishCategory === "drinks" ? "bold" : "normal",
          }}
        >
          Drycker
        </button>
      </div>

      {/* Visa populära rätter endast om Alla är valt */}
      {dishCategory === "all" && (
        <section id="popular">
          <h2 className="category-heading">Mest Populära</h2>
          {popularDishes.length > 0 ? (
            <ul className="dish-list">
              {popularDishes.map((dish) => (
                <li key={dish.id + dish.name} className="dish-card">
                  <img src={dish.image} alt={dish.name} className="dish-img" />
                  <div>
                    <strong>{dish.name}</strong> – {dish.price} kr
                    <br />
                    {dish.description}
                    <br />
                    <span style={{ color: "#888", fontSize: "0.9em" }}>
                      Beställd {dish.timesOrdered} gånger
                    </span>
                    <br />
                    <button
                      className="button-glow"
                      onClick={() => {
                        if (!currentUser) {
                          setLoginPrompt(
                            "Du måste vara inloggad för att lägga till i kundvagnen."
                          );
                          return;
                        }
                        addToCart({
                          ...dish,
                          category: dish.category,
                          restaurantId: restaurant.id,
                          price: dish.price || 0,
                          quantity: 1,
                        });
                      }}
                    >
                      Lägg till i varukorg
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#888" }}>Inga rätter har beställts än.</p>
          )}
        </section>
      )}

      {/* Visa filtrerade rätter */}
      <section>
        {/* Visa alltid rubriken för vald kategori */}
        {dishCategory !== "all" && (
          <h2
            className="category-heading"
            style={{ marginTop: 32, marginBottom: 24 }}
          >
            {categoryNames[dishCategory]}
          </h2>
        )}

        {dishCategory === "all" ? (
          categories.map((cat) => {
            const dishes = allDishes.filter((dish) => dish.category === cat);
            if (dishes.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="category-heading">{categoryNames[cat]}</h2>
                <ul className="dish-list">
                  {dishes.map((dish) => (
                    <li key={dish.id + dish.category} className="dish-card">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="dish-img"
                      />
                      <div>
                        <strong>{dish.name}</strong> – {dish.price} kr
                        <br />
                        {dish.description}
                        <br />
                        <span style={{ color: "#888", fontSize: "0.9em" }}>
                          {categoryNames[dish.category]}
                        </span>
                        <br />
                        <button
                          className="button-glow"
                          onClick={() =>
                            addToCart({
                              ...dish,
                              category: dish.category,
                              restaurantId: restaurant.id,
                              price: dish.price || 0,
                              quantity: 1,
                            })
                          }
                        >
                          Lägg till i varukorg
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <ul className="dish-list">
            {filteredDishes.map((dish) => (
              <li key={dish.id + dish.category} className="dish-card">
                <img src={dish.image} alt={dish.name} className="dish-img" />
                <div>
                  <strong>{dish.name}</strong> – {dish.price} kr
                  <br />
                  {dish.description}
                  <br />
                  <span style={{ color: "#888", fontSize: "0.9em" }}>
                    {categoryNames[dish.category]}
                  </span>
                  <br />
                  <button
                    onClick={() =>
                      addToCart({
                        ...dish,
                        category: dish.category,
                        restaurantId: restaurant.id,
                        price: dish.price || 0,
                        quantity: 1,
                      })
                    }
                  >
                    Lägg till i varukorg
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default RestaurantMenu;
