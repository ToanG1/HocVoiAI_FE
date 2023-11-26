import React from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../api/auth";
export default function Header() {
  function handleLogout() {
    logout().then((res) => {
      if (res === true) window.location.href = "/";
      else console.log(res);
    });
  }
  return (
    <header className="header-container">
      <div className="header-logo">logo</div>
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
              <Link to="/profile">Profile Information</Link>
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
