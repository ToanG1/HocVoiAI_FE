import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.scss";

export default function Signup() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (password1 !== "" && password2 !== "") {
      if (password1 !== password2) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [password1, password2]);
  return (
    <>
      <div className="signup-section">
        <div class="form-box">
          <div class="form-value">
            <form>
              <h2>Signup</h2>

              <div class="inputbox">
                <input type="email" required placeholder=" " />
                <label>Email</label>
              </div>

              <div class="inputbox">
                <input
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Password</label>
              </div>

              <div class="inputbox">
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Re-enter Password</label>
              </div>

              <button disabled={!isValid}>Sign up</button>

              <div class="register">
                <p>
                  Already have an account? <Link to="#">Login</Link> Now
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
