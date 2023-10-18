import React from "react";
import styles from "./Profile.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Profile() {
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile">
          <div className="profile-bg"></div>
          <section className="container">
            <div className="profile-image">
              <div className="camera">
                <i className="fas fa-camera"></i>
              </div>
            </div>
            <section className="profile-info">
              <h1 className="first-name">Angela</h1>
              <h1 className="second-name">Yun He</h1>
              <h2>ABOUT</h2>
              <p>
                hello hello, I'm angela, artist and developer 🌼 student at
                stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the
                best we can!
              </p>

              <aside className="social-media-icons">
                <Link to="https://twitter.com/zephybite" target="_blank">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="https://codepen.io/zephyo" target="_blank">
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link to="https://github.com/zephyo" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="https://medium.com/@zephyo" target="_blank">
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </aside>
            </section>
          </section>
          <section className="statistics">
            <button className="icon arrow left"></button>
            <button className="icon arrow right"></button>
            <p>
              <strong>29</strong> Followers
            </p>
            <p>
              <strong>184</strong> Following
            </p>
            <p>
              <strong>6</strong> Likes
            </p>
          </section>
          <button className="icon close"></button>
        </div>
      </div>
      <Footer />
    </>
  );
}
