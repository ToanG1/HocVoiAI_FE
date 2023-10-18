import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.scss";

export default function Login() {
  return (
    <>
      <div className="login-section">
        <div class="form-box">
          <div class="form-value">
            <form>
              <h2>Login</h2>

              <div class="inputbox">
                <input type="email" required placeholder=" " />
                <label>Email</label>
              </div>

              <div class="inputbox">
                <input type="password" required placeholder=" " />
                <label>Password</label>
              </div>

              <div class="forget">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <Link to="#">Forgot Password</Link>
              </div>

              <button>Log In</button>

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
