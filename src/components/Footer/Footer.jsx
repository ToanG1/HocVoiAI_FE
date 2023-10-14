import React from "react";
import styles from "./Footer.scss";

export default function Footer() {
  return (
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
          <div className="footer-logo">logo</div>
          <div className="footer-item">
            <h1 className="footer-item-title">About us</h1>
            <ul>
              <li>Home</li>
              <li>Story</li>
              <li>Get in touch</li>
            </ul>
          </div>
          <div className="footer-item">
            <h1 className="footer-item-title">Our Product</h1>
            <ul>
              <li>Roadmaps</li>
              <li>Asking</li>
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
  );
}
