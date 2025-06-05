import React from "react";

function ProfileDropdown({
  currentUser,
  onLogin,
  onLogout,
  onShowOrders,
  onClose,
}) {
  return (
    <aside className="Cart" style={{ minWidth: 220, zIndex: 200 }}>
      <button
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
        aria-label="Stäng profilmeny"
      >
        &minus;
      </button>
      <h3>Profil</h3>
      {!currentUser ? (
        <button style={{ width: "100%" }} onClick={onLogin}>
          Logga in
        </button>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <strong>{currentUser.name}</strong>
            <br />
            <span style={{ fontSize: "0.9em", color: "#888" }}>
              {currentUser.email}
            </span>
          </div>
          <button
            className="button-glow"
            style={{ width: "100%", marginBottom: 8 }}
            onClick={onShowOrders}
          >
            Tidigare beställningar
          </button>
          <button
            className="button-glow"
            style={{ width: "100%" }}
            onClick={onLogout}
          >
            Logga ut
          </button>
        </>
      )}
    </aside>
  );
}

export default ProfileDropdown;
