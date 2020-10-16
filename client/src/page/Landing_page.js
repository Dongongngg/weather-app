import React from "react";
import { Link } from "react-router-dom";

export default function Landing_page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Link to="/weather">
        <button
          style={{
            width: "30vh",
            height: "10vh",
            backgroundColor: "orange",
            color: "white",
            fontSize: "3rem",
          }}
        >
          Start App
        </button>
      </Link>
    </div>
  );
}
