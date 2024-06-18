import React, { useState, useEffect } from "react";
import styles from "./CourseOverview.scss";
import Slider from "react-slick";

import SCourseBox from "../../components/SCourseBox/SCourseBox";

import { getReletiveRoadmap } from "../../api/roadmap";


export default function CourseOverview({ detail, courseId }) {
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true
  };

  const [rCourse, setRCrouse] = useState([]);
  useEffect(() => {
    async function fetchRelativeCourse() {
      const res = await getReletiveRoadmap(courseId);
      if (res.code === 200) {
        console.log(res);
        setRCrouse(res.data.data);
      }
    }
    if (courseId)
      fetchRelativeCourse().catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="course-details-description">
        {detail.description ? (
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        ) : (
          "There are no description"
        )}
        <div
          className="course-details-relative-courses-header"
          style={{ marginBottom: "30px" }}
        >
          <span>10,000+ Courses Recommended by AI</span>
          <h1>You May Also Like More Courses</h1>
        </div>
        <Slider {...settings}>
          {rCourse.map((item) => {
            return <SCourseBox course={item} key={item} />;
            // return <h1>{item}</h1>;
          })}
        </Slider>
      </div>
    </>
  );
}
