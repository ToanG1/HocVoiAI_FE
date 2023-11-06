import React from "react";
import styles from "./CourseOverview.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SCourseBox from "../../components/SCourseBox/SCourseBox";
export default function CourseOverview({ detail }) {
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      <div className="course-details-description">
        {detail.description || "There are no description"}
        <div
          className="course-details-relative-courses-header"
          style={{ marginBottom: "30px" }}
        >
          <span>10,000+ Courses Recommended by AI</span>
          <h1>You May Also Like More Courses</h1>
        </div>
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return <SCourseBox course={item} key={item} />;
            // return <h1>{item}</h1>;
          })}
        </Slider>
      </div>
    </>
  );
}
