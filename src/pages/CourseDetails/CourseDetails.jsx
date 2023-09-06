import React, { useEffect, useState } from "react";
import styles from "./CourseDetails.scss";
import { useParams } from "react-router";

import SCourseBox from "../../components/SCourseBox/SCourseBox";

function removeActiveClass() {
  document
    .getElementById("overview-btn")
    .classList.remove("course-details-active-btn");
  document
    .getElementById("curriculum-btn")
    .classList.remove("course-details-active-btn");
}
function printOverview() {
  return (
    <>
      <div className="course-details-description">
        <div>
          <h1>Course Description</h1>
          <span>
            Maximus Ligula Eleifend Id Nisl Quis Interdum. Sed Malesuada Tortor
            Non Turpis Semper Bibendum. Ut Ac Nisi Porta, Malesuada Risus Non
            Viverra Dolor. Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus
            Et Ultrices Posuere Cubilia Curae In Tristique Libero, Quis Ultrices
            Diam Praesent Varius Diam Dui. Class Aptent Taciti Sociosqu Ad
            Litora Torquent Per Conubia Nostra. Maximus Ligula Eleifend Id Nisl
            Quis Interdum. Sed Malesuada Tortor Non Turpis Semper Bibendum. Ut
            Ac Nisi Porta, Malesuada Risus Non Viverra Dolor. Vestibulum Ante
            Ipsum Primis In Faucibus Orci Luctus Et Ultrices Posuere Cubilia
            Curae In Tristique Libero, Quis Ultrices Diam Praesent Varius Diam
            Dui. Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia
            Nostra.
          </span>
        </div>
        <div>
          <h1>What Will You Learn From This Course?</h1>
          <span>
            Maximus Ligula Eleifend Id Nisl Quis Interdum. Sed Malesuada Tortor
            Non Turpis Semper Bibendum. Ut Ac Nisi Porta, Malesuada Risus Non
            Viverra Dolor. Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus
            Et Ultrices Posuere.
          </span>
          <div className="course-details-benefits">
            <ul>
              <li>Becom smarter</li>
              <li>Becom harder</li>
              <li>Becom better</li>
            </ul>
            <ul>
              <li>Get a job</li>
              <li>Get respect</li>
              <li>Get more money</li>
            </ul>
          </div>
        </div>
        <div className="course-details-relative-courses-header">
          <span>10,000+ Courses Recommended by AI</span>
          <h1>You May Also Like More Courses</h1>
        </div>
        <div className="course-details-relative-courses">
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <>
                <div>
                  <SCourseBox key={item} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
function printCurriculum() {
  return (
    <>
      <div className="course-details-curriculum">Lessons</div>
    </>
  );
}

export default function CourseDetails() {
  const param = useParams("courseId");
  const [page, setPage] = useState(0);
  useEffect(() => {
    switch (page) {
      case 0:
        removeActiveClass();
        document
          .getElementById("overview-btn")
          .classList.add("course-details-active-btn");
        break;
      case 1:
        removeActiveClass();
        document
          .getElementById("curriculum-btn")
          .classList.add("course-details-active-btn");
        break;
      default:
        removeActiveClass();
        document
          .getElementById("overview-btn")
          .classList.add("course-details-active-btn");
    }
  }, [page]);
  return (
    <>
      <div className="course-details-container">
        <div className="course-details-content">
          <div className="course-details-tag">Tech</div>
          <div className="course-details-title">
            <p>The Complete Android Java Developer Course</p>
            <p>created at 2023/08/25</p>
          </div>

          <div className="course-details-nav">
            <button
              id="overview-btn"
              className="course-details-page-button"
              onClick={() => setPage(0)}
            >
              Overview
            </button>
            <button
              id="curriculum-btn"
              className="course-details-page-button"
              onClick={() => setPage(1)}
            >
              Curriculum
            </button>
          </div>
          <div className="course-details-body">
            {page === 0 ? printOverview() : printCurriculum()}
          </div>
        </div>
        <div className="course-details-sidebar">
          <div className="course-details-sidebar-header">
            <button className="course-details-sidebar-button">Share</button>
            <button className="course-details-sidebar-button">Delete</button>
          </div>
          <div className="course-details-sidebar-content">
            <img
              src="https://picsum.photos/200/300"
              className="course-details-sidebar-image"
              alt="course-img"
            />
            <p>If this help you, please rate me</p>
            <button className="course-details-rating-button">Rate me</button>
            <div className="course-details-short-description">
              <h3>This Course Includes:</h3>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Course level
                </li>
                <li className="course-details-short-description-value">
                  Intermediate
                </li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Duration
                </li>
                <li className="course-details-short-description-value">
                  30 hours
                </li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Lessons
                </li>
                <li className="course-details-short-description-value">8</li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">Tag</li>
                <li className="course-details-short-description-value">
                  Development
                </li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Language
                </li>
                <li className="course-details-short-description-value">
                  English
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
