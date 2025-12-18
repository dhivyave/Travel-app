import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";

function Login() {
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const navigate = useNavigate();

  async function submitform(e) {
    e.preventDefault();

    if (pw.trim() === "" || email.trim() === "") {
      setMsg("Enter correct email and password");
      setMsgColor("red");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setMsg("Logged in Successfully ✅");
        setMsgColor("green");

        console.log("Logged in Successfully:", data);

        // ⭐ Save token
        localStorage.setItem("token", data.token);

        // ⭐ Save current logged-user email for booking filtering
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ email })
        );

        // Redirect after short delay
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setMsg(data.message || "Invalid credentials ❌");
        setMsgColor("red");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMsg("Server error. Please try again later.");
      setMsgColor("red");
    }
  }

  return (
    <div className="all">
      <form onSubmit={submitform}>
        <div className="loginpage2">
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="loginpage2">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>

        {msg && <p style={{ color: msgColor }}>{msg}</p>}

        <div className="loginpage2">
          <button type="submit">LOG IN</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
