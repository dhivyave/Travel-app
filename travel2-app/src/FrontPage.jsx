import React from "react";
import { useNavigate } from "react-router-dom";
import "./FrontPage.css";

function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className="frontpage">
      <div className="front-content">
        <h1 className="front-title">Welcome to Travel Explorer 🌍</h1>
        <p className="front-subtitle">
          Discover amazing destinations, book hotels, and plan your next adventure!
        </p>

        <div className="front-buttons">
          <button onClick={() => navigate("/login")} className="btn-login">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="btn-signup">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
