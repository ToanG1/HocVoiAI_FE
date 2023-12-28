import React, { useState } from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../api/auth";
import logo from "../../assets/images/logo.png";

export default function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    logout()
      .then((res) => {
        if (res.code === 200) if (res.data === true) navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const userId = JSON.parse(localStorage.getItem("USER_INFO"))
    ? JSON.parse(localStorage.getItem("USER_INFO")).userId
    : undefined;

  const handleSearch = () => {
    const keyword = document.getElementById("search");
    if (keyword.value) {
      navigate(`/search?keyword=${keyword.value}`);
    }
  };

  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-container">
        <Link to="/features" className="nav-item">
          Features
        </Link>
        <Link to="/questions" className="nav-item">
          Asking
        </Link>
        <div className="nav-item">Social</div>
      </div>
      <div className="dropdown-container">
        <input
          id="search"
          type="text"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="btn">
          {/* <span>Account</span> */}
          <i className="earth-icons">
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </i>
          <ul className="dropdown">
            <li>
              <Link to={`/profile/${userId}`}>Profile Information</Link>
            </li>
            <li>
              <Link to="/course">Library</Link>
            </li>
            <li>
              <Link to="/forgot-pwd">Change Password</Link>
            </li>

            <li>
              <Link>Help</Link>
            </li>
            <li>
              <Link onClick={() => handleLogout()}>Log Out</Link>
            </li>
          </ul>
        </button>
      </div>
    </header>
  );
}
