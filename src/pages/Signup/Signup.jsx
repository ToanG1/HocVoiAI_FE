import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.scss";

import { signup } from "../../api/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (password1 !== "" && password2 !== "") {
      if (password1 !== password2) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setPass(password1);
      }
    }
  }, [password1, password2]);

  const navigate = useNavigate();
  async function handleSignup() {
    (await signup(email, pass, name))
      ? navigate("/features")
      : alert("something wrong");
  }
  return (
    <>
      <div className="signup-section">
        <div class="form-box">
          <div class="form-value">
            <form onSubmit={() => handleSignup()}>
              <h2>Signup</h2>
              <div class="inputbox">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Name</label>
              </div>

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

              <button type="submit" disabled={!isValid}>
                Sign up
              </button>

              <div class="register">
                <p>
                  Already have an account? <Link to="/login">Login</Link> Now
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
