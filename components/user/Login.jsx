import React, { useState } from "react";

function Login({ setCurrentUser, goToRegister, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // Hämta användare från json-server
    const res = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    );
    const users = await res.json();
    console.log(users);
    if (users.length > 0) {
      setCurrentUser(users[0]);
      localStorage.setItem("currentUser", JSON.stringify(users[0]));
      localStorage.setItem("loginTime", Date.now().toString());
    } else {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: 300,
        margin: "2rem auto",
        position: "relative",
      }}
    >
      {onClose && (
        <button
          className="close-modal"
          type="button"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={onClose}
          aria-label="Stäng login"
        >
          &minus;
        </button>
      )}
      <h2>Logga in</h2>
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
      <button className="button-glow" type="submit" style={{ width: "100%" }}>
        Logga in
      </button>
      <button
        className="button-glow"
        type="button"
        onClick={goToRegister}
        style={{ width: "100%", marginTop: 8 }}
      >
        Skapa användare
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}

export default Login;
