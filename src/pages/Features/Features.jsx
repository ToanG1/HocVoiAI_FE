import React from "react";
import styles from "./Features.scss";

import Header from "../../components/Header/Header";
import CoursesListing from "../../components/CoursesListing/CoursesListing";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";
export default function Features() {
  return (
    <>
      <Header />
      <BgComp />

      <div className="features-container">
        <div className="create-new">
          <button id="create-btn">Create A New Course</button>
        </div>
        <CoursesListing />
        <CoursesListing />
        <CoursesListing />
      </div>
      <Footer />
    </>
  );
}
