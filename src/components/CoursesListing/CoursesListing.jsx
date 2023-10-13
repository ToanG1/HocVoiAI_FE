import React from "react";
import styles from "./CoursesListing.scss";

export default function CoursesListing() {
  return (
    <section className="coursesListing-container">
      <div className="support-grid"></div>
      <div className="band">
        {/* Big Card */}
        <div className="item-1">
          <a
            href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852"
            className="card"
          >
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
          </a>
        </div>
        {/* Small Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div className="item-2">
              <a
                href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
                className="card"
              >
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
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
