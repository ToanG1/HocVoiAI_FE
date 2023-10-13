import React from "react";
import styles from "./Features.scss";

import CoursesListing from "../../components/CoursesListing/CoursesListing";
export default function Features() {
  return (
    <div className="features-container">
      <h2 className="feature-title">New Recommended To You</h2>
      <CoursesListing />
      <h2 className="feature-title">Our Best</h2>
      <CoursesListing />
      <h2 className="feature-title">You May Like</h2>
      <CoursesListing />{" "}
    </div>
  );
}
