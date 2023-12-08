import React from "react";
import styles from "./SCourseBox.scss";
import { Link } from "react-router-dom";
export default function CourseBox({ course }) {
  const root = document.documentElement;
  root.style.setProperty("--percent", "75%");

  return (
    <Link to={`/Course/${course}`} style={{ textDecorationLine: "none" }}>
      <div className="small-course-box-container">
        <div className="course-box-content">
          <div className="course-box-header">
            <img
              src={course.avatar}
              className="course-box-image"
              alt="course-img"
            />
            <p className="course-box-tag">{course.category.name}</p>
          </div>
          <div className="course-box-body">
            <p className="course-box-title">{course.title}</p>
            <p className="course-box-time">{course.duration}</p>
            <p className="course-box-description">
              <span>
                {course.description.replace(/<[^>]+>/g, "").slice(0, 50)}
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
    </Link>
  );
}
