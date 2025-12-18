import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./signup.css";

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (pw1 !== pw2) {
      setMessage("Passwords do not match ❌");
      setMsgColor("red");
      return;
    }

    if (!email.trim() || !name.trim()) {
      setMessage("Please fill all fields ❌");
      setMsgColor("red");
      return;
    }

    try {
      // ✅ Send signup request to backend
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pw1 }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registered Successfully ✅");
        setMsgColor("green");
        console.log("User Registered:", data);
      } else {
        setMessage(data.message || "Registration failed ❌");
        setMsgColor("red");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("Server error. Please try again later ❌");
      setMsgColor("red");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* ✅ Added Name Field */}
        <div className="loginpage">
          <label className="label">Name</label><br />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="loginpage">
          <label className="label">Email</label><br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="loginpage">
          <label className="label">Password</label><br />
          <input
            type="password"
            placeholder="Enter your password"
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
            required
          />
        </div>

        <div className="loginpage">
          <label className="label">Confirm Password</label><br />
          <input
            type="password"
            placeholder="Confirm your password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            required
          />
        </div>

        {message && <p style={{ color: msgColor }}>{message}</p>}

        <div className="loginpage">
          <button type="submit">Register Now</button>
        </div>

        {/* Optional: Add link to login */}
        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Sign;
