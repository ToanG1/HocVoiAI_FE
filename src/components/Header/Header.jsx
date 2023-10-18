import React from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
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
      <div className="header-user">
        <img src="https://picsum.photos/200/300" alt="user" />
        <p className="user-name">Toan</p>
      </div>
    </header>
  );
}
