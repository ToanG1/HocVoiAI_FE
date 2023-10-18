import React from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
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
              <Link>Change Password</Link>
            </li>
            <li>
              <Link>
                Become <b>PRO</b>
              </Link>
            </li>
            <li>
              <Link>Help</Link>
            </li>
            <li>
              <Link>Log Out</Link>
            </li>
          </ul>
        </button>
      </div>
    </header>
  );
}
