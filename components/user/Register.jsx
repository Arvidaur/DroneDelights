import React, { useState } from "react";

function Register({ onRegister, goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    // Kontrollera om användarnamn redan finns
    const res = await fetch(`http://localhost:3001/users?username=${username}`);
    const users = await res.json();
    if (users.length > 0) {
      setError("Användarnamnet är redan upptaget");
      return;
    }
    // Skapa användare
    const createRes = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        favorite: [],
      }),
    });
    if (createRes.ok) {
      alert("Användare skapad! Du kan nu logga in.");
      goToLogin();
    } else {
      setError("Något gick fel, försök igen.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{ maxWidth: 300, margin: "2rem auto" }}
    >
      <h2>Skapa användare</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button className="button-glow" type="submit" style={{ width: "100%" }}>
        Skapa användare
      </button>
      <button
        className="button-glow"
        type="button"
        onClick={goToLogin}
        style={{ width: "100%", marginTop: 8 }}
      >
        Tillbaka till logga in
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}

export default Register;
