import React from "react";
import styles from "./SCourseBox.scss";
export default function CourseBox() {
  const root = document.documentElement;
  root.style.setProperty("--percent", "75%");

  return (
    <div className="course-box-container">
      <div className="course-box-content">
        <div className="course-box-header">
          <img
            src="https://picsum.photos/200/300"
            className="course-box-image"
            alt="course-img"
          />
          <p className="course-box-tag">tag</p>
        </div>
        <div className="course-box-body">
          <p className="course-box-title">Title Of The Course Is Meaningful</p>
          <p className="course-box-time">15 weeks and 30 hours</p>
          <p className="course-box-description">
            <span>
              This is place where we put the description. User need this to know
              what the course is about bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla
            </span>
            <div className="course-box-progessbar">
              <div class="progress-bar" role="progressbar">
                75%
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
