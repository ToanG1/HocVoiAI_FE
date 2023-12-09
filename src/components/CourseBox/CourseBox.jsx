import React, { useEffect, useState } from "react";
import styles from "./CourseBox.scss";
import { Link } from "react-router-dom";

import { createImg } from "../../api/AIGenImg";

export default function CourseBox({ course }) {
  const detail = course.roadmapDetail;
  const root = document.documentElement;
  root.style.setProperty("--percent", course.progress);

  const [img, setImg] = useState(detail.avatar);
  useEffect(() => {
    if (!img) {
      createImg("tech").then((res) => {
        setImg(res);
      });
    }
  }, []);
  return (
    <Link to={`${detail.id}`} style={{ textDecorationLine: "none" }}>
      <div className="course-box-container">
        <div className="course-box-content">
          <div className="course-box-header">
            <img src={img} className="course-box-image" alt="course-img" />
            <p className="course-box-tag">{detail.category.name}</p>
          </div>
          <div className="course-box-body">
            <p className="course-box-title">{detail.title}</p>
            <p className="course-box-time">{detail.topics} topics</p>
            <p className="course-box-description">
              <span>{detail.description.replace(/<[^>]+>/g, "")}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
