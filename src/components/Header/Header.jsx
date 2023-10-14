import React from "react";
import styles from "./Header.scss";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-logo">logo</div>
      <div className="nav-container">
        <div className="nav-item">Features</div>
        <div className="nav-item">Asking</div>
        <div className="nav-item">Social</div>
      </div>
      <div className="header-user">
        <img src="https://picsum.photos/200/300" alt="user" />
        <p className="user-name">Toan</p>
      </div>
    </header>
  );
}
