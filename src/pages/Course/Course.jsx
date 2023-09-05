import React from "react";
import styles from "./Course.scss";
import CourseBox from "../../components/CourseBox/CourseBox";
export default function Course() {
  return (
    <>
      <h1 className="course-title">Course</h1>
      <CourseBox />
    </>
  );
}
