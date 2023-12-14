import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.scss";

import { signup, authenticateToken } from "../../api/auth";
import { useWebSocket } from "../../websocket/context";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("HOCVOIAI_TOKEN"))
      authenticateToken().then((res) => {
        if (res.code === 200 || res.data) {
          navigate("/features");
        }
      });
  }, []);
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

  function handleSignup() {
    signup(email, pass, name).then((res) => {
      if (res) {
        handleGenerateRoadmap();
        navigate("/features");
      } else
        toast.error("Email or password may be incorrect", {
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
  const socket = useWebSocket();

  function handleGenerateRoadmap() {
    const topics = JSON.parse(localStorage.getItem("toGenTopics"));
    localStorage.removeItem("toGenTopics");

    // Send a message to the server
    socket.emit("generate", {
      topics: topics,
      userId: JSON.parse(localStorage.getItem("USER_INFO")).userId
    });
  }

  return (
    <>
      <div className="signup-section">
        <ToastContainer />
        <div class="form-box">
          <div class="form-value">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
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
