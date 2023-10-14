import React from "react";
import styles from "./Features.scss";

import Header from "../../components/Header/Header";
import CoursesListing from "../../components/CoursesListing/CoursesListing";
import Footer from "../../components/Footer/Footer";
export default function Features() {
  return (
    <>
      <Header />
      <div className="features-container">
        <CoursesListing />
        <CoursesListing />
        <CoursesListing />
      </div>
      <Footer />
    </>
  );
}
