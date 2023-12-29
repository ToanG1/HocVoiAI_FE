import React from "react";
import styles from "./Footer.scss";
import { Link } from "react-router-dom";
import ChatBotHelper from "../ChatBotHelper/ChatBotHelper";

import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <>
      <ChatBotHelper />
      <section className="footer">
        <div className="footer-container">
          <div className="footer-float-box">
            <div>
              <p>Ready to learn more?</p>
              <p>Start with us today</p>
            </div>
            <button>Get Started</button>
          </div>
          <div className="footer-content">
            <div className="footer-logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="footer-item">
              <h1 className="footer-item-title">About us</h1>
              <ul>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <li>Story</li>
                <li>Get in touch</li>
              </ul>
            </div>
            <div className="footer-item">
              <h1 className="footer-item-title">Our Product</h1>
              <ul>
                <Link to="/features">
                  <li>Roadmaps</li>
                </Link>
                <Link to="/questions">
                  <li>Asking</li>
                </Link>
                <li>Social</li>
              </ul>
            </div>
            <div className="footer-item">
              <h1 className="footer-item-title">Not quite ready for this?</h1>
              <p>Let us help you</p>
              <div>
                <input type="text" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <article id="wrap">
          <article id="lightings">
            <section id="one">
              <section id="two">
                <section id="three">
                  <section id="four">
                    <section id="five"></section>
                  </section>
                </section>
              </section>
            </section>
          </article>
        </article>
      </section>
    </>
  );
}
