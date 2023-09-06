import React, { useEffect, useState } from "react";
import styles from "./CourseDetails.scss";
import { useParams } from "react-router";

import CourseOverview from "../../components/CourseOverview/CourseOverview";
import CourseCirculum from "../../components/CourseCirculum/CourseCirculum";
function removeActiveClass() {
  document
    .getElementById("overview-btn")
    .classList.remove("course-details-active-btn");
  document
    .getElementById("curriculum-btn")
    .classList.remove("course-details-active-btn");
}
export default function CourseDetails() {
  const [img, setImg] = useState("");
  useEffect(() => {
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    }
    query({ inputs: "horse running on beach" }).then((response) => {
      const imageObjectURL = URL.createObjectURL(response);
      setImg(imageObjectURL);
    });
  }, []);
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
            {page === 0 ? <CourseOverview /> : <CourseCirculum />}
          </div>
        </div>
        <div className="course-details-sidebar">
          <div className="course-details-sidebar-header">
            <button className="course-details-sidebar-button">Share</button>
            <button className="course-details-sidebar-button">Delete</button>
          </div>
          <div className="course-details-sidebar-content">
            <img
              src={img}
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
