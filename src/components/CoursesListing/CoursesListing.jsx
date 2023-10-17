import React from "react";
import { Link } from "react-router-dom";
import styles from "./CoursesListing.scss";

export default function CoursesListing() {
  return (
    <section className="coursesListing-container">
      <h2 className="feature-title">New Recommended To You</h2>

      <div className="support-grid"></div>
      <div className="band">
        {/* Big Card */}
        <div className="item-1">
          <Link to={"/course/1"} className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg)`,
              }}
            ></div>
            <article>
              <h1>International Artist Feature: Malaysia</h1>
              <span>Mary Winkler</span>
            </article>
          </Link>
        </div>
        {/* Small Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div className="item-2">
              <Link to={"/course/" + item} className="card">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)`,
                  }}
                ></div>
                <article>
                  <h1>How to Conduct Remote Usability Testing</h1>
                  <span>Harry Brignull</span>
                </article>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
