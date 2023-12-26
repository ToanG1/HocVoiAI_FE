import React, { useEffect, useState } from "react";
import styles from "./CourseBox.scss";
import { Link } from "react-router-dom";

import defaultImg from "../../assets/images/roadmap.png";

export default function CourseBox({ course }) {
  const detail = course.roadmapDetail;
  const root = document.documentElement;
  root.style.setProperty("--percent", course.progress);

  return (
    <Link to={`${detail.id}`} style={{ textDecorationLine: "none" }}>
      <div className="course-box-container">
        <div className="course-box-content">
          <div className="course-box-header">
            <img
              src={defaultImg}
              className="course-box-image"
              alt="course-img"
            />
            <p className="course-box-tag">{detail.category.name}</p>
          </div>
          <div className="course-box-body">
            <p className="course-box-title">{detail.title}</p>
            <p className="course-box-description">
              <span>{detail.description.replace(/<[^>]+>/g, "")}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
