import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div>
        &copy; {new Date().getFullYear()} Drone Delights 🚁🍔🍣🍕
        <br />
        <span style={{ fontSize: "0.95em", color: "#ffe" }}>
          Levererar mat med stil – snabbare än du hinner säga "hungrig"!
        </span>
        <br />
        <span style={{ fontSize: "0.9em", color: "#ffe" }}>
          <a
            href="https://github.com/arvidaur"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            GitHub
          </a>{" "}
          | Kurs: Gränssnittsutveckling SYSM8 VT25
        </span>
      </div>
    </footer>
  );
}

export default Footer;
