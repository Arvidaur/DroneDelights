import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header({
  currentUser,
  onProfileClick,
  onFavoritesClick,
  onCartClick,
  cartCount, //Visar antal saker tillagda i cart
}) {
  const navigate = useNavigate();
  const location = useLocation(); // Lägg till denna rad

  // Texts being displayed on the hero page
  const heroTexts = [
    'Levererar mat med stil – snabbare än du hinner säga "hungrig"!',
    "Rekommenderas av 9 av 10 tandläkare!",
    "Mat från molnen – levererad med neonprecision.",
    "Drönare i neon. Smak i världsklass.",
    "Från kocken till ditt kvarter på 3.2 nanosekunder.",
    "Beställ. Blinka. Maten är där.",
    "Cybermat. Retropris. Turbohastighet.",
    "Mätt framtiden – en drönare i taget.",
    "Din smak är vår kod.",
    "När magen kurrar, surrar vi.",
    "Framtiden har landat – och den har sushi.",
    "Alltid varmt. Alltid snabbt. Alltid coolt.",
    "Vi levererar till varje neonupplyst gränd.",
    "Hacka hungern. Beställ nu.",
    "Neonsmak direkt till din dörr – inga frågor ställda.",
    "Byggd för smaken. Kodad för leverans.",
    "Din cybermåltid är bara ett klick bort.",
    "Laddar tacos... Teleporterar smak...",
    "Äkta streetfood – från framtidens gator.",
    "Vi flyger – så du slipper gå.",
    "När natten är mörk, är vi neon.",
    "Brusande kablar. Fräsande nudlar. Perfekt leverans.",
    "Matleverans med överklockad smak.",
    "Drönare med smakuppdrag – inga kompromisser.",
    "Smaken av 2099, serverad nu.",
    "Made in Neon Malmö 2025",
    "Initierar vitlöksbröd...",
    "Releasing Drones... Please Stand by...",
    "Laddar aranchinibollar...",
    "Alltid gratis leverans!",
  ];

  const [currentText, setCurrentText] = useState(() =>
    Math.floor(Math.random() * heroTexts.length)
  );
  const [fade, setFade] = useState(true);
  const [textPosition, setTextPosition] = useState({ top: "40%", left: "50%" });

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Starta fade ut
      setTimeout(() => {
        setCurrentText((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * heroTexts.length);
          } while (next === prev && heroTexts.length > 1);
          return next;
        });
        // Randomize the position of the text
        setTextPosition({
          top: `${30 + Math.random() * 40}%`, // 30% till 70% av höjden
          left: `${20 + Math.random() * 60}%`, // 20% till 80% av bredden
        });
        setFade(true); // Fade in nästa text
      }, 400); // Matcha med fade-out-tiden i CSS
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
            <div style={{ position: "relative" }}>
              <img
                src="src/assets/shopping-cart.png"
                alt="Checkout"
                className="symbol checkout symbol-interactive"
                onClick={onCartClick}
                style={{ cursor: "pointer" }}
              />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "var(--imperialRed-color)",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 8px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    minWidth: 22,
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Visa hero BARA på startsidan */}
        {location.pathname === "/" && (
          <div
            className="hero"
            style={{
              width: "100%",

              backgroundImage: "url('/assets/DroneDelightsHeroImage3.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              position: "relative",
            }}
          >
            <h2
              className={`hero-info ${fade ? "fade-in" : "fade-out"}`}
              style={{
                top: textPosition.top,
                left: textPosition.left,
              }}
            >
              {heroTexts[currentText]}
            </h2>
            <div className="rain">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  className="raindrop"
                  key={i}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
