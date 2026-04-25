import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "32px"
    }}>
      Império Digital Online 🚀
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
