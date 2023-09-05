import React, { useState } from "react";
import style from "./CourseDetails.scss";
import { useParams } from "react-router";

export default function CourseDetails() {
  const param = useParams("courseId");
  const [page, setPage] = useState(0);
  return (
    <>
      <div className="course-details-container">
        <div className="course-details-content">
          <div className="course-details-title">
            The Complete Android Java Developer Course
          </div>
          <div className="course-details-pages">
            <button
              className="course-details-page-button"
              onClick={() => setPage(0)}
            >
              Overview
            </button>
            <button
              className="course-details-page-button"
              onClick={() => setPage(1)}
            >
              Curriculum
            </button>
          </div>
          <div className="course-details-body">
            {page === 0 ? (
              <div className="course-details-description">Description</div>
            ) : (
              <div className="course-details-curriculum">Lessons</div>
            )}
          </div>
        </div>
        <div className="course-details-sidebar">
          <div className="course-details-sidebar-header">
            <button className="course-details-share-button">Share</button>
            <button className="course-details-delete-button">Delete</button>
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
              <p>This Course Includes:</p>
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
