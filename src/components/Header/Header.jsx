import React from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../api/auth";
import logo from "../../assets/images/logo.png";
export default function Header() {
  function handleLogout() {
    logout().then((res) => {
      if (res === true) window.location.href = "/";
      else console.log(res);
    });
  }
  const userId = JSON.parse(localStorage.getItem("USER_INFO"))
    ? JSON.parse(localStorage.getItem("USER_INFO")).userId
    : undefined;
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
        <button className="btn">
          <span>Account Settings</span>
          <i className="earth-icons">
            <FontAwesomeIcon icon={faEarthAsia} size="2xl" />
          </i>
          <ul className="dropdown">
            <li>
              <Link to={`/profile/${userId}`}>Profile Information</Link>
            </li>
            <li>
              <Link to="/course">Library</Link>
            </li>
            <li>
              <Link>Change Password</Link>
            </li>

            <li>
              <Link>Help</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Log Out</Link>
            </li>
          </ul>
        </button>
      </div>
    </header>
  );
}
