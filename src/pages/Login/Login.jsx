import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.scss";

import { login } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  async function handleLogin() {
    login(email, pass).then((res) => {
      res
        ? navigate("/features")
        : toast.error("Email or password may be incorrect", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
    });
  }
  return (
    <>
      <div className="login-section">
        <ToastContainer />
        <div class="form-box">
          <div class="form-value">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <h2>Login</h2>

              <div class="inputbox">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Email</label>
              </div>

              <div class="inputbox">
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Password</label>
              </div>

              <div class="forget">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <Link to="#">Forgot Password</Link>
              </div>

              <button type="submit">Log In</button>

              <div class="register">
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
